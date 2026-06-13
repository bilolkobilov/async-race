import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Car, CarInput, RaceStatus, CarRaceStatus } from '../types';
import { getCars, createCar, updateCar, deleteCar } from '../api/cars';
import { deleteWinner } from '../api/winners';
import { startEngine, stopEngine, driveEngine } from '../api/engine';
import { generateRandomCars } from '../utils/randomCars';
import { saveWinner } from '../api/winners';

const CARS_PER_PAGE = 7;

export interface CarState {
  id: number;
  name: string;
  color: string;
  status: CarRaceStatus;
  position: number;
}

interface GarageState {
  cars: CarState[];
  totalCount: number;
  currentPage: number;
  createName: string;
  createColor: string;
  editId: number | null;
  editName: string;
  editColor: string;
  raceStatus: RaceStatus;
  winnerId: number | null;
  winnerTime: number | null;
  loading: boolean;
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  createName: '',
  createColor: '#000000',
  editId: null,
  editName: '',
  editColor: '#000000',
  raceStatus: 'idle',
  winnerId: null,
  winnerTime: null,
  loading: false,
};

export const fetchCars = createAsyncThunk('garage/fetchCars', async (page: number) => {
  return getCars(page, CARS_PER_PAGE);
});

export const addCar = createAsyncThunk('garage/addCar', async (car: CarInput) => {
  return createCar(car);
});

export const editCar = createAsyncThunk(
  'garage/editCar',
  async ({ id, car }: { id: number; car: CarInput }) => {
    return updateCar(id, car);
  },
);

export const removeCar = createAsyncThunk(
  'garage/removeCar',
  async ({ id, page }: { id: number; page: number }) => {
    await deleteCar(id);
    await deleteWinner(id).catch(() => undefined);
    const response = await getCars(page, CARS_PER_PAGE);
    return { id, ...response };
  },
);

export const addRandomCars = createAsyncThunk('garage/addRandomCars', async (page: number) => {
  const cars = generateRandomCars(100);
  await Promise.all(cars.map((c) => createCar(c)));
  return getCars(page, CARS_PER_PAGE);
});

export const startCarEngine = createAsyncThunk('garage/startCarEngine', async (id: number) => {
  const data = await startEngine(id);
  return { id, velocity: data.velocity, distance: data.distance };
});

export const stopCarEngine = createAsyncThunk('garage/stopCarEngine', async (id: number) => {
  await stopEngine(id);
  return { id };
});

export const driveCarEngine = createAsyncThunk(
  'garage/driveCarEngine',
  async ({ id, time }: { id: number; time: number }, { dispatch, getState }) => {
    const result = await driveEngine(id);
    if (result.success) {
      const state = (getState() as { garage: GarageState }).garage;
      if (state.winnerId === null) {
        await saveWinner(id, time);
        dispatch(garageSlice.actions.setWinner({ id, time }));
      }
    }
    return { id, success: result.success };
  },
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCreateName: (state, action: PayloadAction<string>) => {
      state.createName = action.payload;
    },
    setCreateColor: (state, action: PayloadAction<string>) => {
      state.createColor = action.payload;
    },
    selectForEdit: (state, action: PayloadAction<Car>) => {
      state.editId = action.payload.id;
      state.editName = action.payload.name;
      state.editColor = action.payload.color;
    },
    setEditName: (state, action: PayloadAction<string>) => {
      state.editName = action.payload;
    },
    setEditColor: (state, action: PayloadAction<string>) => {
      state.editColor = action.payload;
    },
    clearEdit: (state) => {
      state.editId = null;
      state.editName = '';
      state.editColor = '#000000';
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setWinner: (state, action: PayloadAction<{ id: number; time: number }>) => {
      state.winnerId = action.payload.id;
      state.winnerTime = action.payload.time;
      state.raceStatus = 'finished';
    },
    startRace: (state) => {
      state.raceStatus = 'racing';
      state.winnerId = null;
      state.winnerTime = null;
    },
    resetRace: (state) => {
      state.raceStatus = 'idle';
      state.winnerId = null;
      state.winnerTime = null;
      state.cars = state.cars.map((c) => ({ ...c, status: 'idle', position: 0 }));
    },
    dismissWinner: (state) => {
      state.winnerId = null;
      state.winnerTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => { state.loading = true; })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars.map((c) => ({ ...c, status: 'idle', position: 0 }));
        state.totalCount = action.payload.totalCount;
      })
      .addCase(addCar.fulfilled, (state) => {
        state.createName = '';
        state.createColor = '#000000';
      })
      .addCase(editCar.fulfilled, (state, action) => {
        const car = action.payload;
        const idx = state.cars.findIndex((c) => c.id === car.id);
        if (idx !== -1) {
          state.cars[idx] = { ...state.cars[idx], name: car.name, color: car.color };
        }
        state.editId = null;
        state.editName = '';
        state.editColor = '#000000';
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.cars = action.payload.cars.map((c) => ({ ...c, status: 'idle', position: 0 }));
        state.totalCount = action.payload.totalCount;
        const maxPage = Math.max(1, Math.ceil(action.payload.totalCount / CARS_PER_PAGE));
        if (state.currentPage > maxPage) state.currentPage = maxPage;
      })
      .addCase(addRandomCars.fulfilled, (state, action) => {
        state.cars = action.payload.cars.map((c) => ({ ...c, status: 'idle', position: 0 }));
        state.totalCount = action.payload.totalCount;
      })
      .addCase(startCarEngine.pending, (state, action) => {
        const id = action.meta.arg;
        const car = state.cars.find((c) => c.id === id);
        if (car) car.status = 'started';
      })
      .addCase(startCarEngine.fulfilled, (state, action) => {
        const car = state.cars.find((c) => c.id === action.payload.id);
        if (car) car.status = 'driving';
      })
      .addCase(stopCarEngine.fulfilled, (state, action) => {
        const car = state.cars.find((c) => c.id === action.payload.id);
        if (car) { car.status = 'idle'; car.position = 0; }
      })
      .addCase(driveCarEngine.fulfilled, (state, action) => {
        const car = state.cars.find((c) => c.id === action.payload.id);
        if (car && !action.payload.success) car.status = 'broken';
        else if (car) car.status = 'finished';
      });
  },
});

export const {
  setCreateName, setCreateColor, selectForEdit, setEditName, setEditColor,
  clearEdit, setPage, setWinner, startRace, resetRace, dismissWinner,
} = garageSlice.actions;

export default garageSlice.reducer;

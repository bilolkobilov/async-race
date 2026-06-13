import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WinnerWithCar, SortField, SortOrder } from '../types';
import { getWinners } from '../api/winners';
import { getCar } from '../api/cars';

const WINNERS_PER_PAGE = 10;

interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
  loading: boolean;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortField: 'time',
  sortOrder: 'ASC',
  loading: false,
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async ({ page, sort, order }: { page: number; sort: SortField; order: SortOrder }) => {
    const { winners, totalCount } = await getWinners(page, WINNERS_PER_PAGE, sort, order);
    const withCars = await Promise.all(
      winners.map(async (w) => {
        const car = await getCar(w.id);
        return { ...w, name: car.name, color: car.color };
      }),
    );
    return { winners: withCars, totalCount };
  },
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinnersPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      if (state.sortField === action.payload) {
        state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sortField = action.payload;
        state.sortOrder = 'ASC';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => { state.loading = true; })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      });
  },
});

export const { setWinnersPage, setSortField } = winnersSlice.actions;
export default winnersSlice.reducer;

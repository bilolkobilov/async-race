import { Car, CarInput } from '../types';

const BASE_URL = 'http://localhost:3000';

export interface CarsResponse {
  cars: Car[];
  totalCount: number;
}

export const getCars = async (page: number, limit = 7): Promise<CarsResponse> => {
  const res = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
  const totalCount = Number(res.headers.get('X-Total-Count') ?? 0);
  const cars: Car[] = await res.json();
  return { cars, totalCount };
};

export const getCar = async (id: number): Promise<Car> => {
  const res = await fetch(`${BASE_URL}/garage/${id}`);
  return res.json();
};

export const createCar = async (car: CarInput): Promise<Car> => {
  const res = await fetch(`${BASE_URL}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const updateCar = async (id: number, car: CarInput): Promise<Car> => {
  const res = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return res.json();
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
};

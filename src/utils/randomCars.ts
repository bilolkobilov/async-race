import { CarInput } from '../types';

const BRANDS = [
  'Tesla', 'BMW', 'Mercedes', 'Ford', 'Toyota', 'Honda', 'Audi',
  'Ferrari', 'Lamborghini', 'Porsche',
];

const MODELS = [
  'Model S', 'X5', 'E-Class', 'Mustang', 'Camry', 'Civic', 'A4',
  'F40', 'Aventador', '911',
];

const randomHex = (): string => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, '0')}`;
};

const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateRandomCars = (count: number): CarInput[] =>
  Array.from({ length: count }, () => ({
    name: `${randomFrom(BRANDS)} ${randomFrom(MODELS)}`,
    color: randomHex(),
  }));

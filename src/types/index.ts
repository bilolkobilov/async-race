export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface CarInput {
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCar extends Winner {
  name: string;
  color: string;
}

export interface EngineData {
  velocity: number;
  distance: number;
}

export type SortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';
export type RaceStatus = 'idle' | 'racing' | 'finished';
export type EngineStatus = 'started' | 'stopped' | 'drive';
export type CarRaceStatus = 'idle' | 'started' | 'driving' | 'broken' | 'finished';

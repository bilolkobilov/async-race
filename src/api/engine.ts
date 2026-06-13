import { EngineData, EngineStatus } from '../types';

const BASE_URL = 'http://localhost:3000';

export const controlEngine = async (id: number, status: EngineStatus): Promise<EngineData> => {
  const res = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, { method: 'PATCH' });
  if (!res.ok) throw new Error(`Engine error ${res.status}`);
  return res.json();
};

export const startEngine = (id: number): Promise<EngineData> => controlEngine(id, 'started');

export const stopEngine = (id: number): Promise<EngineData> => controlEngine(id, 'stopped');

export const driveEngine = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' });
  if (res.status === 500) return { success: false };
  if (!res.ok) throw new Error(`Drive error ${res.status}`);
  return res.json();
};

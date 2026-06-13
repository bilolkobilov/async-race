import { Winner, SortField, SortOrder } from '../types';

const BASE_URL = 'http://localhost:3000';

export interface WinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export const getWinners = async (
  page: number,
  limit = 10,
  sort: SortField = 'time',
  order: SortOrder = 'ASC',
): Promise<WinnersResponse> => {
  const res = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const totalCount = Number(res.headers.get('X-Total-Count') ?? 0);
  const winners: Winner[] = await res.json();
  return { winners, totalCount };
};

export const getWinner = async (id: number): Promise<Winner | null> => {
  const res = await fetch(`${BASE_URL}/winners/${id}`);
  if (res.status === 404) return null;
  return res.json();
};

export const createWinner = async (winner: Winner): Promise<Winner> => {
  const res = await fetch(`${BASE_URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });
  return res.json();
};

export const updateWinner = async (
  id: number,
  data: Pick<Winner, 'wins' | 'time'>,
): Promise<Winner> => {
  const res = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/winners/${id}`, { method: 'DELETE' });
};

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const existing = await getWinner(id);
  if (existing) {
    await updateWinner(id, {
      wins: existing.wins + 1,
      time: Math.min(existing.time, time),
    });
  } else {
    await createWinner({ id, wins: 1, time });
  }
};

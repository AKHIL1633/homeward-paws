import type { Pet, User } from './types';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !(init.body instanceof FormData))
    headers.set('Content-Type', 'application/json');
  const response = await fetch(path, {
    ...init,
    headers,
    credentials: 'include',
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: 'Request failed' }));
    const message = Array.isArray(body.message)
      ? body.message.join(', ')
      : (body.message ?? body.error ?? 'Request failed');
    throw new ApiError(message, response.status);
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export const getCurrentUser = () =>
  api<{ user: User }>('/api/auth/me')
    .then((value) => value.user)
    .catch((error) => {
      if (error instanceof ApiError && error.status === 401) return null;
      throw error;
    });
export const getPets = (query = '') => api<Pet[]>(`/api/pets${query}`);
export const getPet = (id: string) => api<Pet>(`/api/pets/${id}`);

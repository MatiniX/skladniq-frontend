import type { User } from '$lib/types';
import { getUserFromSessionStorage } from '$lib/utils';
import { writable } from 'svelte/store';

const persistedUser = getUserFromSessionStorage();
export const user = writable<User | null>(persistedUser);

const isAuth = persistedUser ? true : false;
export const isAuthenticated = writable(isAuth);

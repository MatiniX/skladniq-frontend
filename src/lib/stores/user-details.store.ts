import type { UserDetails } from '$lib/types';
import { getUserDetailsFromSessionStorage } from '$lib/utils';
import { writable } from 'svelte/store';

const details = getUserDetailsFromSessionStorage();
export const userDetails = writable<UserDetails | null>(details);

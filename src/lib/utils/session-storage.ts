import { browser } from '$app/environment';
import type { User } from '$lib/types';

export function getUserFromSessionStorage() {
	if (!browser) return;

	const user = sessionStorage.getItem('user');

	if (!user || user === '') return null;

	return JSON.parse(user) as User;
}

export function setUserToSessionStorage(user: User) {
	if (!browser) return;

	const userString = JSON.stringify(user);

	sessionStorage.setItem('user', userString);
}

export function removeUserFromSessionStorage() {
	if (!browser) return;
	sessionStorage.removeItem('user');
}

export function setUserDetailsToSessionStorage(userDetails: any) {
	if (!browser) return;
	const value = JSON.stringify(userDetails);
	sessionStorage.setItem('userDetails', value);
}

export function getUserDetailsFromSessionStorage() {
	if (!browser) return;
	const userDetails = sessionStorage.getItem('userDetails');
	if (!userDetails || userDetails === '') return null;
	return JSON.parse(userDetails);
}

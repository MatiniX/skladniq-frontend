import type { Tokens, User } from '$lib/types';
import { getJwtToken, setJwtToken } from '.';
import api from '$lib/axios/instance';
import { user, isAuthenticated } from '$lib/stores/userStore';
import {
	removeUserFromSessionStorage,
	setUserDetailsToSessionStorage,
	setUserToSessionStorage
} from '$lib/utils';
import { userDetails } from '$lib/stores/user-details.store';

export async function handleSignin(email: string, password: string) {
	const res = await api.post('/auth/local/signin', { email, password });
	const { accessToken }: Tokens = res.data;

	setJwtToken(accessToken);
	api.setAuthHeaders(accessToken);

	await setUser();
	return setUserDetails();
}

export async function handleSignup(email: string, password: string) {
	const res = await api.post('/auth/local/signup', { email, password });
	const { accessToken }: Tokens = res.data;

	setJwtToken(accessToken);
	api.setAuthHeaders(accessToken);

	return await setUser();
}

export async function handleSignout() {
	const res = await api.delete('/auth/signout');

	if (res.status === 200) {
		isAuthenticated.set(false);
		user.set(null);
		setJwtToken('');
		removeUserFromSessionStorage();
	}
}

export function getAuthHeaders() {
	const headers = new Headers();
	const token = getJwtToken();
	if (token) {
		headers.append('Authorization', 'Bearer ' + token);
	}
	return headers;
}

export async function setUser() {
	const res = await api.get('/auth/me');
	const { data } = res;

	setUserToSessionStorage(data);
	isAuthenticated.set(true);
	user.set(data);
}

export async function setUserDetails() {
	const res = await api.get('/user/user-details');
	const { data, status } = res;

	setUserDetailsToSessionStorage(data);
	userDetails.set(data);

	return status === 200;
}

import { browser } from '$app/environment';

export function getJwtToken() {
	if (browser) {
		return sessionStorage.getItem('jwt');
	}
}

export function setJwtToken(token: string) {
	if (browser) {
		sessionStorage.setItem('jwt', token);
	}
}

export function getRefreshToken() {
	if (browser) {
		return sessionStorage.getItem('refreshToken');
	}
}

export function setRefreshToken(token: string) {
	if (browser) {
		sessionStorage.setItem('refreshToken', token);
	}
}

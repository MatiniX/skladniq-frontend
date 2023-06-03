import type { LayoutData } from './$types';
import { browser } from '$app/environment';
import { getUserFromSessionStorage } from '$lib/utils';
import api from '$lib/axios/instance';
import { setJwtToken, setUser, setUserDetails } from '$lib/auth';
import type { Tokens } from '$lib/types';
import { redirect } from '@sveltejs/kit';

const publicRoutes = ['/', '/signin', '/signup', '/change-password', '/forgot-password'];

export const load: LayoutData = async () => {
	// 1. pri každom načitaní skontrolovať či je v sessionStorage uložený user
	if (browser) {
		const user = getUserFromSessionStorage();
		if (!user) {
			// 3. ak nie je tak skúsit zavolať /auth/refresh endpoint
			try {
				const response = await api.post('/auth/refresh', {});
				// 4. ak /auth/refresh vráti 200 tak nastaviť tokeny a znova userStore
				if (response.status === 200) {
					const { accessToken }: Tokens = response.data;

					setJwtToken(accessToken);
					api.setAuthHeaders(accessToken);

					await setUserDetails();
					return await setUser();
				}
			} catch (error) {
				// 5. ak /auth/refresh 401 tak redirect na login
				if (
					!publicRoutes.includes(window.location.pathname) &&
					!window.location.pathname.startsWith('/change-password')
				) {
					throw redirect(307, '/');
				}
			}
		}
	}

	return {};
};

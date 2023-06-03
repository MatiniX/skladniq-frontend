import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { isAuthenticated, user } from '$lib/stores/userStore';
import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/types';

let isAuth: boolean;
let currentUser: User | null;

export const load: PageLoad = async ({ params }) => {
	if (browser) {
		isAuthenticated.subscribe((value) => (isAuth = value));
		if (!isAuth) {
			redirect(308, '/');
		}

		user.subscribe((val) => (currentUser = val));
	}

	return { currentUser };
};

import { PUBLIC_API_URL } from '$env/static/public';
import { getJwtToken, setJwtToken } from '$lib/auth';
import type { Tokens } from '$lib/types';
import axios from 'axios';

class AxiosInstance {
	private instance;

	constructor() {
		this.instance = axios.create({
			baseURL: PUBLIC_API_URL,
			withCredentials: true
		});

		this.instance.interceptors.request.use(
			async (config) => {
				const accessToken = getJwtToken();
				config.headers = {
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/json',
					'Content-Type': 'application/json'
				};
				return config;
			},
			(error) => {
				Promise.reject(error);
			}
		);

		this.instance.interceptors.response.use(
			(res) => res,
			async function (error) {
				const originalRequest = error.config;

				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					const response = await axios.post(
						PUBLIC_API_URL + '/auth/refresh',
						{},
						{ withCredentials: true }
					);

					if (response.status === 200) {
						const { accessToken }: Tokens = response.data;
						setJwtToken(accessToken);
						axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
						return axios({
							...originalRequest,
							headers: { ...originalRequest.headers, Authorization: `Bearer ${accessToken}` }
						});
					}

					return Promise.reject(error);
				}
			}
		);

		const accessToken = getJwtToken();
		if (accessToken) {
			this.setAuthHeaders(accessToken);
		}
	}

	get get() {
		return this.instance.get;
	}

	get post() {
		return this.instance.post;
	}

	get patch() {
		return this.instance.patch;
	}

	get delete() {
		return this.instance.delete;
	}

	setAuthHeaders(token: string) {
		this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}

	async refreshAccessTokens() {
		return this.post('/auth/refresh');
	}
}

const api = new AxiosInstance();

export default api;

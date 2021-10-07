import axios from 'axios';

import {AuthResponseT} from '../models/response';

export const API_URL = 'http://localhost:3005/api';

export const refreshRequest = () => axios.get<AuthResponseT>(`${API_URL}/auth/refresh`, {withCredentials: true});

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

api.interceptors.response.use(
    (config) => config,
    async (err) => {
        const originalRequest = err.config;

        if (err.response.status === 401 && err.config && !err.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                const {data} = await refreshRequest();
                localStorage.setItem('token', data.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                console.dir(e);
            }
        }

        // case when refreshToken is dead
        throw err;
    }
);

export default api;

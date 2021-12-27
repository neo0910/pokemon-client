import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import axios from 'axios';

import {AuthResponseT} from '../models/response';
import {logout} from '../store/authSlice';

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

const basePrivateQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await basePrivateQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const {data} = await basePrivateQuery('/auth/refresh', api, extraOptions);

        if (data) {
            localStorage.setItem('token', (data as AuthResponseT).accessToken);
            result = await basePrivateQuery(args, api, extraOptions);
        } else {
            // case when refreshToken is dead
            api.dispatch(logout());
        }
    }

    return result;
};

export {baseQueryWithReauth};

export default api;

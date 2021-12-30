import {createApi} from '@reduxjs/toolkit/query/react';

import {AuthResponseT} from '../models/response';
import {baseQueryWithReauth} from '../api';
import {setCurrentUser} from '../store/authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponseT, {email: string; password: string}>({
            query: (payload) => ({url: '/auth/login', method: 'POST', body: payload}),
            async onCacheEntryAdded(arg, {cacheDataLoaded, dispatch, getCacheEntry}) {
                await cacheDataLoaded;

                const data = getCacheEntry().data as AuthResponseT;

                if (data) {
                    localStorage.setItem('token', data.accessToken);
                    dispatch(setCurrentUser(data.user));
                }
            },
        }),
        registration: builder.mutation<AuthResponseT, {email: string; password: string}>({
            query: (payload) => ({url: '/auth/registration', method: 'POST', body: payload}),
            async onCacheEntryAdded(arg, {cacheDataLoaded, dispatch, getCacheEntry}) {
                await cacheDataLoaded;

                const data = getCacheEntry().data as AuthResponseT;

                if (data) {
                    localStorage.setItem('token', data.accessToken);
                    dispatch(setCurrentUser(data.user));
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({url: '/auth/logout', method: 'POST'}),
            async onCacheEntryAdded(arg, {cacheDataLoaded, dispatch, getCacheEntry}) {
                await cacheDataLoaded;

                localStorage.removeItem('token');
                dispatch(setCurrentUser(null));
            },
        }),
        checkAuth: builder.query<AuthResponseT, void>({
            query: () => '/auth/refresh',
            async onCacheEntryAdded(arg, {cacheDataLoaded, dispatch, getCacheEntry}) {
                await cacheDataLoaded;

                const data = getCacheEntry().data as AuthResponseT;

                if (data) {
                    localStorage.setItem('token', data.accessToken);
                    dispatch(setCurrentUser(data.user));
                }
            },
        }),
    }),
});

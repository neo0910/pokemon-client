import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

import {AuthResponseT} from '../models/response';
import {setCurrentUser} from '../store/authSlice';

export const API_URL = 'http://localhost:3005/api';

const basePublicQuery = fetchBaseQuery({baseUrl: API_URL});

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
            localStorage.removeItem('token');
            api.dispatch(setCurrentUser(null));
        }
    }

    return result;
};

export {baseQueryWithReauth, basePublicQuery};

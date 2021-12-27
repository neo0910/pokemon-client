import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from '../api';
import {UserT} from '../models/User';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUsers: builder.query<UserT[], void>({
            query: () => '/users',
            providesTags: ['User'],
        }),
    }),
});

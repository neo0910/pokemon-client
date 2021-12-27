import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from '../api';
import {TypeDto, TypeT} from '../models/Type';

export const typeApi = createApi({
    reducerPath: 'typeApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Type'],
    endpoints: (builder) => ({
        fetchTypes: builder.query<TypeT[], void>({
            query: () => '/types',
            providesTags: ['Type'],
        }),
        createType: builder.mutation<TypeT, TypeDto>({
            query: (type) => ({
                url: '/types',
                method: 'POST',
                body: type,
            }),
            invalidatesTags: ['Type'],
        }),
    }),
});

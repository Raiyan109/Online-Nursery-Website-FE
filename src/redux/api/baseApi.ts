import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://online-nursery-website-be.vercel.app/api/v1',
        // credentials: 'include',
    }),
    tagTypes: ['product'],
    endpoints: () => ({}),
});
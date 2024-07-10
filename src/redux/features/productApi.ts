import { baseApi } from '../api/baseApi';

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            // query: () => ({
            //     url: '/products',
            //     method: 'GET'
            // }),
            query: () => 'products',
        }),
    }),
});

export const { useGetProductQuery } = productApi;
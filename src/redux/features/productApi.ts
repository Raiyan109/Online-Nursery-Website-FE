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
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'PUT'
            })
        })
    }),
});

export const { useGetProductQuery, useDeleteProductMutation } = productApi;
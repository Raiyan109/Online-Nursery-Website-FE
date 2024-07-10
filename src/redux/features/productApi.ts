import { baseApi } from '../api/baseApi';

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => 'products',
        }),
        getCategories: builder.query({
            query: () => 'products/categories',
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'PUT'
            })
        })
    }),
});

export const { useGetProductQuery, useDeleteProductMutation, useGetCategoriesQuery } = productApi;
import { baseApi } from '../api/baseApi';

const productApi = baseApi.enhanceEndpoints({ addTagTypes: ['product'] }).injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => 'products',
            providesTags: ['product']
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/${id}`
            }),
            providesTags: ['product']
        }),
        getCategories: builder.query({
            query: () => 'products/categories',
            providesTags: ['product']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['product']
        }),
        addProduct: builder.mutation({
            query: (products) => ({
                url: '/products',
                method: 'POST',
                body: products
            }),
            invalidatesTags: ['product']
        })
    }),
});

export const { useGetProductQuery, useDeleteProductMutation, useGetCategoriesQuery, useGetProductDetailsQuery, useAddProductMutation } = productApi;
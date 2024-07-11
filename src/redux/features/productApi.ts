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
            })
        }),
        getCategories: builder.query({
            query: () => 'products/categories',
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'PUT'
            })
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
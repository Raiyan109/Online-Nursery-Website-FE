import { baseApi } from "@/redux/api/baseApi";


const orderApi = baseApi.enhanceEndpoints({ addTagTypes: ['order'] }).injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orders) => ({
                url: '/orders',
                method: 'POST',
                body: orders
            }),
            invalidatesTags: ['order']
        }),
        getOrders: builder.query({
            query: () => ({
                url: '/orders',
                method: 'GET'
            }),
        })
    }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
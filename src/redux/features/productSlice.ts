import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TProduct = {
    image: string;
    title: string;
    price: number;
    rating: string;
    category: [string];
    availableInStock: number;
}

const initialState: TProduct = {
    image: '',
    title: '',
    price: 0,
    rating: '',
    category: [''],
    availableInStock: 0
}

export const productSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        product: (state) => {
            //    state
        },

    },
})

// Action creators are generated for each case reducer function
export const { product } = productSlice.actions

export default productSlice.reducer
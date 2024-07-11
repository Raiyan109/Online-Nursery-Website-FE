import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`increased ${state.cartItems[itemIndex].title} quantity`)
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} added to cart`)
            }
        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
            state.cartItems = nextCartItems
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.title} quantity`)
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
                state.cartItems = nextCartItems

                toast.error(`${action.payload.title} removed from cart`)
            }
        },
        getTotal: (state, action) => {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
        }
    }
})

export const { addToCart, removeFromCart, decreaseCart, getTotal } = cartSlice.actions
export default cartSlice.reducer
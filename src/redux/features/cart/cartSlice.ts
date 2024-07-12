import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// type for a cart item
interface CartItem {
    _id: string;
    title: string;
    price: number;
    cartQuantity: number;
}

// type for the cart state
interface CartState {
    cartItems: CartItem[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
}

// Initial state for the cart
const initialState: CartState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
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
        removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
            state.cartItems = nextCartItems
        },
        decreaseCart: (state, action: PayloadAction<{ _id: string; title: string }>) => {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.title} quantity`)
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
                state.cartItems = nextCartItems

                toast.error(`${action.payload.title} removed from cart`)
            }
        },
        getTotal: (state) => {
            const { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
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
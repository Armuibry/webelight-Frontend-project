import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [] }


export const cartSlice = createSlice({
    name: "cart slice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.cartItems.length > 0) {
                let product = state.cartItems.find(item => item._id === action.payload._id);
                if (product) {
                    state.cartItems.map(item => item._id === action.payload._id ? item.quantity += action.payload.quantity : "")
                } if (!product) {
                    state.cartItems = [...state.cartItems, action.payload];
                }
            } else {
                state.cartItems = [...state.cartItems, action.payload]
            }
        },

        removeFromCart:(state,action) =>{
            let newCart = state.cartItems.filter(item => item._id !== action.payload);
            state.cartItems = newCart;
        },
        updateFromLocal: (state,action) =>{
            state.cartItems = action.payload
        }
    }
})
export const cartActions = cartSlice.actions;
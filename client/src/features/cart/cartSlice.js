import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1;
            }
            else {
                const temp = { ...action.payload, quantity: 1 }
                state.items = [...state.items, temp]
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        removeSingleItem: (state, action) => {
            const itemLastIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (state.items[itemLastIndex].quantity >= 1) {
                state.items[itemLastIndex].quantity -= 1
            }
        },
        emptyCart: (state, action) => {
            state.items = []
        }
    },
});

export const { addToCart, removeFromCart, removeSingleItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;
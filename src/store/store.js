import {configureStore} from '@reduxjs/toolkit';
import { productSlice } from './productSlice';
import {searchSlice} from './filterslice'
import {cartSlice} from  './cartSlice'
import { modelSlice } from './modalSlice';
import { userSlice } from './userSlice';


const store = configureStore({
    reducer: {
        productActions: productSlice.reducer,
        searchActions: searchSlice.reducer,
        cartState: cartSlice.reducer,
        modelState: modelSlice.reducer,
        userState: userSlice.reducer,
    }
})

export default store;
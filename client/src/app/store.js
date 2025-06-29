import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import productsReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice"
import orderReducer from "../features/orderSlice"
import adminReducer from "../features/adminSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productsReducer,
        cart:cartReducer,
        order:orderReducer,
        admin:adminReducer,
    }
})
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"
import { endPoints } from "../api/endpoints"
import { handleError } from "../utils/handleError"

const initialState = {
    cart: null,
    loading: false,
    error: null,
}

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, size, quantity }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(endPoints.CART.ADD(productId), { size, quantity });
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const getCart = createAsyncThunk('cart/getCart', async ({ page, limit}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${endPoints.CART.GET_CART}?page=${page}&limit=${limit}`,{ withCredentials: true, });
        return response.data.allCart
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const updateQuantity = createAsyncThunk('cart/increaseQuantity', async ({ productId, action, size }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(endPoints.CART.UPDATE_QUANTITY(productId, action), { size });
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})


//Remove cart
export const removeCart = createAsyncThunk('cart/removeCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(endPoints.CART.REMOVE(productId));
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //addCart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload.cart
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            //getCart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load cart";
            })
            //updateQuantity
            .addCase(updateQuantity.pending, (state) => {
                state.loading = true
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                state.error = null
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
             //Remove
            .addCase(removeCart.pending, (state) => {
                state.loading = true
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                state.error = null
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default cartSlice.reducer

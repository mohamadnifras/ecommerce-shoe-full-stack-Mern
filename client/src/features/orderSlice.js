import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endpoints"
import { handleError } from "../utils/handleError"

const initialState = {
    orders: [],
    order: null,
    loading: true,
    paymentVerified: false,
    error: null

}

export const createOrder = createAsyncThunk(
    'order/addOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endPoints.ORDER.ORDER_CREATE, orderData)
            console.log(response.data, 'hello createOrder');

            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

//payment verify
export const paymentVerify = createAsyncThunk(
    'order/paymentVerify',
    async (paymentData, { rejectWithValue }) => {
        console.log(paymentData, 'orderslice paymentverify');

        try {
            const response = await axiosInstance.post(endPoints.ORDER.PAYMENT_VERIFY, paymentData)
            console.log(response, "OderSlice");

            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)
export const fetchUserOrder = createAsyncThunk(
    'order/fetchUserOrder',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endPoints.ORDER.GET_USER_ORDER, params)
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //Add Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload.order
                state.error = null
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Verify payment actions
            .addCase(paymentVerify.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentVerify.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentVerified = true;
                state.order.paymentVerified = true;
                state.error = 'Payment verification failed';
                console.log(JSON.parse(JSON.stringify(state.order)));

            })
            .addCase(paymentVerify.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetch user order
            .addCase(fetchUserOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload.orders
                state.error = null
            })
            .addCase(fetchUserOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


    }
})



export default orderSlice.reducer
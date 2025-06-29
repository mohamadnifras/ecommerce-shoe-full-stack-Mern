import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosInstance'
import { endPoints } from '../api/endpoints'
import { handleError } from '../utils/handleError'


const initialState = {
    loading: true,
    users: [],
    error: null,
    user: null,
    page: 1,
    limit: 0,
    totalUsers: 0,
    order: [],
    totalRevenue: 0,
}

//All fetch Users
export const featchAllUser = createAsyncThunk(
    'admin/featchAllUser',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${endPoints.ADMIN.USER.GET_ALL_USER}?page=${page}&limit=${limit}`)
            return response.data

        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

export const getAllOrders = createAsyncThunk("admin/getAllOrders", async ({ page, limit }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(endPoints.ADMIN.ORDERS.GET_ALL_ORDER, { page, limit });
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }

})

export const getTotalRevenue = createAsyncThunk("admin/getTotalRevenue", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(endPoints.ADMIN.ORDERS.GET_TOTAL_REVENUE);
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const blockAndUnblock = createAsyncThunk(
    'admin/blockAndUnblock',
    async (id, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.put(endPoints.ADMIN.USER.BLOCK_UNBLOCK(id))


            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

export const getByIdOrder = createAsyncThunk(
    'admin/getByIdOrder',
    async (userId, { rejectWithValue }) => {

        try {
            const response = await axiosInstance.get(endPoints.ADMIN.ORDERS.GET_BYID_ORDER(userId))
            console.log(response.data, 'getByIdOrder')
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //featch All User
            .addCase(featchAllUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(featchAllUser.fulfilled, (state, action) => {

                state.loading = false
                state.users = action.payload.allUsers
                state.totalUsers = action.payload.totalUser
                state.error = null
            })
            .addCase(featchAllUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getAllOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload
                state.error = null
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getTotalRevenue.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTotalRevenue.fulfilled, (state, action) => {
                state.loading = false
                const data = action.payload;
                state.totalRevenue = data[0]?.totalRevenue || 0;
                state.error = null
            })
            .addCase(getTotalRevenue.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //BLOCK And UNBLOCK
            .addCase(blockAndUnblock.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(blockAndUnblock.fulfilled, (state, action) => {
                state.loading = false
                const updatedUser = action.payload
                state.users = state.users.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                );
                state.error = null
            })
            .addCase(blockAndUnblock.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //featch get by user Order
            .addCase(getByIdOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getByIdOrder.fulfilled, (state, action) => {
                state.loading = false
                const userOrder = action.payload.userOrder;
                state.order = Array.isArray(userOrder) ? userOrder : [userOrder];
            })
            .addCase(getByIdOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
})

export default adminSlice.reducer
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { endPoints } from "../api/endpoints";
import { handleError } from "../utils/handleError";
const initialState = {
    products: [],
    product: null,
    totalProducts: 0,
    totalManProduct: 0,
    totalWomenProduct: 0,
    totalKidsProduct: 0,
    currentPage: 1,
    totalPages: 0,
    loading: true,
    error: null,
    category: null,
    page: 0,
    hasMore: true

}

//fetchProducts
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 1, limit = 10, name, category }, { rejectWithValue }) => {
        try {
            const params = { page, limit, name, category }
            const response = await axiosInstance.get(endPoints.PRODUCT.GET_PRODUCTS, { params })

            return response.data
        } catch (error) {

            return rejectWithValue(handleError(error))
        }
    }
)

//IndividualProduct
export const fetchIndividualProduct = createAsyncThunk(
    'products/fetchIndividualProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endPoints.PRODUCT.GET_INDIVIDUAL_PRODUCT(id))
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)




// Add New Product 
export const addNewProduct = createAsyncThunk(
    "admin/addNewProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endPoints.ADMIN.PRODUCT.ADD_NEW_PRODUCT,formData);
            return response.data.product;
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, formData } , { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(endPoints.ADMIN.PRODUCT.EDIT_PRODUCT(id), formData)
            return response.data.product
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)

export const deletedProduct = createAsyncThunk(
    'products/deletedProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(endPoints.ADMIN.PRODUCT.DELECT_PRODUCT(id))
            return response.data
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }
)



export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { products, total, currentPage, totalPages, page, totalManProduct, totalWomenProduct, totalKidsProduct } = action.payload;
                state.products = products
                state.totalProducts = total
                state.totalManProduct = totalManProduct
                state.totalWomenProduct = totalWomenProduct
                state.totalKidsProduct = totalKidsProduct
                state.currentPage = currentPage
                state.totalPages = totalPages
                state.loading = false,
                    state.hasMore = currentPage < page

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            //Add New Product
            .addCase(addNewProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products.push(action.payload)
                state.error = null
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //EDIT PRODUCT
            .addCase(editProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false
                const updateProduct = action.payload
                const index = state.products.findIndex((product) => product.id === updateProduct.id)
                if (index !== -1) {
                    state.products[index] = updateProduct
                }
                state.error = null
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //delete product
            .addCase(deletedProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletedProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = state.products.filter((product) => product.id !== action.payload.id)
                state.error = null
            })
            .addCase(deletedProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //IndividualProduct
            .addCase(fetchIndividualProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchIndividualProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload;
                state.error = null
            })
            .addCase(fetchIndividualProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
})


export const { setCategory } = productSlice.actions

export default productSlice.reducer
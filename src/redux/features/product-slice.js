import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	createProductRequest,
	getProductsRequest,
} from './service/product-service'
import { toast } from 'react-toastify'

const initialState = {
	isLoadingProducts: false,
	isCRUDingProduct: false,
	products: null,
	justAddedProducts: [],
}

export const createProduct = createAsyncThunk(
	'product/createProduct',
	async (payload, thunkAPI) => {
		const response = await createProductRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const getProducts = createAsyncThunk(
	'product/getProducts',
	async (payload, thunkAPI) => {
		const response = await getProductsRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: {
		// createProduct
		[createProduct.pending]: (state, action) => {
			state.isCRUDingProduct = true
		},
		[createProduct.fulfilled]: (state, action) => {
			if (!Array.isArray(state.justAddedProducts)) state.justAddedProducts = []
			state.justAddedProducts.push(action.payload.product)
			if (state.justAddedProducts.length > 5) state.justAddedProducts.shift()
			state.isCRUDingProduct = false
			toast.success(action.payload.message)
		},
		[createProduct.rejected]: (state, action) => {
			state.isCRUDingProducts = false
			toast.error(action.payload.error)
		},
		// getProducts
		[getProducts.pending]: (state, action) => {
			state.isLoadingProducts = true
		},
		[getProducts.fulfilled]: (state, action) => {
			state.isLoadingProducts = false
			state.products = action.payload.products
		},
		[getProducts.rejected]: (state, action) => {
			state.isLoadingProducts = false
			toast.error(action.payload.error)
		},
	},
})

const { reducer } = productSlice

export default reducer

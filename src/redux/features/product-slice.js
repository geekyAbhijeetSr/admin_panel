import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	createProductRequest,
	getProductsRequest,
} from './service/product-service'

const initialState = {
	isLoadingProduct: false,
	errorProduct: null,
	messageProduct: null,
	products: null,
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
	reducers: {
		resetProduct: state => {
			state.isLoadingProduct = false
			state.errorProduct = null
			state.messageProduct = null
		},
	},
	extraReducers: {
		// createProduct
		[createProduct.pending]: (state, action) => {
			state.isLoadingProduct = true
		},
		[createProduct.fulfilled]: (state, action) => {
			state.products.push(action.payload.product)
			state.isLoadingProduct = false
			state.messageProduct = action.payload.message
		},
		[createProduct.rejected]: (state, action) => {
			state.isLoadingProduct = false
			state.errorProduct = action.payload.error
		},
		// getProducts
		[getProducts.pending]: (state, action) => {
			state.isLoadingProduct = true
		},
		[getProducts.fulfilled]: (state, action) => {
			state.isLoadingProduct = false
			state.products = action.payload.products
		},
		[getProducts.rejected]: (state, action) => {
			state.isLoadingProduct = false
			state.errorProduct = action.payload.error
		},
	},
})

const { reducer, actions } = productSlice
export const { resetProduct } = actions

export default reducer

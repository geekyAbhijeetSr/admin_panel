import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getProductsRequest,
	addProductRequest,
	deleteProductRequest,
	updateProductRequest
} from './service/product-service'
import { toast } from 'react-toastify'
import toastinfo from './shared/toastinfo'

const initialState = {
	isInitialFetchProducts: true,
	fetchingProducts: false,
	addingProduct: false,
	removingProduct: false,
	productSuccessMsg: null,
	productErrorMsg: null,

	products: null,
	totalDocs: null,
	limit: null,
	nextPage: null,

	justAddedProducts: null,
}

export const addProduct = createAsyncThunk(
	'product/addProduct',
	async (payload, thunkAPI) => {
		const response = await addProductRequest(payload)
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

export const removeProduct = createAsyncThunk(
	'product/removeProduct',
	async (payload, thunkAPI) => {
		const response = await deleteProductRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const updateProduct = createAsyncThunk(
	'product/updateProduct',
	async (payload, thunkAPI) => {
		const response = await updateProductRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

const toastDelay = 500

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		resetErrorOrSuccessProduct: state => {
			state.productSuccessMsg = null
			state.productErrorMsg = null
		},
	},
	extraReducers: {
		// getProducts
		[getProducts.pending]: (state, action) => {
			state.fetchingProducts = true
		},
		[getProducts.fulfilled]: (state, action) => {
			state.fetchingProducts = false

			if (
				Array.isArray(state.products) &&
				state.products[0]?._id !== action.payload.products[0]?._id
			) {
				action.payload.products = [
					...state.products,
					...action.payload.products,
				]
			}

			state.products = action.payload.products
			state.nextPage = action.payload.nextPage
			state.limit = action.payload.limit
			state.totalDocs = action.payload.totalDocs

			state.isInitialFetchProducts = false
		},
		[getProducts.rejected]: (state, action) => {
			state.fetchingProducts = false
			toast.dismiss()
			toast.error(action.payload.error)
		},
		// addProduct
		[addProduct.pending]: (state, action) => {
			state.addingProduct = true
		},
		[addProduct.fulfilled]: (state, action) => {
			state.addingProduct = false
			state.productSuccessMsg = action.payload.message
			if (!Array.isArray(state.justAddedProducts)) state.justAddedProducts = []
			state.justAddedProducts.unshift(action.payload.product)
			if (state.justAddedProducts.length > 5) state.justAddedProducts.pop()
		},
		[addProduct.rejected]: (state, action) => {
			state.addingProduct = false
			state.productErrorMsg = action.payload.error
		},
		// removeProduct
		[removeProduct.pending]: (state, action) => {
			state.removingProduct = true
			toast.dismiss()
			toastinfo('Removing product...')
		},
		[removeProduct.fulfilled]: (state, action) => {
			state.removingProduct = false

			const productId = action.payload.productId

			const index = state.products.findIndex(
				product => product._id === productId
			)

			if (index !== -1) {
				state.products.splice(index, 1)
			}
				

			if (state.justAddedProducts?.length) {
				const indexJustAdded = state.justAddedProducts.findIndex(
					product => product._id === productId
				)
				if (indexJustAdded !== -1) {
					state.justAddedProducts.splice(indexJustAdded, 1)
				}
			}

			state.totalDocs--
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[removeProduct.rejected]: (state, action) => {
			state.removingProduct = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},
		// updateProduct
		[updateProduct.pending]: (state, action) => {
			state.updatingProduct = true
		},
		[updateProduct.fulfilled]: (state, action) => {
			const index = state.products.findIndex(
				product => product._id === action.payload.product._id
			)
			if (index !== -1) state.products[index] = action.payload.product

			const index2 = state.justAddedProducts?.length > 0 ? state.justAddedProducts.findIndex(
				product => product._id === action.payload.product._id
			) : -1
			if (index2 !== -1) state.justAddedProducts[index2] = action.payload.product

			state.productSuccessMsg = action.payload.message
			state.updatingProduct = false
		},
		[updateProduct.rejected]: (state, action) => {
			state.updatingProduct = false
			state.productErrorMsg = action.payload.error
		}
	},
})

const { reducer, actions } = productSlice

export const { resetErrorOrSuccessProduct } = actions

export default reducer

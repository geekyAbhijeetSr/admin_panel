import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getAllCategoryRequest,
	addCategoryRequest,
	deleteCategoryRequest,
	updateCategoryRequest,
	toggleActiveStatusCategoryRequest,
} from './service/category-service'

const initialState = {
	isLoadingCat: false,
	errorCat: null,
	messageCat: null,
	categories: null,
	parentCategories: null,
}

export const getCategory = createAsyncThunk(
	'category/getCategory',
	async (payload, thunkAPI) => {
		const response = await getAllCategoryRequest()
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const deleteCategory = createAsyncThunk(
	'category/deleteCategory',
	async (payload, thunkAPI) => {
		const response = await deleteCategoryRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const addCategory = createAsyncThunk(
	'category/addCategory',
	async (payload, thunkAPI) => {
		const response = await addCategoryRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const updateCategory = createAsyncThunk(
	'category/updateCategory',
	async (payload, thunkAPI) => {
		const { category, catId } = payload
		const response = await updateCategoryRequest(category, catId)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const toggleActiveStatusCategory = createAsyncThunk(
	'category/toggleActiveStatusCategory',
	async (payload, thunkAPI) => {
		const { categoryId } = payload
		const response = await toggleActiveStatusCategoryRequest(categoryId)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		resetCat: state => {
			state.isLoadingCat = false
			state.errorCat = null
			state.messageCat = null
		},
	},
	extraReducers: {
		// getCategory request
		[getCategory.pending]: state => {
			state.isLoadingCat = true
		},
		[getCategory.fulfilled]: (state, action) => {
			state.categories = action.payload.categories
			const parentCategories = action.payload.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories
			state.isLoadingCat = false
		},
		[getCategory.rejected]: (state, action) => {
			state.isLoadingCat = false
			state.errorCat = action.payload.error
		},
		// addCategory request
		[addCategory.pending]: state => {
			state.isLoadingCat = true
		},
		[addCategory.fulfilled]: (state, action) => {
			state.categories.push(action.payload.category)
			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories
			state.isLoadingCat = false
			state.messageCat = action.payload.message
		},
		[addCategory.rejected]: (state, action) => {
			state.isLoadingCat = false
			state.errorCat = action.payload.error
		},
		// deleteCategory request
		[deleteCategory.pending]: state => {
			state.isLoadingCat = true
		},
		[deleteCategory.fulfilled]: (state, action) => {
			state.categories = state.categories.filter(
				category => category._id !== action.payload.categoryId
			)
			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories
			state.isLoadingCat = false
			state.messageCat = action.payload.message
		},
		[deleteCategory.rejected]: (state, action) => {
			state.isLoadingCat = false
			state.errorCat = action.payload.error
		},
		// updateCategory request
		[updateCategory.pending]: state => {
			state.isLoadingCat = true
		},
		[updateCategory.fulfilled]: (state, action) => {
			const index = state.categories.findIndex(
				category => category._id === action.payload.category._id
			)
			state.categories[index] = action.payload.category

			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories
			state.isLoadingCat = false
			state.messageCat = action.payload.message
		},
		[updateCategory.rejected]: (state, action) => {
			state.isLoadingCat = false
			state.errorCat = action.payload.error
		},
		// toggleActiveStatusCategory request
		[toggleActiveStatusCategory.pending]: (state, action) => {
			const { categoryId } = action.meta.arg
			const index = state.categories.findIndex(
				category => category._id === categoryId
			)
			state.categories[index].active = !state.categories[index].active

			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)

			state.parentCategories = parentCategories
		}, 
		[toggleActiveStatusCategory.fulfilled]: (state, action) => { 
			const { category } = action.payload

			const index = state.categories.findIndex(
				cat => cat._id === category._id
			)
			state.categories[index] = category

			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)

			state.parentCategories = parentCategories
		},
		[toggleActiveStatusCategory.rejected]: (state, action) => {
			state.errorCat = action.payload.error
		},
	},
})

const { reducer, actions } = categorySlice

export const { resetCat } = actions

export default reducer

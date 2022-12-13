import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getAllCategoryRequest,
	addCategoryRequest,
	updateCategoryRequest,
	removeCategoryRequest,
	toggleActiveStatusCategoryRequest,
} from './service/category-service'
import { toast } from 'react-toastify'
import toastinfo from './shared/toastinfo'

const initialState = {
	isInitialFetchCategories: true,
	fetchingCategories: false,
	addingCategory: false,
	updatingCategory: false,
	removingCategory: false,
	categorySuccessMsg: null,
	categoryErrorMsg: null,

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

export const removeCategory = createAsyncThunk(
	'category/removeCategory',
	async (payload, thunkAPI) => {
		const response = await removeCategoryRequest(payload)
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

const toastDelay = 500

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: {
		// getCategory request
		[getCategory.pending]: state => {
			state.fetchingCategories = true
		},
		[getCategory.fulfilled]: (state, action) => {
			state.categories = action.payload.categories
			const parentCategories = action.payload.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories

			state.fetchingCategories = false
			state.isInitialFetchCategories = false
		},
		[getCategory.rejected]: (state, action) => {
			state.fetchingCategories = false
			toast.dismiss()
			toast.error(action.payload.error)
		},
		// addCategory request
		[addCategory.pending]: state => {
			state.addingCategory = true
			toast.dismiss()
			toastinfo('Adding category...')
		},
		[addCategory.fulfilled]: (state, action) => {
			state.categories.push(action.payload.category)
			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories
			state.addingCategory = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[addCategory.rejected]: (state, action) => {
			state.addingCategory = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},
		// updateCategory request
		[updateCategory.pending]: state => {
			state.updatingCategory = true
			toast.dismiss()
			toastinfo('Updating category...')
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
			state.updatingCategory = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[updateCategory.rejected]: (state, action) => {
			state.updatingCategory = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},
		// removeCategory request
		[removeCategory.pending]: (state, action) => {
			state.removingCategory = true
			toast.dismiss()
			toastinfo('Removing category...')
		},
		[removeCategory.fulfilled]: (state, action) => {
			state.removingCategory = false
			
			const categoryId = action.payload.categoryId

			state.categories = state.categories.filter(
				category => category._id !== categoryId
			)
			const parentCategories = state.categories.filter(
				category => !('parentId' in category)
			)
			state.parentCategories = parentCategories

			state.removingCategory = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[removeCategory.rejected]: (state, action) => {
			state.removingCategory = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
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
		[toggleActiveStatusCategory.fulfilled]: (state, action) => {},
		[toggleActiveStatusCategory.rejected]: (state, action) => {},
	},
})

const { reducer } = categorySlice

export default reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getAllCollectionsRequest,
	addCollectionRequest,
	updateCollectionRequest,
	removeCollectionRequest,
	addAttrubuteRequest,
	updateAttributeRequest,
	removeAttributeRequest,
	toggleActiveStatusCollectionRequest,
	toggleActiveStatusAttributeRequest,
} from './service/attribute-service'
import { toast } from 'react-toastify'
import toastinfo from './shared/toastinfo'

const initialState = {
	isInitialFetchAttributesColl: true,
	fetchingAttributesColl: false,
	addingAttributesColl: false,
	updatingAttributesColl: false,
	removingAttributesColl: false,
	addingAttribute: false,
	updatingAttribute: false,
	removingAttribute: false,
	attributeSuccessMsg: null,
	attributeErrorMsg: null,

	collections: [],
}

export const getCollections = createAsyncThunk(
	'attribute/getCollections',
	async (payload, thunkAPI) => {
		const response = await getAllCollectionsRequest()
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const addCollection = createAsyncThunk(
	'attribute/addCollection',
	async (payload, thunkAPI) => {
		const response = await addCollectionRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const updateCollection = createAsyncThunk(
	'attribute/updateCollection',
	async (payload, thunkAPI) => {
		const response = await updateCollectionRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const removeCollection = createAsyncThunk(
	'attribute/removeCollection',
	async (payload, thunkAPI) => {
		const response = await removeCollectionRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const addAttribute = createAsyncThunk(
	'attribute/addAttribute',
	async (payload, thunkAPI) => {
		const response = await addAttrubuteRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const updateAttribute = createAsyncThunk(
	'attribute/updateAttribute',
	async (payload, thunkAPI) => {
		const response = await updateAttributeRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const removeAttribute = createAsyncThunk(
	'attribute/removeAttribute',
	async (payload, thunkAPI) => {
		const response = await removeAttributeRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const toggleActiveStatusCollection = createAsyncThunk(
	'attribute/toggleActiveStatusCollection',
	async (payload, thunkAPI) => {
		const response = await toggleActiveStatusCollectionRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const toggleActiveStatusAttribute = createAsyncThunk(
	'attribute/toggleActiveStatusAttribute',
	async (payload, thunkAPI) => {
		const response = await toggleActiveStatusAttributeRequest(payload)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

const toastDelay = 500

const attributeSlice = createSlice({
	name: 'attribute',
	initialState,
	reducers: {},
	extraReducers: {
		// getCollections
		[getCollections.pending]: (state, action) => {
			state.fetchingAttributesColl = true
		},
		[getCollections.fulfilled]: (state, action) => {
			state.collections = action.payload.attributeCollection
			state.fetchingAttributesColl = false
			state.isInitialFetchAttributesColl = false
		},
		[getCollections.rejected]: (state, action) => {
			state.fetchingAttributesColl = false
			toast.dismiss()
			toast.error(action.payload.error)
		},

		// addCollection
		[addCollection.pending]: (state, action) => {
			state.addingAttributesColl = true
			toast.dismiss()
			toastinfo('Adding attribute collection...')
		},
		[addCollection.fulfilled]: (state, action) => {
			if (!Array.isArray(state.collections)) state.collections = []
			state.collections.push(action.payload.attributeCollection)
			state.addingAttributesColl = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[addCollection.rejected]: (state, action) => {
			state.addingAttributesColl = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},

		// updateCollection
		[updateCollection.pending]: (state, action) => {
			state.updatingAttributesColl = true
			toast.dismiss()
			toastinfo('Updating attribute collection...')
		},
		[updateCollection.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.updatingAttributesColl = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[updateCollection.rejected]: (state, action) => {
			state.updatingAttributesColl = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},

		// removeCollection
		[removeCollection.pending]: (state, action) => {
			state.removingAttributesColl = true
			toast.dismiss()
			toastinfo('Removing attribute collection...')
		},
		[removeCollection.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.collectionId
			)
			state.collections.splice(index, 1)
			state.removingAttributesColl = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[removeCollection.rejected]: (state, action) => {
			state.removingAttributesColl = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},

		// addAttribute
		[addAttribute.pending]: (state, action) => {
			state.addingAttribute = true
			toast.dismiss()
			toastinfo('Adding attribute...')
		},
		[addAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.addingAttribute = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[addAttribute.rejected]: (state, action) => {
			state.addingAttribute = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},

		// updateAttribute
		[updateAttribute.pending]: (state, action) => {
			state.updatingAttribute = true
			toast.dismiss()
			toastinfo('Updating attribute...')
		},
		[updateAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.updatingAttribute = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[updateAttribute.rejected]: (state, action) => {
			state.updatingAttribute = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},

		// removeAttribute
		[removeAttribute.pending]: (state, action) => {
			state.removingAttribute = true
			toast.dismiss()
			toastinfo('Removing attribute...')
		},
		[removeAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.removingAttribute = false
			toast.dismiss()
			toast.success(action.payload.message, {
				delay: toastDelay,
			})
		},
		[removeAttribute.rejected]: (state, action) => {
			state.removingAttribute = false
			toast.dismiss()
			toast.error(action.payload.error, {
				delay: toastDelay,
			})
		},

		// toggleActiveStatusCollection
		[toggleActiveStatusCollection.pending]: (state, action) => {
			const { _id } = action.meta.arg
			const index = state.collections.findIndex(
				collection => collection._id === _id
			)
			state.collections[index].active = !state.collections[index].active
		},
		[toggleActiveStatusCollection.fulfilled]: (state, action) => {
			const { attributeCollection } = action.payload
			const index = state.collections.findIndex(
				collection => collection._id === attributeCollection._id
			)
			state.collections[index] = attributeCollection
		},
		[toggleActiveStatusCollection.rejected]: (state, action) => {
			toast.dismiss()
			toast.error(action.payload.error)
		},

		// toggleActiveStatusAttribute
		[toggleActiveStatusAttribute.pending]: (state, action) => {
			const { id, attributeId } = action.meta.arg

			const collIndex = state.collections.findIndex(
				collection => collection._id === id
			)
			state.collections[collIndex].attributes.forEach(attribute => {
				if (attribute._id === attributeId) {
					attribute.active = !attribute.active
				}
			})
		},
		[toggleActiveStatusAttribute.fulfilled]: (state, action) => {
			const { attributeCollection } = action.payload
			const index = state.collections.findIndex(
				collection => collection._id === attributeCollection._id
			)
			state.collections[index] = attributeCollection
		},
		[toggleActiveStatusAttribute.rejected]: (state, action) => {
			toast.dismiss()
			toast.error(action.payload.error)
		},
	},
})

const { reducer } = attributeSlice

export default reducer

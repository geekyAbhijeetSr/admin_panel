import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getAllCollectionsRequest,
	addCollectionRequest,
	updateCollectionRequest,
	deleteCollectionRequest,
	addAttrubuteRequest,
	updateAttributeRequest,
	deleteAttributeRequest,
	toggleActiveStatusCollectionRequest,
	toggleActiveStatusAttributeRequest,
} from './service/attribute-service'
import { toast } from 'react-toastify'

const initialState = {
	isLoadingAttr: false,
	isCRUDingAttr: false,
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

export const deleteCollection = createAsyncThunk(
	'attribute/deleteCollection',
	async (payload, thunkAPI) => {
		const response = await deleteCollectionRequest(payload)
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

export const deleteAttribute = createAsyncThunk(
	'attribute/deleteAttribute',
	async (payload, thunkAPI) => {
		const response = await deleteAttributeRequest(payload)
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

const attributeSlice = createSlice({
	name: 'attribute',
	initialState,
	reducers: {},
	extraReducers: {
		// getCollections
		[getCollections.pending]: (state, action) => {
			state.isLoadingAttr = true
		},
		[getCollections.fulfilled]: (state, action) => {
			state.collections = action.payload.attributeCollection
			state.isLoadingAttr = false
		},
		[getCollections.rejected]: (state, action) => {
			state.isLoadingAttr = false
			toast.error(action.payload.error)
		},

		// addCollection
		[addCollection.pending]: (state, action) => {
			state.isCRUDingAttr = true
		},
		[addCollection.fulfilled]: (state, action) => {
			if (!Array.isArray(state.collections)) state.collections = []
			state.collections.push(action.payload.attributeCollection)
			state.isCRUDingAttr = false
			toast.success(action.payload.message)
		},
		[addCollection.rejected]: (state, action) => {
			state.isCRUDingAttr = false
			toast.error(action.payload.error)
		},

		// updateCollection
		[updateCollection.pending]: (state, action) => {
			state.isCRUDingAttr = true
		},
		[updateCollection.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.isCRUDingAttr = false
			toast.success(action.payload.message)
		},
		[updateCollection.rejected]: (state, action) => {
			state.isCRUDingAttr = false
			toast.error(action.payload.error)
		},

		// deleteCollection
		[deleteCollection.pending]: (state, action) => {
			state.isCRUDingAttr = true
		},
		[deleteCollection.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.id
			)
			state.collections.splice(index, 1)
			state.isCRUDingAttr = false
			toast.success(action.payload.message)
		},
		[deleteCollection.rejected]: (state, action) => {
			state.isCRUDingAttr = false
			toast.error(action.payload.error)
		},

		// addAttribute
		[addAttribute.pending]: (state, action) => {
			state.isCRUDingAttr = true
		},
		[addAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.isCRUDingAttr = false
			toast.success(action.payload.message)
		},
		[addAttribute.rejected]: (state, action) => {
			state.isCRUDingAttr = false
			toast.error(action.payload.error)
		},

		// updateAttribute
		[updateAttribute.pending]: (state, action) => {
			state.isCRUDingAttr = true
		},
		[updateAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.isCRUDingAttr = false
			toast.success(action.payload.message)
		},
		[updateAttribute.rejected]: (state, action) => {
			state.isCRUDingAttr = false
			toast.error(action.payload.error)
		},

		// deleteAttribute
		[deleteAttribute.pending]: (state, action) => {
			state.isCRUDingAttr = true
		},
		[deleteAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.id
			)
			state.collections[index] = action.payload.attributeCollection
			state.isCRUDingAttr = false
			toast.success(action.payload.message)
		},
		[deleteAttribute.rejected]: (state, action) => {
			state.isCRUDingAttr = false
			toast.error(action.payload.error)
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
			toast.error(action.payload.error)
		},
	},
})

const { reducer } = attributeSlice

export default reducer

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

const initialState = {
	isLoadingAttr: false,
	error: null,
	message: null,
	collections: null,
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
	reducers: {
		resetAttribute: state => {
			state.isLoadingAttr = false
			state.error = null
			state.message = null
		},
	},
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
			state.error = action.payload.error
			state.isLoadingAttr = false
		},
		// addCollection
		[addCollection.pending]: (state, action) => {
			state.isLoadingAttr = true
		},
		[addCollection.fulfilled]: (state, action) => {
			state.collections.push(action.payload.attributeCollection)
			state.message = action.payload.message
			state.isLoadingAttr = false
		},
		[addCollection.rejected]: (state, action) => {
			state.error = action.payload.error
			state.isLoadingAttr = false
		},
		// updateCollection
		[updateCollection.pending]: (state, action) => {
			state.isLoadingAttr = true
		},
		[updateCollection.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.message = action.payload.message
			state.isLoadingAttr = false
        },
        [updateCollection.rejected]: (state, action) => {
            state.error = action.payload.error
            state.isLoadingAttr = false
        },
        // deleteCollection
        [deleteCollection.pending]: (state, action) => {
            state.isLoadingAttr = true
        },
        [deleteCollection.fulfilled]: (state, action) => {
            const index = state.collections.findIndex(
                collection => collection._id === action.payload.id
            )
            state.collections.splice(index, 1)
            state.message = action.payload.message
            state.isLoadingAttr = false
        },
        [deleteCollection.rejected]: (state, action) => {
            state.error = action.payload.error
            state.isLoadingAttr = false
		},
		// addAttribute
		[addAttribute.pending]: (state, action) => {
			state.isLoadingAttr = true
		},
		[addAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.message = action.payload.message
			state.isLoadingAttr = false
		},
		[addAttribute.rejected]: (state, action) => {
			state.error = action.payload.error
			state.isLoadingAttr = false
		},
		// updateAttribute
		[updateAttribute.pending]: (state, action) => {
			state.isLoadingAttr = true
		},
		[updateAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.attributeCollection._id
			)
			state.collections[index] = action.payload.attributeCollection
			state.message = action.payload.message
			state.isLoadingAttr = false
		},
		[updateAttribute.rejected]: (state, action) => {
			state.error = action.payload.error
			state.isLoadingAttr = false
		},
		// deleteAttribute
		[deleteAttribute.pending]: (state, action) => {
			state.isLoadingAttr = true
		},
		[deleteAttribute.fulfilled]: (state, action) => {
			const index = state.collections.findIndex(
				collection => collection._id === action.payload.id
			)
			state.collections[index] = action.payload.attributeCollection
			state.message = action.payload.message
			state.isLoadingAttr = false
		},
		[deleteAttribute.rejected]: (state, action) => {
			state.error = action.payload.error
			state.isLoadingAttr = false
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
			state.error = action.payload.error
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
			state.error = action.payload.error
		}
	},
})

const { actions, reducer } = attributeSlice

export const { resetAttribute } = actions

export default reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginRequest, signupRequest, logoutRequest } from './service/auth-service'

const initialState = {
	isLoadingAuth: false,
	errorAuth: null,
	messageAuth: null,
	user: null,
	exp: null,
}

const user = JSON.parse(localStorage.getItem('user'))
const exp = JSON.parse(localStorage.getItem('exp'))
const now = new Date().getTime()

if (user && now < exp) {
	initialState.user = user
	initialState.exp = exp
} else {
	localStorage.clear()
}

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		const body = JSON.stringify(payload)
		const response = await loginRequest(body)
		const data =
			response.type === 'fetch error' ? response : await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const signup = createAsyncThunk(
	'auth/signup',
	async (payload, thunkAPI) => {
		const body = JSON.stringify(payload)
		const response = await signupRequest(body)
		const data = await response.json()
		if (response.ok) {
			return data
		}
		return thunkAPI.rejectWithValue(data)
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await logoutRequest()
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetAuth: state => {
			state.isLoadingAuth = false
			state.errorAuth = null
			state.messageAuth = null
		},
	},
	extraReducers: {
		// login request
		[login.pending]: state => {
			state.isLoadingAuth = true
		},
		[login.fulfilled]: (state, action) => {
			state.isLoadingAuth = false
			state.user = action.payload.user
			state.messageAuth = action.payload.message
			state.exp = action.payload.exp
			localStorage.setItem('exp', JSON.stringify(action.payload.exp))
			localStorage.setItem('user', JSON.stringify(action.payload.user))
		},
		[login.rejected]: (state, action) => {
			state.isLoadingAuth = false
			state.errorAuth =
				action.payload.error ||
				action.payload.errors[0].msg ||
				'Oops! Something went wrong.'
		},
		// signup request
		[signup.pending]: (state, action) => {
			state.isLoadingAuth = true
		},
		[signup.fulfilled]: (state, action) => {
			state.isLoadingAuth = false
			state.user = action.payload.user
			state.messageAuth = action.payload.message
			state.exp = action.payload.exp
			localStorage.setItem('exp', JSON.stringify(action.payload.exp))
			localStorage.setItem('user', JSON.stringify(action.payload.user))
		},
		[signup.rejected]: (state, action) => {
			state.isLoadingAuth = false
			state.errorAuth =
				action.payload.error ||
				action.payload.errors[0].msg ||
				'Something went wrong'
		},
		// logout request
		[logout.pending]: state => {
			state.isLoadingAuth = false
			state.errorAuth = null
			state.user = null
			state.messageAuth = null
			state.exp = null
			localStorage.clear()
		},
	},
})

const { reducer, actions } = authSlice
export const { resetAuth } = actions
export default reducer

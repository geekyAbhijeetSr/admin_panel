import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	loginRequest,
	signupRequest,
	logoutRequest,
} from './service/auth-service'
import { toast } from 'react-toastify'

const initialState = {
	isLoadingAuth: false,
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
	reducers: {},
	extraReducers: {
		// login request
		[login.pending]: state => {
			state.isLoadingAuth = true
		},
		[login.fulfilled]: (state, action) => {
			state.isLoadingAuth = false

			state.user = action.payload.user
			state.exp = action.payload.exp
			localStorage.setItem('exp', JSON.stringify(action.payload.exp))
			localStorage.setItem('user', JSON.stringify(action.payload.user))

			toast.success(action.payload.message)
		},
		[login.rejected]: (state, action) => {
			state.isLoadingAuth = false

			toast.error(
				action.payload.error ||
					action.payload.errors[0].msg ||
					'Oops! Something went wrong.'
			)
		},
		// signup request
		[signup.pending]: (state, action) => {
			state.isLoadingAuth = true
		},
		[signup.fulfilled]: (state, action) => {
			state.isLoadingAuth = false

			state.user = action.payload.user
			state.exp = action.payload.exp
			localStorage.setItem('exp', JSON.stringify(action.payload.exp))
			localStorage.setItem('user', JSON.stringify(action.payload.user))

			toast.success(action.payload.message)
		},
		[signup.rejected]: (state, action) => {
			state.isLoadingAuth = false

			toast.error(
				action.payload.error ||
				action.payload.errors[0].msg ||
				'Something went wrong'
			)
		},
		// logout request
		[logout.pending]: state => {
			state.isLoadingAuth = false
			state.user = null
			state.exp = null

			localStorage.clear()
		},
	},
})

const { reducer } = authSlice
export default reducer

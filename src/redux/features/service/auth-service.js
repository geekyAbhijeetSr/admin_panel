const API_URL = process.env.REACT_APP_API_URL

export const loginRequest = async body => {
	const response = await fetch(`${API_URL}/api/auth/dashboard/login/`, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	})
	return response
}

export const signupRequest = async body => {
	const response = await fetch(`${API_URL}/api/auth/dashboard/signup`, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	})
	return response
}

export const logoutRequest = async () => {
	await fetch(`${API_URL}/api/auth/logout`, {
		credentials: 'include',
		method: 'POST',
	})
}

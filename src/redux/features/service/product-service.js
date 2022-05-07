const API_URL = process.env.REACT_APP_API_URL

export const createProductRequest = async product => {
	const response = await fetch(`${API_URL}/api/product/create`, {
		credentials: 'include',
		method: 'POST',
		body: product,
	})
	return response
}

export const getProductsRequest = async payload => {
	const { page, limit } = payload
	const response = await fetch(
		`${API_URL}/api/product/get?page=${page}&limit=${limit}`,
		{
			method: 'GET',
		}
	)
	return response
}

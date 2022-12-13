const API_URL = process.env.REACT_APP_API_URL

export const getProductsRequest = async payload => {
	const { page, limit } = payload
	const response = await fetch(
		`${API_URL}/api/product/dashboard-get?page=${page}&limit=${limit}`,
		{
			credentials: 'include',
			method: 'GET',
		}
	)
	return response
}

export const addProductRequest = async product => {
	const response = await fetch(`${API_URL}/api/product/create`, {
		credentials: 'include',
		method: 'POST',
		body: product,
	})
	return response
}

export const updateProductRequest = async payload => {
	const { product, productId } = payload
	const response = await fetch(`${API_URL}/api/product/update/${productId}`, {
		credentials: 'include',
		method: 'PUT',
		body: product,
	})
	return response
}

export const deleteProductRequest = async productId => {
	const response = await fetch(`${API_URL}/api/product/remove/${productId}`, {
		credentials: 'include',
		method: 'DELETE',
	})
	return response
}

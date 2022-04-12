const API_URL = process.env.REACT_APP_API_URL

export const getAllCategoryRequest = async () => {
	const response = await fetch(`${API_URL}/api/category/all`)
	return response
}

export const addCategoryRequest = async (category) => {
	const response = await fetch(`${API_URL}/api/category/create`, {
		credentials: 'include',
		method: 'POST',
		body: category,
	})
	return response
}

export const updateCategoryRequest = async (category, catId) => {
	const response = await fetch(`${API_URL}/api/category/${catId}`, {
		credentials: 'include',
		method: 'PUT',
		body: category,
	})
	return response
}

export const deleteCategoryRequest = async (categoryId) => {
	const response = await fetch(`${API_URL}/api/category/${categoryId}`, {
		credentials: 'include',
		method: 'DELETE',
	})
	return response
}

export const toggleActiveStatusCategoryRequest = async (categoryId) => {
	const response = await fetch(
		`${API_URL}/api/category/toggle/${categoryId}`,
		{
			credentials: 'include',
			method: 'PUT',
		}
	)
	return response
}
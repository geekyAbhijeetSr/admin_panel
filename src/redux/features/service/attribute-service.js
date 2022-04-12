const API_URL = process.env.REACT_APP_API_URL

export const getAllCollectionsRequest = async () => {
	const response = await fetch(`${API_URL}/api/attribute/all-collections`, {
		credentials: 'include',
		method: 'GET',
	})
	return response
}

export const addCollectionRequest = async payload => {
	const response = await fetch(`${API_URL}/api/attribute/create-collection`, {
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response
}

export const updateCollectionRequest = async payload => {
	const response = await fetch(`${API_URL}/api/attribute/update-collection`, {
		credentials: 'include',
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response
}

export const deleteCollectionRequest = async payload => {
	const response = await fetch(`${API_URL}/api/attribute/${payload}`, {
		credentials: 'include',
		method: 'DELETE',
	})
	return response
}

export const addAttrubuteRequest = async payload => {
	const response = await fetch(`${API_URL}/api/attribute/add-attribute`, {
		credentials: 'include',
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response
}

export const updateAttributeRequest = async payload => {
	const response = await fetch(`${API_URL}/api/attribute/update-attribute`, {
		credentials: 'include',
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response
}

export const deleteAttributeRequest = async payload => {
	const response = await fetch(`${API_URL}/api/attribute/delete-attribute`, {
		credentials: 'include',
		method: 'DELETE',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return response
}

export const toggleActiveStatusCollectionRequest = async payload => {
	const { _id } = payload
	const response = await fetch(
		`${API_URL}/api/attribute/toggle-collection/${_id}`,
		{
			credentials: 'include',
			method: 'PUT',
		}
	)
	return response
}

export const toggleActiveStatusAttributeRequest = async payload => {
	const { id, attributeId } = payload
	const response = await fetch(
		`${API_URL}/api/attribute/toggle-attribute/${id}/${attributeId}`,
		{
			credentials: 'include',
			method: 'PUT',
		}
	)
	return response
}

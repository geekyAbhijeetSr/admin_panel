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
	const { collectionId, data } = payload
	const response = await fetch(
		`${API_URL}/api/attribute/update-collection/${collectionId}`,
		{
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
	return response
}

export const removeCollectionRequest = async payload => {
	const response = await fetch(
		`${API_URL}/api/attribute/delete-collection/${payload}`,
		{
			credentials: 'include',
			method: 'DELETE',
		}
	)
	return response
}

export const addAttrubuteRequest = async payload => {
	const { collectionId, data } = payload
	const response = await fetch(
		`${API_URL}/api/attribute/add-attribute/${collectionId}`,
		{
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
	return response
}

export const updateAttributeRequest = async payload => {
	const { collectionId, attributeId, data } = payload
	const response = await fetch(
		`${API_URL}/api/attribute/update-attribute/${collectionId}/${attributeId}`,
		{
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
	return response
}

export const removeAttributeRequest = async payload => {
	const { collectionId, attributeId } = payload
	const response = await fetch(
		`${API_URL}/api/attribute/delete-attribute/${collectionId}/${attributeId}`,
		{
			credentials: 'include',
			method: 'DELETE',
		}
	)
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

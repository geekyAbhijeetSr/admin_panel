import * as yup from 'yup'

const collectionValidation = yup.object({
	name: yup.string().required('Collection Name is required'),
})

const attributeValidation = yup.object({
	name: yup.string().required('Attribute Name is required'),
	placeholder: yup.string().required('Placeholder is required'),
})

export { collectionValidation, attributeValidation }

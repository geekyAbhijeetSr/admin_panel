import * as yup from 'yup'

const productValidation = yup.object({
	name: yup.string().required('Product title is required'),
	brand: yup.string().required('Brand is required'),
	description: yup.string().required('Description is required'),
	topLevelCat: yup.string().required('Top level category is required'),
	secondLevelCat: yup.string().required('Second level category is required'),
	thirdLevelCat: yup.string().required('Third level category is required'),
	mrp: yup.number().required('MRP is required'),
	price: yup.number().required('Price is required'),
	stock: yup.number().required('Stock is required'),
	// image: yup
	// 	.mixed()
	// 	.test('required', 'Image is required', value => {
	// 		return value.length > 0
	// 	})
	// 	.test('filetype', 'Only images are allowed', value => {
	// 		if (!value[0]) return true
	// 		return (
	// 			value[0].type === 'image/jpeg' ||
	// 			value[0].type === 'image/png' ||
	// 			value[0].type === 'image/jpg' ||
	// 			value[0].type === 'image/gif' ||
	// 			value[0].type === 'image/svg+xml' ||
	// 			value[0].type === 'image/webp'
	// 		)
	// 	})
	// 	.test('filesize', 'File size is more than 2mb', value => {
	// 		if (!value[0]) return true
	// 		return value[0].size <= 2000000 // 2mb
    //     })
})

export { productValidation }

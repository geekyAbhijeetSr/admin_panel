import * as yup from 'yup'

let image_main_change_detected = false

const productValidation = yup.object({
	name: yup.string().required('Product title is required'),
	brand: yup.string().required('Brand is required'),
	description: yup.string().required('Description is required'),
	topLevelCat: yup.string().required('Top level category is required'),
	secondLevelCat: yup.string().required('Second level category is required'),
	thirdLevelCat: yup.string().required('Third level category is required'),
	mrp: yup.number().typeError('MRP is required').required('MRP is required'),
	price: yup
		.number()
		.typeError('Price is required')
		.required('Price is required'),
	stock: yup
		.number()
		.typeError('Stock is required')
		.required('Stock is required'),
	image_main: yup
		.mixed()
		.test('required', 'Main image is required', value => {
			return value?.length > 0
		})
		.test('filetype', 'Only images are allowed', value => {
			if (value && !value[0]) return true
			return (
				value &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp')
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (value && !value[0]) return true
			return value && value[0].size <= 2000000 // 2mb
		}),
	image_1: yup
		.mixed()
		.test('filetype', 'Only images are allowed', value => {
			if (value && !value[0]) return true
			return (
				value &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp')
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (value && !value[0]) return true
			return value && value[0].size <= 2000000 // 2mb
		}),
	image_2: yup
		.mixed()
		.test('filetype', 'Only images are allowed', value => {
			if (value && !value[0]) return true
			return (
				value &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp')
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (value && !value[0]) return true
			return value && value[0].size <= 2000000 // 2mb
		}),
	image_3: yup
		.mixed()
		.test('filetype', 'Only images are allowed', value => {
			if (value && !value[0]) return true
			return (
				value &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp')
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (value && !value[0]) return true
			return value && value[0].size <= 2000000 // 2mb
		}),
	image_4: yup
		.mixed()
		.test('filetype', 'Only images are allowed', value => {
			if (value && !value[0]) return true
			return (
				value &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp')
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (value && !value[0]) return true
			return value && value[0].size <= 2000000 // 2mb
		}),
	image_5: yup
		.mixed()
		.test('filetype', 'Only images are allowed', value => {
			if (value && !value[0]) return true
			return (
				value &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp')
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (value && !value[0]) return true
			return value && value[0].size <= 2000000 // 2mb
		}),
})

const productValidation2 = (function () {
	let image_main_change_detected = false
	return yup.object({
		name: yup.string().required('Product title is required'),
		brand: yup.string().required('Brand is required'),
		description: yup.string().required('Description is required'),
		mrp: yup.number().typeError('MRP is required').required('MRP is required'),
		price: yup
			.number()
			.typeError('Price is required')
			.required('Price is required'),
		stock: yup
			.number()
			.typeError('Stock is required')
			.required('Stock is required'),
		image_main: yup
			.mixed()
			.test('required', 'Main image is required', value => {
				if (value && value?.length > 0) image_main_change_detected = true

				if (image_main_change_detected) {
					if (value && value?.length === 0) return false
					else return true
				} else {
					return true
				}
			})
			.test('filetype', 'Only images are allowed', value => {
				if (value && !value[0]) return true
				return (
					value &&
					(value[0].type === 'image/jpeg' ||
						value[0].type === 'image/png' ||
						value[0].type === 'image/jpg' ||
						value[0].type === 'image/gif' ||
						value[0].type === 'image/svg+xml' ||
						value[0].type === 'image/webp')
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (value && !value[0]) return true
				return value && value[0].size <= 2000000 // 2mb
			}),
		image_1: yup
			.mixed()
			.test('filetype', 'Only images are allowed', value => {
				if (value && !value[0]) return true
				return (
					value &&
					(value[0].type === 'image/jpeg' ||
						value[0].type === 'image/png' ||
						value[0].type === 'image/jpg' ||
						value[0].type === 'image/gif' ||
						value[0].type === 'image/svg+xml' ||
						value[0].type === 'image/webp')
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (value && !value[0]) return true
				return value && value[0].size <= 2000000 // 2mb
			}),
		image_2: yup
			.mixed()
			.test('filetype', 'Only images are allowed', value => {
				if (value && !value[0]) return true
				return (
					value &&
					(value[0].type === 'image/jpeg' ||
						value[0].type === 'image/png' ||
						value[0].type === 'image/jpg' ||
						value[0].type === 'image/gif' ||
						value[0].type === 'image/svg+xml' ||
						value[0].type === 'image/webp')
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (value && !value[0]) return true
				return value && value[0].size <= 2000000 // 2mb
			}),
		image_3: yup
			.mixed()
			.test('filetype', 'Only images are allowed', value => {
				if (value && !value[0]) return true
				return (
					value &&
					(value[0].type === 'image/jpeg' ||
						value[0].type === 'image/png' ||
						value[0].type === 'image/jpg' ||
						value[0].type === 'image/gif' ||
						value[0].type === 'image/svg+xml' ||
						value[0].type === 'image/webp')
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (value && !value[0]) return true
				return value && value[0].size <= 2000000 // 2mb
			}),
		image_4: yup
			.mixed()
			.test('filetype', 'Only images are allowed', value => {
				if (value && !value[0]) return true
				return (
					value &&
					(value[0].type === 'image/jpeg' ||
						value[0].type === 'image/png' ||
						value[0].type === 'image/jpg' ||
						value[0].type === 'image/gif' ||
						value[0].type === 'image/svg+xml' ||
						value[0].type === 'image/webp')
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (value && !value[0]) return true
				return value && value[0].size <= 2000000 // 2mb
			}),
		image_5: yup
			.mixed()
			.test('filetype', 'Only images are allowed', value => {
				if (value && !value[0]) return true
				return (
					value &&
					(value[0].type === 'image/jpeg' ||
						value[0].type === 'image/png' ||
						value[0].type === 'image/jpg' ||
						value[0].type === 'image/gif' ||
						value[0].type === 'image/svg+xml' ||
						value[0].type === 'image/webp')
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (value && !value[0]) return true
				return value && value[0].size <= 2000000 // 2mb
			}),
	})
})()

export { productValidation, productValidation2 }

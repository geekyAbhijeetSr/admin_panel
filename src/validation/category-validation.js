import * as yup from 'yup'

const catValidation1 = yup.object({
	name: yup.string().required('Category Name is required'),
	image: yup
		.mixed()
		.test('required', 'Image is required', value => {
			return value?.length > 0
		})
		.test('filetype', 'Only images are allowed', value => {
			if (!value[0]) return true
			return (
				value[0].type === 'image/jpeg' ||
				value[0].type === 'image/png' ||
				value[0].type === 'image/jpg' ||
				value[0].type === 'image/gif' ||
				value[0].type === 'image/svg+xml' ||
				value[0].type === 'image/webp'
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (!value[0]) return true
			return value[0].size <= 2000000 // 2mb
		}),
})

const catValidation2 = (function () {
	let image_change_detected = false

	return yup.object({
		name: yup.string().required('Category Name is required'),
		image: yup
			.mixed()
			.test('required', 'Image is required', value => {
				if (value && value?.length > 0) image_change_detected = true

				if (image_change_detected) {
					if (value && value?.length === 0) return false
					else return true
				} else {
					return true
				}
			})
			.test('filetype', 'Only images are allowed', value => {
				if (!value[0]) return true
				return (
					value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp'
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (!value[0]) return true
				return value[0].size <= 2000000 // 2mb
			}),
	})
})()

const catValidation21 = yup.object({
	name: yup.string().required('Category Name is required'),
	image: yup
		.mixed()
		.test('required', 'Image is required', value => {
			return value.length > 0
		})
		.test('filetype', 'Only images are allowed', value => {
			if (!value[0]) return true
			return (
				value[0].type === 'image/jpeg' ||
				value[0].type === 'image/png' ||
				value[0].type === 'image/jpg' ||
				value[0].type === 'image/gif' ||
				value[0].type === 'image/svg+xml' ||
				value[0].type === 'image/webp'
			)
		})
		.test('filesize', 'File size is more than 2mb', value => {
			if (!value[0]) return true
			return value[0].size <= 2000000 // 2mb
		}),
	attributeCollection: yup
		.string()
		.required('Attribute collection is required'),
})

const catValidation22 = (function () {
	let image_change_detected = false

	return yup.object({
		name: yup.string().required('Category Name is required'),
		image: yup
			.mixed()
			.test('required', 'Image is required', value => {
				if (value && value?.length > 0) image_change_detected = true

				if (image_change_detected) {
					if (value && value?.length === 0) return false
					else return true
				} else {
					return true
				}
			})
			.test('filetype', 'Only images are allowed', value => {
				if (!value[0]) return true
				return (
					value[0].type === 'image/jpeg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/gif' ||
					value[0].type === 'image/svg+xml' ||
					value[0].type === 'image/webp'
				)
			})
			.test('filesize', 'File size is more than 2mb', value => {
				if (!value[0]) return true
				return value[0].size <= 2000000 // 2mb
			}),
		attributeCollection: yup
			.string()
			.test('required', 'Attribute collection is required', value => {
				return value?.length > 0
			}),
	})
})()

export { catValidation1, catValidation2, catValidation21, catValidation22 }

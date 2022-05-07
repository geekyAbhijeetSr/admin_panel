import * as yup from 'yup'

const signupValidation = yup.object({
	firstname: yup.string().required('First name is required'),
	lastname: yup.string().required('Last name is required'),
	email: yup
		.string()
		.required('Email is required')
		.email('Invalid email address'),
	password: yup.string().required('Password is required').min(8),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const loginValidation = yup.object({
	email: yup
		.string()
		.required('Enter your email')
		.email('Invalid email address'),
	password: yup.string().required('Enter your password'),
})

export { signupValidation, loginValidation }

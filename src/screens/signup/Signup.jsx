import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input, Button } from '../../components'

const schema = yup.object({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup
		.string()
		.required('Email is required')
		.email('Invalid email address'),
	password: yup.string().required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<div className='signup-container'>
			<div className='form-box'>
				<h1>Sign up</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='fln-container'>
						<Input
							label='First Name'
							name='firstName'
							type='text'
							placeholder='John'
							register={register}
							message={errors.firstName?.message}
						/>
						<Input
							label='Last Name'
							name='lastName'
							type='text'
							placeholder='Doe'
							register={register}
							message={errors.lastName?.message}
						/>
					</div>

					<Input
						label='Email'
						name='email'
						type='email'
						placeholder='example@email.com'
						register={register}
						message={errors.email?.message}
					/>

					<Input
						label='Password'
						name='password'
						type='password'
						placeholder='Password'
						register={register}
						message={errors.password?.message}
					/>

					<Input
						label='Confirm Password'
						name='confirmPassword'
						type='password'
						placeholder='Confirm Password'
						register={register}
						message={errors.confirmPassword?.message}
					/>

					<Button type='submit'>Sign up</Button>

					<p className='create-account'>
						Already have an account? <Link to='/login'>Log in</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Signup

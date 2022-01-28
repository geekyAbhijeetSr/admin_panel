import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input, Button } from '../../components'

const schema = yup.object({
	email: yup
		.string()
		.required('Enter your email')
		.email('Invalid email address'),
	password: yup.string().required('Enter your password'),
})

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<div className='login-container'>
			<div className='form-box'>
				<h1>Log in</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
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

					<Link className='forgot-pass' to='/'>
						Forgot your password?
					</Link>

					<Button type='submit'>Log In</Button>

					<p className='create-account'>
						Don't have an account yet? <Link to='/signup'>Signup</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Login

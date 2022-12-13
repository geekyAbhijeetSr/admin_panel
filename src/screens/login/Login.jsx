import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidation } from '../../validation/auth-validation'
import { login } from '../../redux/features/auth-slice'
import { Input, Button, SpinnerFullScreen } from '../../components'

import './login.css'

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginValidation),
	})

	const { user, isLoadingAuth } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = data => {
		dispatch(login(data))
	}

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	return (
		<div className='login'>
			{isLoadingAuth && <SpinnerFullScreen />}
			<div className='login__form-box'>
				<h1>Log in</h1>

				<form
					className='login__form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					spellCheck='false'
				>
					<Input
						label='Email'
						name='email'
						type='email'
						placeholder='e.g. example@email.com'
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

					<Link className='login__forgot-pass' to='/'>
						Forgot your password?
					</Link>

					<Button variant='outline primary' type='submit'>
						Log In
					</Button>

					<p className='login__signup-option'>
						Don't have an account yet? <Link to='/signup'>Signup</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Login

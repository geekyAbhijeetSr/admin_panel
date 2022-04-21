import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidation } from '../../validation/auth-validation'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetAuth } from '../../redux/features/auth-slice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Input, Button, Spinner } from '../../components'

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginValidation),
	})

	const { user, errorAuth, isLoadingAuth } = useSelector(state => state.auth)
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

	useEffect(() => {
		if (errorAuth) {
			toast.error(errorAuth)
			dispatch(resetAuth())
		}
	}, [errorAuth, dispatch])

	return (
		<div className='login-container'>
			{isLoadingAuth && <Spinner />}
			<div className='form-box'>
				<h1>Log in</h1>

				<form
					className='align-center'
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

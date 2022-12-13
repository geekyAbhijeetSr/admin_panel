import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signupValidation } from '../../validation/auth-validation'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../redux/features/auth-slice'
import { useEffect } from 'react'
import { Input, Button, SpinnerFullScreen } from '../../components'
import './signup.css'

function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupValidation),
	})

	const { user, isLoading } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = data => {
		dispatch(signup(data))
	}

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	return (
		<div className='signup'>
			{isLoading && <SpinnerFullScreen />}
			<div className='signup__form-box'>
				<h1>Sign up</h1>

				<form
					className='signup__form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					spellCheck='false'
				>
					<div className='signup__first-and-last-name'>
						<Input
							label='First Name'
							name='firstname'
							type='text'
							placeholder='e.g. John'
							register={register}
							message={errors.firstname?.message}
						/>
						<Input
							label='Last Name'
							name='lastname'
							type='text'
							placeholder='e.g. Doe'
							register={register}
							message={errors.lastname?.message}
						/>
					</div>

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
						placeholder='Must be at least 8 characters'
						register={register}
						message={errors.password?.message}
					/>

					<Input
						label='Confirm Password'
						name='confirmPassword'
						type='password'
						placeholder='Must match password'
						register={register}
						message={errors.confirmPassword?.message}
					/>

					<Button variant='outline primary' type='submit'>
						Sign up
					</Button>

					<p className='signup__login-option'>
						Already have an account? <Link to='/login'>Log in</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Signup

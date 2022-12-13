import { useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { logout } from './redux/features/auth-slice'
import { Navbar } from './components'

import './App.css'

const Home = lazy(() => import('./screens/home/Home'))
const Login = lazy(() => import('./screens/login/Login'))
const Signup = lazy(() => import('./screens/signup/Signup'))

function App() {
	const { user, exp } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		const interval = setInterval(() => {
			if (exp) {
				const now = new Date()
				const expDate = new Date(exp)
				if (now > expDate) {
					dispatch(logout())
				}
			}
		}, 1000)

		if (!exp) {
			clearInterval(interval)
		}

		return () => clearInterval(interval)
	}, [exp, dispatch])

	return (
		<div className='App'>
			<Navbar />
			<main>
				<Routes>
					{/* if user login */}

					{user && (
						<Route
							path='/'
							element={
								<Suspense fallback={<div />}>
									<Home />
								</Suspense>
							}
						/>
					)}

					{/* if user not login */}

					{!user && (
						<Route
							path='/login'
							element={
								<Suspense fallback={<div />}>
									<Login />
								</Suspense>
							}
						/>
					)}

					{!user && (
						<Route
							path='/signup'
							element={
								<Suspense fallback={<div />}>
									<Signup />
								</Suspense>
							}
						/>
					)}

					{/* catch unknown routes */}

					<Route
						path='*'
						element={
							<Suspense fallback={<div />}>
								<Navigate to={user ? '/' : '/login'} />
							</Suspense>
						}
					/>
				</Routes>
			</main>
		</div>
	)
}

export default App

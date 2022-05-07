import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './redux/features/auth-slice'
import { useEffect } from 'react'
import { Header } from './components'
import { Login, Signup, Home } from './screens'

import './App.css'

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
			<Header />
			<main>
				<Routes>
					{/* if user login */}
					{user && <Route path='/' element={<Home />} />}

					{/* if user not login */}
					{!user && <Route path='/login' element={<Login />} />}
					{!user && <Route path='/signup' element={<Signup />} />}

					{/* catch unknown routes */}
					<Route path='*' element={<Navigate to={user ? '/' : '/login'} />} />
				</Routes>
			</main>
		</div>
	)
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Login, Signup } from './screens'

import './App.css'

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path='/' element={<h1>Home</h1>} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
					</Routes>
				</main>
			</Router>
		</div>
	)
}

export default App

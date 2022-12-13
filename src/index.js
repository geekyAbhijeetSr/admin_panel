import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'

import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-image-gallery/styles/css/image-gallery.css'
 
const root = createRoot(document.getElementById('root'))

root.render(
	<>
	{/* <React.StrictMode> */}
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
		<ToastContainer
			position='top-center'
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			draggable
			pauseOnHover
		/>
	{/* </React.StrictMode> */}
	</>
)

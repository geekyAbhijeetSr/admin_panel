import { toast } from 'react-toastify'

const toastinfo = message => {
	toast.info(message, {
		autoClose: false,
		pauseOnFocusLoss: false,
		hideProgressBar: true,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: false,
		closeButton: false,
	})
}

export default toastinfo

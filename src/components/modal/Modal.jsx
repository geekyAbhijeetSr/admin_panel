import ReactModal from 'react-modal'
import './modal.css'

ReactModal.setAppElement('#modal')

function Modal(props) {
	const { isOpen, onRequestClose, children } = props
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel='Example Modal'
			className='modal'
			overlayClassName='overlay'
		>
			{children}
		</ReactModal>
	)
}

export default Modal

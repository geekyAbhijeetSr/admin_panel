import { Modal, Button } from '../../../components'

function ConfirmForBackToProductsModal(props) {
	const {
		isOpen,
        onClose,
        onConfirm
	} = props

	const back = () => {
		onConfirm()
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm del-cat'>
				<p>Are you sure you don't want to add this product?</p>
				<div className='buttons'>
					<Button type='button' variant='only-text info' onClick={back}>
						Yes
					</Button>
					<Button variant='only-text info' onClick={onClose}>
						No
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export { ConfirmForBackToProductsModal }
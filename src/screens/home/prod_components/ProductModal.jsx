import { Modal, Button } from '../../../components'
import { useDispatch } from 'react-redux'
import { removeProduct } from '../../../redux/features/product-slice'

function ConfirmForBackToProductsModal(props) {
	const { isOpen, onClose, onConfirm } = props

	const back = () => {
		onConfirm()
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm-width confirm-modal'>
				<p>Are you sure you don't want to add this product?</p>
				<div className='buttons__right'>
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

function DelProdModal(props) {
	const {
		isOpen,
		onClose,
		delProd: { id, name },
		cb,
	} = props
	const dispatch = useDispatch()

	const onDelete = () => {
		dispatch(removeProduct(id))
		onClose()
		cb()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm-width del-modal'>
				<p>Are you sure you want to delete this product?</p>
				<span>{name}</span>
				<div className='buttons__right'>
					<Button variant='only-text info' onClick={onClose}>
						Cancel
					</Button>
					<Button type='button' variant='only-text danger' onClick={onDelete}>
						Delete
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export { ConfirmForBackToProductsModal, DelProdModal }

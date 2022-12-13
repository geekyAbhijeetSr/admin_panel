import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { collectionValidation } from '../../../validation/attribute-validation'
import { useDispatch } from 'react-redux'
import { Input, Button, Modal } from '../../../components'
import {
	addCollection,
	updateCollection,
	removeCollection,
} from '../../../redux/features/attribute-slice'

function CollectionFormModal(props) {
	const { isOpen, onClose, prefillData } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(collectionValidation),
	})
	const dispatch = useDispatch()

	useEffect(() => {
		if (prefillData) {
			setValue('name', prefillData.name)
		}
	}, [prefillData, setValue])

	const resetForm = () => {
		reset({
			name: '',
		})
	}

	const closeModal = () => {
		resetForm()
		onClose()
	}

	const onSubmit = data => {
		if (prefillData && prefillData.collectionId) {
			const payload = {
				data,
				collectionId: prefillData.collectionId,
			}
			dispatch(updateCollection(payload))
		} else {
			dispatch(addCollection(data))
		}
		resetForm()
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='modal-small-width'>
				<form onSubmit={handleSubmit(onSubmit)} noValidate spellCheck='false'>
					<Input
						label='Collection Name'
						name='name'
						type='text'
						placeholder='e.g. Processor'
						register={register}
						message={errors.name?.message}
					/>

					<div className='buttons__right'>
						<Button variant='only-text info' onClick={closeModal}>
							Cancel
						</Button>
						<Button type='submit' variant='only-text info'>
							{prefillData ? 'Update' : 'Add'}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

function DelCollectionModal(props) {
	const {
		isOpen,
		onClose,
		delCollection: { id, name },

		selectedCollection,
		setSelectedCollection,
	} = props
	const dispatch = useDispatch()

	const onDelete = () => {
		if (selectedCollection === id) {
			setSelectedCollection('')
		}
		dispatch(removeCollection(id))
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm-width del-modal'>
				<p>Are you sure you want to delete this attribute collection?</p>
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

export { CollectionFormModal, DelCollectionModal }

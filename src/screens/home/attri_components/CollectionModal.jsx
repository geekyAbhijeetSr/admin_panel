import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { collectionValidation } from '../../../validation/attribute-validation'
import { useDispatch } from 'react-redux'
import { Input, Button, Modal, Select } from '../../../components'
import {
	addCollection,
	updateCollection,
	deleteCollection,
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
			setValue('active', prefillData.active)
		}
	}, [prefillData, setValue])

	const resetForm = () => {
		reset({
			name: '',
			active: true,
		})
	}

	const closeModal = () => {
		resetForm()
		onClose()
	}

	const onSubmit = data => {
		if (prefillData && prefillData.id) {
			const newData = {
				id: prefillData.id,
				name: data.name,
				active: data.active,
			}
			dispatch(updateCollection(newData))
		} else {
			dispatch(addCollection(data))
		}
		resetForm()
	}

	const options = [
		{
			value: true,
			name: 'Yes',
		},
		{
			value: false,
			name: 'No',
		},
	]

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='modal-small-form'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<Input
						label='Collection Name'
						name='name'
						type='text'
						placeholder="e.g. Processor"
						register={register}
						message={errors.name?.message}
					/>

					<Select
						name='active'
						label='Active'
						options={options}
						register={register}
						placeholder='-- Select One --'
						message={errors.active?.message}
						className='input'
					/>

					<div className='buttons'>
						<Button variant='outline info' onClick={closeModal}>
							Cancel
						</Button>
						<Button type='submit'>{prefillData ? 'Update' : 'Create'}</Button>
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
	} = props
	const dispatch = useDispatch()

	const onDelete = () => {
		dispatch(deleteCollection(id))
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm del-cat'>
				<p>Are you sure you want to delete this attribute collection?</p>
				<span>{name}</span>
				<div className='buttons'>
					<Button variant='outline info' onClick={onClose}>
						Cancel
					</Button>
					<Button type='button' variant='danger' onClick={onDelete}>
						Delete
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export {  CollectionFormModal, DelCollectionModal }

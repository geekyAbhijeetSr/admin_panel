import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { attributeValidation } from '../../../validation/attribute-validation'
import { useDispatch } from 'react-redux'
import { Input, Button, Modal } from '../../../components'
import {
	addAttribute,
	updateAttribute,
	deleteAttribute,
} from '../../../redux/features/attribute-slice'

function AttributeFormModal(props) {
	const { isOpen, onClose, collectionId, attributeId, prefillData } = props
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(attributeValidation),
	})
	const dispatch = useDispatch()

	useEffect(() => {
		if (prefillData) {
			setValue('name', prefillData.name)
			setValue('placeholder', prefillData.placeholder)
		}
	}, [prefillData, setValue])

	const resetForm = () => {
		reset({
			name: '',
			type: 'text',
			placeholder: '',
			active: true,
		})
	}

	const closeModal = () => {
		resetForm()
		onClose()
	}

	const onSubmit = data => {
		const payload = {
			collectionId,
			data,
		}
		if (attributeId) {
			payload.attributeId = attributeId
			dispatch(updateAttribute(payload))
		} else {
			dispatch(addAttribute(payload))
		}
		resetForm()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='addcatform'>
				<form onSubmit={handleSubmit(onSubmit)} noValidate spellCheck='false'>
					<Input
						label='Attribute Name'
						name='name'
						type='text'
						placeholder='e.g. Series'
						register={register}
						message={errors.name?.message}
					/>

					<Input
						label='Placeholder'
						name='placeholder'
						type='text'
						placeholder='Placeholder text'
						register={register}
						message={errors.placeholder?.message}
					/>

					<div className='buttons'>
						<Button variant='only-text info' onClick={closeModal}>
							Cancel
						</Button>
						<Button type='submit' variant='only-text info'>{prefillData ? 'Update' : 'Add'}</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

function DelAttributeModal(props) {
	const { isOpen, onClose, delAttribute, id } = props
	const dispatch = useDispatch()

	const onDelete = () => {
		dispatch(
			deleteAttribute({ collectionId: id, attributeId: delAttribute._id })
		)
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='del-cat'>
				<p>Are you sure you want to delete this attribute?</p>
				<span>{delAttribute?.name}</span>
				<div className='buttons'>
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

export { AttributeFormModal, DelAttributeModal }

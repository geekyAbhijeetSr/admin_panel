import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { attributeValidation } from '../../../validation/attribute-validation'
import { useDispatch } from 'react-redux'
import { Input, Select, Button, Modal } from '../../../components'
import {
	addAttribute,
	updateAttribute,
	deleteAttribute,
} from '../../../redux/features/attribute-slice'

function AttributeFormModal(props) {
	// id, name, type, placeholder, active
	const { isOpen, onClose, collectionId, prefillData } = props
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
			setValue('type', prefillData.type)
			setValue('placeholder', prefillData.placeholder)
			setValue('active', prefillData.active)
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
			...data,
		}
		if (prefillData) {
			payload.attributeId = prefillData.attributeId
			dispatch(updateAttribute(payload))
		}
		else {
			dispatch(addAttribute(payload))
		}
		resetForm()
	}
	
	const activeOptions = [
		{ value: true, name: 'Yes' },
		{ value: false, name: 'No' },
	]

	const typeOptions = [
		{ value: 'text', name: 'Text' },
		{ value: 'text-array', name: 'Text Array' },
	]

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='addcatform'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					spellCheck='false'
				>
					<Input
						label='Attribute Name'
						name='name'
						type='text'
						placeholder='e.g. Series'
						register={register}
						message={errors.name?.message}
					/>

					<Select
						label='Type'
						name='type'
						options={typeOptions}
						register={register}
						message={errors.type?.message}
					/>

					<Input
						label='Placeholder'
						name='placeholder'
						type='text'
						placeholder="Placeholder text"
						register={register}
						message={errors.placeholder?.message}
					/>

					<Select
						label='Active'
						name='active'
						options={activeOptions}
						register={register}
						message={errors.active?.message}
					/>

					<div className='buttons'>
						<Button variant='outline info' onClick={closeModal}>
							Cancel
						</Button>
						<Button type='submit'>{prefillData ? 'Update' : 'Add'}</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

function DelAttributeModal(props) {
	const {
		isOpen,
		onClose,
		delAttribute,
		id
	} = props
	const dispatch = useDispatch()

	const onDelete = () => {
		dispatch(deleteAttribute({ collectionId: id, attributeId: delAttribute._id }))
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='del-cat'>
				<p>Are you sure you want to delete this attribute?</p>
				<span>{delAttribute?.name}</span>
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

export { AttributeFormModal, DelAttributeModal }

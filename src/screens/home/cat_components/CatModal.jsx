import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import {
	addCategory,
	deleteCategory,
	updateCategory,
} from '../../../redux/features/category-slice'
import { Input, ImageInput, Select, Button, Modal } from '../../../components'

function CatFormModal(props) {
	const { isOpen, onClose, validation, prefillData, parentId, placeholder } =
		props

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(validation),
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
			image: '',
			active: true,
		})
	}

	const closeModal = () => {
		resetForm()
		onClose()
	}

	const onSubmit = data => {
		const formData = new FormData()
		if (data.name) {
			formData.append('name', data.name)
		}
		if (data.image && data.image.length > 0) {
			formData.append('image', data.image[0])
		}
		if (parentId) {
			formData.append('parentId', parentId)
		}
		formData.append('active', data.active)

		if (prefillData && prefillData.id) {
			const payload = {
				category: formData,
				catId: prefillData.id,
			}
			dispatch(updateCategory(payload))
		} else {
			dispatch(addCategory(formData))
		}
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
				<form onSubmit={handleSubmit(onSubmit)} noValidate spellCheck='false'>
					<Input
						label='Category Name'
						name='name'
						type='text'
						placeholder={placeholder}
						register={register}
						message={errors.name?.message}
					/>

					<ImageInput
						label='Category Image'
						name='image'
						register={register}
						accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
						message={errors.image?.message}
						url={prefillData?.url}
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

function CatFormModal2(props) {
	const { isOpen, onClose, validation, prefillData, parentId, placeholder } =
		props
	const { collections } = useSelector(state => state.attribute)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(validation),
	})

	const dispatch = useDispatch()

	useEffect(() => {
		if (prefillData) {
			setValue('name', prefillData.name)
			setValue('active', prefillData.active)
			setValue('attributeCollection', prefillData.attributeCollection)
		}
	}, [prefillData, setValue])

	const resetForm = () => {
		reset({
			name: '',
			image: '',
			active: true,
		})
	}

	const closeModal = () => {
		resetForm()
		onClose()
	}

	const onSubmit = data => {
		const formData = new FormData()
		if (data.image && data.image.length > 0) {
			formData.append('image', data.image[0])
		}
		if (parentId) {
			formData.append('parentId', parentId)
		}
		formData.append('name', data.name)
		formData.append('attributeCollection', data.attributeCollection)
		formData.append('active', data.active)

		if (prefillData && prefillData.id) {
			const payload = {
				category: formData,
				catId: prefillData.id,
			}
			dispatch(updateCategory(payload))
		} else {
			dispatch(addCategory(formData))
		}
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

	const options2 = collections
		.filter(collection => collection.active)
		.map(collection => {
			return {
				value: collection._id,
				name: collection.name,
			}
		})

	options2.unshift({
		value: '',
		name: '-- Select One --',
	})

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='modal-small-form'>
				<form onSubmit={handleSubmit(onSubmit)} noValidate spellCheck='false'>
					<Input
						label='Category Name'
						name='name'
						type='text'
						placeholder={placeholder}
						register={register}
						message={errors.name?.message}
					/>

					<ImageInput
						label='Category Image'
						name='image'
						register={register}
						accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
						message={errors.image?.message}
						url={prefillData?.url}
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

					<Select
						name='attributeCollection'
						label='Attribute Collection'
						options={options2}
						register={register}
						placeholder='-- Select One --'
						message={errors.attributeCollection?.message}
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

function DelCatModal(props) {
	const {
		isOpen,
		onClose,
		delCat: { id, name },
	} = props
	const dispatch = useDispatch()

	const onDelete = () => {
		dispatch(deleteCategory(id))
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm del-cat'>
				<p>Are you sure you want to delete this category?</p>
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

export { DelCatModal, CatFormModal, CatFormModal2 }

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import {
	addCategory,
	removeCategory,
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
		trigger
	} = useForm({
		mode: "all",
		resolver: yupResolver(validation),
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
			image: '',
		})
	}

	const closeModal = () => {
		resetForm()
		onClose()
	}

	const onSubmit = data => {
		const formData = new FormData()

		formData.append('name', data.name)

		if (data.image && data.image.length > 0) {
			formData.append('image', data.image[0])
		}
		if (parentId) {
			formData.append('parentId', parentId)
		}

		if (prefillData && prefillData.id) {
			const payload = {
				category: formData,
				catId: prefillData.id,
			}
			dispatch(updateCategory(payload))
		} else {
			dispatch(addCategory(formData))
		}

		resetForm()
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='modal-small-width'>
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
						unselect={prefillData ? false : true}
						setValue={setValue}
						trigger={trigger}
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
		trigger
	} = useForm({
		mode: "all",
		resolver: yupResolver(validation),
	})

	const dispatch = useDispatch()

	useEffect(() => {
		if (prefillData) {
			setValue('name', prefillData.name)
			setValue('attributeCollection', prefillData.attributeCollection?._id)
		}
	}, [prefillData, setValue])

	const resetForm = () => {
		reset({
			name: '',
			image: '',
			attributeCollection: '',
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

		resetForm()
		onClose()
	}

	const options = [
		{
			value: '',
			name: '-- Select One --',
		},
	]
	collections
		.filter(collection => collection.active)
		.forEach(collection => {
			options.push({
				value: collection._id,
				name: collection.name,
			})
		})

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<div className='modal-small-width'>
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
						unselect={prefillData ? false : true}
						setValue={setValue}
						trigger={trigger}
					/>

					<Select
						name='attributeCollection'
						label='Attribute Collection'
						options={options}
						register={register}
						message={errors.attributeCollection?.message}
						className='input'
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

function DelCatModal(props) {
	const {
		isOpen,
		onClose,
		delCat: { id, name },
		layer,
		unselectCatOption,
		prevSelectedOption,
		unselectCatOption2,
		prevSelectedOption2,
	} = props
	const dispatch = useDispatch()

	const onDelete = () => {
		if (layer === 1) {
			if (id === prevSelectedOption) {
				unselectCatOption()
			}
			if (id === prevSelectedOption2) {
				unselectCatOption2()
			}
		} else if (layer === 2) {
			if (id === prevSelectedOption) {
				unselectCatOption()
			}
		}
		dispatch(removeCategory(id))
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div className='modal-confirm-width del-modal'>
				<p>Are you sure you want to delete this category?</p>
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

export { DelCatModal, CatFormModal, CatFormModal2 }

import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../redux/features/product-slice'
import { useEffect, useState } from 'react'
import * as md from 'react-icons/md'
import { Input, ImageInput, Button, Select } from '../../../components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productValidation } from '../../../validation/product-validation'

const stepOneRequiredFields = [
	'name',
	'brand',
	'description',
	'topLevelCat',
	'secondLevelCat',
	'thirdLevelCat',
	'mrp',
	'price',
	'stock',
]
const stepTwoRequiredFields = ['image_main']

function ProductCreate(props) {
	const { backToProductList } = props
	const { categories, parentCategories } = useSelector(state => state.category)
	const dispatch = useDispatch()
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(productValidation),
	})
	const [isFormFilled, setIsFormFilled] = useState(false)
	const [secondLayerCatOptions, setSecondLayerCatOptions] = useState([])
	const [thirdLayerCatOptions, setThirdLayerCatOptions] = useState([])
	const [attributeCollection, setAttributeCollection] = useState(null)
	const [formStep, setFormStep] = useState(1)
	const formData = watch()

	// generating topLevelCat Options
	let topLevelCatOptions = [
		{
			name: '-- Select One --',
			value: '',
		},
	]
	parentCategories
		.filter(c => c.active)
		.forEach(c =>
			topLevelCatOptions.push({
				name: c.name,
				value: c._id,
			})
		)

	// generating secondLevelCat Options
	let selectedTopLevelCat = formData.topLevelCat
	useEffect(() => {
		if (selectedTopLevelCat) {
			let secondLevelCatOptions_ = [
				{
					name: '-- Select One --',
					value: '',
				},
			]

			categories
				.filter(c => c.parentId === selectedTopLevelCat && c.active)
				.forEach(c =>
					secondLevelCatOptions_.push({
						name: c.name,
						value: c._id,
					})
				)

			setSecondLayerCatOptions(secondLevelCatOptions_)
		} else if (selectedTopLevelCat === '') {
			setSecondLayerCatOptions([
				{
					name: '-- Select One --',
					value: '',
				},
			])
		}
	}, [selectedTopLevelCat, categories])

	// generating thirdLevelCat Options
	let selectedSecondLevelCat = formData.secondLevelCat
	useEffect(() => {
		if (selectedSecondLevelCat) {
			let thirdLevelCatOptions_ = [
				{
					name: '-- Select One --',
					value: '',
				},
			]
			categories
				.filter(
					c =>
						c.parentId === selectedSecondLevelCat &&
						c.active &&
						c.attributeCollection.active
				)
				.forEach(c =>
					thirdLevelCatOptions_.push({
						name: c.name,
						value: c._id,
					})
				)

			setThirdLayerCatOptions(thirdLevelCatOptions_)
		} else if (selectedSecondLevelCat === '') {
			setThirdLayerCatOptions([
				{
					name: '-- Select One --',
					value: '',
				},
			])
		}
	}, [selectedSecondLevelCat, categories])

	// finding and setting attributeCollection
	let SelectedThirdLevelCat = formData.thirdLevelCat
	useEffect(() => {
		if (SelectedThirdLevelCat) {
			const category = categories.find(c => c._id === SelectedThirdLevelCat)

			if (category) {
				setAttributeCollection(category.attributeCollection)
			}
		} else if (SelectedThirdLevelCat === '') {
			setAttributeCollection(null)
		}
	}, [SelectedThirdLevelCat, categories, attributeCollection])

	// checking if in current form required form-fields are filled or not
	useEffect(() => {
		setIsFormFilled(true)

		if (formStep === 1) {
			for (let key of stepOneRequiredFields) {
				if (formData[key] === '') {
					setIsFormFilled(false)
					break
				}
			}
		} else if (formStep === 2) {
			for (let key of stepTwoRequiredFields) {
				if (formData[key]?.length === 0) {
					setIsFormFilled(false)
					break
				}
			}
		}
	}, [isFormFilled, formStep, formData])

	// submitting form
	const submit = data => {
		const { attributes } = attributeCollection
		let properties = []

		attributes.forEach(a => {
			let property = {
				name: a.name,
				value: data[a.name],
			}
			properties.push(property)
			delete data[a.name]
		})

		data.properties = JSON.stringify(properties)

		const imageInputFields = [
			'image_main',
			'image_1',
			'image_2',
			'image_3',
			'image_4',
			'image_5',
		]

		const formData = new FormData()
		for (let key in data) {
			if (imageInputFields.includes(key)) {
				formData.append(key, data[key][0])
			} else {
				formData.append(key, data[key])
			}
		}

		dispatch(createProduct(formData))
	}

	const stepOneForm = () => {
		return (
			<div
				className='step-one'
				style={
					formStep === 1
						? {
								display: 'block',
						  }
						: {
								display: 'none',
						  }
				}
			>
				<Input
					label='Product Name'
					name='name'
					type='text'
					placeholder='e.g. Asus ROG Strix LC 240 RGB White Edition'
					requiredField={true}
					register={register}
					message={errors.name?.message}
				/>
				<Input
					label='Brand'
					name='brand'
					type='text'
					placeholder='e.g. Asus'
					requiredField={true}
					register={register}
					message={errors.brand?.message}
				/>
				<Input
					label='Product Description'
					name='description'
					type='textarea'
					placeholder='Write a short description about the product'
					requiredField={true}
					register={register}
					message={errors.description?.message}
				/>
				<div className='categories'>
					<Select
						name='topLevelCat'
						label='Top Lvl Category'
						requiredField={true}
						options={topLevelCatOptions}
						register={register}
						message={errors.topLevelCat?.message}
						placeholder='-- Select One --'
					/>
					<Select
						name='secondLevelCat'
						label='Second Lvl Category'
						requiredField={true}
						options={secondLayerCatOptions}
						register={register}
						message={errors.secondLevelCat?.message}
						placeholder='-- Select One --'
					/>
					<Select
						name='thirdLevelCat'
						label='Third Lvl Category'
						requiredField={true}
						options={thirdLayerCatOptions}
						register={register}
						message={errors.thirdLevelCat?.message}
						placeholder='-- Select One --'
					/>
				</div>
				<div className='prices'>
					<Input
						label='Price ₹'
						name='price'
						type='number'
						placeholder='e.g. 1024'
						requiredField={true}
						register={register}
						message={errors.price?.message}
					/>
					<Input
						label='MRP ₹'
						name='mrp'
						type='number'
						placeholder='e.g. 1199'
						requiredField={true}
						register={register}
						message={errors.mrp?.message}
					/>
					<Input
						label='Stock'
						name='stock'
						type='number'
						placeholder='e.g. 100'
						requiredField={true}
						register={register}
						message={errors.stock?.message}
					/>
				</div>
			</div>
		)
	}

	const stepTwoForm = () => {
		return (
			<div
				className='step-two'
				style={
					formStep === 2
						? {
								display: 'flex',
						  }
						: {
								display: 'none',
						  }
				}
			>
				<ImageInput
					label='Main Product Image'
					name='image_main'
					requiredField={true}
					register={register}
					accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
					message={errors.image_main?.message}
				/>
				<ImageInput
					label='Product Image 1'
					name='image_1'
					register={register}
					accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
					message={errors.image_1?.message}
				/>
				<ImageInput
					label='Product Image 2'
					name='image_2'
					register={register}
					accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
					message={errors.image_2?.message}
				/>
				<ImageInput
					label='Product Image 3'
					name='image_3'
					register={register}
					accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
					message={errors.image_3?.message}
				/>
				<ImageInput
					label='Product Image 4'
					name='image_4'
					register={register}
					accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
					message={errors.image_4?.message}
				/>
				<ImageInput
					label='Product Image 5'
					name='image_5'
					register={register}
					accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
					message={errors.image_5?.message}
				/>
			</div>
		)
	}

	const stepThreeForm = () => {
		const renderSpecsInput = attributes => {
			return attributes.map((attribute, index) => {
				return (
					<div
						key={index}
						className='spec-input'
						style={
							attribute.active
								? {
										display: 'block',
								  }
								: {
										display: 'none',
								  }
						}
					>
						<Input
							label={attribute.name}
							name={attribute.name}
							type='text'
							placeholder={attribute.placeholder}
							register={register}
							message={errors[attribute.name]?.message}
						/>
					</div>
				)
			})
		}

		return (
			<div
				className='step-three'
				style={
					formStep === 3
						? {
								display: 'block',
						  }
						: {
								display: 'none',
						  }
				}
			>
				{attributeCollection &&
					renderSpecsInput(attributeCollection.attributes)}
			</div>
		)
	}

	const renderHeading = () => {
		if (formStep === 1) {
			return 'Product Details'
		} else if (formStep === 2) {
			return 'Product Images'
		} else if (formStep === 3) {
			return 'Product Specifications'
		}
	}

	return (
		<div>
			<div className='add-container'>
				<Button className='only-text' onClick={backToProductList}>
					<md.MdArrowBack
						style={{
							fontSize: '1.5rem',
						}}
					/>
					Product List
				</Button>
			</div>

			<div className='create-product-container'>
				<div className='heading-pc'>
					<h1>Create Product</h1>
					<span>{formStep} of 3 Steps</span>
					<h2>{renderHeading()}</h2>
				</div>

				<form noValidate onSubmit={handleSubmit(submit)} spellCheck='false'>
					{stepOneForm()}
					{stepTwoForm()}
					{stepThreeForm()}

					<div className='button-container'>
						{formStep > 1 && (
							<Button
								className='outline'
								onClick={() => {
									setFormStep(formStep - 1)
								}}
								type='button'
							>
								<md.MdArrowBack /> Back
							</Button>
						)}

						{formStep < 3 && (
							<Button
								className='outline'
								onClick={() => {
									if (isFormFilled) {
										setFormStep(formStep + 1)
									}
								}}
								type='button'
								disabled={!isFormFilled}
							>
								Next <md.MdArrowForward />
							</Button>
						)}

						{formStep === 3 && <Button type='submit'>Submit</Button>}
					</div>
				</form>
			</div>
			<pre>{JSON.stringify(formData, null, 2)}</pre>
		</div>
	)
}

export default ProductCreate

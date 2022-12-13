import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../redux/features/product-slice'
import { useEffect, useState } from 'react'
import * as md from 'react-icons/md'
import { Button } from '../../../components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { singleString } from '../../../helper/util'
import {
	StepOneForm,
	StepTwoForm,
	StepThreeForm,
	StepFourSuccessOrError,
} from './AddFormSteps'
import { productValidation } from '../../../validation/product-validation'
import { ConfirmForBackToProductsModal } from './ProductModal'
import './productCreate.css'

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
	const { backToProductList, rerender } = props
	const { categories } = useSelector(state => state.category)
	const dispatch = useDispatch()
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
	} = useForm({
		mode: 'all',
		resolver: yupResolver(productValidation),
	})

	const [isFormFilled, setIsFormFilled] = useState(false)
	const [atLeastOneInputFilled, setAtLeastOneInputFilled] = useState(false)
	const [
		isConfirmForBackToProductsModalOpen,
		setIsConfirmForBackToProductsModalOpen,
	] = useState(false)
	const [attributeCollection, setAttributeCollection] = useState(null)
	const [formStep, setFormStep] = useState(1)
	const formData = watch()

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
		setAtLeastOneInputFilled(false)

		// formStep 1
		if (formStep === 1) {
			for (let key of stepOneRequiredFields) {
				if (formData[key] === '') {
					setIsFormFilled(false)
					break
				}
			}

			for (let key of stepOneRequiredFields) {
				if (formData[key] !== '') {
					setAtLeastOneInputFilled(true)
					break
				}
			}
		}
		// formStep 2
		else if (formStep === 2) {
			for (let key of stepTwoRequiredFields) {
				if (formData[key]?.length === 0 || !formData[key]) {
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
			let name = singleString(a.name)
			let property = {
				label: a.name,
				name: name,
				value: data[name],
				placeholder: a.placeholder,
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

		dispatch(addProduct(formData))

		setFormStep(4)
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

	const backToProductsHandler = () => {
		if (atLeastOneInputFilled) {
			setIsConfirmForBackToProductsModalOpen(true)
		} else {
			backToProductList()
		}
	}

	return (
		<div>
			<ConfirmForBackToProductsModal
				isOpen={isConfirmForBackToProductsModalOpen}
				onClose={() => setIsConfirmForBackToProductsModalOpen(false)}
				onConfirm={backToProductList}
			/>
			<div
				className='add-button-container'
				style={
					formStep === 1
						? {
								visibility: 'visible',
						  }
						: {
								visibility: 'hidden',
						  }
				}
			>
				<Button className='only-text' onClick={backToProductsHandler}>
					<md.MdArrowBack
						style={{
							fontSize: '1.5rem',
						}}
					/>
					Product List
				</Button>
			</div>

			<div className='create-product'>
				{formStep !== 4 && (
					<div className='create-product__heading'>
						<h1>Add Product</h1>
						<span>{formStep} of 3 Steps</span>
						<h2>{renderHeading()}</h2>
					</div>
				)}

				<form noValidate onSubmit={handleSubmit(submit)} spellCheck='false'>
					<StepOneForm
						formStep={formStep}
						register={register}
						errors={errors}
						formData={formData}
					/>
					<StepTwoForm
						formStep={formStep}
						register={register}
						errors={errors}
						setValue={setValue}
						trigger={trigger}
					/>
					<StepThreeForm
						formStep={formStep}
						register={register}
						errors={errors}
						attributeCollection={attributeCollection}
					/>
					<StepFourSuccessOrError
						formStep={formStep}
						backToProductList={backToProductList}
						setFormStep={setFormStep}
						rerender={rerender}
					/>

					<div className='create-product__form-buttons'>
						{formStep > 1 && formStep < 4 && (
							<Button
								variant='only-text info'
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
								variant='only-text info'
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

						{formStep === 3 && (
							<Button variant='outline primary' type='submit'>
								Submit
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProductCreate

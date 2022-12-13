import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../../redux/features/product-slice'
import { useEffect, useRef, useState } from 'react'
import * as md from 'react-icons/md'
import { Button } from '../../../components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	StepOneForm,
	StepTwoForm,
	StepThreeForm,
	StepFourSuccessOrError,
} from './UpdateFormSteps'
import { productValidation2 } from '../../../validation/product-validation'
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

function ProductUpdate(props) {
	const { backToProductList, backToProductDetails, rerender, product } = props
	const { categories } = useSelector(state => state.category)
	const render = useRef(true)
	const [imagesState, setImagesState] = useState({
		image_1: {
			change_detected: false,
		},
		image_2: {
			change_detected: false,
		},
		image_3: {
			change_detected: false,
		},
		image_4: {
			change_detected: false,
		},
		image_5: {
			change_detected: false,
		},
	})
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
		resolver: yupResolver(productValidation2),
	})

	const setImagesStateHandler = key => {
		setImagesState(prevState => {

			return {
				...prevState,
				[key]: {
					change_detected: true,
				},
			}
		})
	}

	useEffect(() => {
		if (product) {
			setValue('name', product.name)
			setValue('brand', product.brand)
			setValue('description', product.description)
			setValue('price', product.price)
			setValue('mrp', product.mrp)
			setValue('stock', product.stock)

			product.properties.forEach(property => {
				setValue(property.name, property.value)
			})
		}
	}, [product, setValue])

	const [isFormFilled, setIsFormFilled] = useState(false)
	const [atLeastOneInputFilled, setAtLeastOneInputFilled] = useState(false)
	
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
		
	}, [isFormFilled, formStep, formData])

	// submitting form
	const submit = data => {
		let properties = []

		product.properties.forEach(property => {
				properties.push({
					name: property.name,
					value: data[property.name]
				})
			
			delete data[property.name]
		})

		data.properties = JSON.stringify(properties)
		data.imagesState = JSON.stringify(imagesState)

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

		for (var pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1] + ',')
		}

		const payload = {
			productId: product._id,
			product: formData
		}

		dispatch(updateProduct(payload))

		setFormStep(4)

		setImagesState({
			image_1: {
				change_detected: false,
			},
			image_2: {
				change_detected: false,
			},
			image_3: {
				change_detected: false,
			},
			image_4: {
				change_detected: false,
			},
			image_5: {
				change_detected: false,
			},
		})
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
				<Button className='only-text' onClick={backToProductDetails}>
					<md.MdArrowBack
						style={{
							fontSize: '1.5rem',
						}}
					/>
					Product Details
				</Button>
			</div>
			<div className='create-product'>
				{formStep !== 4 && (
					<div className='create-product__heading'>
						<h1>Update Product</h1>
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
						setImagesState={setImagesStateHandler}
						product={product}
					/>
					<StepThreeForm
						formStep={formStep}
						register={register}
						errors={errors}
						properties={product?.properties}
					/>
					<StepFourSuccessOrError
						formStep={formStep}
						backToProductList={backToProductList}
						backToProductDetails={backToProductDetails}
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

export default ProductUpdate

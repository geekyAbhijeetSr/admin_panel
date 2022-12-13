import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { Input, ImageInput, Select, Button } from '../../../components'
import { resetErrorOrSuccessProduct } from '../../../redux/features/product-slice'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import processingAnimation from '../../lottie_animations/processingAnimation'
import successAnimation from '../../lottie_animations/successAnimation'
import errorAnimation from '../../lottie_animations/errorAnimation'
import { singleString } from '../../../helper/util'
import './addFormSteps.css'

const StepOneForm = ({ formStep, register, errors, formData }) => {
	const { categories, parentCategories } = useSelector(state => state.category)
	const [secondLayerCatOptions, setSecondLayerCatOptions] = useState([])
	const [thirdLayerCatOptions, setThirdLayerCatOptions] = useState([])

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
						(c.parentId === selectedSecondLevelCat &&
							c.active &&
							c.attributeCollection &&
							c.attributeCollection?.active)
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

const StepTwoForm = ({ formStep, register, errors, setValue, trigger }) => {
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
				unselect={true}
				setValue={setValue}
				trigger={trigger}
			/>
			<ImageInput
				label='Product Image 1'
				name='image_1'
				register={register}
				accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
				message={errors.image_1?.message}
				unselect={true}
				setValue={setValue}
				trigger={trigger}
			/>
			<ImageInput
				label='Product Image 2'
				name='image_2'
				register={register}
				accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
				message={errors.image_2?.message}
				unselect={true}
				setValue={setValue}
				trigger={trigger}
			/>
			<ImageInput
				label='Product Image 3'
				name='image_3'
				register={register}
				accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
				message={errors.image_3?.message}
				unselect={true}
				setValue={setValue}
				trigger={trigger}
			/>
			<ImageInput
				label='Product Image 4'
				name='image_4'
				register={register}
				accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
				message={errors.image_4?.message}
				unselect={true}
				setValue={setValue}
				trigger={trigger}
			/>
			<ImageInput
				label='Product Image 5'
				name='image_5'
				register={register}
				accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml, image/webp'
				message={errors.image_5?.message}
				unselect={true}
				setValue={setValue}
				trigger={trigger}
			/>
		</div>
	)
}

const StepThreeForm = ({ formStep, register, errors, attributeCollection }) => {
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
						name={singleString(attribute.name)}
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
			{attributeCollection && renderSpecsInput(attributeCollection.attributes)}
		</div>
	)
}

const StepFourSuccessOrError = ({
	formStep,
	backToProductList,
	setFormStep,
	rerender,
}) => {
	const { addingProduct, productSuccessMsg, productErrorMsg } = useSelector(
		state => state.product
	)
	const pseLottieContainer = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		let pAnim, sAnim, eAnim
		if (addingProduct) {
			pAnim = processingAnimation(pseLottieContainer)
		}

		if (productSuccessMsg) {
			sAnim = successAnimation(pseLottieContainer)
		}

		if (productErrorMsg) {
			eAnim = errorAnimation(pseLottieContainer)
		}

		return () => {
			if (pAnim && pAnim?.destroy) {
				pAnim.destroy()
			}
			if (sAnim && sAnim?.destroy) {
				sAnim.destroy()
			}
			if (eAnim && eAnim?.destroy) {
				eAnim.destroy()
			}
		}
	}, [addingProduct, productSuccessMsg, productErrorMsg])

	const addingProductAnimVariant = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.3,
			},
		},
	}
	const successOrErrorMsgAnimVariant = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				duration: 0.3,
				delay: 0.3,
				ease: 'easeInOut',
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		},
	}

	return (
		<div
			className='success-or-error'
			style={
				formStep === 4
					? {
							display: 'flex',
					  }
					: {
							display: 'none',
					  }
			}
		>
			<div
				ref={pseLottieContainer}
				className='success-or-error__lottie-container'
			></div>

			<AnimatePresence>
				{addingProduct && (
					<motion.div
						variants={addingProductAnimVariant}
						initial='initial'
						animate='animate'
						exit='exit'
						className='success-or-error__processing'
					>
						<h2>Adding Product...</h2>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{productSuccessMsg && (
					<motion.div
						variants={successOrErrorMsgAnimVariant}
						initial='initial'
						animate='animate'
						exit='exit'
						className='success-or-error__message'
					>
						<h2>{productSuccessMsg}</h2>
						<div className='buttons'>
							<Button
								variant='only-text info'
								type='button'
								onClick={() => {
									dispatch(resetErrorOrSuccessProduct())
									backToProductList()
								}}
							>
								Go to Products List
							</Button>
							<Button
								variant='only-text info'
								type='button'
								onClick={() => {
									dispatch(resetErrorOrSuccessProduct())
									rerender()
								}}
							>
								Add Another Product
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{productErrorMsg && (
					<motion.div
						variants={successOrErrorMsgAnimVariant}
						initial='initial'
						animate='animate'
						exit='exit'
						className='success-or-error__message'
					>
						<h2>{productErrorMsg}</h2>
						<div>
							<Button
								variant='only-text info'
								type='button'
								onClick={() => {
									dispatch(resetErrorOrSuccessProduct())
									backToProductList()
								}}
							>
								Go to Products List
							</Button>
							<Button
								variant='only-text primary'
								type='button'
								onClick={() => {
									dispatch(resetErrorOrSuccessProduct())
									setFormStep(1)
								}}
							>
								Try Again
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export { StepOneForm, StepTwoForm, StepThreeForm, StepFourSuccessOrError }

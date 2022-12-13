import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { Input, ImageInput, Select, Button } from '../../../components'
import { resetErrorOrSuccessProduct } from '../../../redux/features/product-slice'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import processingAnimation from '../../lottie_animations/processingAnimation'
import successAnimation from '../../lottie_animations/successAnimation'
import errorAnimation from '../../lottie_animations/errorAnimation'
import './addFormSteps.css'
import { set } from 'react-hook-form'

const StepOneForm = ({ formStep, register, errors, formData }) => {

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

const StepTwoForm = ({
	formStep,
	register,
	errors,
	setValue,
	trigger,
	product,
	setImagesState
}) => {

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
				setValue={setValue}
				trigger={trigger}
				url={product?.images?.image_main?.thumbnail}
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
				url={product?.images?.image_1?.thumbnail}
				cb={() => setImagesState('image_1')}
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
				url={product?.images?.image_2?.thumbnail}
				cb={() => setImagesState('image_2')}
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
				url={product?.images?.image_3?.thumbnail}
				cb={() => setImagesState('image_3')}
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
				url={product?.images?.image_4?.thumbnail}
				cb={() => setImagesState('image_4')}
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
				url={product?.images?.image_5?.thumbnail}
				cb={() => setImagesState('image_5')}
			/>
		</div>
	)
}

const StepThreeForm = ({ formStep, register, errors, properties }) => {
	const renderSpecsInput = properties => {
		return properties.map((property, index) => {
			return (
				<div
					key={index}
					className='spec-input'
				>
					<Input
						label={property.label}
						name={property.name}
						type='text'
						placeholder={property.placeholder}
						register={register}
						message={errors[property.name]?.message}
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
			{properties && renderSpecsInput(properties)}
		</div>
	)
}

const StepFourSuccessOrError = ({
	formStep,
	backToProductList,
	setFormStep,
	rerender,
}) => {
	const { updatingProduct, productSuccessMsg, productErrorMsg } = useSelector(
		state => state.product
	)
	const pseLottieContainer = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		let pAnim, sAnim, eAnim
		if (updatingProduct) {
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
	}, [updatingProduct, productSuccessMsg, productErrorMsg])

	const updatingProductAnimVariant = {
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
				{updatingProduct && (
					<motion.div
						variants={updatingProductAnimVariant}
						initial='initial'
						animate='animate'
						exit='exit'
						className='success-or-error__processing'
					>
						<h2>Updating Product...</h2>
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
								Edit
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

import { useSelector } from 'react-redux'
import { useState } from 'react'
import * as md from 'react-icons/md'
import { Input, Button, Modal, Select } from '../../../components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productValidation } from '../../../validation/product-validation'

function ProductCreate(props) {
	const { backToProductList } = props
	const { categories, parentCategories } = useSelector(state => state.category)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(productValidation),
	})
	const [formStep, setFormStep] = useState(1)

	const options = parentCategories.map(parent => ({
		name: parent.name,
		value: parent._id,
	}))


	const stepOneForm = () => {
		return (
			<div className='step-one'>
				<Input
					label='Product Name'
					name='name'
					type='text'
					placeholder='e.g. Asus ROG Strix LC 240 RGB White Edition'
					register={register}
					errors={errors.name?.message}
				/>
				<Input
					label='Brand'
					name='brand'
					type='text'
					placeholder='e.g. Asus'
					register={register}
					errors={errors.name?.message}
				/>
				<Input
					label='Product Description'
					name='description'
					type='textarea'
					placeholder='Write a short description about the product'
					register={register}
					errors={errors.name?.message}
				/>
				<div className='categories'>
					<Select
						name='topLevelCat'
						label='Top Level Category'
						options={options}
						onChange={() => {}}
						value=''
						placeholder='-- Select One --'
					/>
					<Select
						name='secondLevelCat'
						label='Second Level Category'
						options={options}
						onChange={() => {}}
						value=''
						placeholder='-- Select One --'
					/>
					<Select
						name='thirdLevelCat'
						label='Third Level Category'
						options={options}
						onChange={() => {}}
						value=''
						placeholder='-- Select One --'
					/>
				</div>
				<div className='prices'>
					<Input
						label='Price ₹'
						name='price'
						type='number'
						placeholder='e.g. 1024'
						register={register}
						errors={errors.price?.message}
					/>
					<Input
						label='MRP ₹'
						name='mrp'
						type='number'
						placeholder='e.g. 1199'
						register={register}
						errors={errors.price?.message}
					/>
					<Input
						label='Stock'
						name='stock'
						type='number'
						placeholder='e.g. 100'
						register={register}
						errors={errors.stock?.message}
					/>
				</div>
			</div>
		)
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
				</div>
				<form noValidate>
					{formStep === 1 && (
						stepOneForm()
					)}

					<div className='button-container'>
						<Button
							className='outline'
							onClick={() => {
								setFormStep(formStep - 1)
							}}

						>
							<md.MdArrowBack /> Back
						</Button>
						<Button
							className='outline'	
							onClick={() => {
								setFormStep(formStep + 1)
							}}
						>
							Next <md.MdArrowForward />
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProductCreate

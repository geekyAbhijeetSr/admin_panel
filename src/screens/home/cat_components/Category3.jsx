import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Select } from '../../../components'
import * as md from 'react-icons/md'
import {
	catValidation21,
} from '../../../validation/category-validation'
import { CatFormModal2 } from './CatModal'
import CatTable from './CatTable'

function Category3(props) {
	const {
		selectedCategory1,
		selectedCategory2,
		changeHandler1,
		changeHandler2,
	} = props
	const { categories, parentCategories } = useSelector(state => state.category)

	const [isModalOpen, setIsModalOpen] = useState(false)

	let secondLayerCat = []
	if (categories && categories.length > 0) {
		secondLayerCat = categories.filter(
			category => category.parentId === selectedCategory1
		)
	}

	let thirdLayerCat = []
	if (categories && categories.length > 0) {
		thirdLayerCat = categories.filter(
			category => category.parentId === selectedCategory2
		)
	}

	const changeHandler = e => {
		changeHandler1(e)
		secondLayerCat = []
		thirdLayerCat = []
	}

	// add category modal open and close
	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	

	// creating options
	const options = parentCategories.map(parent => ({
		name: parent.name,
		value: parent._id,
	}))

	// creating options2
	const options2 = secondLayerCat.map(second => ({
		name: second.name,
		value: second._id,
	}))

	return (
		<div>
			<CatFormModal2
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				validation={catValidation21}
				parentId={selectedCategory2}
				placeholder='e.g. Ryzen 9 Series'
			/>
			
			<div className='add-button-container'>
				<div className='selects'>
					<Select
						name='top-level-category'
						label='Top Level Category'
						options={options}
						onChange={changeHandler}
						value={selectedCategory1}
						placeholder='-- Select One --'
					/>
					<Select
						name='second-level-category'
						label='Second Level Category'
						options={options2}
						onChange={changeHandler2}
						value={selectedCategory2}
						placeholder='-- Select One --'
					/>
				</div>
				<Button
					variant='outline primary'
					disabled={selectedCategory2 ? false : true}
					onClick={handleOpenModal}
				>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<CatTable
				categoriesList={thirdLayerCat}
				condition={
					thirdLayerCat &&
					thirdLayerCat.length > 0 &&
					selectedCategory1 &&
					selectedCategory2
				}
				layer={3}
				selectedCategory={selectedCategory1}
				selectedCategory2={selectedCategory2}
			/>
		</div>
	)
}

export default Category3

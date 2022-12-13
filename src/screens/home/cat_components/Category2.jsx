import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Select } from '../../../components'
import * as md from 'react-icons/md'
import { catValidation1 } from '../../../validation/category-validation'
import { CatFormModal } from './CatModal'
import CatTable from './CatTable'

function Category2(props) {
	const {
		selectedCategory,
		changeHandler,
		prevSelectedOption,
		unselectCatOption,
	} = props
	const { categories, parentCategories } = useSelector(state => state.category)

	const [isModalOpen, setIsModalOpen] = useState(false)

	let secondLayerCat = []
	if (categories && categories.length > 0) {
		secondLayerCat = categories.filter(
			category => category.parentId === selectedCategory
		)
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

	return (
		<div>
			<CatFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				validation={catValidation1}
				parentId={selectedCategory}
				placeholder='e.g. AMD'
			/>
			<div className='add-button-container'>
				<div>
					<Select
						name='top-level-category'
						label='Top Level Category'
						options={options}
						onChange={changeHandler}
						value={selectedCategory}
						placeholder='-- Select One --'
					/>
				</div>
				<Button
					variant='outline primary'
					disabled={selectedCategory ? false : true}
					onClick={handleOpenModal}
				>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<CatTable
				categoriesList={secondLayerCat}
				condition={secondLayerCat && secondLayerCat.length > 0}
				layer={2}
				selectedCategory={selectedCategory}
				unselectCatOption={unselectCatOption}
				prevSelectedOption={prevSelectedOption}
			/>
		</div>
	)
}

export default Category2

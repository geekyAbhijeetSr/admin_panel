import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../../../components'
import * as md from 'react-icons/md'
import { catValidation1 } from '../../../validation/category-validation'
import { CatFormModal } from './CatModal'
import CatTable from './CatTable'

function Category1(props) {
	const {
		unselectCatOption,
		prevSelectedOption,
		unselectCatOption2,
		prevSelectedOption2,
	} = props
	const { parentCategories } = useSelector(state => state.category)

	const [isModalOpen, setIsModalOpen] = useState(false)

	// add category modal open and close
	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div>
			<CatFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				validation={catValidation1}
				placeholder='e.g. Processor'
			/>
			<div className='add-button-container only-button'>
				<Button variant='outline primary' onClick={handleOpenModal}>
					Add
					<md.MdAdd />
				</Button>
			</div>
			<CatTable
				categoriesList={parentCategories}
				condition={parentCategories && parentCategories.length > 0}
				layer={1}
				unselectCatOption={unselectCatOption}
				prevSelectedOption={prevSelectedOption}
				unselectCatOption2={unselectCatOption2}
				prevSelectedOption2={prevSelectedOption2}
			/>
		</div>
	)
}

export default Category1

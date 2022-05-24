import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../../../components'
import * as md from 'react-icons/md'
import {
	catValidation1,
	catValidation2,
} from '../../../validation/category-validation'
import { DelCatModal, CatFormModal } from './CatModal'
import CatTable from './CatTable'

function Category1() {
	const { parentCategories } = useSelector(state => state.category)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)

	const [prefillData, setPrefillData] = useState({})
	const [delCat, setDelCat] = useState({})

	// add category modal open and close
	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	// edit category modal open and close
	const handleOpenEditModal = category => {
		setPrefillData({
			id: category._id,
			name: category.name,
			active: category.active,
			url: category.image.url,
		})
		setIsEditModalOpen(true)
	}

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false)
		setPrefillData({})
	}

	// delete modal open and close
	const handleOpenDelModal = category => {
		setDelCat({
			id: category._id,
			name: category.name,
		})
		setIsDelModalOpen(true)
	}

	const handleCloseDelModal = () => {
		setDelCat({})
		setIsDelModalOpen(false)
	}

	return (
		<div>
			<CatFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				validation={catValidation1}
				placeholder='e.g. Processor'
			/>
			<CatFormModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				validation={catValidation2}
				prefillData={prefillData}
				placeholder='e.g. Processor'
			/>
			<DelCatModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delCat={delCat}
			/>

			<div className='add-container one'>
				<Button
					variant='outline primary'
					disabled={parentCategories ? false : true}
					onClick={handleOpenModal}
				>
					Add
					<md.MdAdd />
				</Button>
			</div>
			<CatTable
				categoriesList={parentCategories}
				condition={parentCategories && parentCategories.length > 0}
				message='Please Add a Category'
				handleOpenEditModal={handleOpenEditModal}
				handleOpenDelModal={handleOpenDelModal}
			/>
		</div>
	)
}

export default Category1

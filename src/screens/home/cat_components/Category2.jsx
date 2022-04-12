import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Select } from '../../../components'
import {
	catValidation1,
	catValidation2,
} from '../../../validation/category-validation'
import { CatFormModal, DelCatModal } from './CatModal'
import CatTable from './CatTable'

function Category2(props) {
	const { selectedCategory, changeHandler } = props
	const { categories, parentCategories } = useSelector(state => state.category)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)

	const [prefillData, setPrefillData] = useState({})
	const [delCat, setDelCat] = useState({})

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

	// edit category modal open and close
	const handleOpenEditModal = category => {
		setPrefillData({
			id: category._id,
			name: category.name,
			active: category.active,
			url: category.image.url,
			parentId: 'parentId' in category ? category.parentId : undefined,
		})
		setIsEditModalOpen(true)
	}

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false)
		setPrefillData({})
	}

	// delete category modal open and close
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

	// creating options
	const options = parentCategories.map(parent => ({
		name: parent.name,
		value: parent._id,
	}))

	const message = () => {
		if (!parentCategories || parentCategories.length === 0) {
			return 'Please first create top level catagories'
		} else if (selectedCategory === '') {
			return 'Please select a top level category'
		} else if (secondLayerCat.length === 0) {
			return 'List is empty, please create some categories'
		}
	}
	return (
		<div>
			<CatFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				validation={catValidation1}
				parentId={selectedCategory}
				placeholder='e.g. AMD'
			/>
			<CatFormModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				validation={catValidation2}
				prefillData={prefillData}
				placeholder='e.g. Intel'
			/>
			<DelCatModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delCat={delCat}
			/>
			<div className='add-container'>
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
					disabled={selectedCategory ? false : true}
					onClick={handleOpenModal}
				>
					Create
				</Button>
			</div>

			<CatTable
				categoriesList={secondLayerCat}
				condition={secondLayerCat && secondLayerCat.length > 0}
				message={message()}
				handleOpenEditModal={handleOpenEditModal}
				handleOpenDelModal={handleOpenDelModal}
			/>
		</div>
	)
}

export default Category2

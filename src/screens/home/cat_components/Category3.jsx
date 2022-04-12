import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Select } from '../../../components'
import {
	catValidation21,
	catValidation22,
} from '../../../validation/category-validation'
import { CatFormModal2, DelCatModal } from './CatModal'
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
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)

	const [prefillData, setPrefillData] = useState({})
	const [delCat, setDelCat] = useState({})

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

	// edit category modal open and close
	const handleOpenEditModal = category => {
		setPrefillData({
			id: category._id,
			name: category.name,
			active: category.active,
			attributeCollection: category.attributeCollection,
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

	// creating options2
	const options2 = secondLayerCat.map(second => ({
		name: second.name,
		value: second._id,
	}))

	const message = () => {
		if (!parentCategories || parentCategories.length === 0) {
			return 'Please first create top level catagories'
		} else if (selectedCategory1 === '') {
			return 'Please select a top level category'
		} else if (selectedCategory2 === '') {
			return 'Please select a second level category'
		} else if (thirdLayerCat.length === 0) {
			return 'List is empty, please create some categories'
		}
	}

	return (
		<div>
			<CatFormModal2
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				validation={catValidation21}
				parentId={selectedCategory2}
				placeholder='e.g. Ryzen 9 Series'
			/>
			<CatFormModal2
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				validation={catValidation22}
				prefillData={prefillData}
				placeholder='e.g. Intel Core i9'
			/>
			<DelCatModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delCat={delCat}
			/>
			<div className='add-container'>
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
					disabled={selectedCategory2 ? false : true}
					onClick={handleOpenModal}
				>
					Create
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
				message={message()}
				handleOpenEditModal={handleOpenEditModal}
				handleOpenDelModal={handleOpenDelModal}
				thirdLayer={true}
			/>
		</div>
	)
}

export default Category3

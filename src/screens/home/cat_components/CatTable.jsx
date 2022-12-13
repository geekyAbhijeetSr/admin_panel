import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toggleActiveStatusCategory } from '../../../redux/features/category-slice'
import { DelCatModal, CatFormModal, CatFormModal2 } from './CatModal'
import {
	catValidation2,
	catValidation22,
} from '../../../validation/category-validation'
import emptyBoxAnimation from '../../lottie_animations/emptyBoxAnimation'
import optionsAnimation from '../../lottie_animations/optionsAnimation'
import CatTableRow from './CatTableRow'

function CatTable(props) {
	const {
		categoriesList,
		condition,
		layer,
		selectedCategory,
		selectedCategory2,
		unselectCatOption,
		prevSelectedOption,
		unselectCatOption2,
		prevSelectedOption2,
	} = props
	const emptyBoxContainer = useRef()
	const optionsContainer = useRef()
	const dispatch = useDispatch()

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isEditModal2Open, setIsEditModal2Open] = useState(false)
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)
	const [prefillData, setPrefillData] = useState({})
	const [delCat, setDelCat] = useState({})

	useEffect(() => {
		const animation = emptyBoxAnimation(emptyBoxContainer)
		const animation2 = optionsAnimation(optionsContainer)
		return () => {
			animation.destroy()
			animation2.destroy()
		}
	}, [selectedCategory, selectedCategory2, categoriesList.length])

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

	// edit category modal open and close for third layer
	const handleOpenEditModal2 = category => {
		setPrefillData({
			id: category._id,
			name: category.name,
			active: category.active,
			attributeCollection: category.attributeCollection,
			url: category.image.url,
			parentId: 'parentId' in category ? category.parentId : undefined,
		})
		setIsEditModal2Open(true)
	}

	const handleCloseEditModal2 = () => {
		setIsEditModal2Open(false)
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

	const onToggle = category => {
		const payload = {
			categoryId: category._id,
		}
		dispatch(toggleActiveStatusCategory(payload))
	}

	const cat2message = () => {
		if (selectedCategory === '') {
			return (
				<>
					<div className='options' ref={optionsContainer}></div>
					<p>Please select a top level category</p>
				</>
			)
		} else if (categoriesList.length === 0) {
			return (
				<>
					<div className='empty-box' ref={emptyBoxContainer}></div>
					<p>Category is empty</p>
				</>
			)
		}
	}

	const cat3message = () => {
		if (selectedCategory === '') {
			return (
				<>
					<div className='options' ref={optionsContainer}></div>
					<p>Please select a top level category</p>
				</>
			)
		} else if (selectedCategory2 === '') {
			return (
				<>
					<div className='options' ref={optionsContainer}></div>
					<p>Please select a second level category</p>
				</>
			)
		} else if (categoriesList.length === 0) {
			return (
				<>
					<div className='empty-box' ref={emptyBoxContainer}></div>
					<p>Category is empty</p>
				</>
			)
		}
	}

	return (
		<>
			<CatFormModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				validation={catValidation2}
				prefillData={prefillData}
				placeholder='e.g. Processor'
			/>
			<CatFormModal2
				isOpen={isEditModal2Open}
				onClose={handleCloseEditModal2}
				validation={catValidation22}
				prefillData={prefillData}
				placeholder='e.g. Intel Core i9'
			/>
			<DelCatModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delCat={delCat}
				layer={layer}
				unselectCatOption={unselectCatOption}
				prevSelectedOption={prevSelectedOption}
				unselectCatOption2={unselectCatOption2}
				prevSelectedOption2={prevSelectedOption2}
			/>
			<div className='table-container'>
				<table className='table'>
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Image</th>
							{layer !== 3 && <th className='center'>Sub Categories</th>}
							<th>Active</th>
							{layer === 3 && <th>Attribute Collection</th>}
							<th>Actions</th>
						</tr>
					</thead>

					{condition ? (
						<tbody>
							{categoriesList.map((category, index) => (
								<CatTableRow
									key={category._id}
									category={category}
									thirdLayer={layer === 3}
									onToggle={onToggle}
									handleOpenEditModal={handleOpenEditModal}
									handleOpenEditModal2={handleOpenEditModal2}
									handleOpenDelModal={handleOpenDelModal}
								/>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td className='items-not-found' colSpan={5}>
									{layer === 1 && (
										<>
											<div className='empty-box' ref={emptyBoxContainer}></div>
											<p>Top level category is empty</p>
										</>
									)}

									{layer === 2 && cat2message()}

									{layer === 3 && cat3message()}
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</>
	)
}

export default CatTable

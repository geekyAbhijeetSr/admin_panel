import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Select } from '../../../components'
import * as md from 'react-icons/md'
import { AttributeFormModal, DelAttributeModal } from './AttributeModal'
import AttributeTable from './AttributeTable'

function AttributesList(props) {
	const { selectedCollection, changeSelectedCollection } = props

	const { collections } = useSelector(state => state.attribute)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)

	const [prefillData, setPrefillData] = useState(null)
	const [attributeId, setAttributeId] = useState(null)
	const [delAttribute, setDelAttribute] = useState(null)

	const collection = collections.find(coll => coll._id === selectedCollection)
	const attributeList = collection ? collection.attributes : []

	// add attribute form modal open and close
	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	// edit attribute form modal open and close
	const handleOpenEditModal = attribute => {
		setAttributeId(attribute._id)
		setPrefillData({
			name: attribute.name,
			placeholder: attribute.placeholder,
		})
		setIsEditModalOpen(true)
	}

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false)
		setPrefillData(null)
	}

	// delete modal open and close
	const handleOpenDelModal = attribute => {
		setDelAttribute(attribute)
		setIsDelModalOpen(true)
	}

	const handleCloseDelModal = () => {
		setDelAttribute(null)
		setIsDelModalOpen(false)
	}

	const collectionOptions = collections.map(collection => ({
		value: collection._id,
		name: collection.name,
	}))

	return (
		<div>
			<AttributeFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				placeholder='Series'
				collectionId={selectedCollection}
			/>
			<AttributeFormModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				placeholder='Series'
				collectionId={selectedCollection}
				attributeId={attributeId}
				prefillData={prefillData}
			/>
			<DelAttributeModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				id={selectedCollection}
				delAttribute={delAttribute}
			/>

			<div className='add-button-container'>
				<div>
					<Select
						name='attribute-collection'
						label='Attribute Collections'
						options={collectionOptions || []}
						onChange={changeSelectedCollection}
						value={selectedCollection}
						placeholder='-- Select One --'
					/>
				</div>
				<Button
					variant='outline primary'
					disabled={selectedCollection ? false : true}
					onClick={handleOpenModal}
				>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<AttributeTable
				attributeList={attributeList}
				condition={attributeList.length > 0}
				id={selectedCollection}
				selectedCollection={selectedCollection}
				handleOpenEditModal={handleOpenEditModal}
				handleOpenDelModal={handleOpenDelModal}
			/>
		</div>
	)
}

export default AttributesList

import { useState } from 'react'
import { Button } from '../../../components'
import * as md from 'react-icons/md'
import CollectionTable from './CollectionTable'
import { CollectionFormModal, DelCollectionModal } from './CollectionModal'
import { useSelector } from 'react-redux'

function AttributeCollections(props) {
	const { selectedCollection, setSelectedCollection } = props
	const { collections } = useSelector(state => state.attribute)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)

	const [prefillData, setPrefillData] = useState({})
	const [delCollection, setDelCollection] = useState({})

	// add collection form modal open and close
	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	// edit collection form modal open and close
	const handleOpenEditModal = collection => {
		setPrefillData({
			collectionId: collection._id,
			name: collection.name,
		})
		setIsEditModalOpen(true)
	}

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false)
		setPrefillData({})
	}

	// delete modal open and close
	const handleOpenDelModal = category => {
		setDelCollection({
			id: category._id,
			name: category.name,
		})
		setIsDelModalOpen(true)
	}

	const handleCloseDelModal = () => {
		setDelCollection({})
		setIsDelModalOpen(false)
	}

	return (
		<div>
			<CollectionFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
			<CollectionFormModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				prefillData={prefillData}
			/>
			<DelCollectionModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delCollection={delCollection}

				selectedCollection={selectedCollection}
				setSelectedCollection={setSelectedCollection}
			/>
			<div className='add-button-container only-button'>
				<Button variant='outline primary' onClick={handleOpenModal}>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<CollectionTable
				collectionsList={collections}
				condition={collections && collections.length > 0}
				message='Please create an attribute collection'
				handleOpenEditModal={handleOpenEditModal}
				handleOpenDelModal={handleOpenDelModal}
			/>
		</div>
	)
}

export default AttributeCollections

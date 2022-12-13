import emptyBoxAnimation from '../../lottie_animations/emptyBoxAnimation'
import { useRef, useEffect } from 'react'
import { toggleActiveStatusCollection } from '../../../redux/features/attribute-slice'
import { useDispatch } from 'react-redux'
import CollectionTableRow from './CollectionTableRow'

function CollectionTable(props) {
	const {
		collectionsList,
		condition,
		message,
		handleOpenDelModal,
		handleOpenEditModal,
	} = props
	const dispatch = useDispatch()

	const emptyBoxContainer = useRef()

	useEffect(() => {
		const animation = emptyBoxAnimation(emptyBoxContainer)
		return () => {
			animation.destroy()
		}
	}, [collectionsList.length])

	const onToggle = collection => {
		dispatch(toggleActiveStatusCollection(collection))
	}

	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						<th>Collection Name</th>
						<th>Attributes</th>
						<th>Active</th>
						<th>Actions</th>
					</tr>
				</thead>

				{condition ? (
					<tbody>
						{collectionsList.map(collection => (
							<CollectionTableRow
								key={collection._id}
								collection={collection}
								onToggle={onToggle}
								handleOpenDelModal={handleOpenDelModal}
								handleOpenEditModal={handleOpenEditModal}
							/>
						))}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td className='items-not-found' colSpan='5'>
								<div className='empty-box' ref={emptyBoxContainer}></div>
								<p>{message}</p>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

export default CollectionTable

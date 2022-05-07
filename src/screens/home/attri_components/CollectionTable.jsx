import * as md from 'react-icons/md'
import emptyList from '../../../assets/images/empty-list.svg'
import { Switch } from '../../../components'
import { toggleActiveStatusCollection } from '../../../redux/features/attribute-slice'
import { useDispatch } from 'react-redux'

function CollectionTable(props) {
	const {
		collectionsList,
		condition,
		message,
		handleOpenDelModal,
		handleOpenEditModal,
	} = props
	const dispatch = useDispatch()

	const onToggle = collection => {
		dispatch(toggleActiveStatusCollection(collection))
	}

	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						<th>#</th>
						<th>Collection Name</th>
						<th className='center'>Attributes</th>
						<th>Active</th>
						<th>Actions</th>
					</tr>
				</thead>

				{condition ? (
					<tbody>
						{collectionsList.map((collection, index) => (
							<tr key={collection._id}>
								<td>{index + 1}</td>
								<td>{collection.name}</td>
								<td className='center'>{collection.attributes.length}</td>
								<td>
									<Switch
										onClick={() => onToggle(collection)}
										active={collection.active}
									/>
								</td>
								<td className='action'>
									<md.MdEdit
										className='edit'
										onClick={() => handleOpenEditModal(collection)}
									/>
									<md.MdDelete
										className='delete'
										onClick={() => handleOpenDelModal(collection)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td
								className='items-not-found'
								colSpan='5'
								style={{ textAlign: 'center' }}
							>
								<img src={emptyList} alt='' />
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

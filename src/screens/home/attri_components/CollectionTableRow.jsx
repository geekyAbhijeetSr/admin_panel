import * as md from 'react-icons/md'
import { Switch } from '../../../components'

function CollectionTableRow(props) {
	const { collection, onToggle, handleOpenDelModal, handleOpenEditModal } =
		props

	return (
		<tr key={collection._id}>
			<td>{collection.name}</td>
			<td>{collection.attributes.length}</td>
			<td>
				<Switch
					checked={collection.active}
					onChange={() => onToggle(collection)}
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
	)
}

export default CollectionTableRow

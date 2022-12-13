import * as md from 'react-icons/md'
import { textAbstract } from '../../../helper/util'
import { Switch } from '../../../components'


function AttributeTableRow(props) {
	const { attribute, onToggle, handleOpenDelModal, handleOpenEditModal } = props
	return (
		<tr key={attribute._id}>
			<td className='name'>{textAbstract(attribute.name, 20)}</td>
			<td className='placeholder'>{textAbstract(attribute.placeholder, 20)}</td>
			<td>
				<Switch
					checked={attribute.active}
					onChange={() => onToggle(attribute)}
				/>
			</td>
			<td className='action'>
				<md.MdEdit
					className='edit'
					onClick={() => handleOpenEditModal(attribute)}
				/>
				<md.MdDelete
					className='delete'
					onClick={() => handleOpenDelModal(attribute)}
				/>
			</td>
		</tr>
	)
}

export default AttributeTableRow

import * as md from 'react-icons/md'
import emptyList from '../../../assets/images/empty-list.svg'
import { Switch } from '../../../components'
import { useDispatch } from 'react-redux'
import { toggleActiveStatusAttribute } from '../../../redux/features/attribute-slice'

function AttributeTable(props) {
	const {
		attributeList,
		condition,
		id,
		message,
		handleOpenDelModal,
		handleOpenEditModal,
	} = props

	const dispatch = useDispatch()

	const onToggle = (attribute) => {
		const payload = {
			id,
			attributeId: attribute._id,
		}
		dispatch(toggleActiveStatusAttribute(payload))
	}

	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						<th>#</th>
						<th>Attribute Name</th>
						<th>Type</th>
						<th>Active</th>
						<th>Actions</th>
					</tr>
				</thead>

				{condition ? (
					<tbody>
						{attributeList.map((attribute, index) => (
							<tr key={attribute._id}>
								<td className='no'>{index + 1}</td>
								<td className='name'>{attribute.name}</td>
								<td className='type'>{attribute.type === 'text' ? "Text" : (attribute.type === "text-array") ? "Text Array": ""}</td>
								<td>
									<Switch
										active={attribute.active}
										onClick={() => onToggle(attribute)}
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
						))}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td
								className='items-not-found'
								colSpan='4'
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

export default AttributeTable

import * as md from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Switch } from '../../../components'

function CatTableRow(props) {
	const {
		category,
		thirdLayer,
		onToggle,
		handleOpenEditModal,
		handleOpenEditModal2,
		handleOpenDelModal,
    } = props
    const { categories } = useSelector(state => state.category)

	return (
		<tr key={category._id}>
			<td className='name'>{category.name}</td>
			<td className='image'>
				<img src={category.image?.url} alt={category.name} />
			</td>
			{!thirdLayer && (
				<td className='center'>
					{categories.filter(cat => cat.parentId === category._id).length}
				</td>
			)}

			<td>
				<Switch checked={category.active} onChange={() => onToggle(category)} />
			</td>
			{thirdLayer && <td>{category.attributeCollection === null ? "--" : category.attributeCollection.name}</td>}
			<td className='action'>
				<md.MdEdit
					className='edit'
					onClick={() => {
						if (thirdLayer) {
							handleOpenEditModal2(category)
						} else {
							handleOpenEditModal(category)
						}
					}}
				/>
				<md.MdDelete
					className='delete'
					onClick={() => handleOpenDelModal(category)}
				/>
			</td>
		</tr>
	)
}

export default CatTableRow

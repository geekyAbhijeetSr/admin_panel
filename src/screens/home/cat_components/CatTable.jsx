import * as md from 'react-icons/md'
import emptyList from '../../../assets/images/empty-list.svg'
import { useSelector, useDispatch } from 'react-redux'
import { toggleActiveStatusCategory } from '../../../redux/features/category-slice'
import { Switch } from '../../../components'

function CatTable(props) {
	const { categories } = useSelector(state => state.category)
	const {
		categoriesList,
		condition,
		message,
		handleOpenDelModal,
		handleOpenEditModal,
		thirdLayer,
	} = props

	const dispatch = useDispatch()

	const onToggle = (category) => {
		const payload = {
			categoryId: category._id,
		}
		dispatch(toggleActiveStatusCategory(payload))		
	}

	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						<th>#</th>
						<th>Category Name</th>
						<th>Image</th>
						{!thirdLayer && <th className='center'>Sub Categories</th>}
						<th>Active</th>
						{thirdLayer && <th>Attribute Collection</th>}
						<th>Actions</th>
					</tr>
				</thead>

				{condition ? (
					<tbody>
						{categoriesList.map((category, index) => (
							<tr key={category._id}>
								<td className='no'>{index + 1}</td>
								<td className='name'>{category.name}</td>
								<td className='image'>
									<img src={category.image?.url} alt={category.name} />
								</td>
								{!thirdLayer && (
									<td className='center'>
										{
											categories.filter(cat => cat.parentId === category._id)
												.length
										}
									</td>
								)}

								<td>
									<Switch
										onClick={() => onToggle(category)}
										active={category.active}
									/>
								</td>
								{thirdLayer && (
									<td>{category.attributeCollection.name}</td>)}
								<td className='action'>
									<md.MdEdit
										className='edit'
										onClick={() => {
											handleOpenEditModal(category)
										}}
									/>
									<md.MdDelete
										className='delete'
										onClick={() => handleOpenDelModal(category)}
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
								colSpan={thirdLayer ? 5 : 6}
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

export default CatTable

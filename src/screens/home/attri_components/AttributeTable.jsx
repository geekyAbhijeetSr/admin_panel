import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import emptyBoxAnimation from '../../lottie_animations/emptyBoxAnimation'
import optionsAnimation from '../../lottie_animations/optionsAnimation'
import { toggleActiveStatusAttribute } from '../../../redux/features/attribute-slice'
import AttributeTableRow from './AttributeTableRow'

function AttributeTable(props) {
	const {
		attributeList,
		condition,
		id,
		selectedCollection,
		handleOpenDelModal,
		handleOpenEditModal,
	} = props

	const dispatch = useDispatch()
	const emptyBoxContainer = useRef()
	const optionsContainer = useRef()

	useEffect(() => {
		const animation = emptyBoxAnimation(emptyBoxContainer)
		const animation2 = optionsAnimation(optionsContainer)
		return () => {
			animation.destroy()
			animation2.destroy()
		}
	}, [selectedCollection, attributeList.length])

	const onToggle = attribute => {
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
						<th>Attribute Name</th>
						<th>Placeholder</th>
						<th>Active</th>
						<th>Actions</th>
					</tr>
				</thead>

				{condition ? (
					<tbody>
						{attributeList.map(attribute => (
							<AttributeTableRow
								key={attribute._id}
								attribute={attribute}
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
								{selectedCollection ? (
									<>
										<div className='empty-box' ref={emptyBoxContainer}></div>
										<p>No attributes found, please add some attributes</p>
									</>
								) : (
									<>
										<div className='options' ref={optionsContainer}></div>
										<p>Please select an attribute collection</p>
									</>
								)}
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

export default AttributeTable

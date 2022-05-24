import * as md from 'react-icons/md'
import emptyList from '../../../assets/images/empty-list.svg'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleActiveStatusCategory } from '../../../redux/features/category-slice'
import { Switch } from '../../../components'

function ProductTable(props) {
	const {
		productsList,
		justAddedProducts,
		condition,
		message,
		handleOpenDelModal,
		handleOpenEditModal,
	} = props

	const dispatch = useDispatch()

	const onToggle = product => {
		// dispatch(toggleActiveStatusCategory(payload))
		console.log('toggling')
	}

	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						<th>Image</th>
						<th>Product Name</th>
						<th>Category</th>
						<th>Active</th>
						<th>Actions</th>
					</tr>
				</thead>

				{condition ? (
					<tbody>
						{Array.isArray(justAddedProducts) &&
							justAddedProducts.length > 0 &&
							justAddedProducts.map((product, index) => (
								<tr key={product._id}>
									<td className='image'>
										<img src={product.images[0].thumbnail} alt='' />
									</td>
									<td className='name'>{product?.name}</td>
									<td className='category'>
										{`${product?.category?.topLevel?.name} > 									
									${product?.category?.secondLevel?.name} >
									${product?.category?.thirdLevel?.name}`}
									</td>
									<td className='active'>
										<Switch
											checked={product.active}
											onChange={() => onToggle(product)}
										/>
									</td>
								</tr>
							))}
						{productsList.map((product, index) => (
							<tr key={product._id}>
								<td className='image'>
									<img src={product.images[0].thumbnail} alt='' />
								</td>
								<td className='name'>{product?.name}</td>
								<td className='category'>
									{`${product?.category?.topLevel?.name} > 									
									${product?.category?.secondLevel?.name} >
									${product?.category?.thirdLevel?.name}`}
								</td>
								<td className='active'>
									<Switch
										checked={product.active}
										onChange={() => onToggle(product)}
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
								colSpan={4}
								style={{ textAlign: 'center' }}
							>
								<img src={emptyList} alt='' />
								<p>Add Products</p>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

export default ProductTable

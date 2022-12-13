import ProductTableRowSkeleton from './ProductTableRowSkeleton'

function ProductTableSkeleton() {
	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Image</th>
						<th>Category</th>
						<th>Active</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{Array.from({ length: 20 }).map((_, index) => (
						<ProductTableRowSkeleton key={index} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ProductTableSkeleton

import CollectionTableRowSkeleton from './CollectionTableRowSkeleton'

function CollectionTableSkeleton() {
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

				<tbody>
					{Array.from({ length: 20 }).map((_, index) => (
						<CollectionTableRowSkeleton key={index} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CollectionTableSkeleton

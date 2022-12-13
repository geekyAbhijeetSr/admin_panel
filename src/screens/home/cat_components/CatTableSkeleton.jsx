import CatTableRowSkeleton from "./CatTableRowSkeleton"

function CatTableSkeleton() {
	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
						<tr>
							<th>Category Name</th>
							<th>Image</th>
							<th>Sub Categories</th>
							<th>Active</th>
							<th>Actions</th>
						</tr>
				</thead>

                <tbody>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <CatTableRowSkeleton key={index} />
                    ))}
                </tbody>
			</table>
		</div>
	)
}

export default CatTableSkeleton

import Skeleton from 'react-loading-skeleton'

function CollectionTableRowSkeleton() {
	return (
		<tr>
			{Array.from({ length: 4 }).map((_, index) => (
				<td key={index}>
					<Skeleton height={'20px'} />
				</td>
			))}
		</tr>
	)
}

export default CollectionTableRowSkeleton

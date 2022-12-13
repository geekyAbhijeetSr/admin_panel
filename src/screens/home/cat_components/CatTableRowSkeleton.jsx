import Skeleton from 'react-loading-skeleton'

function CatTableRowSkeleton() {
	return (
		<tr>
			<td>
				<Skeleton height={'20px'} />
			</td>
			<td>
				<Skeleton width={'40px'} height={'40px'} />
			</td>
			{Array.from({ length: 3 }).map((_, index) => (
				<td key={index}>
					<Skeleton height={'20px'} />
				</td>
			))}
		</tr>
	)
}

export default CatTableRowSkeleton

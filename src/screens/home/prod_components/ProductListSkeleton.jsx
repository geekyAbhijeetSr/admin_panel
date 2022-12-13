import { Button } from '../../../components'
import * as md from 'react-icons/md'
import ProductTableSkeleton from './ProductTableSkeleton'

function ProductListSkeleton(props) {
	const { openForm } = props

	return (
		<div>
			<div className='add-button-container only-button'>
				<Button variant='outline primary' disabled={true} onClick={openForm}>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<ProductTableSkeleton />
		</div>
	)
}

export default ProductListSkeleton

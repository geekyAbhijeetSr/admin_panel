import { useSelector } from 'react-redux'
import { Button } from '../../../components'
import * as md from 'react-icons/md'
import ProductTable from './ProductTable'

function ProductList(props) {
	const { openForm } = props
	const { justAddedProducts, products } = useSelector(state => state.product)

	return (
		<div>
			<div className='add-container one'>
				<Button variant='outline primary' onClick={openForm}>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<ProductTable
				productsList={products?.docs}
				justAddedProducts={justAddedProducts}
				condition={products?.docs.length > 0}
			/>
		</div>
	)
}

export default ProductList

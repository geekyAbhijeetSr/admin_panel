import { Button } from '../../../components'
import * as md from 'react-icons/md'
import ProductTable from './ProductTable'

function ProductList(props) {
	const { openForm, openUpdateForm, openProductDetails } = props

	return (
		<div>
			<div className='add-button-container only-button'>
				<Button variant='outline primary' onClick={openForm}>
					Add
					<md.MdAdd />
				</Button>
			</div>

			<ProductTable openProductDetails={openProductDetails} openUpdateForm={openUpdateForm} />
		</div>
	)
}

export default ProductList

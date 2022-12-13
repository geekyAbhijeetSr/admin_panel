import * as md from 'react-icons/md'
import { Switch } from '../../../components'
import { textAbstract } from '../../../helper/util'

const ProductTableRow = ({
	product,
	onToggle,
	handleOpenDelModal,
	openProductDetails,
	openUpdateForm,
}) => {
	return (
		<tr>
			<td
				className='name'
				onClick={() => openProductDetails(product)}
				style={{
					cursor: 'pointer',
					textDecoration: 'underline'
				}}
			>
				{textAbstract(product?.name, 22)}
			</td>
			<td className='image'>
				<img src={product.images.image_main.thumbnail} alt='' />
			</td>
			<td
				className='category'
				style={{
					cursor: 'default',
				}}
			>
				{`${product?.category?.topLevel?.name} > 									
									${product?.category?.secondLevel?.name} >
									${product?.category?.thirdLevel?.name}`}
			</td>
			<td className='active'>
				<Switch checked={product.active} onChange={() => onToggle(product)} />
			</td>
			<td className='action'>
				<md.MdEdit className='edit' onClick={() => openUpdateForm(product)} />
				<md.MdDelete
					className='delete'
					onClick={() => handleOpenDelModal(product)}
				/>
			</td>
		</tr>
	)
}

export default ProductTableRow

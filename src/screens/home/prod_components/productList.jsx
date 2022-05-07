import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../../../components'

function ProductList(props) {
	const { openForm } = props
	return (
		<div>
			<div className='add-container one'>
				<Button onClick={openForm}>Create</Button>
			</div>
			<h1>Product List</h1>
		</div>
	)
}

export default ProductList

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner2 } from '../../components'
import { getCategory } from '../../redux/features/category-slice'
import { getProducts } from '../../redux/features/product-slice'
import { ProductList, ProductCreate } from './prod_components'
import './styles/product.css'

function Products() {
	const [activePage, setActivePage] = useState('ProductList')
	const { isLoadingCat } = useSelector(
		state => state.category
	)

	const dispatch = useDispatch()

	const openProductForm = () => {
		setActivePage('ProductCreate')
	}

	const backToProductList = () => {
		setActivePage('ProductList')
	}

	useEffect(() => {
		dispatch(getCategory())
		dispatch(getProducts({ page: 1, limit: 12 }))
	}, [dispatch])

	const renderComponent = () => {
		switch (activePage) {
			case 'ProductList':
				return <ProductList openForm={openProductForm} />
			case 'ProductCreate':
				return <ProductCreate backToProductList={backToProductList} />
			default:
				return null
		}
	}
	return (
		<div className='products_container'>
			<div className='content'>{renderComponent()}</div>
		</div>
	)
}

export default Products

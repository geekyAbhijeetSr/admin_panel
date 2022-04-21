import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner2 } from '../../components'
import { toast } from 'react-toastify'
import { getCategory, resetCat } from '../../redux/features/category-slice'
import { ProductList, ProductCreate } from './prod_components'
import './styles/product.css'

function Products() {
	const [activePage, setActivePage] = useState("ProductList")
	const { isLoadingCat, messageCat, errorCat } = useSelector(state => state.category)

	const dispatch = useDispatch()

	const openProductForm = () => {
		setActivePage("ProductCreate")
	}

	const backToProductList = () => {
		setActivePage("ProductList")
	}

	useEffect(() => {
		dispatch(getCategory())
		if (errorCat) {
			toast.error(errorCat)
			dispatch(resetCat())
		}
		if (messageCat) {
			toast.success(messageCat)
			dispatch(resetCat())
		}
	}, [dispatch, errorCat, messageCat])

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
		<div className='content'>
			{renderComponent()}
		</div>
	)
}

export default Products

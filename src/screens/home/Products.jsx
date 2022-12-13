import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../redux/features/category-slice'
import { getProducts } from '../../redux/features/product-slice'
import {
	ProductList,
	ProductCreate,
	ProductUpdate,
	ProductDetails,
	ProductListSkeleton,
} from './prod_components'

function Products() {
	const [activePage, setActivePage] = useState('ProductList')
	const [product, setProduct] = useState({})
	const { fetchingProducts, isInitialFetchProducts } = useSelector(
		state => state.product
	)
	const { fetchingCategory, isInitialFetchCategory } = useSelector(
		state => state.category
	)

	const [key, setKey] = useState(0)

	const dispatch = useDispatch()

	const openProductForm = () => {
		setActivePage('ProductCreate')
	}

	const openProductUpdateForm = (product) => {
		setProduct(product)
		setActivePage('ProductUpdate')
	}

	const backToProductList = () => {
		setActivePage('ProductList')
	}

	const backToProductDetails = () => {
		setActivePage('ProductDetails')
	}

	const openProductDetails = product => {
		setActivePage('ProductDetails')
		setProduct(product)
	}

	const rerender = () => {
		setKey(Math.random())
	}

	useEffect(() => {
		if (isInitialFetchProducts) {
			dispatch(getCategory())
			dispatch(getProducts({ page: 1, limit: 20 }))
		}
	}, [dispatch, isInitialFetchProducts])

	const renderComponent = () => {
		switch (activePage) {
			case 'ProductList':
				return (
					<ProductList
						openForm={openProductForm}
						openUpdateForm={openProductUpdateForm}
						openProductDetails={openProductDetails}
					/>
				)
			case 'ProductCreate':
				return (
					<ProductCreate
						key={key}
						backToProductList={backToProductList}
						rerender={rerender}
					/>
				)
			case 'ProductUpdate':
				return (
					<ProductUpdate
						key={key}
						backToProductDetails={backToProductDetails}
						backToProductList={backToProductList}
						rerender={rerender}
						product={product}
					/>
				)
			case 'ProductDetails':
				return (
					<ProductDetails
						backToProductList={backToProductList}
						openUpdateForm={openProductUpdateForm}
						product={product}
					/>
				)
			default:
				return null
		}
	}

	return (
		<div className='product-container'>
			<div className='content-box'>
				{(isInitialFetchProducts && fetchingProducts) ||
				(isInitialFetchCategory && fetchingCategory) ? (
					<ProductListSkeleton />
				) : (
					renderComponent()
				)}
			</div>
		</div>
	)
} 

export default Products

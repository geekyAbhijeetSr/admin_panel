import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useRef, useEffect } from 'react'
import { DelProdModal } from './ProductModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../../redux/features/product-slice'
import ProductTableRow from './ProductTableRow'
import emptyBoxAnimation from '../../lottie_animations/emptyBoxAnimation'
import ProductTableRowSkeleton from './ProductTableRowSkeleton'

function ProductTable(props) {
	const { openProductDetails, openUpdateForm } = props
	const {
		justAddedProducts,
		products,
		totalDocs,
		nextPage,
		limit,
		fetchingProducts,
	} = useSelector(state => state.product)

	const [isDelModalOpen, setIsDelModalOpen] = useState(false)
	const [delProd, setDelProd] = useState({})
	const dispatch = useDispatch()
	const emptyBoxContainer = useRef()

	useEffect(() => {
		const animation = emptyBoxAnimation(emptyBoxContainer)
		return () => {
			animation.destroy()
		}
	}, [products?.length, justAddedProducts?.length])

	const onToggle = product => {
		console.log('toggling')
	}

	const fetchMoreData = () => {
		if (nextPage) {
			dispatch(getProducts({ page: nextPage, limit: limit }))
		}
	}

	// delete modal open and close
	const handleOpenDelModal = product => {
		setDelProd({
			id: product._id,
			name: product.name,
		})
		setIsDelModalOpen(true)
	}

	const handleCloseDelModal = () => {
		setDelProd({})
		setIsDelModalOpen(false)
	}

	return (
		<>
			<DelProdModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delProd={delProd}
			/>
			<div className='table-container'>
				<InfiniteScroll
					dataLength={products?.length ? products.length : 0}
					next={fetchMoreData}
					hasMore={products?.length < totalDocs}
				>
					<table className='table'>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Image</th>
								<th>Category</th>
								<th>Active</th>
								<th>Actions</th>
							</tr>
						</thead>

						{products?.length > 0 || justAddedProducts?.length > 0 ? (
							<tbody>
								{justAddedProducts?.length > 0 &&
									justAddedProducts.map((product, index) => (
										<ProductTableRow
											key={product._id}
											product={product}
											onToggle={onToggle}
											handleOpenDelModal={handleOpenDelModal}
											openProductDetails={openProductDetails}
											openUpdateForm={openUpdateForm}
										/>
									))}

								{products?.length > 0 &&
									products.map((product, index) => (
										<ProductTableRow
											key={product._id}
											product={product}
											onToggle={onToggle}
											handleOpenDelModal={handleOpenDelModal}
											openProductDetails={openProductDetails}
											openUpdateForm={openUpdateForm}
										/>
									))}
								{fetchingProducts &&
									Array.from({ length: limit }).map((_, index) => (
										<ProductTableRowSkeleton key={index} />
									))}
							</tbody>
						) : (
							<tbody>
								<tr>
									<td className='items-not-found' colSpan={5}>
										<div className='empty-box' ref={emptyBoxContainer}></div>
										<p>Add some products</p>
									</td>
								</tr>
							</tbody>
						)}
					</table>
				</InfiniteScroll>
			</div>
		</>
	)
}

export default ProductTable

import { useState, useRef } from 'react'
import * as md from 'react-icons/md'
import { numberWithCommas } from '../../../helper/util'
import { Button } from '../../../components'
import { DelProdModal } from './ProductModal'
import './productDetails.css'

function ProductDetails(props) {
	const { backToProductList, product, openUpdateForm } = props
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)
	const [img, setImg] = useState()
	const refs = useRef([])

	const addRefs = el => {
		if (el && !refs.current.includes(el)) {
			refs.current.push(el)
		}
	}

	const clickHandler = (image, i) => {
		setImg(image)
		refs.current[i].classList.add('active')

		for (var j = 0; j < images.length; j++) {
			if (i !== j) {
				refs.current[j].classList.remove('active')
			}
		}
	}

	let images = []
	if (product?.images) {
		for (let key in product?.images) {
			images.push({
				original: product?.images[key].original,
				thumbnail: product?.images[key].thumbnail,
			})
		}
	}

	const backToProductsHandler = () => {
		backToProductList()
	}

	// delete modal open and close
	const handleOpenDelModal = () => {
		setIsDelModalOpen(true)
	}
	
	const handleCloseDelModal = () => {
		setIsDelModalOpen(false)
	}

	return (
		<div>
			<DelProdModal
				isOpen={isDelModalOpen}
				onClose={handleCloseDelModal}
				delProd={{
					id: product._id,
					name: product.name,
				}}
				cb={backToProductsHandler}
			/>
			<div className='add-button-container'>
				<Button className='only-text' onClick={backToProductsHandler}>
					<md.MdArrowBack
						style={{
							fontSize: '1.5rem',
						}}
					/>
					Product List
				</Button>
			</div>

			<div className='product-details'>
				<div className='product-details__first-row'>
					<div className='left'>
						<div className='thumbnails'>
							{images.map((image, i) => (
								<div
									className={i === 0 ? 'img_wrap active' : 'img_wrap'}
									key={i}
									onClick={() => clickHandler(image.original, i)}
									ref={addRefs}
								>
									<img src={image.thumbnail} alt='' />
								</div>
							))}
						</div>
						<div className='large_img'>
							<img src={img || images[0]?.original} alt='' />

							<div className='btn_container'>
								<Button variant='large outline info' className='btn_' onClick={() => openUpdateForm(product)}>
									<md.MdEdit />
									Edit
								</Button>
								<Button
									variant='large outline danger'
									className='btn_'
									onClick={() => handleOpenDelModal()}
								>
									<md.MdDelete />
									Delete
								</Button>
							</div>
						</div>
					</div>

					<div className='right'>
						<div className='product'>
							<div className='product_header'>
								<h1>{product?.name}</h1>
								<p>
									by <span>{product?.brand}</span>
								</p>
							</div>

							<div className='product_price'>
								<p>
									<span className='symb'>₹</span>
									<span className='amt'>
										{numberWithCommas(product?.price)}
									</span>
								</p>
							</div>

							<div className='product_description'>
								<h3>About this item</h3>
								<p>{product?.description}</p>

								<h3>Specifications</h3>

								<ul className='spec_list'>
									{product?.properties
										.filter(property => property.value)
										.map(property => (
											<li>
												<span>{property.label}</span>
												<span>{property.value}</span>
											</li>
										))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails

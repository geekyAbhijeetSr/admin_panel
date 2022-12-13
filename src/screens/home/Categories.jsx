import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CatTableSkeleton from './cat_components/CatTableSkeleton'
import { getCategory } from '../../redux/features/category-slice'
import { getCollections } from '../../redux/features/attribute-slice'
import { Category1, Category2, Category3 } from './cat_components'

function Categories() {
	const { fetchingCategories, isInitialFetchCategories } = useSelector(
		state => state.category
	)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getCategory())
		dispatch(getCollections())
	}, [dispatch])

	const [activeCard, setActiveCard] = useState('category1')
	const cards = [
		{
			id: 'category1',
			label: 'Top Level',
		},
		{
			id: 'category2',
			label: 'Second Level',
		},
		{
			id: 'category3',
			label: 'Third Level',
		},
	]

	const handleCardTabClick = e => {
		setActiveCard(e.target.id)
	}

	const [select_2, setSelect_2] = useState('')
	const [select_3_1, setSelect_3_1] = useState('')
	const [select_3_2, setSelect_3_2] = useState('')

	const changeHandler2 = e => {
		setSelect_2(e.target.value)
	}

	const changeHandler3_1 = e => {
		setSelect_3_1(e.target.value)
		setSelect_3_2('')
	}

	const changeHandler3_2 = e => {
		setSelect_3_2(e.target.value)
	}

	const unselectCat2Option = () => {
		setSelect_2('')
	}

	const unselectCat3_1Option = () => {
		setSelect_3_1('')
		setSelect_3_2('')
	}

	const unselectCat3_2Option = () => {
		setSelect_3_2('')
	}

	const renderComponent = () => {
		switch (activeCard) {
			case 'category1':
				return (
					<Category1
						prevSelectedOption={select_2}
						unselectCatOption={unselectCat2Option}

						// for changing category 2 and 3 selected options if it is deleted from category 1
						prevSelectedOption2={select_3_1}
						unselectCatOption2={unselectCat3_1Option}
					/>
				)
			case 'category2':
				return (
					<Category2
						selectedCategory={select_2}
						changeHandler={changeHandler2}

						// for changing category 3 selected options if it is deleted from category 2
						prevSelectedOption={select_3_2}
						unselectCatOption={unselectCat3_2Option}
					/>
				)
			case 'category3':
				return (
					<Category3
						selectedCategory1={select_3_1}
						selectedCategory2={select_3_2}
						changeHandler1={changeHandler3_1}
						changeHandler2={changeHandler3_2}
					/>
				)
			default:
				return null
		}
	}

	return (
		<div className='category-container'>
			<div className='card-tabs'>
				{cards.map(card => (
					<div
						key={card.id}
						className={
							activeCard === card.id
								? 'card-tabs__tab active'
								: 'card-tabs__tab'
						}
						style={{
							cursor: isInitialFetchCategories ? 'not-allowed' : 'pointer',
							filter: isInitialFetchCategories ? 'grayscale(100%)' : 'none',
						}}
					>
						<div
							id={card.id}
							style={{
								pointerEvents: isInitialFetchCategories ? 'none' : 'auto',
							}}
							onClick={handleCardTabClick}
						>
							{card.label}
						</div>
					</div>
				))}
			</div>

			<div className='content-box'>
				{isInitialFetchCategories ? <CatTableSkeleton /> : renderComponent()}
			</div>
		</div>
	)
}

export default Categories

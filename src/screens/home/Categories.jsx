import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../redux/features/category-slice'
import { getCollections } from '../../redux/features/attribute-slice'
import { Category1, Category2, Category3 } from './cat_components'
import { Spinner2 } from '../../components'
import './styles/categories.css'

function Categories() {
	const { isLoadingCat } = useSelector(
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

	const handleClick = e => {
		setActiveCard(e.target.id)
	}

	const toggleActive = id => {
		return activeCard === id ? 'card active' : 'card'
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

	const renderComponent = () => {
		switch (activeCard) {
			case 'category1':
				return <Category1 />
			case 'category2':
				return (
					<Category2
						selectedCategory={select_2}
						changeHandler={changeHandler2}
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
		<div className='categories'>
			<div className='cards'>
				{cards.map(card => (
					<div
						key={card.id}
						id={card.id}
						className={toggleActive(card.id)}
						onClick={handleClick}
					>
						{card.label}
					</div>
				))}
			</div>
			{isLoadingCat ? (
				<div className='cat-spinner-container'>
					<Spinner2 />
				</div>
			) : (
				<div className='content'>{renderComponent()}</div>
			)}
		</div>
	)
}

export default Categories

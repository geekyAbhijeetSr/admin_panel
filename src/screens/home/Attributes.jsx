import { useState, useEffect, useRef } from 'react'
import { AttributeCollections, AttributesList } from './attri_components'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCollections,
} from '../../redux/features/attribute-slice'
import { Spinner2 } from '../../components'

function Attributes() {
	const renderCounter = useRef(0)
	renderCounter.current++
	const { isLoadingAttr } = useSelector(
		state => state.attribute
	)
	const [activeCard, setActiveCard] = useState('collections')
	const cards = [
		{
			id: 'collections',
			label: 'Collections',
		},
		{
			id: 'attributes',
			label: 'Attributes',
		},
	]
	const [selectedCollection, setSelectedCollection] = useState('')
	const dispatch = useDispatch()

	const changeSelectedCollection = e => {
		setSelectedCollection(e.target.value)
	}

	const handleClick = e => {
		setActiveCard(e.target.id)
	}

	const toggleActive = id => {
		return activeCard === id ? 'card active' : 'card'
	}

	const renderComponent = () => {
		switch (activeCard) {
			case 'collections':
				return <AttributeCollections />
			case 'attributes':
				return (
					<AttributesList
						selectedCollection={selectedCollection}
						changeSelectedCollection={changeSelectedCollection}
					/>
				)
			default:
				return null
		}
	}

	useEffect(() => {
			dispatch(getCollections())
	}, [dispatch])

	return (
		<div className='attributes'>
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

			{isLoadingAttr ? (
				<div className='cat-spinner-container'>
					<Spinner2 />
				</div>
			) : (
				<div className='content'>{renderComponent()}</div>
			)}
		</div>
	)
}

export default Attributes

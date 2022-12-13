import { useState, useEffect, useRef } from 'react'
import { AttributeCollections, AttributesList } from './attri_components'
import { useDispatch, useSelector } from 'react-redux'
import { getCollections } from '../../redux/features/attribute-slice'
import CollectionTableSkeleton from './attri_components/CollectionTableSkeleton'

function Attributes() {
	const { isInitialFetchAttributesColl, fetchingAttributesColl } = useSelector(
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

	const handleCardTabClick = e => {
		setActiveCard(e.target.id)
	}

	const renderComponent = () => {
		switch (activeCard) {
			case 'collections':
				return <AttributeCollections selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection} />
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
		<div className='attribute-container'>
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
							cursor: isInitialFetchAttributesColl ? 'not-allowed' : 'pointer',
							filter: isInitialFetchAttributesColl ? 'grayscale(100%)' : 'none',
						}}
					>
						<div
							id={card.id}
							style={{
								pointerEvents: isInitialFetchAttributesColl ? 'none' : 'auto',
							}}
							onClick={handleCardTabClick}
						>
							{card.label}
						</div>
					</div>
				))}
			</div>

			
			<div className='content-box'>
				
				{isInitialFetchAttributesColl ? <CollectionTableSkeleton /> : renderComponent()}</div>
		</div>
	)
}

export default Attributes

import { useState, useEffect } from 'react'
import * as md from 'react-icons/md'
import {
	Dashboard,
	Attributes,
	Categories,
	Products,
	Orders,
} from './home-components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { resetAuth } from '../../redux/features/auth-slice'
import './styles/home.css'

function Home() {
	const [activeTab, setActiveTab] = useState('dashboard')
	const { message } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const tabs = [
		{
			id: 'dashboard',
			icon: md.MdDashboard,
			label: 'Dashboard',
		},
		{
			id: 'attributes',
			icon: md.MdSegment,
			label: 'Attributes',
		},
		{
			id: 'categories',
			icon: md.MdCategory,
			label: 'Categories',
		},
		{
			id: 'products',
			icon: md.MdStore,
			label: 'Products',
		},
		{
			id: 'orders',
			icon: md.MdShoppingCart,
			label: 'Orders',
		},
	]

	const handleClick = e => {
		setActiveTab(e.target.id)
	}

	const toggleActive = id => {
		return activeTab === id ? 'tab active' : 'tab'
	}

	useEffect(() => {
		if (message) {
			toast.success(message)
			dispatch(resetAuth())
		}
	}, [message, dispatch])

	const renderComponent = () => {
		switch (activeTab) {
			case 'dashboard':
				return <Dashboard />
			case 'attributes':
				return <Attributes />
			case 'categories':
				return <Categories />
			case 'products':
				return <Products />
			case 'orders':
				return <Orders />
			default:
				return null
		}
	}

	return (
		<div className='container'>
			<div className='dashboard'>
				<section className='dashboard__left'>
					<ul className='tabs'>
						{tabs.map(tab => (
							<li
								key={tab.id}
								id={tab.id}
								className={toggleActive(tab.id)}
								onClick={handleClick}
							>
								<tab.icon />
								{tab.label}
							</li>
						))}
					</ul>
				</section>

				<section className='dashboard__right'>{renderComponent()}</section>
			</div>
		</div>
	)
}

export default Home

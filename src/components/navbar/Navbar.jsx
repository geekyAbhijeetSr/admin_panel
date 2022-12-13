import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../redux/features/auth-slice'
import { useDispatch } from 'react-redux'
import * as md from 'react-icons/md'
import './navbar.css'

function Navbar() {
	const location = useLocation()
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
	}

	const component =
		location.pathname !== '/login' && location.pathname !== '/signup' ? (
			<header>
				<div className='container navbar'>
					<div className='navbar__logo'>
						<Link className='navbar__logo-link' to='/'>
							<span className='navbar__logo-highlighted-text'>bit</span>Mart
						</Link>
					</div>

					{!user ? (
						<nav className='navbar__navigation'>
							<li className='navbar__navigation-list-item'>
								<NavLink to='/login'>Log in</NavLink>
							</li>
							<li className='navbar__navigation-list-item'>
								<NavLink to='/signup'>Sign up</NavLink>
							</li>
						</nav>
					) : (
						<nav className='navbar__navigation'>
							<li className='navbar__navigation-list-item navbar__account-menu'>
								<div className='navbar__account-user'>
									<div className='navbar__account-user-avatar'>
										<img src={user.avatar.thumbnail} alt='' />
									</div>
									<span className='navbar__account-user-info'>
										{user.firstname}
										<md.MdArrowDropDown className='icon' />
									</span>
								</div>
								<ul className='navbar__account-menu-options'>
									<li>
										<NavLink
											className='navbar__account-menu-option'
											to='/profile'
										>
											Profile
										</NavLink>
									</li>
									<li>
										<span
											className='navbar__account-menu-option'
											onClick={onLogout}
										>
											Log out
										</span>
									</li>
								</ul>
							</li>
						</nav>
					)}
				</div>
			</header>
		) : null

	return component
}

export default Navbar

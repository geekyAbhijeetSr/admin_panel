import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../redux/features/auth-slice'
import { useDispatch } from 'react-redux'
import * as md from 'react-icons/md'
import './header.css'

function Header() {
	const location = useLocation()
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout())
	}

	const component =
		location.pathname !== '/login' && location.pathname !== '/signup' ? (
			<header>
				<div className='container'>
					<div className='nav-container'>
						<div className='logo'>
							<Link className='link' to='/'>
								<span className="b">bit</span>Mart
							</Link>
						</div>

						<nav>
							{!user ? (
								<>
									<li className='list-item'>
										<NavLink to='/login'>Log in</NavLink>
									</li>
									<li className='list-item'>
										<NavLink to='/signup'>Sign up</NavLink>
									</li>
								</>
							) : (
								<li className='user-container list-item'>
									<div className='user'>
										<div className='avatar'>
											<img src={user.avatar.thumbnail} alt='' />
										</div>
										<span className='name'>
											{user.firstname}
											<md.MdArrowDropDown className='icon' />
										</span>
									</div>
									<ul className='options'>
										<li>
											<NavLink className='option' to='/profile'>
												Profile
											</NavLink>
										</li>
										<li>
											<span className='option' onClick={onLogout}>
												Log out
											</span>
										</li>
									</ul>
								</li>
							)}
						</nav>
					</div>
				</div>
			</header>
		) : null

	return component
}

export default Header

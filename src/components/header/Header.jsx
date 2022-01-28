import { Link, NavLink } from 'react-router-dom'

import Logo from '../../assets/images/logo.svg'
import './header.css'

function Header() {
	return (
		<header>
			<div className='container'>
				<div className='nav-container'>
					<div className='logo'>
						<Link to='/'>
							<img className='logo-img' src={Logo} alt='bit_logo' />
						</Link>
					</div>

					<nav>
						<li>
							<NavLink to='/login'>Log in</NavLink>
						</li>
						<li>
							<NavLink to='/signup'>Sign up</NavLink>
						</li>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header


import './navbar.css'

import  {assets} from '../../assets/frontend_assets/assets'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="logo" className='logo' />
        <ul className='navbar-menu'>
          <li>Home</li>
          <li>Menu</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
        <div className="navbar-rigt">
            <img src={assets.search_icon} alt="search-icon" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="basket" />
                <div className="dot"></div>
            </div>
            <button>sign in</button>
        </div>
    </div>
  )
}

export default Navbar

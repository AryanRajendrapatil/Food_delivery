
import './navbar.css'

import  {assets} from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("menu")
  return (
    
    <div className='navbar'>
     <Link to='/'><img src={assets.logo} alt="logo" className='logo' /></Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick={() => setMenu("home")} className={menu=="home"?"active":""} >Home</Link>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu=="menu"?"active":""} to='menu'>Menu</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu=="contact-us"?"active":""} to='contact-us'>Contact Us</a>
          <a href='#footer' onClick={() => setMenu("about-us")} className={menu=="about-us"?"active":""} to='about-us'>About Us</a>
          
          
          
         
        </ul>
        <div className="navbar-rigt">
            <img src={assets.search_icon} alt="search-icon" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
                <div className="dot"></div>
            </div>
            <button onClick={() => setShowLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar

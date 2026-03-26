
import './navbar.css'

import  {assets} from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { storeContext } from '../../context/Context.jsx'


const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("menu")
  const {getTotalCartAmount,token,setToken,url} = useContext(storeContext)
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }


  return (
    
    <div className='navbar'>
     <Link to='/'><img src={assets.logo} alt="logo" className='logo' /></Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick={() => setMenu("home")} className={menu=="home"?"active":""} >Home</Link>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu=="menu"?"active":""} to='menu'>Menu</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu=="contact-us"?"active":""} to='contact-us'>Contact Us</a>
          <a href='#footer' onClick={() => setMenu("about-us")} className={menu=="about-us"?"active":""} to='about-us'>About Us</a>
          
          
          
         
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="search-icon" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
                <div  className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> 
            : <div className='navbar-profile' >
                <img  src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                  <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
              </div>
            }

        </div>
    </div>
  )
}

export default Navbar

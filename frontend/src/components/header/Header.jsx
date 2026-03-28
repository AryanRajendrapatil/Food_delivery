import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h1>Food Delivery</h1>
            <p>Get your food delivered to your doorstep</p>
            <a href='#food-display'><button>View Menu</button></a>
        </div>
      
    </div>
  )
}

export default Header

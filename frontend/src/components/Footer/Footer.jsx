import React from 'react'
import './footer.css'
import {assets} from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <hr className='top'/>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1 className='logo'>Snackr.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </div>
            <div className="icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                
                <img src={assets.linkedin_icon} alt="" />
                
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>7058007832</li>
                    <li>[arpatil@gmail.com]</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2026 Snackr.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
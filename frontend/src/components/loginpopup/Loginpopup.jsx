import React from 'react'
import './loginpop.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'


const Loginpopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Sign Up")
  return (
    <div className='login-popup'>
        <form  className="login-popup-container"> 
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {
                    currState=="Login"?<></>:<input type="text" placeholder='Your name' required />
                }
                
                <input type="email" placeholder='Your email' required />
                <input type="password" placeholder='Your password' required />
            </div>
            <button className='button' type="submit">{currState=="Sign Up"?"Create account":"Login"} </button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>I agree to the terms and conditions</p>
            </div>
            <p className="login-popup-switch">
                {currState=="Login"?"Don't have an account?" : "Already have an account?"} <span onClick={() => setCurrState(currState=="Sign Up"?"Login":"Sign Up")}>Click here</span>
            </p>

            
        </form>
    </div>
  )
}

export default Loginpopup
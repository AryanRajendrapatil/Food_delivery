import React from 'react'
import './loginpop.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { storeContext } from '../../context/Context'
import axios from 'axios';    


const Loginpopup = ({setShowLogin}) => {
    const {url,setToken} = useContext(storeContext)
    const [currState,setCurrState] = useState("Sign Up")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if(currState === "Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
             
        }else{
            alert(response.data.message);
        }




    }
    
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container"> 
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {
                    currState=="Login"?<></>:<input value={data.name} onChange={onChangeHandler} name='name' type="text" placeholder='Your name' required />
                }
                
                <input value={data.email} onChange={onChangeHandler} name='email' type="email" placeholder='Your email' required />
                <input value={data.password} onChange={onChangeHandler} name='password' type="password" placeholder='Your password' required />
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
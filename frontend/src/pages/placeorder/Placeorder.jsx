import React from 'react'
 import  './placeorder.css'
 import { useContext } from 'react'
 import { storeContext } from '../../context/Context.jsx'
 import { useNavigate } from 'react-router-dom'
 import { useEffect } from 'react'
 import { useState } from 'react'
 import axios from 'axios'

const Placeorder = () => {
  const {getTotalCartAmount,token,url,foodList,cartItems,setCartItems} = useContext(storeContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })
  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
    
  }
  const placeOrder = async(e)=>{
    try{
      
      e.preventDefault()
      

      let orderItems = []
      foodList.forEach((item)=>{

        if(cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo.quantity = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      let orderData = {
        address:data,
        orderItems:orderItems,
        amount:getTotalCartAmount()+2,
      }
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      console.log(response.data)
      if(response.data.success){
        const {session_url} = response.data;
        window.location.href = session_url;
      }

      else{
        alert(response.data.message)
      }


      
    }catch(error){
      console.log(error)
    }
    
  }
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])

  
  const navigate = useNavigate()
  return (
   <form onSubmit={placeOrder} className='place-order'>
    <div className="place-order-left">
      <h1>Delivery Information</h1>
      <div className="multi-fields">
        <input required onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First name' />
        <input required onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last name' />
      </div>
      <input required onChange={onChangeHandler} value={data.email} name='email' type="text" placeholder='Email address' />
      <input required onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Street' />
      <div className="multi-fields">
        <input required onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='City' />
        <input required onChange={onChangeHandler} value={data.state} name='state' type="text" placeholder='State' />
      </div>
      <div className="multi-fields">
        <input required onChange={onChangeHandler} value={data.zipCode} name='zipCode' type="text" placeholder='Zip code' />
        <input required onChange={onChangeHandler} value={data.country} name='country' type="text" placeholder='Country' />
      </div>
      <input required onChange={onChangeHandler} value={data.phone} name='phone' type="text" placeholder='Phone' />
    </div>
    <div className="place-order-right">
      <div className="place-order-right-container">
        
        <div className="place-order-right-container-title">
          <h1>Order Summary</h1>
          <div className="place-order-right-container-title-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="place-order-right-container-title-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <div className="place-order-right-container-title-details">
            <p>Total</p>
            <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
          </div>

        </div>
       
        <button onClick={placeOrder}>Proceed to Payment</button>
        
      </div>

      
    </div>
   </form>
  )
}

export default Placeorder

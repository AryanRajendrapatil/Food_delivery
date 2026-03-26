import React from 'react'
import './order.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
const assets = {
  parcel_icon: "../../assets/backend_assets/parcel_icon.png"
} 

const Order = () => {
  const url = "http://localhost:4000";
  const [orders,setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if(response.data.success){
      setOrders(response.data.data);
    }
    else{
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchOrders();
  },[]);
  const removeOrder = async (id) => {
    const response = await axios.post(`${url}/api/order/remove`,{id});
    if(response.data.success){
      toast.success(response.data.message);
      fetchOrders();
    }
    else{
      toast.error(response.data.message);
    }
  }
  return (
    <div className='order add-flex-col'>
      <h2>Order Management</h2>
      <div className='order-list'>
        {orders.map((order,index)=>{
          return(
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <p>{order.name}</p>
              <p>{order.email}</p>
              <p>{order.address}</p>
              <p>{order.phone}</p>
              <p>{order.amount}</p>
              <p>{order.status}</p>
              <button onClick={()=>removeOrder(order._id)}>Remove</button>
            </div>
          )  
        })}
      </div>
    </div>
  )
}

export default Order
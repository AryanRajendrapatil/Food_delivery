import React, { useContext, useState, useEffect } from 'react'
import './myorders.css'
import { storeContext } from '../../context/Context'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'
const Myorders = () => {
    const {url,token} = useContext(storeContext)
    const [orders,setOrders] = useState([])
    useEffect(()=>{
        const fetchOrders = async()=>{
            const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
            setOrders(response.data.data)
        }
        if(token){
            fetchOrders()
        }
    },[token, url])
  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className="order-list">
            {orders.map((order,index)=>{
                return(
                    <div className="order" key={index}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(order.items.length-1===index){
                                return item.name + " x " + item.quantity
                            }else{
                                return item.name + " x " + item.quantity + ", "
                            }
                        })}</p>
                        <p>Rs{order.amount}.00</p>
                        <p>{order.address}</p>
                        <p><b>Status:</b> {order.status}</p>
                        <p>Items: {order.items.length} </p>
                        <button>Track Order</button>
                        <button>Cancel Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Myorders
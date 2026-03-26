import React from 'react'
import './verify.css'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { storeContext } from '../../context/Context'

const Verify = () => {
    const[searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(storeContext)
    const fetchVerifyPayment = async()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
       if(response.data.success){
        navigate("/myorders")
       }
       else{
        navigate("/")
       }
    }
    useEffect(()=>{
        fetchVerifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="verify-container">
            <img src={success=="true"?"./assets/verified.png":"./assets/not_verified.png"} alt="" />
            <h1>{success=="true"?"Payment Successful":"Payment Failed"}</h1>
            <p>{success=="true"?"Your order has been placed successfully":"Your order has been failed"}</p>
            <button>Continue Shopping</button>
        </div>
    </div>
  )
}

export default Verify
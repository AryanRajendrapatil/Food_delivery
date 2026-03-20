import React from 'react'
import './fooditem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { storeContext } from '../../context/Context.jsx'

const FOODITEM = ({id,name,price,description,image}) => {
  const[itemCount,setItemCount] = useState(0);
  const {addToCart,removeFromCart,cartItems} = useContext(storeContext);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={image} alt="" className="food-item-image" />
            {!cartItems[id] 
            ? <img src={assets.add_icon_white} alt="" className='add' onClick={()=>addToCart(id)} />: < div className='food-item-counter'> 
              <img src={assets.remove_icon_red} alt=""  onClick={()=>removeFromCart(id)} />
              <p>{cartItems[id]}</p>
              <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(id)} />  

        </div>
  }
  </div>
  
         <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>


      
    </div>
  )
}

export default FOODITEM

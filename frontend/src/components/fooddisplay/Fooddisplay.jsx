import React from 'react'
import './fooddisplay.css'
import { useContext } from 'react'
import { storeContext } from '../../context/Context.jsx'
import FOODITEM from '../fooditem/FOODITEM.jsx'

const Fooddisplay = ({category}) => {
    const{food_list} = useContext(storeContext)
  return (
    <div className='food-display'>
        <h2>Famous food near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index) => {
                return(
                    <FOODITEM key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                  
                )
            })}
        
      
        </div>
    </div>
  )
}

export default Fooddisplay

import { createContext, useEffect, useState } from "react";
import { food_list} from "../assets/frontend_assets/assets";

export const storeContext = createContext(null)
const StoreContextProvider = (props) => {
    const [cartItems,setCartItems] = useState({});
    const addToCart = (ItemId) => {
        
        setCartItems(prev=>{
            if(prev[ItemId]){
                return {...prev,[ItemId]:prev[ItemId]+1}
            }else{
                return {...prev,[ItemId]:1} 
            }
        })
    }
    const removeFromCart = (ItemId) => {
        setCartItems(prev=>{
            if(prev[ItemId]===1){
                const {[ItemId]:_,...rest} = prev;
                return rest;
            }else{
                return {...prev,[ItemId]:prev[ItemId]-1}
            }
            
        })
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
          
            if(cartItems[item]>0){ 
                 let itemInfo = food_list.find(product => product._id === item);
                totalAmount += cartItems[item] * itemInfo.price;
            }

        }
        console.log(totalAmount);
        return totalAmount;
    }
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount

    }
    return(
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider
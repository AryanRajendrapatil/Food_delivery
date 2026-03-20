import { createContext } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const storeContext = createContext(null)
import { useState } from "react";   
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
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart

    }
    return(
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider
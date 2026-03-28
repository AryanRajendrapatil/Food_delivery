import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const storeContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { foodId: itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { foodId: itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        const currentFoods = [...food_list, ...foodList];
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = currentFoods.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data && response.data.success) {
                const dbItems = response.data.data.map(item => ({
                    ...item,
                    image: url + "/images/" + item.image
                }));
                setFoodList(dbItems);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (storedToken) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: storedToken } });
            if (response.data && response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list: [...food_list, ...foodList],
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchQuery,
        setSearchQuery
    };

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
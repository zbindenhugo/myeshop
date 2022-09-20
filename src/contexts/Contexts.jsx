import React, { useState } from "react";

export const CartContext = React.createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    const addItemCart = (item) => {
        setCart([...cart, item])
    }

    const deleteItemCart = (id) => {
        for(let i = 0; i < cart.length(); i++){
            if(cart[i].id === id){
                cart.splice(i, 1);
                break;
            }
        }
    }

    return(
        <CartContext.Provider value={{ cart, addItemCart, deleteItemCart }}>
            {children}
        </CartContext.Provider>
    )
}
import {createContext, useEffect, useState} from 'react';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id) 
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} :
        cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
    //find if cartItems contains productToAdd
    //if found, increment quantity
    //return new array with modified cartItems/new cart Item
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartTotal: 0,
});


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    //Because of [cartItems], this useEffect runs every time something in cartItems changes
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);
    

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


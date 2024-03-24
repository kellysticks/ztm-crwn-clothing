import { useContext } from 'react';
import { CartContext } from "../../contexts/cart.context";

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import "./cart-icon.styles.scss";


const CartIcon = () => {
const {isCartOpen, setIsCartOpen, cartTotal} = useContext(CartContext)

const toggleCart = () => setIsCartOpen(!isCartOpen);

    return(
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartTotal}</span>
        </div>
    )
}

export default CartIcon;
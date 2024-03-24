import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react'

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
    const { id, name, imageUrl, price, quantity } = item
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(item);
    const addItemHandler = () => addItemToCart(item);
    const removeItemHandler = () => removeItemFromCart(item)
    return (
        <div key={id} className='checkout-item-container'>
            <div className='image-container'>
                <img className='image' src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value' >{quantity}</span>
                <div className='arrow'  onClick={addItemHandler}>&#10095;</div>
                </span>

            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler} >&#10005;</div>
        </div>

    )

}

export default CheckoutItem;
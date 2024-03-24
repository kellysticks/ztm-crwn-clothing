import {useContext, useState} from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component'

import './product-card.styles.scss';

const ProductCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext)
    const addProduct = () => addItemToCart(product)
    
    const {id, name, price, imageUrl} = product;
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProduct}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react'

import {CheckoutItemContainer, ImageContainer, Quantity, BaseSpan, Arrow, Value, RemoveButton} from './checkout-item.styles.jsx';

const CheckoutItem = ({ item }) => {
    const { id, name, imageUrl, price, quantity } = item
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(item);
    const addItemHandler = () => addItemToCart(item);
    const removeItemHandler = () => removeItemFromCart(item)
    return (
        <CheckoutItemContainer key={id} >
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value >{quantity}</Value>
                <Arrow  onClick={addItemHandler}>&#10095;</Arrow>
                </Quantity>

            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler} >&#10005;</RemoveButton>
        </CheckoutItemContainer>

    )

}

export default CheckoutItem;
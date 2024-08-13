import {CartItemContainer, CartItemImg, ItemDetails, Name} from './cart-item.styles';

const CartItem = ({cartItem}) => {
    const {name, imageUrl, quantity, price} = cartItem;
return (
    <CartItemContainer>
        <CartItemImg src={imageUrl} alt={`${name}`} />
        <ItemDetails>
        <Name>{name}</Name>
        <span className='price'>{quantity} x ${price}  </span>
        {/* <span>{price}</span> */}
        </ItemDetails>
    </CartItemContainer>
)
}

export default CartItem;
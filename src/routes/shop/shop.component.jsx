// import SHOP_DATA from '../../shop-data.json'
import {useContext} from 'react';
import ProductCard from '../../components/product-card/product-card.component'
import { ProductsContext } from '../../contexts/products.context';
import './shop.style.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext)
    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
            ))}
        </div>
    )
}

export default Shop;
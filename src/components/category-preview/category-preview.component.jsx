import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
    return(
    <CategoryPreviewContainer>
        <h2>
            <Title to={`${title}`}>
            {title.toUpperCase()}
            </Title>
        </h2>
        <Preview>
            {
                //filter keeps whatever evaluates to less than 4 - in this case, whatever elements have an index less than 4 and throws everything else away
                products.filter((_, idx) => idx < 4)
                .map((product) => 
                    <ProductCard key={product.id} product={product}/>
                )
            }
        </Preview>
    </CategoryPreviewContainer>)
}

export default CategoryPreview;
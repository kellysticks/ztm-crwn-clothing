import { Routes, Route } from 'react-router';

import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import CategoriesPreview from '../categories-preview/categories-preview.components';
import Category from '../category/category.component';


const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<Category/>} />
        </Routes>
    )
}

export default Shop;
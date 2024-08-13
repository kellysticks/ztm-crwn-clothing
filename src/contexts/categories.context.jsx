import {createContext, useEffect, useState} from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import PRODUCTS from '../shop-data'

export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    }, [])
    
    const value = {categoriesMap, setCategoriesMap}

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}


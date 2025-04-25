// UTILITY
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../assets/utilityFunctions';


// ENV
const { VITE_API_URL } = import.meta.env;


// CREATE CONTEXT
const MainContext = createContext();


// PROVIDER EXPORT
export const MainContextProvider = ({ children }) => {

    // USE-STATE DATA
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [compareMode, setCompareMode] = useState(true);
    const [toCompare, setToCompare] = useState([]);

    // INIT USE-EFFECT
    useEffect(() => {

        // FETCH PRODUCTS
        fetchProducts(VITE_API_URL, `/products`)
            .then(products => {
                // debug
                // console.log('PRODUCT EXAMPLE: ', products[0]);
                setProducts(products);
            })
            .catch(error => console.error(error))

    }, []);

    return <>
        <MainContext.Provider value={{
            products,
            setProducts,
            favorites,
            setFavorites,
            compareMode,
            setCompareMode,
            toCompare,
            setToCompare,
        }}
        >{children}</MainContext.Provider>
    </>
}


// USE CONTEXT EXPORT
export const useMainContext = () => useContext(MainContext);
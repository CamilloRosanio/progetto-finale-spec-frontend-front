// UTILITY
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, } from '../assets/utilityFunctions';


// ENV
const { VITE_API_URL } = import.meta.env;


// CREATE CONTEXT
const MainContext = createContext();


// PROVIDER EXPORT
export const MainContextProvider = ({ children }) => {

    // USE-STATE
    const [products, setProducts] = useState([]);
    const [compareMode, setCompareMode] = useState(false);
    const [toCompare, setToCompare] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    // INIT USE-EFFECT - FETCH
    useEffect(() => {
        fetchProducts(VITE_API_URL, `/products`)
            .then(products => {
                // debug
                // console.log('PRODUCT EXAMPLE: ', products[0]);
                setProducts(products);
            })
            .catch(error => console.error(error));
    }, []);

    // INIT USE-EFFECT - GET STORED FAVORITES
    useEffect(() => {
        let storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            storedFavorites = JSON.parse(storedFavorites);
        } else {
            storedFavorites = [];
        }
        setFavorites(storedFavorites);
    }, []);

    // USE-EFFECT - UPDATE STORED FAVORITES
    useEffect(() => {
        // NOTA: funziona in combinazione con la funzione "handleFavorite" che si trova in "utilityFunctions".
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

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
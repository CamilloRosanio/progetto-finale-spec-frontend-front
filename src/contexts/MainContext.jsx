// UTILITY
import { createContext, useContext, useState, useEffect } from 'react';


// CREATE CONTEXT
const MainContext = createContext();


// PROVIDER EXPORT
export const MainContextProvider = ({ children }) => {

    // USE-STATE DATA
    const [data, setData] = useState('');

    // INIT USE-EFFECT
    useEffect(() => {
        setData('data');
    }, []);

    return <>
        <MainContext.Provider value={data}>{children}</MainContext.Provider>
    </>
}


// USE CONTEXT EXPORT
export const useMainContext = () => useContext(MainContext);
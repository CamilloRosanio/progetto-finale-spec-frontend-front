// CONTEXTS
import { useState } from "react";
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Searchbar from "../components/Searchbar";


// COMPONENT EXPORT
export default function HomePage() {

    // CONTEXTS DATA
    const { products, setProducts } = useMainContext();

    // USE-STATE
    const [query, setQuery] = useState('');

    return <>

        <div className="filtersContainer">
            <Searchbar
                placeholder='Find a product..'
                value={query}
                setValue={setQuery}
            />
        </div>

        {products.map((p, index) => <p key={index}>{p.title}</p>)}

    </>
}
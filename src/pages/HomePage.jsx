// CONTEXTS
import { useState, useMemo } from "react";
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Searchbar from "../components/Searchbar";
import ProductCard from "../components/ProductCard";


// COMPONENT EXPORT
export default function HomePage() {

    // CONTEXTS DATA
    const { products, setProducts } = useMainContext();

    // USE-STATE
    const [query, setQuery] = useState('');

    // USE-MEMO
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const isInTitle = p.title.toLowerCase().includes(query.toLowerCase());
            return isInTitle;
        });
    }, [products, query]);

    return <>

        <div className="filtersContainer">
            <Searchbar
                placeholder='Search by name..'
                value={query}
                setValue={setQuery}
            />
        </div>

        <div className="cardList">

            {!filteredProducts.length ?
                <h3>No products found</h3>
                :
                filteredProducts.map((p, index) => <ProductCard
                    key={p.id}
                    category={p.category}
                    title={p.title}
                    brand={p.brand}
                    quantity={p.quantity}
                    price={p.price}
                    status={p.status}
                />)
            }
        </div>


    </>
}
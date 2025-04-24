// CONTEXTS
import { useState, useMemo } from "react";
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Searchbar from "../components/Searchbar";
import Select from "../components/Select";
import ProductCard from "../components/ProductCard";


// COMPONENT EXPORT
export default function HomePage() {

    // CONTEXTS DATA
    const { products, setProducts } = useMainContext();

    // USE-STATE
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');

    // USE-MEMO
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const isInTitle = p.title.toLowerCase().includes(query.toLowerCase());
            const isInCategory = category ? p.category === category : true;
            return isInTitle && isInCategory;
        });
    }, [products, query, category]);

    // DATA
    const categories = products.reduce((acc, p) => {
        if (!acc.includes(p.category)) {
            acc.push(p.category);
        }
        return acc;
    }, []);

    return <>

        <div className="filtersContainer">
            {/* SEARCHBAR */}
            <Searchbar
                placeholder="Search by name.."
                onDebouncedChange={setQuery}
                reset={setQuery}
            />

            {/* SELECT */}
            <Select
                placeholder='Filter by category..'
                options={categories}
                value={category}
                setValue={setCategory}
            />

        </div>

        <div className="resultsCounter">
            <h2>✱ {filteredProducts.length} results found</h2>
        </div>

        <div className="cardList">
            {
                filteredProducts.map(p => <ProductCard
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
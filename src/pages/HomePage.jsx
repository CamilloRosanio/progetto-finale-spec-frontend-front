// CONTEXTS
import { useState, useMemo } from "react";
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Searchbar from "../components/Searchbar";
import Select from "../components/Select";
import ProductCard from "../components/ProductCard";
import SortButton from "../components/SortButton";


// COMPONENT EXPORT
export default function HomePage() {

    // CONTEXTS DATA
    const { products } = useMainContext();

    // USE-STATE
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState(1);

    // USE-MEMO
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const isInTitle = p.title.toLowerCase().includes(query.toLowerCase());
            const isInCategory = category ? p.category === category : true;
            return isInTitle && isInCategory;
        });
    }, [products, query, category, sortBy, sortOrder]);

    // DATA
    const categories = products.reduce((acc, p) => {
        if (!acc.includes(p.category)) {
            acc.push(p.category);
        }
        return acc;
    }, []);

    // SORT BY
    const sortFields = ['title', 'category', 'price'];
    const sortArrow = sortOrder === 1 ? '▲' : '▼';

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }

        console.log(`STATE (sortBy: ${field} | sortOrder: ${sortOrder})`);
    }

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

        {/*  LIST */}
        <div className="sortSection">
            <h2>✱ {filteredProducts.length} results found</h2>

            <div className="sortButtonsContainer">

                <h3>SORT BY</h3>

                {sortFields.map((c, index) =>
                    <SortButton
                        key={index}
                        text={sortBy === c ? `${sortArrow} ${c}` : c}
                        sortCriteria={sortBy}
                        onClick={() => handleSort(c)}
                    />
                )}
            </div>
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
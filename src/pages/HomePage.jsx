// UTILITY
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { handleFavorite } from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Searchbar from "../components/Searchbar";
import Select from "../components/Select";
import ProductCard from "../components/ProductCard";
import SortButton from "../components/SortButton";


// COMPONENT EXPORT
export default function HomePage() {

    // NAVIGATE
    const navigate = useNavigate();

    // CONTEXTS DATA
    const { products, favorites, setFavorites } = useMainContext();

    // USE-STATE
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState(1);

    // USE-MEMO
    const productsList = useMemo(() => {
        const filteredProducts = products.filter(p => {
            const isInTitle = p.title.toLowerCase().includes(query.toLowerCase());
            const isInCategory = category ? p.category === category : true;
            return isInTitle && isInCategory;
        });

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            const aKey = a[sortBy];
            const bKey = b[sortBy];

            if (typeof aKey === 'number' && typeof bKey === 'number') {
                return (aKey - bKey) * sortOrder;
            } else {
                return aKey.toString().localeCompare(bKey.toString()) * sortOrder;
            }
        });

        return sortedProducts;
    }, [products, query, category, sortBy, sortOrder]);

    // SUPPORT
    const categories = products.reduce((acc, p) => {
        if (!acc.includes(p.category)) {
            acc.push(p.category);
        }
        return acc;
    }, []);

    // SORT BY
    const sortFields = ['category', 'title', 'price'];
    const sortArrow = sortOrder === 1 ? '▼' : '▲';

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }

        // debug
        // console.log(`STATE (sortBy: ${field} | sortOrder: ${sortOrder})`);
    }

    return <>

        <h1>Let the search begin!</h1>

        {/* FILTERS */}
        <div className="filtersContainer">

            <Searchbar
                placeholder="🔍 Search by name.."
                onDebouncedChange={setQuery}
                reset={setQuery}
            />

            <Select
                placeholder='▼ Filter by category..'
                options={categories}
                value={category}
                setValue={setCategory}
            />

        </div>

        {/*  SORT */}
        <div className="sortSection">
            <h2>✱ {productsList.length} results found</h2>

            {productsList.length > 0 &&
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
                </div>}
        </div>

        {/* LIST */}
        <div className="cardList">
            {
                productsList.map(p => <ProductCard
                    onClick={() => navigate(`/details/${p.id}`)}
                    handleFavorite={null}
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
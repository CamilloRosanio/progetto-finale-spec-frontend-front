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
export default function FavoritesPage() {

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
    const sortedFavorites = useMemo(() => {
        const filteredFavorites = favorites.filter(p => {
            const isInTitle = p.title.toLowerCase().includes(query.toLowerCase());
            const isInCategory = category ? p.category === category : true;
            return isInTitle && isInCategory;
        });

        const sorted = [...filteredFavorites].sort((a, b) => {
            const aKey = a[sortBy];
            const bKey = b[sortBy];

            if (typeof aKey === 'number' && typeof bKey === 'number') {
                return (aKey - bKey) * sortOrder;
            } else {
                return aKey.toString().localeCompare(bKey.toString()) * sortOrder;
            }
        });

        return sorted;
    }, [favorites, query, category, sortBy, sortOrder]);


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

        <h1>❤ My Favorites</h1>

        {/* FILTERS */}
        <div className="filtersContainer">

            <Searchbar
                placeholder="❤ Search favorite by name.."
                onDebouncedChange={setQuery}
                reset={setQuery}
            />

            <Select
                placeholder='▼ Filter favorites by category..'
                options={categories}
                value={category}
                setValue={setCategory}
            />

        </div>

        {/*  SORT */}
        <div className="sortSection">
            <h2>⯀ {favorites.length} favorites in your list{favorites.length === sortedFavorites.length ? '' : ` ⯀ ${sortedFavorites.length} filtered products`}</h2>

            {sortedFavorites.length > 0 &&
                <div className="sortButtonsContainer">
                    <h3>SORT FAVORITES BY</h3>
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
                sortedFavorites.map(p => <ProductCard
                    onClick={() => navigate(`/details/${p.id}`)}
                    handleFavorite={() => handleFavorite(products, favorites, setFavorites, p.id)}
                    isFavorite={favorites.some(pFav => String(pFav.id) === String(p.id))}
                    key={p.id}
                    category={p.category}
                    title={p.title}
                    brand={p.brand}
                    quantity={p.quantity}
                    price={p.price}
                    status={p.status}
                    actionIcon='✖'
                />)
            }
        </div>

    </>
}
async function fetchJson(urlRoot, urlAdd) {
    const response = await fetch(`${urlRoot}${urlAdd}`);
    const object = await response.json();
    return object;
}

async function fetchProducts(urlRoot, urlAdd) {
    let products;
    try {
        products = await fetchJson(urlRoot, urlAdd);
    } catch (error) {
        throw new Error('PRODUCTS fetch failed.')
    }
    return products;
}

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    }
}

const handleFavorite = (productList, favorites, id) => {
    const isFavorite = favorites.some(product => product.id === id);
    const productToAdd = productList.find(product => product.id === id);

    if (isFavorite) {
        return favorites.filter(product => product.id !== id);
    } else if (productToAdd) {
        return [...favorites, productToAdd];
    }

    return favorites;
};





// EXPORT
export { fetchJson, fetchProducts, debounce, handleFavorite, };
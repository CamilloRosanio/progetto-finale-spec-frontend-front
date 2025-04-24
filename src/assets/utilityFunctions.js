async function fetchJson(urlRoot, urlAdd) {
    const response = await fetch(`${urlRoot}${urlAdd}`);
    const object = await response.json();
    return object;
}

async function fetchProducts(urlRoot, urlAdd) {
    let products;
    try {
        products = await fetchJson(urlRoot, urlAdd);
        // debug
        // console.log(`fetchProducts: ${products}`);
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



// EXPORT
export { fetchJson, fetchProducts, debounce };
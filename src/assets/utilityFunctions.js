/*******************************************************************
# FETCH
*******************************************************************/

// SUPPORT FUNCTION
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
        throw new Error('FETCH(products) [ INDEX ] fetch failed.')
    }
    return products;
}

async function fetchDeleteProduct(urlRoot, urlAdd, id) {

    try {
        const response = await fetch(`${urlRoot}${urlAdd}${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`FETCH [ DELETE ${urlAdd}${id} ] failed.`)
        }

        // debug
        // console.log(`FETCH [ DELETE ${urlAdd}${id} ] Item with ID ${id} successfully deleted. \nSTATUS: ${response.status}`);
    } catch (error) {
        console.error(error);
    }
}

async function refreshProducts(urlRoot, urlAdd, setState) {
    setState(await fetchProducts(urlRoot, urlAdd));
}


/*******************************************************************
# VARIOUS
*******************************************************************/

function getUniquesByKey(array, key) {
    return array.reduce((acc, item) => {
        const value = item[key];
        if (!acc.includes(value)) {
            acc.push(value);
        }
        return acc;
    }, []);
}

function handleSort(field, setStateSortOrder, stateSortBy, setStateSortBy) {
    if (stateSortBy === field) {
        setStateSortOrder(prev => prev * -1);
    } else {
        setStateSortBy(field);
        setStateSortOrder(1);
    }
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

function handleFavorite(list, favorites, setFavorites, id) {
    const isFavorite = favorites.some(product => product.id === id);
    const productToAdd = list.find(product => product.id === id);

    if (isFavorite && favorites.length === 1) {
        setFavorites(favorites.filter(product => product.id !== id));
        // Se l'elemento è l'unico elemento nell'array dei "favorites" allora viene anche eliminato l'elemento "favorites" dal LOCAL STORAGE.
        localStorage.removeItem('favorites');
    } else if (isFavorite) {
        setFavorites(favorites.filter(product => product.id !== id));
    } else if (!isFavorite) {
        setFavorites([...favorites, productToAdd]);
    }

    // debug
    // console.log('FAVORITES:', favorites);
};

function handleSelection(list, selectedList, setSelectedList, id) {
    const isSelected = selectedList.some(product => product.id === id);
    const productToAdd = list.find(product => product.id === id);
    // ESEMPIO: limite =5 significa max 6 prodotti.
    const comparisonLimit = 2;

    if (isSelected) {
        setSelectedList(selectedList.filter(product => product.id !== id));
    } else if (productToAdd) {
        if (selectedList.length > comparisonLimit) {
            return alert(`You can compare a maximum of ${comparisonLimit + 1} products at a time. \n Deselect at least one first to proceed.`);
        } else {
            setSelectedList([...selectedList, productToAdd]);
        }
    }

    // debug
    // console.log('COMPARE:', selectedList);
};

function onOff(value, setValue) {
    if (value) {
        setValue(false);
    } else {
        setValue(true);
    }
}



// EXPORT
export {
    fetchJson,
    fetchDeleteProduct,
    fetchProducts,
    handleSort,
    debounce,
    handleFavorite,
    onOff,
    handleSelection,
    getUniquesByKey,
    refreshProducts,
};
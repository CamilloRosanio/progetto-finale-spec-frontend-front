// UTILITY
import { useState, useRef } from 'react';
import { fetchProducts, handleFavorite, onOff, handleSelection } from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Select from '../components/Select';


// COMPONENT EXPORT
export default function AddProductPage() {

    // CONTEXTS DATA
    const {
        products,
        setProducts,
    } = useMainContext();

    // USE-REF
    const titleRef = useRef();
    const categoryRef = useRef();

    // USE-STATE
    const [showModal, setShowModal] = useState(false);

    return <>

        <h1>✚ Add a Product</h1>

        <form className="form">
            <input type="text" ref={titleRef} className='formField' />

            {/* <Select
                placeholder='▼ Filter by category..'
                options={categories}
                value={category}
                setValue={setCategory}
            /> */}

            <input type="text" ref={categoryRef} className='formField' />

        </form>

    </>
}
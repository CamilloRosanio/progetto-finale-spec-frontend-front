// UTILITY
import { useState, useRef } from 'react';
import { addProduct, refreshProducts } from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// ENV
const { VITE_API_URL } = import.meta.env;


// COMPONENTS
import RoundButton from '../components/RoundButton';


// COMPONENT EXPORT
export default function AddProductPage() {

    // CONTEXTS DATA
    const {
        products,
        setProducts,
    } = useMainContext();

    // USE-STATE
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('');

    // USE-REF
    const refTitle = useRef();
    const refBrand = useRef();
    const refStatus = useRef();

    // SUPPORT
    const statuses = ['available', 'not available'];

    function resetForm() {
        refTitle.current.value = '';
        setCategory('')
        refBrand.current.value = '';
        setPrice('');
        refStatus.current.value = '';
        setFormErrorMessage('');
    }

    function fieldsValidation(type, value) {
        if (type === 'string') {
            return !value.includes('@');
        }
        if (type === 'number') {
            return value > 1000000;
        }
        return true
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // SUPPORT
        const toAddItem = {
            title: refTitle.current.value,
            category: category.toLowerCase(),
            brand: refBrand.current.value,
            price: parseFloat(price),
            status: refStatus.current.value,
        }

        const stringMin = 3;

        // debug
        console.log('TITLE:', refTitle.current.value);

        // FIELDS VALIDATION
        if (toAddItem.title === '' || toAddItem.title.length < stringMin) {
            return setFormErrorMessage(`Title can't be empty or less than ${stringMin} characters long.`);
        }
        if (products.some(item => item.title.toLowerCase() === toAddItem.title.toLowerCase())) {
            return setFormErrorMessage(`Product with this title already exists. Change title to proceed.`);
        }
        if (toAddItem.category === '' || toAddItem.category.length < stringMin || toAddItem.category.includes('@')) {
            return setFormErrorMessage(`Category can't contain special characters, be empty or less than ${stringMin} characters long.`);
        }
        if (!toAddItem.price || isNaN(toAddItem.price) || toAddItem.price > 1000000) {
            return setFormErrorMessage(`Price must be a number and can't be empty or greater than 1.000.000.`);
        }
        if (!toAddItem.status) {
            return setFormErrorMessage(`You must chose a Status to proceed.`);
        }

        // FETCH
        try {
            await addProduct(VITE_API_URL, '/products', toAddItem);
        } catch (error) {
            console.error(error);
        }

        // REFRESH PRODUCTS
        await refreshProducts(VITE_API_URL, '/products', setProducts);

        // ALERT
        alert('Product successfully added to list.')

        // RESET FORM
        resetForm();
    }

    // COMPONENT EXPORT
    return <>

        <h1>✚ Add a Product</h1>

        <form className="form">

            {/* TITLE */}
            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Title</h3>
                <input
                    type="text"
                    ref={refTitle}
                    className='formField'
                    placeholder='Product title here..'
                />
                <RoundButton
                    onClick={() => refTitle.current.value = ''}
                />
            </div>

            {/* CATEGORY */}
            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Category</h3>

                <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='formField'
                    placeholder='Product category here..'
                />
                <RoundButton
                    onClick={() => setCategory('')}
                />
            </div>
            {!fieldsValidation('string', category) && <p className='warning'><strong>Category</strong> can't contain "@".</p>}

            {/* BRAND */}
            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Brand</h3>
                <input
                    type="text"
                    ref={refBrand}
                    className='formField'
                    placeholder='Product brand here..'
                />
                <RoundButton
                    onClick={() => refBrand.current.value = ''}
                />
            </div>

            {/* PRICE */}
            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Price</h3>

                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className='formField'
                    placeholder='Product price here..'
                />
                <RoundButton
                    onClick={() => setPrice('')}
                />
            </div>
            {fieldsValidation('number', price) && <p className='warning'><strong>Price</strong> can't be higher than 1.000.000.</p>}

            {/* SELECT STATUS */}
            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Status</h3>

                <div className="selectContainer">
                    {/* OPTIONS */}
                    <select
                        ref={refStatus}
                        className="select"
                    >
                        <option value=''>▼ Chose status</option>
                        {statuses.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* FORM ERROR MESSAGE */}
            {formErrorMessage && <p className='warning'>{formErrorMessage}</p>}

            {/* RESET FORM */}
            <div className='flex'>
                <button
                    // Import type='button' così da non lanciare il SUBMIT del form, essendo questo bottone contenuto nel Form.
                    type='button'
                    className='button close'
                    onClick={() => resetForm()}
                >reset</button>

                {/* SUBMIT FORM */}
                <button className='button' onClick={handleSubmit}>submit</button>
            </div>
        </form>


    </>
}
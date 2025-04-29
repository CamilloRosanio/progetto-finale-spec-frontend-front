// UTILITY
import { useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import {
    onOff,
    updateProduct,
    refreshProducts,
} from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// ENV
const { VITE_API_URL } = import.meta.env;


// COMPONENTS
import RoundButton from '../components/RoundButton';


// COMPONENT EXPORT
export default function DetailsPage() {

    // CONTEXTS DATA
    const {
        products,
        setProducts,
    } = useMainContext();

    // GET URL PARAMS
    const { id } = useParams();

    // USE-STATE
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('');

    // USE-REF
    const refTitle = useRef();
    const refBrand = useRef();
    const refStatus = useRef();

    // NAVIGATE
    const navigate = useNavigate();

    // USE-MEMO
    const selectedProduct = useMemo(() => {
        return products.find(p => String(p.id) === String(id));
    }, [products, id]);

    // SUPPORT
    const currentItem = products.find(item => String(item.id) === String(id));

    const statuses = ['available', 'not available'];

    function resetForm() {
        refTitle.current.value = '';
        setCategory('');
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

        const toUpdateItem = {
            title: refTitle.current.value || currentItem.title,
            category: category || currentItem.category,
            brand: refBrand.current.value || currentItem.brand,
            price: parseFloat(price) || parseFloat(currentItem.price),
            status: refStatus.current.value || currentItem.status,
        }

        const stringMin = 3;

        // FIELDS VALIDATION
        // if (toUpdateItem.title === '' || toUpdateItem.title < stringMin) {
        //     return setFormErrorMessage(`Title can't be empty or with less than ${stringMin} characters.`);
        // }
        // if (toUpdateItem.category === '' || toUpdateItem.category < stringMin || toUpdateItem.category.includes('@')) {
        //     return setFormErrorMessage(`Category can't contain special character, be empty or less than ${stringMin} characters long.`);
        // }
        // if (!toUpdateItem.price || isNaN(toUpdateItem.price) || toUpdateItem.price > 1000000) {
        //     return setFormErrorMessage(`Price must be a number and can't be empty or greater than 1.000.000.`);
        // }
        // if (!toUpdateItem.status) {
        //     return setFormErrorMessage(`You must chose a Status to proceed.`);
        // }

        // FIELDS VALIDATION
        if (!refTitle.current.value && !category && !refBrand.current.value && !price && !refStatus.current.value) {
            return setFormErrorMessage(`All fields are empty. Set at least one field to proceed.`);
        }
        if (toUpdateItem.title && toUpdateItem.title.length < stringMin) {
            return setFormErrorMessage(`Title can't be empty or with less than ${stringMin} characters.`);
        }
        if (toUpdateItem.category && (toUpdateItem.category.length < stringMin || toUpdateItem.category.includes('@'))) {
            return setFormErrorMessage(`Category can't contain special character, be empty or less than ${stringMin} characters long.`);
        }
        if (toUpdateItem.price && (isNaN(toUpdateItem.price) || toUpdateItem.price > 1000000)) {
            return setFormErrorMessage(`Price must be a number and can't be empty or greater than 1.000.000.`);
        }

        // FETCH
        try {
            await updateProduct(VITE_API_URL, '/products/', id, toUpdateItem);
        } catch (error) {
            console.error(error);
        }

        // REFRESH PRODUCTS
        await refreshProducts(VITE_API_URL, '/products', setProducts);

        // ALERT
        alert('Product successfully updated.')

        // RESET FORM
        resetForm();
        // setEditMode(false);
    }

    // COMPONENT EXPORT
    return <>

        <h1>{selectedProduct ? selectedProduct.title : `Product with ID "${id}" does not exist.`}</h1>

        {selectedProduct ?

            <div className='detailsSection'>

                {/* PRODUCT DETAILS */}
                {selectedProduct.brand && <h2>by <strong>{selectedProduct.brand}</strong></h2>}

                <h4 className="pCategory">{selectedProduct.category.toUpperCase()}</h4>

                <div className='productInfo'>
                    {selectedProduct.price && <h3><strong>Price: {selectedProduct.price.toFixed(2)} €</strong></h3>}
                    {selectedProduct.status === 'not available' ? <p className="notAvailable">{selectedProduct.status} ●</p> : <p>{selectedProduct.status} ●</p>}
                </div>

                {/* COMPARE MODE */}
                <div className="flex">
                    <h2><strong>EDIT PRODUCT</strong></h2>
                    <div
                        className="toggle-container"
                        onClick={() => onOff(editMode, setEditMode)}
                    >
                        <div className={`toggle ${editMode ? 'active' : ''}`}></div>
                    </div>
                </div>

                {editMode &&

                    <form className="form">

                        {/* TITLE */}
                        <div className='formFieldContainer'>
                            <h3 className='formFieldName'>Title</h3>
                            <input
                                type="text"
                                ref={refTitle}
                                className='formField'
                                placeholder='New Product title here..'
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
                                placeholder='New Product category here..'
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
                                placeholder='New Product brand here..'
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
                                placeholder='New Product price here..'
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
                                    <option value=''>▼ Update status</option>
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

                }

                {/* BACK TO LIST */}
                <button
                    className='sortButton'
                    onClick={() => navigate(-1)}
                >BACK ➜</button>
            </div >

            :

            <div className='detailsSection'>
                <button
                    className='sortButton'
                    onClick={() => navigate(-1)}
                >BACK ➜</button>
            </div>

        }
    </>
}
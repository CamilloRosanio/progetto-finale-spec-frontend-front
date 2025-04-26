// UTILITY
import { useState, useRef } from 'react';
import { refreshProducts } from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


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
    const [showModal, setShowModal] = useState(false);

    // USE-REF
    const refTitle = useRef();
    const refBrand = useRef();
    const refAvailability = useRef();

    // SUPPORT
    const formFields = {
        category: { name: 'category', warning: `This field can't contain blank spaces.` },
        brand: { name: 'brand', warning: `` },
        price: { name: 'price', warning: `Price can't be higher than 1.000.000.` }
    }

    const statuses = ['available', 'not available'];

    function fieldsValidation(value) {
        if (value && typeof value === 'string') {
            return !value.includes('@');
        }
        if (value === 'number') {
            return (value !== 0 && value > 1000000);
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        alert('SUBMIT');
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
            {!fieldsValidation(category) && <p className='warning'><strong>Category</strong> can't contain "@".</p>}

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
            {fieldsValidation(price) && <p className='warning'><strong>Price</strong> can't be higher than 1.000.000.</p>}

            {/* SELECT STATUS */}
            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Status</h3>

                <div className="selectContainer">
                    {/* OPTIONS */}
                    <select
                        ref={refAvailability}
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

            {/* RESET FORM */}
            <div className='flex'>
                <button
                    className='button close'
                    onClick={() => {
                        refTitle.current.value = '';
                        setCategory('')
                        refBrand.current.value = '';
                        setPrice(null);
                    }}
                >reset</button>

                {/* SUBMIT FORM */}
                <button className='button' onClick={handleSubmit}>submit</button>
            </div>
        </form>


    </>
}
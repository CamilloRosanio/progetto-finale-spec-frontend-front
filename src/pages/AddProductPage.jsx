// UTILITY
import { useState, useRef } from 'react';
import { refreshProducts } from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// COMPONENT EXPORT
export default function AddProductPage() {

    // CONTEXTS DATA
    const {
        products,
        setProducts,
    } = useMainContext();

    // USE-STATE
    const [showModal, setShowModal] = useState(false);

    // USE-REF
    const refTitle = useRef();
    const refCategory = useRef();
    const refAvailability = useRef();

    // SUPPORT
    const statuses = ['available', 'not available'];

    return <>

        <h1>✚ Add a Product</h1>

        <form className="form">

            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Title</h3>
                <input type="text" ref={refTitle} className='formField' placeholder='Product name here..' />
            </div>

            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Category</h3>
                <input type="text" ref={refCategory} className='formField' placeholder='Product name here..' />
            </div>

            <div className='formFieldContainer'>
                <h3 className='formFieldName'>Title</h3>
                <div className="selectContainer">

                    {/* OPTIONS */}
                    <select
                        ref={refAvailability}
                        className="select"
                    >
                        <option value=''>▼ Chose status</option>
                        {statuses.map((option, index) => (
                            <option
                                key={index}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

        </form>

    </>
}
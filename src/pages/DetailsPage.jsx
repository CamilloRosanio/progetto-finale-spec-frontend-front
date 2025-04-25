// UTILITY
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// COMPONENT EXPORT
export default function DetailsPage() {

    // NAVIGATE
    const navigate = useNavigate();

    // CONTEXTS DATA
    const { products } = useMainContext();

    // GET URL PARAMS
    const { id } = useParams();

    // USE-MEMO
    const selectedProduct = useMemo(() => {
        return products.find(p => String(p.id) === String(id));
    }, [products, id]);

    return <>

        {selectedProduct ?

            <div className='detailsSection'>

                <div>
                    <h1>{selectedProduct.title}</h1>
                    {selectedProduct.brand && <h2>by {selectedProduct.brand}</h2>}
                </div>


                <h4 className="pCategory">{selectedProduct.category.toUpperCase()}</h4>

                <div className='productInfo'>
                    {selectedProduct.price && <h3><strong>Price: {selectedProduct.price.toFixed(2)} €</strong></h3>}
                    {selectedProduct.status === 'not available' ? <p className="notAvailable">{selectedProduct.status} ●</p> : <p>{selectedProduct.status} ●</p>}
                </div>

                <button
                    className='sortButton'
                    onClick={() => navigate(`/`)}
                >Home</button>
            </div >

            :

            <div className='detailsSection'>
                <h1>No matches found</h1>
                <button
                    className='sortButton'
                    onClick={() => navigate(`/`)}
                >Home ➜</button>
            </div>

        }
    </>
}
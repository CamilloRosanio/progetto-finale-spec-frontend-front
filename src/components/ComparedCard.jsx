// UTILITY
import { handleSelection } from '../assets/utilityFunctions';


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// COMPONENT EXPORT
export default function CompareCard({
    item,
}) {

    // CONTEXTS DATA
    const {
        products,
        toCompare,
        setToCompare
    } = useMainContext();

    // BEST VALUES
    const bestPrice = Math.min(...toCompare.map(item => item.price));

    return <>

        <div className="comparedCard">
            <div className="flex">
                <h3>{item.title}</h3>
                <p className="warning" onClick={() => handleSelection(products, toCompare, setToCompare, item.id)}><strong>✖</strong></p>
            </div>

            <h4 className="pCategory">{item.category}</h4>
            <p>Brand: {item.brand}</p>
            {item.status === 'not available' ? <p className="notAvailable">{item.status} ●</p> : <p>{item.status} ●</p>}
            {item.quantity > 0 && <p>in stock: <strong>{item.quantity}</strong></p>}

            <div className='flex'>
                {item.price === bestPrice && <span className='bestValueBadge'>★</span>}
                <p>Price: <strong>{item.price} €</strong></p>
            </div>

        </div>

    </>
}
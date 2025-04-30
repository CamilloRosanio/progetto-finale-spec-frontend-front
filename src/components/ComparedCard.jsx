// UTILITY
import { handleSelection } from '../assets/utilityFunctions';
import { memo } from "react";


// CONTEXTS
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import RoundButton from './RoundButton';


// COMPONENT STRUCTURE
function CompareCard({
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

        <div className={`comparedCard ${item.price === bestPrice && 'bestValue'}`}>
            <div className="flex">
                <RoundButton onClick={() => handleSelection(products, toCompare, setToCompare, item.id)} />
                <h3>{item.title}</h3>
            </div>

            <h4 className="pCategory">{item.category}</h4>
            {item.brand && <p>Brand: {item.brand}</p>}
            {item.status === 'not available' ? <p className="notAvailable">{item.status} ●</p> : <p>{item.status} ●</p>}
            {item.quantity > 0 && <p>in stock: <strong>{item.quantity}</strong></p>}

            <div className='flex'>
                {item.price === bestPrice && <span className='bestValueBadge'>★</span>}

                <p>Price: <strong>{item.price} €</strong></p>
            </div>
        </div>

    </>
}


// EXPORT MEMO COMPONENT
export default memo(CompareCard);
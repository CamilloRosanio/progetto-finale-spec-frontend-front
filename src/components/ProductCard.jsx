// UTILITY
import { memo } from "react";


// COMPONENT STRUCTURE
function ProductCard({
    category,
    title,
    brand,
    quantity,
    status,
    price,
    onClick,
    handleFavorite,
}) {

    // debug
    // console.log(`CARD Rendering: ${title}`);

    return <>

        <div className='card' >
            <div className="infoSection" onClick={onClick}>
                <h4 className="pCategory">{category}</h4>
                <h3>{title}</h3>
                {brand && <p className="pBrand">by {brand}</p>}
                {quantity && <p>in stock: <strong>{quantity}</strong></p>}
            </div>

            <div className="infoSection" onClick={onClick}>
                {status === 'not available' ? <p className="notAvailable">{status} ●</p> : <p>{status} ●</p>}
                {price && <p><strong>{price.toFixed(2)} €</strong></p>}
            </div>

            <button
                className="favoriteButton"
                onClick={handleFavorite}
            >❤</button>
        </div >

    </>
}


// EXPORT MEMO COMPONENT
export default memo(ProductCard);
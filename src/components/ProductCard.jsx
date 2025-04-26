// UTILITY
import { memo } from "react";


// COMPONENTS
import RoundButton from "./RoundButton";


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
    isFavorite,
    actionIcon,
    selectMode,
    handleSelect,
    isSelected,
}) {

    // debug
    // console.log(`CARD Rendering: ${title}`);

    return <>

        <div className={`card ${(selectMode && isSelected) ? 'isSelected' : ''}`} >

            {selectMode &&
                <div
                    onClick={handleSelect}
                    className="checkbox"
                >{isSelected && '●'}</div>
            }

            <div className="flex" onClick={onClick}>
                <div className="infoSection" >
                    <h4 className="pCategory">{category}</h4>
                    <h3>{title}</h3>
                    {brand && <p className="pBrand">by {brand}</p>}
                    {quantity > 0 && <p>in stock: <strong>{quantity}</strong></p>}
                </div>

                <div className="infoSection">
                    {status === 'not available' ? <p className="notAvailable">{status} ●</p> : <p>{status} ●</p>}
                    {price && <p><strong>{price.toFixed(2)} €</strong></p>}
                </div>

            </div>
            <button
                className={`favoriteButton ${isFavorite ? 'isFavorite' : ''}`}
                onClick={handleFavorite}
            >{actionIcon}</button>

        </div >

    </>
}


// EXPORT MEMO COMPONENT
export default memo(ProductCard);
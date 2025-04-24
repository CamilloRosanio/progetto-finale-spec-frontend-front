// COMPONENT EXPORT
export default function ProductCard({
    id,
    category,
    title,
    brand,
    quantity,
    status,
    price,
}) {
    return <>

        <div className='card'>
            <div className="productInfo">
                <h4 className="pCategory">{category}</h4>
                <h3>{title}</h3>
                {brand && <p className="pBrand">by {brand}</p>}
                {quantity && <p>in stock: <strong>{quantity}</strong></p>}
            </div>

            <div className="productInfo">
                {status === 'not available' ? <p className="notAvailable">{status} ●</p> : <p>{status} ●</p>}
                {price && <p>{price.toFixed(2)} €</p>}
            </div>
        </div >

    </>
}
// COMPONENTS
import CompareCard from "./ComparedCard";


// COMPONENT EXPORT
export default function CompareSection({
    list,
    close,
}) {
    return <>

        <div className="compareSection">
            <div className="cardHeader">
                <h2>Your comparison</h2>
                <div onClick={close} className="roundButton">✖</div>
            </div>

            <div className="comparedCardsContainer">
                {list && list.map((p, index) =>
                    <CompareCard
                        key={index}
                        item={p}
                    />
                )}
            </div>
        </div>

    </>
}
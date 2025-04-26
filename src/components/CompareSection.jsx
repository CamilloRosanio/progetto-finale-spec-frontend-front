// COMPONENTS
import RoundButton from "./RoundButton";
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
                <RoundButton onClick={close} />
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
// COMPONENT EXPORT
export default function SortButton({
    text,
    onClick,
}) {
    return <>

        <button
            onClick={onClick}
            className="sortButton"
        >
            {text.toUpperCase()}
        </button>

    </>
}
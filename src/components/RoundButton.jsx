// COMPONENT EXPORT
export default function RoundButton({ onClick, icon }) {
    return <>

        <p className=" roundButton" onClick={onClick}><strong>{icon || '✖'}</strong></p>

    </>
}
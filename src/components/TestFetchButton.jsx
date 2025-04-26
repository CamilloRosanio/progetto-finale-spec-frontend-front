// COMPONENT EXPORT
export default function TestFetchButton({ text, onClick }) {
    return <>

        <div className='flex debug'>
            <p>TEST FETCH: {text}</p>
            <p className=" roundButton" onClick={onClick}><strong>✖</strong></p>
        </div>

    </>
}
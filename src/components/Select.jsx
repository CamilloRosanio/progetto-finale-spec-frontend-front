// COMPONENT EXPORT
export default function Select({ placeholder, options, value, setValue }) {
    return <>

        <div className="selectContainer">

            <select
                onChange={e => setValue(e.target.value)}
                defaultValue=""
                value={value}
                className="select"
            >
                <option value='' disabled>{placeholder}</option>
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            <div onClick={() => { setValue('') }} className="roundButton">✖</div>

        </div>
    </>
}




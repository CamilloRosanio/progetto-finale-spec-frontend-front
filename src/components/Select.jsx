// COMPONENTS
import RoundButton from "./RoundButton"


// COMPONENT EXPORT
export default function Select({ placeholder, options, value, setValue }) {
    return <>

        <div className="selectContainer">

            {/* OPTIONS */}
            <select
                onChange={e => setValue(e.target.value)}
                value={value}
                className="select"
            >
                <option value=''>{placeholder}</option>
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            {/* RESET BUTTON */}
            <RoundButton onClick={() => { setValue('') }} />
        </div>
    </>
}




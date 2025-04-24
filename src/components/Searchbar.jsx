// UTILITY
import { useEffect, useState, useCallback } from 'react';
import { debounce } from '../assets/utilityFunctions';


// SEARCHBAR V1
// export default function Searchbar({ placeholder, value, setValue }) {

//     // USE-STATE
//     const [localValue, setLocalValue] = useState(value);

//     return <>
//         <div className="searchbar">
//             <input
//                 type="text"
//                 placeholder={placeholder}
//                 className="searchbarInput"
//                 value={value}
//                 onChange={e => setValue(e.target.value)}
//             />
//             <div
//                 onClick={() => setValue("")}
//                 className="searchbarButton"
//             >
//                 ✖
//             </div>
//         </div>
//     </>
// }


// COMPONENT EXPORT

export default function Searchbar({ placeholder, onDebouncedChange, reset }) {

    // USE-STATE
    const [localValue, setLocalValue] = useState("");

    // USE-CALLBACK
    const debouncedChange = useCallback(
        debounce((query) => {
            onDebouncedChange(query);
        }, 500),
        [onDebouncedChange]
    );

    // USE-EFFECT
    useEffect(() => {
        debouncedChange(localValue);
    }, [localValue, debouncedChange]);

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder={placeholder}
                className="searchbarInput"
                value={localValue}
                onChange={e => setLocalValue(e.target.value)}
            />

            {/* RESET BUTTON */}
            <div
                onClick={() => {
                    reset('');
                    setLocalValue('');
                }}
                className="searchbarButton"
            >
                ✖
            </div>
        </div>
    );
}

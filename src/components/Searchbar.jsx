// UTILITY
import { useEffect, useState, useCallback } from 'react';
import { debounce } from '../assets/utilityFunctions';


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
            <div onClick={() => { reset(''); setLocalValue(''); }} className="roundButton">✖</div>
        </div>
    );
}

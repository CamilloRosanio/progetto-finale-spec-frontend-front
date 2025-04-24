// UTILITY
import { useState } from 'react';
import { debounce } from '../assets/utilityFunctions';


// COMPONENT EXPORT
export default function Searchbar({ placeholder, value, setValue }) {

    return <>
        <div className="searchbar">
            <input
                type="text"
                placeholder={placeholder}
                className="searchbarInput"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div
                onClick={() => setValue("")}
                className="searchbarButton"
            >
                ✖
            </div>
        </div>
    </>
}

// UTILITY
import { NavLink } from "react-router";


// COMPONENT EXPORT
export default function Navbar() {
    return <>

        <div>
            <NavLink to="/" className="debug nav-link">Home</NavLink>

            <NavLink to="/details" className="debug nav-link">Item Details</NavLink>
            <NavLink to="/favorites" className="debug nav-link">Favorites</NavLink>

            <NavLink to="/pagina-inesistente" className="debug nav-link">Not found Page</NavLink>
        </div>

    </>
}
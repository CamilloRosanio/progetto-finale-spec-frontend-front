// UTILITY
import { NavLink } from "react-router";


// COMPONENT EXPORT
export default function Navbar() {
    return <>

        <div className="navbar">
            <div className="navbarLogo">
                <NavLink to="/" className="navlink">LOGO</NavLink>
            </div>

            <div className="navbarLinks">
                <NavLink to="/" className="navlink">Home</NavLink>
                <NavLink to="/favorites" className="navlink">Favorites</NavLink>
            </div>
        </div>

    </>
}
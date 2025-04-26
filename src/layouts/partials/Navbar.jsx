// UTILITY
import { NavLink } from "react-router";


// NOTA:
// La proprietà isActive scritta in questo modo viene fornita direttamente da React Router
// className={({ isActive }) => isActive ? "navlink active" : "navlink"}


// COMPONENT EXPORT
export default function Navbar() {
    return <>

        <div className="navbar">
            <div className="navbarLogo">
                <NavLink to="/" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>
                    <img src="./src/assets/img/boolshop_logo.png" alt="boolshop logo" className="navbarLogo" />
                </NavLink>
            </div>

            <div className="navbarLinks">
                <NavLink to="/" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Home</NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>❤ Favorites</NavLink>
                <NavLink to="/add" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>✚ Add Product</NavLink>
            </div>
        </div>

    </>
}
// UTILITY
import { useNavigate } from "react-router-dom";


// COMPONENTS
import RoundButton from "../components/RoundButton"


// COMPONENT EXPORT
export default function NotFoundPage() {

    // NAVIGATE
    const navigate = useNavigate();

    return <>

        <h1>Page not found</h1>
        <div className='detailsSection'>
            <button
                className='sortButton'
                onClick={() => navigate(-1)}
            >BACK ➜</button>
        </div>

    </>
}
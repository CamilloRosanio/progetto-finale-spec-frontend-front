// UTILITY
import { Outlet } from 'react-router-dom';


// CONTEXT
import { useMainContext } from "../contexts/MainContext";


// COMPONENTS
import Header from './partials/Header';
import Footer from './partials/Footer';


// COMPONENT EXPORT
export default function Layout() {

    // IMPORT CONTEXT DATA
    const MainContext = useMainContext();

    return <>

        <div className='wrapper'>
            <Header />

            <main>
                <div className='container debug'>
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>

    </>
}
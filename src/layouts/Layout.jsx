// UTILITY
import { Outlet } from 'react-router-dom';


// COMPONENTS
import Header from './partials/Header';
import Footer from './partials/Footer';


// COMPONENT EXPORT
export default function Layout() {

    return <>

        <div className='wrapper'>
            <Header />

            <main>
                <div className='container'>
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>

    </>
}
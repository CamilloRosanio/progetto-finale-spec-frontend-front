// UTILITY
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// CONTEXTS
import { MainContextProvider } from "./contexts/MainContext";


// LAYOUT
import Layout from './layouts/Layout';


// PAGES
import HomePage from './pages/HomePage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';


// COMPONENT EXPORT
function App() {

  return (
    <>

      {/* CONTEXT */}
      <MainContextProvider>

        <BrowserRouter>
          <Routes>

            {/* LAYOUT */}
            <Route Component={Layout}>

              {/* PAGES */}
              <Route index Component={HomePage}></Route>
              <Route path='/favorites' Component={FavoritesPage}></Route>
              <Route path='/details' Component={ItemDetailsPage}></Route>

              {/* NOT FOUND PAGE */}
              <Route path='*' Component={NotFoundPage}></Route>

            </Route>

          </Routes>
        </BrowserRouter>

      </MainContextProvider>

    </>
  )
}


// COMPONENT EXPORT
export default App

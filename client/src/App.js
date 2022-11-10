
// IMPORTS
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {StoreProvider} from './utils/GlobalState';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';


// COMPONENT
export default function App() {
    return (
        <Router>
            <StoreProvider>
                <Navbar />
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' render={() => <h1 className='display-2'>Wrong page!</h1>} />  {/* UPDATE LATER */}
                </Routes>
                
                <Footer />
            </StoreProvider>
      </Router>
    );
}
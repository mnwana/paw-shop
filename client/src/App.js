
// IMPORTS
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {StoreProvider} from './utils/GlobalState';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MyAccount from './pages/MyAccount';

import './App.css';


// COMPONENT
export default function App() {
    return (
        <Router>
            <StoreProvider>
                <Navbar />
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/account' element={<MyAccount />} />
                    <Route path='*' element={<h2 className='display-2'>Wrong page!</h2>} />  {/* UPDATE LATER */}
                </Routes>
                
                <Footer />
            </StoreProvider>
      </Router>
    );
}
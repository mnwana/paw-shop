
// IMPORTS
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import {StoreProvider} from './utils/GlobalState';

import Navbar from './components/Navbar';
import LoginSignupModal from './components/LoginSignupModal';
import Footer from './components/Footer';

import Home from './pages/Home';
import MyAccount from './pages/MyAccount';

import 'bootstrap';  // Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';



// COMPONENT
export default function App() {
    return (
        <Router>
            <StoreProvider>
                <LoginSignupModal />  {/* UPDATE LATER to only render when logged in */}

                <Navbar />
                
                <main>
                    <Routes>
                        <Route path='/listings' element={<Home />} />
                        <Route path='/account' element={<MyAccount />} />
                        <Route path='*' element={<Navigate to='/listings' />} />
                    </Routes>
                </main>
                
                <Footer />
            </StoreProvider>
      </Router>
    );
}
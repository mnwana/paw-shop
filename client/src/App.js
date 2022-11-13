
// IMPORTS
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import {StoreProvider} from './utils/GlobalState';

import Navbar from './components/Navbar';
import LoginSignupModal from './components/LoginSignupModal';
import AcctMngmntModals from './components/AcctMngmntModals';
import Footer from './components/Footer';

import Posts from './pages/Posts';
import PostAnItem from './pages/PostAnItem';
import MyAccount from './pages/MyAccount';
import SinglePost from './pages/SinglePost';
import User from './pages/User';

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

                <AcctMngmntModals />
                
                <main>
                    <Routes>
                        <Route path='/posts' element={<Posts />} />
                        <Route path='/post-an-item' element={<PostAnItem />} />
                        <Route path='/account' element={<MyAccount />} />
                        <Route path='/post/:postId' element={<SinglePost />} />
                        <Route path='/user/:username' element={<User />} />
                        <Route path='*' element={<Navigate to='/posts' />} />
                    </Routes>
                </main>
                
                <Footer />
            </StoreProvider>
      </Router>
    );
}
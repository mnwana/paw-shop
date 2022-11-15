
// IMPORTS
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import {StoreProvider} from './utils/GlobalState';

import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {localStorageTokenName} from './utils/auth';

import Navbar from './components/Navbar';
import LoginSignupModal from './components/LoginSignupModal';
import Footer from './components/Footer';

import Posts from './pages/Posts';
import PostAnItem from './pages/PostAnItem';
import MyAccount from './pages/MyAccount';
import SinglePost from './pages/SinglePost';
import User from './pages/User';

import 'bootstrap';  // Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';



// MIDDLEWARE
const httpLink = createHttpLink({uri: '/graphql'});  // See package.json's `proxy` value: The development client will prefix the URL of all Apollo GraphQL server requests with the `proxy` value (for the production server, this will not happen, because client and server will reside at the same location)

const authLink = setContext((_, {headers}) => { 
    const token = localStorage.getItem(localStorageTokenName);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});



// COMPONENT
export default function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <StoreProvider>
                    <LoginSignupModal />  {/* UPDATE LATER to only render when logged in */}

                    <Navbar />
                    
                    <main className='flex-grow-1'>
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
        </ApolloProvider>
    );
}
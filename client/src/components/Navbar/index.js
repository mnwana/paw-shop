
// IMPORTS
import {Link} from 'react-router-dom';
import {useState} from 'react';

import {modalId} from '../LoginSignupModal';

import './index.css';



// COMPONENT
export default function Navbar(){
    const [activePage, setActivePage] = useState('Posts');
    function handleNavClick({target}){
        const page = target.getAttribute('page');
        if (page)
            setActivePage(page);
    }

    const testerLoggedIn = true;  // UPDATE LATER to pull from client-side `utils/auth.js`

    const items = [
        {
            name: 'Posts',
            link: '/',
            reqsLogin: null
        },
        {
            name: 'Post an item',
            link: '/post-item',
            reqsLogin: true
        },
        {
            name: 'My account',
            link: '/account',
            reqsLogin: true
        },
        {
            name: 'Sign up / log in',
            reqsLogin: false,
        },
        {
            name: 'Log out',  // UPDATE LATER to log user out
            link: null,
            reqsLogin: true
        }
    ];

    return (
        <header>
            <h1>
                <Link to='/posts' page='Posts' onClick={handleNavClick}>Site title</Link>
            </h1>

            <nav>
                <ul>
                    {items
                        .filter(item => item.reqsLogin === null || item.reqsLogin === testerLoggedIn)
                        .map(item =>
                            <li
                                key={item.name}
                                className={`${activePage === item.name ? 'active' : ''}`}
                            >
                                {item.name === 'Sign up / log in' ? 
                                        <button type="button" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                                            {item.name}
                                        </button>
                                    :
                                        <Link to={item.link} page={item.link ? item.name : ''} onClick={handleNavClick}>
                                            {item.name}
                                        </Link>
                                }
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
}
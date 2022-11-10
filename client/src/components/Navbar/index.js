
// IMPORTS
import {Link} from 'react-router-dom';
import {useState} from 'react';

import './index.css';



// COMPONENT
export default function Navbar(){
    const [activePage, setActivePage] = useState('Listings');
    function handleNavClick({target}){
        const page = target.getAttribute('page');
        if (page)
            setActivePage(page);
    }

    const testerLoggedIn = true;  // UPDATE LATER to pull from client-side `utils/auth.js`

    const items = [
        {
            name: 'Listings',
            link: '/',
            reqsLogin: null,
            isPage: true
        },
        {
            name: 'Post an item',
            link: '/post-item',
            reqsLogin: true,
            isPage: true
        },
        {
            name: 'My account',
            link: '/account',
            reqsLogin: true,
            isPage: true
        },
        {
            name: 'Sign up / log in',
            link: null,  // UPDATE LATER to activate modal
            reqsLogin: false,
            isPage: false
        },
        {
            name: 'Log out',
            link: null,  // UPDATE LATER to log user out
            reqsLogin: true,
            isPage: false
        }
    ];

    return (
        <header>
            <h1>
                <Link to='/' page='Home' onClick={handleNavClick}>Site title</Link>
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
                                <Link to={item.link} page={item.isPage ? item.name : ''} onClick={handleNavClick}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
}
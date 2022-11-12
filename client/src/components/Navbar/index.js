
// IMPORTS
import {useEffect} from 'react';

import {Link} from 'react-router-dom';

import {useStoreContext} from '../../utils/GlobalState';
import {SET_ACTIVE_PAGE} from '../../utils/actions';

import {loginSignupModalId} from '../LoginSignupModal';

import './index.css';



// COMPONENT
export default function Navbar(){
    const [{activePage}, dispatch] = useStoreContext();

    function handleNavClick({target}){
        const page = target.getAttribute('page');
        if (page)
            dispatch({
                type: SET_ACTIVE_PAGE,
                activePage: page
            });
    }


    const testerLoggedIn = true;  // UPDATE LATER to pull from client-side `utils/auth.js`


    const items = [
        {
            name: 'Posts',
            link: '/posts',
            reqsLogin: null
        },
        {
            name: 'Post an item',
            link: '/post-an-item',
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


    useEffect(
        () => {dispatch({
            type: SET_ACTIVE_PAGE,
            activePage: items.find(({link}) => link === `/${document.location.href.split('/')[3]}`).name  // UPDATE LATER if and when URLs become more complicated…
        })},
        []
    );


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
                                        <button type="button" data-bs-toggle="modal" data-bs-target={`#${loginSignupModalId}`}>
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
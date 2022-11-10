
// IMPORTS
import {Link} from 'react-router-dom';


// COMPONENT
export default function Navbar(){
    const testerLoggedIn = true;  // UPDATE LATER to pull from client-side `utils/auth.js`

    const items = [
        {
            name: 'Listings',
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
            link: null,  // UPDATE LATER to activate modal
            reqsLogin: false
        },
        {
            name: 'Log out',
            link: null,  // UPDATE LATER to log user out
            reqsLogin: true
        }
    ];

    return (
        <header>
            <h1>Site title</h1>

            <nav>
                <ul>
                    {items
                        .filter(item => item.reqsLogin === null || item.reqsLogin === testerLoggedIn)
                        .map(item =>
                            <li key={item.name}>
                                <Link to={item.link}>
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
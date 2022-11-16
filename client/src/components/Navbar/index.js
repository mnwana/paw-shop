
// IMPORTS
import {useState, useEffect} from 'react';

import {siteTitle} from '../../utils/helpers';

import {useStoreContext} from '../../utils/GlobalState';
import {SET_NAV_ACTIVE_PAGE} from '../../utils/actions';

import {Link} from 'react-router-dom';

import {loginSignupModalId} from '../LoginSignupModal';

import './index.css';

import logo from '../../assets/logo-by-claudia-yile.png';
import logoAnimated from '../../assets/logo-animated-by-claudia-yile.gif';



// COMPONENT
export default function Navbar(){
    const [{navActivePage}, dispatch] = useStoreContext();

    const testerLoggedIn = true;  // UPDATE LATER to pull from client-side `utils/auth.js`

    const [imgSrc, setImgSrc] = useState(logo);


    const navItems = [
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
            name: 'Log in / sign up',
            reqsLogin: false,
        },
        {
            name: 'Log out',  // UPDATE LATER to log user out
            reqsLogin: true
        }
    ];

    function handleNavClick({target}){
        const page = target.getAttribute('page');
        if (page)
            dispatch({
                type: SET_NAV_ACTIVE_PAGE,
                navActivePage: page
            });
    }

    useEffect(
        () => {
            dispatch({
                type: SET_NAV_ACTIVE_PAGE,
                navActivePage:
                        navItems.find(({link}) => link === `/${document.location.href.split('/')[3]}`)?.name  // UPDATE LATER if and when URLs become more complicated…
                    ||
                        'Posts'
            });
        },
        []
    );

    useEffect(
        () => {document.title = `${siteTitle} | ${navActivePage}`;},
        [navActivePage, dispatch]
    );


    function handleLogOut(){  // UPDATE LATER
        alert('Log out the current user');
    }


    // MOBILE NAV MENU
        let [mobileNavOpen] = useState(false);

        function clickOutsideMobileNavListener(e){
            if (document.querySelector('.navbar-nav').contains(e.target)){
                mobileNavOpen = false;
                window.removeEventListener('click', clickOutsideMobileNavListener);
            }
            else if (!document.querySelector('.navbar-toggler').contains(e.target))
                document.querySelector('.navbar-toggler').click();
        }

        function handleShowMobileNav(){
            document.querySelector('.navbar-toggler').blur();
            mobileNavOpen = !mobileNavOpen;
            if (mobileNavOpen)
                window.addEventListener('click', clickOutsideMobileNavListener);
            else
                window.removeEventListener('click', clickOutsideMobileNavListener);
        }


    function getNavLi(item){
        return <li
            className={`nav-link ${navActivePage === item.name ? 'active' : ''} py-0 px-3`}
            page={item.link ? item.name : ''}
            onClick={handleNavClick}
            data-bs-toggle='collapse'
            data-bs-target='.navbar-collapse.show'
            aria-current={item.name}
        >
            {item.name.replaceAll(' ', '\u00A0')}  {/* replaces spaces with `nbsp;`s */}
        </li>;
    }


    return (
        <header className='d-flex justify-content-between mt-2 mb-3 mx-1 flex-grow-0'>
            <Link to='/posts' page='Posts' onClick={handleNavClick}>
                <img
                    src={imgSrc}
                    onMouseEnter={() => setImgSrc(logoAnimated || logo) /* `logo` = fallback */ }
                    onMouseLeave={() => setImgSrc(logo)}
                    style={{width: '400px'}}
                    alt={siteTitle} />
            </Link>


            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid justify-content-end px-0">
                    <button className="navbar-toggler" type="button" tabIndex={-1} onClick={handleShowMobileNav} data-bs-toggle="collapse" data-bs-target="#navbar-items-wrapper" aria-controls="navbar-items-wrapper" aria-expanded="false" aria-label="Toggle mobile nav menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse rounded" id="navbar-items-wrapper">
                        <ul className='navbar-nav align-items-end'>
                            {navItems
                                .filter(item => item.reqsLogin === null || item.reqsLogin === testerLoggedIn)
                                .map(item => item.link ?
                                    <Link
                                        to={item.link}
                                        className='nav-link-wrapper no-link-style p-0'
                                        key={item.name}
                                    >
                                        {getNavLi(item)}
                                    </Link>
                                : item.name === 'Log in / sign up' ?
                                    <button
                                        className='nav-link-wrapper btn btn-link p-0'
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#${loginSignupModalId}`}
                                        key={item.name}
                                    >
                                        {getNavLi(item)}
                                    </button>
                                : // item.name === 'Log out'
                                    <button
                                        className='nav-link-wrapper btn btn-link p-0'
                                        type="button"
                                        onClick={handleLogOut}
                                        key={item.name}
                                    >
                                        {getNavLi(item)}
                                    </button>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
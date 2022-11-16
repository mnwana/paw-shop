
// IMPORTS
import {useState} from "react";

import logo from '../../assets/logo-by-claudia-yile.png';
import {siteTitle} from "../../utils/helpers";

import './index.css';



// MODAL ID
export const loginSignupModalId = 'login-signup-modal';



// COMPONENT
export default function LoginSignupModal(){
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [toggleLogin, setToggleLogin] = useState(true);


    function handleToggle(){
        setToggleLogin(!toggleLogin);
    }


    function handleLoginChange({target}){
        switch (target.name){
            case 'login-email':
                setLoginInfo({...loginInfo, email: target.value});
                break;
            case 'login-password':
                setLoginInfo({...loginInfo, password: target.value});
                break;
        }
    }    


    function handleSignupChange({target}){
        switch (target.name){
            case 'signup-username':
                setSignupInfo({...signupInfo, username: target.value});
                break;
            case 'signup-email':
                setSignupInfo({...signupInfo, email: target.value});
                break;
            case 'signup-password':
                setSignupInfo({...signupInfo, password: target.value});
                break;
        }
    }

    
    function handleLoginSubmit(e){  // UPDATE LATER
        e.preventDefault();

        loginInfo.email = loginInfo.email.trim();

        if (loginInfo.email && loginInfo.password){
            alert(`logging in with these credentials:
                ${loginInfo.email}
                ${loginInfo.password}
            `);

            setLoginInfo({
                email: '',
                password: ''
            });
        }
    }


    function handleSignupSubmit(e){  // UPDATE LATER
        e.preventDefault();

        signupInfo.username = signupInfo.username.trim();
        signupInfo.email = signupInfo.email.trim();

        if (signupInfo.username && signupInfo.email && signupInfo.password){
            alert(`signing up with these credentials:
                ${signupInfo.username}
                ${signupInfo.email}
                ${signupInfo.password}
            `);

            setSignupInfo({
                username: '',
                email: '',
                password: ''
            });
        }
    }


    return (
        <div className="modal fade" id={loginSignupModalId} tabIndex="-1" aria-labelledby="Log in / sign up window" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">
                            <img src={logo} style={{width: '300px'}} alt={siteTitle} />
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body d-flex flex-column">

                        <div className="btn-group btn-group-toggle mb-3" data-toggle="buttons">
                            <label className={`btn ${toggleLogin ? 'active' : ''} hover-opacity`} htmlFor="login-toggle">
                                <input className="d-none" type="radio" name="login-signup-toggler" id="login-toggle" defaultChecked onChange={handleToggle} />
                                Log in
                            </label>

                            <label className={`btn ${toggleLogin ? '' : 'active'} hover-opacity`} htmlFor="signup-toggle">
                                <input className="d-none" type="radio" name="login-signup-toggler" id="signup-toggle" onChange={handleToggle} />Sign up
                            </label>
                        </div>

                        <form className={`${toggleLogin ? 'd-flex flex-column align-items-center' : 'd-none'}`} id="login" onSubmit={handleLoginSubmit}>
                            <div className="form-floating w-75 mb-2">
                                <input className="form-control" value={loginInfo.email} onChange={handleLoginChange} id="login-email" name="login-email" type="email" placeholder="Enter email" required />
                                <label htmlFor="login-email">Email</label>
                            </div>
                            
                            <div className="form-floating w-75 mb-2">
                                <input className="form-control" value={loginInfo.password} onChange={handleLoginChange} id="login-password" name="login-password" type="password" placeholder="Enter password" required />
                                <label htmlFor="login-pasword">Password</label>
                            </div>

                            <button className="btn submit-btn hover-opacity mt-1" type="submit" form="login">Log in</button>
                        </form>

                        <form className={toggleLogin ? 'd-none' : 'd-flex flex-column align-items-center'} id="signup" onSubmit={handleSignupSubmit}>
                            <div className="form-floating w-75 mb-2">
                                <input className="form-control" value={signupInfo.username} onChange={handleSignupChange} id="signup-username" name="signup-username" type="text" placeholder="Enter username" required />
                                <label htmlFor="signup-username">Username</label>
                            </div>

                            <div className="form-floating w-75 mb-2">
                                <input className="form-control" value={signupInfo.email} onChange={handleSignupChange} id="signup-email" name="signup-email" type="email" placeholder="Enter email" required />
                                <label htmlFor="signup-email">Email</label>
                            </div>

                            <div className="form-floating w-75 mb-2">
                                <input className="form-control" value={signupInfo.password} onChange={handleSignupChange} id="signup-password" name="signup-password" type="password" placeholder="Enter password" required />
                                <label htmlFor="signup-password">Password</label>
                            </div>

                            <button className="btn submit-btn hover-opacity mt-1" type="submit" form="signup">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
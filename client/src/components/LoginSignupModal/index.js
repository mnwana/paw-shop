
// IMPORTS
import {useState} from "react";



// MODAL ID
export const modalId = 'login-signup-modal';



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

        alert(`logging in with these credentials:
            ${loginInfo.email}
            ${loginInfo.password}
        `);

        setLoginInfo({
            email: '',
            password: ''
        });
    }


    function handleSignupSubmit(e){  // UPDATE LATER
        e.preventDefault();
        
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


    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="Log in / sign up window" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">Site title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form id="login" onSubmit={handleLoginSubmit}>
                            <label>Log in</label>

                            <div className="form-floating">
                                <input className="form-control" value={loginInfo.email} onChange={handleLoginChange} id="login-email" name="login-email" type="email" placeholder="Enter email" required />
                                <label htmlFor="login-email">Email</label>
                            </div>
                            
                            <div className="form-floating">
                                <input className="form-control" value={loginInfo.password} onChange={handleLoginChange} id="login-password" name="login-password" type="password" placeholder="Enter password" required />
                                <label htmlFor="login-pasword">Password</label>
                            </div>

                            <button className="btn btn-primary" type="submit" form="login">Log in</button>
                        </form>

                        <form id="signup" onSubmit={handleSignupSubmit}>
                            <label>Sign up</label>

                            <div className="form-floating">
                                <input className="form-control" value={signupInfo.username} onChange={handleSignupChange} id="signup-username" name="signup-username" type="text" placeholder="Enter username" required />
                                <label htmlFor="signup-username">Username</label>
                            </div>

                            <div className="form-floating">
                                <input className="form-control" value={signupInfo.email} onChange={handleSignupChange} id="signup-email" name="signup-email" type="email" placeholder="Enter email" required />
                                <label htmlFor="signup-email">Email</label>
                            </div>

                            <div className="form-floating">
                                <input className="form-control" value={signupInfo.password} onChange={handleSignupChange} id="signup-password" name="signup-password" type="password" placeholder="Enter password" required />
                                <label htmlFor="signup-password">Password</label>
                            </div>

                            <button className="btn btn-primary" type="submit" form="signup" >Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
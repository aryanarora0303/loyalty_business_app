// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, signIn, setPermanentPassword } from '../../../app/authSlice';
import { updateActiveNav } from '../../../app/appSlice';

// Modules Imports
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports
import './SignIn.css';

export function SignIn(props) {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location  = useLocation();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const newPasswordRef = useRef();

    const [showDetailsForm, setShowDetailsForm] = useState(true);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signInError, setSignInError] = useState("");

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignIn");
    }, [])

    useEffect(() => {
        console.log("COMPONENT SignIn: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.SIGN_IN));
    }, [dispatch])

    useEffect(() => {
        if(auth.isTempSignedIn) {
            console.log("COMPONENT SignIn: Temporarily signed in, Set New Password");
            setShowDetailsForm(false);
            setShowNewPasswordForm(true);
        }
    }, [auth.isTempSignedIn])

    useEffect(() => {
        if(auth.authError) { console.log("COMPONENT SignIn: Auth Error"); }
        if(auth.authError && auth.authError.toLowerCase().includes('username')){ setUsernameError(auth.authError); return;}
        if(auth.authError && auth.authError.toLowerCase().includes('password')){ setPasswordError(auth.authError); return; }
        if(auth.authError) { 
            setSignInError(`${auth.authError}. Please Contact Support Administrator.`);
            return; 
        }
    }, [auth.authError])

    let formSubmitHandler = (event) => {
        event.preventDefault();
        
        if(auth.isTempSignedIn){
            let new_password = newPasswordRef.current.value;
            console.log(`COMPONENT SignIn: New Password form Submission. New Password: ${new_password}`);
            dispatch(setPermanentPassword({user: auth.user, new_password: new_password}))
        } else {
            let username = usernameRef.current.value;
            let password = passwordRef.current.value;
            console.log(`COMPONENT SignIn: SignIn form Submission. Email: ${username}, Password: ${password}`);
            dispatch(signIn({username, password}));
        }
    }
    
    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
                <div className="max-w-lg mx-auto">

                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" 
                            to={(auth.isAuthenticated) ? ROUTES.DASHBOARD : ROUTES.SCAN}>
                            <img className="h-24" src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                        <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Sign in to your account</h3>
                        <p className="text-lg text-coolGray-500 font-medium">Welcome back!</p>
                        <hr className='mt-2 mb-2'/>
                    </div>

                    <div className="mb-7">
                        <form onSubmit={formSubmitHandler}>
                            {/* Sign In Fields */}
                            {(showDetailsForm) ?
                                <div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Email or Phone</label>
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={usernameRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="email" type="email" placeholder="Enter your email" required autoComplete="username" onInvalid={(e) => {e.preventDefault(); setUsernameError("Please enter a valid email");}}/>
                                            {usernameError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        {usernameError ? <p className="text-sm text-red-600 mt-1">{usernameError}</p> : ""}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Password</label>
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={passwordRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="password" type="password" placeholder="Enter your password" required autoComplete="current-password" onInvalid={(e) => {e.preventDefault(); setPasswordError("Please enter a valid passoword");}}/>
                                            {passwordError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        {passwordError ? <p className="text-sm text-red-600 mt-1">{passwordError}</p> : ""}
                                        {signInError ? <p className="text-sm text-red-600 mt-1">{signInError}</p> : ""}
                                    </div>
                                </div> 
                                : ""
                            }

                            {/* Set New Permanent Password */}
                            {(showNewPasswordForm) ? 
                                <div className="mb-4">
                                    <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Set New Password</label>
                                    <div className='flex justify-between items-center relative'>
                                        <input ref={newPasswordRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="password" type="password" placeholder="Enter your password" required autoComplete="" onInvalid={(e) => {e.preventDefault(); setPasswordError("Please enter a valid passoword");}}/>
                                        {passwordError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                    </div>
                                    {passwordError ? <p className="text-sm text-red-600 mt-1">{passwordError}</p> : ""}
                                    {signInError ? <p className="text-sm text-red-600 mt-1">{signInError}</p> : ""}
                                </div>
                                : ""
                            }

                            <button type='submit' className="inline-block py-3 px-7 mb-6 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
      </section>
    );
}
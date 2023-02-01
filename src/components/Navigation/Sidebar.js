// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, signOut } from '../../app/authSlice';

// Modules Imports
import { NavLink } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports
import './Sidebar.css';

export function Sidebar(props) {
    const auth = useSelector(authStore);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: SideBar");

        // Toggling Navbar(as sidebar) for smaller screens
        // open
        const burger = document.querySelectorAll('.navbar-burger');
        const menu = document.querySelectorAll('.navbar-menu');
        const backdrop = document.querySelectorAll('.navbar-backdrop');

        if (burger.length && menu.length) {
            for (let i = 0; i < burger.length; i++) {
                burger[i].addEventListener('click', function() {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                    backdrop[0].classList.toggle('hidden');
                });
            }
        }

        // close
        const close = document.querySelectorAll('.navbar-close');

        // close button is clicked to close the menu
        if (close.length) {
            for (var i = 0; i < close.length; i++) {
                close[i].addEventListener('click', function() {
                    for (var j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                    backdrop[0].classList.toggle('hidden');
                });
            }
        }

        // backdrop is clicked to close the menu
        if (backdrop.length) {
            for (let i = 0; i < backdrop.length; i++) {
                backdrop[i].addEventListener('click', function() {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                    backdrop[0].classList.toggle('hidden');
                });
            }
        }

        // Default selected option is Dashboard
        handleNavOptionClicked({currentTarget: { id: 'dashboard-sidebar-option-btn'}});
    },[])

    let handleNavOptionClicked = (e) => {
        let clicked_btn_id = e.currentTarget.id;
        let option = clicked_btn_id.split('-')[0].toUpperCase();
        console.log(`COMPONENT Sidebar: ${option} Option Selected`);

        props.setSidebarOption(option);

        // Change styles of other(not clicked) sidebar options
        let sidebar_option_buttons = document.querySelectorAll('.sidebar-option-btn');
        for (let i = 0; i < sidebar_option_buttons.length; i++) {
            sidebar_option_buttons[i].classList.remove('text-loyaltyGold-100');
            sidebar_option_buttons[i].classList.add('text-coolGray-400');

            sidebar_option_buttons[i].classList.remove('bg-coolGray-50');
            sidebar_option_buttons[i].classList.add('bg-white');
            
            // Option name p tag style
            sidebar_option_buttons[i].children[0].children[1].classList.remove('font-semibold');
            sidebar_option_buttons[i].children[0].children[1].classList.add('font-medium');
        }

        // Change style of clicked sidebar option
        let clicked_btn = document.querySelectorAll(`#${e.currentTarget.id}`)[0];
        clicked_btn.classList.remove('text-coolGray-400');
        clicked_btn.classList.add('text-loyaltyGold-100');
        clicked_btn.classList.remove('bg-white');
        clicked_btn.classList.add('bg-coolGray-50');
        clicked_btn.children[0].children[1].classList.remove('font-medium');
        clicked_btn.children[0].children[1].classList.add('font-semibold');
    }

    return (
        <section className="bg-white bg-opacity-0 min-h-full">
            {/* Hamburger Nav to toggle Sidebar Navigation */}
            <div className="px-4 flex items-center justify-between md:hidden border-b border-coolGray-100 py-5">
                <div className="w-auto">
                    <NavLink className="block max-w-max" to={ROUTES.DASHBOARD}>
                        <img className='h-20' src="./loyalty_logo.png" alt=""/>
                    </NavLink>
                </div>
                <div className="w-auto">
                    <button className="navbar-burger self-center ml-auto block md:hidden">
                        <i className="fa-solid fa-bars text-xl text-coolGray-500" />
                    </button>
                </div>
            </div>
            
            {/* Navigation Backdrop */}
            <div className="navbar-backdrop z-40 fixed hidden inset-0 bg-coolGray-900 opacity-60" />

            {/* Sidebar Navigation */}
            <div className="navbar-menu z-50 fixed top-0 left-0 hidden md:flex flex-col justify-between bg-white border-r border-coolGray-100 w-[60%] md:w-[17%] h-full overflow-y-auto">
                {/* Navigation Options */}
                <div className="relative bg-white">
                    <div className="fixed top-0 left-0 p-6 pb-2 bg-white">
                        <NavLink className="block max-w-max" to={ROUTES.DASHBOARD}>
                            <img className='h-20' src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                    </div>

                    {/* Navigation Options */}
                    <div className="mt-32">
                        {/* Category Heading */}
                        <div className='px-8 my-4'>
                            <p className="mb-2 text-xs font-medium text-coolGray-500 uppercase">Overview</p>
                            <hr/>
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 mb-1">
                            <div>
                                <button id='dashboard-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-square-poll-vertical text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Dashboard</p>
                                    </div>

                                    {/* TODO: CATEGORY OPTIONS: NOT PART OF MVP */}
                                    {/* <button id='dashboard-sidebar-options-toggle-btn'>
                                        <i className="fa-solid fa-angle-down"/>
                                    </button> */}
                                </button>
                            </div>

                            {/* TODO: CATEGORY OPTIONS: NOT PART OF MVP */}
                            {/* <div>
                                <div className="p-3 py-2 pl-11 flex items-center justify-between">
                                    <button className="flex items-center">
                                        <p className="text-coolGray-800 font-medium text-base">Overview</p>
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 mb-1">
                            <div>
                                <button id='businesses-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-briefcase text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Businesses</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 mb-1">
                            <div>
                                <button id='customers-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-users text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Customers</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 mb-1">
                            <div>
                                <button id='cards-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-credit-card text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Cards</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 mb-1">
                            <div>
                                <button id='promos-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-tags text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Promos</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 mb-1">
                            <div>
                                <button id='scans-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-qrcode text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Scans</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Category Heading */}
                        <div className='px-8 my-4'>
                            <p className="mb-2 text-xs font-medium text-coolGray-500 uppercase">Settings</p>
                            <hr/>
                        </div>

                        {/* Category w/ Options */}
                        <div className="px-4 my-1">
                            <div>
                                <button id='account-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-user text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Account</p>
                                    </div>
                                </button>
                            </div>
                            <div>
                                <button id='settings-sidebar-option-btn' className="sidebar-option-btn p-3 py-2 w-full flex items-center justify-between text-coolGray-400 hover:text-loyaltyGold-100 hover:bg-coolGray-50 rounded-md transition-all"
                                    onClick={handleNavOptionClicked}>
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-gear text-2xl mr-3"/>
                                        <p className="text-coolGray-800 font-medium text-base">Settings</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Admin Info Card & Logout Button */}
                <div className="fixed bottom-0 flex flex-col items-start p-6 justify-between w-[60%] md:w-[17%] bg-white border-r border-coolGray-100">
                    <hr className='w-full my-2'/>
                    <div className="flex items-center flex-wrap">
                        <div className="w-fit h-fit p-2">
                            <i className="fa-solid fa-user text-coolGray-400 text-3xl"/>
                        </div>
                        {(auth.isAuthenticated) ? 
                            <div className="w-auto p-2">
                                <h2 className="text-sm font-semibold text-coolGray-800">{auth.user.name}</h2>
                                <p className="text-sm font-medium text-coolGray-500">{auth.user.email}</p>
                            </div>
                            : ""
                        }
                    </div>
                    <button className='flex items-center justify-center p-2 my-2 w-full text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all' onClick={() => {dispatch(signOut())}}>
                        <i className="fa-solid fa-arrow-right-from-bracket text-lg mr-3"/>
                        <p className="text-md font-semibold">Sign Out</p>
                    </button>
                </div>
            </div>

            <div className="md:ml-40" />
      </section>
    );
}
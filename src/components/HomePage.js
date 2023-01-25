// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useDispatch } from 'react-redux';
import { updateActiveNav } from '../app/appSlice';

// Modules Imports
import { useNavigate } from 'react-router-dom';

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './HomePage.css';

export function HomePage() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("COMPONENT RENDERED: HomePage, Redirect to Scan");
        navigate(ROUTES.SCAN);
    }, []);

    useEffect(() => {
        console.log("COMPONENT HomePage: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.HOME_PAGE));
    }, [dispatch]);

    return (
        <section className="bg-white bg-opacity-0 p-6 px-4 pb-6 min-h-[70vh]">
            <h3>
                HOME PAGE
            </h3>
        </section>
    );
}
// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../../app/appSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports
import './Dashboard.css';

export function Dashboard() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: Dashboard");
    }, [])

    useEffect(() => {
        console.log("COMPONENT Dashboard: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.DASHBOARD));
    }, [dispatch])

    return (
        <div className=''>
            <h3>
                Dashboard
            </h3>
        </div>
    );
}
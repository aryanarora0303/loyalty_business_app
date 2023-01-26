// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../../app/appSlice';

// Modules Imports

// Components Imports
import { Sidebar } from '../Navigation/Sidebar';

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
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
                <div className='flex-col justify-between xl:flex xl:flex-row'>
                    <Sidebar/>
                    <div className='mt-10 xl:m-10 xl:mt-16 w-full border-2 border-green-700'>
                        Content
                    </div>
                </div>
            </div>
        </section>
    );
}
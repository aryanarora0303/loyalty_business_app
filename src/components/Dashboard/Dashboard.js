// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

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

    const [sidebarOption, setSidebarOption] = useState('DASHBOARD');

    useEffect(() => {
        console.log("COMPONENT RENDERED: Dashboard");
    }, [])

    useEffect(() => {
        console.log("COMPONENT Dashboard: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.DASHBOARD));
    }, [dispatch])

    useEffect(() => {
        console.log("COMPONENT Dashboard: sidebarOption changed");

    }, [sidebarOption])

    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
                <div className='flex-col justify-between md:flex md:flex-row'>
                    <Sidebar setSidebarOption={setSidebarOption}/>
                    <div className='mt-10 md:m-10 md:mt-16 w-full border-2 border-green-700'>
                        {sidebarOption}
                    </div>
                </div>
            </div>
        </section>
    );
}
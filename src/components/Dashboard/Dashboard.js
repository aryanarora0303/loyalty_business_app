// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../../app/appSlice';

// Modules Imports

// Components Imports
import { Sidebar } from '../Navigation/Sidebar';
import { AllDashboardData } from './Data/All/AllDashboardData';
import { AllBusinessesData } from './Data/All/AllBusinessesData';
import { AllCustomersData } from './Data/All/AllCustomersData';
import { AllCardsData } from './Data/All/AllCardsData';
import { AllPromosData } from './Data/All/AllPromosData';
import { AllScansData } from './Data/All/AllScansData';
import { Account } from './Account';
import { Settings } from './Settings';

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports
import './Dashboard.css';

export function Dashboard() {

    const dispatch = useDispatch();

    const [sidebarOption, setSidebarOption] = useState('DASHBOARD');
    const [data, setData] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: Dashboard");
    }, [])

    useEffect(() => {
        console.log("COMPONENT Dashboard: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.DASHBOARD));
    }, [dispatch])

    useEffect(() => {
        console.log("COMPONENT Dashboard: sidebarOption changed, set data");
        switch (sidebarOption) {
            case 'DASHBOARD':
                setData(<AllDashboardData/>);
                break;
            case 'BUSINESSES':
                setData(<AllBusinessesData/>);
                break;
            case 'CUSTOMERS':
                setData(<AllCustomersData/>);
                break;
            case 'CARDS':
                setData(<AllCardsData/>);
                break;
            case 'PROMOS':
                setData(<AllPromosData/>);
                break;
            case 'SCANS':
                setData(<AllScansData/>);
                break;
            case 'ACCOUNT':
                setData(<Account/>);
                break;
            case 'SETTINGS':
                setData(<Settings/>);
                break;
            default: 
                setData(<AllDashboardData/>);
                break;
            }
    }, [sidebarOption])

    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-1 mx-auto">
                <div className='flex-col justify-between md:flex md:flex-row'>
                    <Sidebar setSidebarOption={setSidebarOption}/>
                    <div className='mt-10 md:m-10 md:mt-16 w-full'>
                        {data}
                    </div>
                </div>
            </div>
        </section>
    );
}
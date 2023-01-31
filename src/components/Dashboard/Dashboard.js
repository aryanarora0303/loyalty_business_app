// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../../app/appSlice';

// Modules Imports

// Components Imports
import { Sidebar } from '../Navigation/Sidebar';
import { DashboardData } from './Data/DashboardData';
import { BusinessesData } from './Data/BusinessesData';
import { CustomersData } from './Data/CustomersData';
import { CardsData } from './Data/CardsData';
import { PromosData } from './Data/PromosData';
import { ScansData } from './Data/ScansData';
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
                setData(<DashboardData/>);
                break;
            case 'BUSINESSES':
                setData(<BusinessesData/>);
                break;
            case 'CUSTOMERS':
                setData(<CustomersData/>);
                break;
            case 'CARDS':
                setData(<CardsData/>);
                break;
            case 'PROMOS':
                setData(<PromosData/>);
                break;
            case 'SCANS':
                setData(<ScansData/>);
                break;
            case 'ACCOUNT':
                setData(<Account/>);
                break;
            case 'SETTINGS':
                setData(<Settings/>);
                break;
            default: 
                setData(<DashboardData/>);
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
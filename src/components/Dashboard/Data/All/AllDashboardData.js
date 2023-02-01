// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../../constants/routes';

// Styling Imports

export function AllDashboardData() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AllDashboardData");
    }, [])

    return (
        <section className="container">
            <div className="px-6 py-3 mb-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-1 text-xl text-loyaltyGold-100 font-semibold">Dashboard</h2>
                <hr className='mb-2 w-1/4 border-[1.25px] border-loyaltyGold-100 border-opacity-50'/>
            </div>
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
            </div>
        </section>
    );
}
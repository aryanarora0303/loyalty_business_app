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
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md overflow-hidden">
                <div className="flex items-start justify-center">
                    <img className='h-[350px]' src='./demo-data-charts/chart_1.png' alt='Chart #1' />
                </div>
                <hr className='mx-3 my-10'/>
                <div className="flex items-start justify-evenly">
                    <img className='h-[350px]' src='./demo-data-charts/chart_6.png' alt='Chart #2' />
                    <img className='h-[350px]' src='./demo-data-charts/chart_3.png' alt='Chart #1' />
                </div>
                <hr className='mx-3 my-10'/>
                <div className="flex items-start justify-evenly">
                    <img className='h-[330px]' src='./demo-data-charts/chart_8.png' alt='Chart #2' />
                    <img className='h-[330px]' src='./demo-data-charts/chart_2.png' alt='Chart #2' />
                </div>
                <hr className='mx-3 my-10'/>
                <div className="flex items-start justify-evenly">
                    <img className='h-[400px]' src='./demo-data-charts/chart_5.png' alt='Chart #1' />
                </div>
                <hr className='mx-3 my-10'/>
                <div className="flex items-start justify-evenly">
                    <img className='h-[390px]' src='./demo-data-charts/chart_4.png' alt='Chart #2' />
                    <img className='h-[390px]' src='./demo-data-charts/chart_7.png' alt='Chart #1' />
                </div>
                <hr className='mx-3 my-10'/>
            </div>
        </section>
    );
}
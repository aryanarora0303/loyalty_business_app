// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { businessStore, getAllBusinessFromDB } from '../../../app/businessSlice';
import { clientStore, getClientFromDB } from '../../../app/clientSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports

export function BusinessesData() {
    const business = useSelector(businessStore);
    const client = useSelector(clientStore);

    const dispatch = useDispatch();

    const [tableDataRows, setTableDataRows] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: BusinessesData");
    }, [])

    useEffect(() => {
        dispatch(getClientFromDB({client: { name: window.location.hostname.split('-')[1]}})); // hostname formatter as admin-CLIENT_NAME e.g. admin-glowbal in admin-glowbal.myloyaltycard.com/
        dispatch(getAllBusinessFromDB({client: { name: window.location.hostname.split('-')[1]}})); // hostname formatter as admin-CLIENT_NAME e.g. admin-glowbal in admin-glowbal.myloyaltycard.com/
    }, [dispatch])

    useEffect(() => {
        if(business.hasAllBusinessExtractedFromDB){
            let rows = business.allBusiness.map((business, index) => {
                return (
                    <tr key={index} className="border-b border-gray-200">
                        <th className="py-2 bg-white text-sm font-medium text-coolGray-600 text-center">{business.bus_id}</th>
                        <th className="py-2 bg-white text-sm font-medium text-coolGray-600 text-center"><img className='h-14 m-auto' src={business.bus_image} alt='business logo'/></th>
                        <th className="py-2 bg-white text-sm font-medium text-coolGray-600 text-center">{business.client_id}</th>
                        <th className="py-2 bg-white text-sm font-medium text-coolGray-600 text-center">{business.bus_name}</th>
                    </tr>
                )
            })
            setTableDataRows(rows);
        }
    }, [business.hasAllBusinessExtractedFromDB])

    return (
        <section className="container">
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-4 text-lg text-loyaltyGold-100 font-semibold">All Businesses</h2>
                <table className="table-auto w-full border-collapse">
                    <tbody>
                        <tr className="bg-coolGray-50 bg-opacity-80 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-l-md">ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">LOGO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">GROUP ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-r-md">NAME</th>
                        </tr>
                        {tableDataRows}
                    </tbody>
                </table>
                <div className='w-full my-4 flex items-center justify-center'>
                    <select className="py-1 px-2 mx-2 w-fit text-coolGray-500 text-sm font-medium bg-white border-[1.5px] border-coolGray-200 rounded-md">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                    </select>
                    <p className='text-coolGray-700'>per page</p>
                </div>
            </div>
        </section>
    );
}
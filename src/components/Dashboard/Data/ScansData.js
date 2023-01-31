// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../app/authSlice';
import { scanStore, getAllScanFromDB } from '../../../app/scanSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports

export function ScansData() {
    const auth = useSelector(authStore);
    const scan = useSelector(scanStore);

    const dispatch = useDispatch();

    const [tableDataRows, setTableDataRows] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScansData");
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated && auth.userSession.jwtToken) {
            let data = {
                scan: { limit: 10 }, 
                session: { jwtToken: auth.userSession.jwtToken }
            }
            dispatch(getAllScanFromDB(data));
        }
    }, [dispatch, auth.isAuthenticated, auth.userSession.jwtToken])

    useEffect(() => {
        if(scan.hasAllScanExtractedFromDB){
            let rows = scan.allScan.map((scan, index) => {
                return (
                    <tr id={scan.scan_id} key={index} className="border-b border-gray-200">
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-loyaltyGold-100 text-center underline hover:decoration-loyaltyGold-200 cursor-pointer">{scan.scan_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.scan_time}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.scan_type}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.client_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.bus_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.customer_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.card_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{scan.promo_id}</th>
                    </tr>
                )
            })
            setTableDataRows(rows);
        }
    }, [scan.hasAllScanExtractedFromDB])

    return (
        <section className="container">
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-4 text-lg text-loyaltyGold-100 font-semibold">All Promos</h2>
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 bg-opacity-80 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-l-md">ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">TIME</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">SCAN TYPE</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">GROUP ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">BUSINESS ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CUSTOMER ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CARD ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">PROMO ID</th>
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
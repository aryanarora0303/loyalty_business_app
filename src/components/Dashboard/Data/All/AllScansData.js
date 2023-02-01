// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../../app/authSlice';
import { scanStore, getAllScanFromDB } from '../../../../app/scanSlice';

// Modules Imports

// Components Imports truncate
import { IndScansData } from '../Individual/IndScansData';

// Other Files Imports
import * as ROUTES from '../../../../constants/routes';

// Styling Imports

export function AllScansData() {
    const auth = useSelector(authStore);
    const scan = useSelector(scanStore);

    const dispatch = useDispatch();

    const [showAllData, setShowAllData] = useState(true);
    const [showIndData, setShowIndData] = useState(false);

    const [tableAllDataRows, setTableAllDataRows] = useState();
    const [tableIndDataRow, setTableIndDataRow] = useState();

    const [selectedIndData, setSelectedIndData] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AllScansData");
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
                    <tr id={scan.scan_id} key={index} className="group border-b border-gray-200 cursor-pointer" onClick={handleRowClick}>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{scan.scan_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.scan_time}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.scan_type}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.client_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.bus_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.customer_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.card_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{scan.promo_id}</td>
                    </tr>
                )
            })
            setTableAllDataRows(rows);
        }
    }, [scan.hasAllScanExtractedFromDB])

    let handleRowClick = (el) => {
        console.log(`COMPONENT AllScansData: Row Clicked with ID: ${el.currentTarget.id}`);
        
        let row = scan.allScan.find(data => String(data.scan_id) === el.currentTarget.id);
        setSelectedIndData(row);
        setTableIndDataRow(
            <tr id={row.scan_id} key={0} className="group border-b border-gray-200 cursor-pointer">
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{row.scan_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.scan_time}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.scan_type}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.client_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.bus_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.customer_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.card_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.promo_id}</td>
            </tr>
        );

        setShowAllData(false);
        setShowIndData(true);
    }

    let handleRowBackBtnClick = () => {
        setShowAllData(true);
        setShowIndData(false);
    }

    return (
        <section className="container">
            <div className="px-6 py-3 mb-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-1 text-xl text-loyaltyGold-100 font-semibold">All Scans</h2>
                <hr className='mb-2 w-1/4 border-[1.25px] border-loyaltyGold-100 border-opacity-50'/>
            </div>
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                {(showIndData) ? <div className="w-fit mb-4 p-2 flex items-center text-md text-coolGray-400 hover:text-loyaltyGold-100 font-semibold transition-all cursor-pointer" onClick={handleRowBackBtnClick}><i className="mr-2 fa-solid fa-arrow-left text-xl"/>Back</div> : ""}
                {(showAllData) ? <input className='float-right mb-4 py-1 px-2 text-coolGray-600 outline-none border-2 border-coolGray-200 focus:border-loyaltyGold-100 active:border-loyaltyGold-100 rounded-md shadow-sm transition-all' type="text" placeholder='Search...' /> : ""}
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">TIME</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">SCAN TYPE</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">BUSINESS ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CUSTOMER ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CARD ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PROMO ID</th>
                        </tr>
                        {(showAllData) ? tableAllDataRows : ""}
                        {(showIndData) ? tableIndDataRow : ""}
                    </tbody>
                </table>
                
                {(showAllData) ? 
                    <div className='w-full my-4 flex items-center justify-center'>
                        <select className="py-1 px-2 mx-2 w-fit text-coolGray-500 text-sm font-medium bg-white border-[1.5px] border-coolGray-200 rounded-md">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                        </select>
                        <p className='text-coolGray-700'>per page</p>
                    </div>    
                    : ""
                }

                {(showIndData) ? <IndScansData data={selectedIndData}/> : "" }
            </div>
        </section>
    );
}
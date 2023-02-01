// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { businessStore, getAllBusinessFromDB } from '../../../../app/businessSlice';
import { clientStore, getClientFromDB } from '../../../../app/clientSlice';

// Modules Imports

// Components Imports
import { IndBusinessesData } from '../Individual/IndBusinessesData';

// Other Files Imports
import * as ROUTES from '../../../../constants/routes';

// Styling Imports

export function AllBusinessesData() {
    const business = useSelector(businessStore);
    const client = useSelector(clientStore);

    const dispatch = useDispatch();

    const [showAllData, setShowAllData] = useState(true);
    const [showIndData, setShowIndData] = useState(false);

    const [tableAllDataRows, setTableAllDataRows] = useState();
    const [tableIndDataRow, setTableIndDataRow] = useState();

    const [selectedIndData, setSelectedIndData] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AllBusinessesData");
    }, [])

    useEffect(() => {
        dispatch(getClientFromDB({client: { name: window.location.hostname.split('-')[1]}})); // hostname formatter as admin-CLIENT_NAME e.g. admin-glowbal in admin-glowbal.myloyaltycard.com/
        dispatch(getAllBusinessFromDB({client: { name: window.location.hostname.split('-')[1]}})); // hostname formatter as admin-CLIENT_NAME e.g. admin-glowbal in admin-glowbal.myloyaltycard.com/
    }, [dispatch])

    useEffect(() => {
        if(business.hasAllBusinessExtractedFromDB){
            let rows = business.allBusiness.map((business, index) => {
                return (
                    <tr id={business.bus_id} key={index} className="group border-b border-gray-200 cursor-pointer" onClick={handleRowClick}>
                        <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-200 text-center transition-all underline">{business.bus_id}</td>
                        <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all"><img className='p-1 h-14 m-auto border-[1px] border-loyaltyGold-100 rounded-full' src={business.bus_image} alt='business logo'/></td>
                        <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{business.client_id}</td>
                        <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{business.bus_name}</td>
                    </tr>
                )
            })
            setTableAllDataRows(rows);
        }
    }, [business.hasAllBusinessExtractedFromDB])

    let handleRowClick = (el) => {
        console.log(`COMPONENT AllBusinessesData: Row Clicked with ID: ${el.currentTarget.id}`);

        let row = business.allBusiness.find(data => String(data.bus_id) === el.currentTarget.id);
        setSelectedIndData(row);
        setTableIndDataRow(
            <tr id={row.bus_id} key={0} className="group border-b border-gray-200 cursor-pointer">
                <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-200 text-center transition-all underline">{row.bus_id}</td>
                <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all"><img className='h-14 m-auto border-[1px] border-loyaltyGold-100 rounded-full' src={row.bus_image} alt='business logo'/></td>
                <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.client_id}</td>
                <td className="py-2 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.bus_name}</td>
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
                <h2 className="mb-1 text-xl text-loyaltyGold-100 font-semibold">All Businesses</h2>
                <hr className='mb-2 w-1/4 border-[1.25px] border-loyaltyGold-100 border-opacity-50'/>
            </div>
            <div className="p-6 mb-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                {(showIndData) ? <div className="w-fit mb-4 p-2 flex items-center text-md text-coolGray-400 hover:text-loyaltyGold-100 font-semibold transition-all cursor-pointer" onClick={handleRowBackBtnClick}><i className="mr-2 fa-solid fa-arrow-left text-xl"/>Back</div> : ""}
                {(showAllData) ? <input className='float-right mb-4 py-1 px-2 text-coolGray-600 outline-none border-2 border-coolGray-200 focus:border-loyaltyGold-100 active:border-loyaltyGold-100 rounded-md shadow-sm transition-all' type="text" placeholder='Search...' /> : ""}
                <table className="table-fixed overflow-x-scroll w-full border-collapse">
                    <tbody>
                        <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">LOGO</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-r-md">NAME</th>
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

            </div>
            
            {(showIndData) ? <IndBusinessesData data={selectedIndData}/> : "" }
        </section>
    );
}
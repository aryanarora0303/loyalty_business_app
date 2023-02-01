// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../../app/authSlice';
import { promoStore, getAllPromoFromDB } from '../../../../app/promoSlice';

// Modules Imports

// Components Imports
import { IndPromosData } from '../Individual/IndPromosData';

// Other Files Imports
import * as ROUTES from '../../../../constants/routes';

// Styling Imports

export function AllPromosData() {
    const auth = useSelector(authStore);
    const promo = useSelector(promoStore);

    const dispatch = useDispatch();

    const [showAllData, setShowAllData] = useState(true);
    const [showIndData, setShowIndData] = useState(false);

    const [tableAllDataRows, setTableAllDataRows] = useState();
    const [tableIndDataRow, setTableIndDataRow] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AllPromosData");
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated && auth.userSession.jwtToken) {
            let data = {
                promo: { limit: 10 }, 
                session: { jwtToken: auth.userSession.jwtToken }
            }
            dispatch(getAllPromoFromDB(data));
        }
    }, [dispatch, auth.isAuthenticated, auth.userSession.jwtToken])

    useEffect(() => {
        if(promo.hasAllPromoExtractedFromDB){
            let rows = promo.allPromo.map((promo, index) => {
                return (
                    <tr id={promo.promo_id} key={index} className="group border-b border-gray-200 cursor-pointer" onClick={handleRowClick}>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{promo.promo_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.client_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.bus_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.card_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.event_promo}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.gold_promo}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.platinum_promo}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.titanium_promo}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.custom_promo}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.date_valid_from}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.date_valid_to}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{promo.custom_promo_validity}</td>
                    </tr>
                )
            })
            setTableAllDataRows(rows);
        }
    }, [promo.hasAllPromoExtractedFromDB])

    let handleRowClick = (el) => {
        console.log(`COMPONENT AllPromosData: Row Clicked with ID: ${el.currentTarget.id}`);

        let row = promo.allPromo.find(data => String(data.promo_id) === el.currentTarget.id);
        setTableIndDataRow(
            <tr id={row.promo_id} key={0} className="group border-b border-gray-200 cursor-pointer">
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{row.promo_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.client_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.bus_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.card_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.event_promo}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.gold_promo}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.platinum_promo}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.titanium_promo}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.custom_promo}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.date_valid_from}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.date_valid_to}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.custom_promo_validity}</td>
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
                <h2 className="mb-1 text-xl text-loyaltyGold-100 font-semibold">All Promos</h2>
                <hr className='mb-2 w-1/4 border-[1.25px] border-loyaltyGold-100 border-opacity-50'/>
            </div>
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                {(showIndData) ? <div className="w-fit mb-4 p-2 flex items-center text-md text-coolGray-400 hover:text-loyaltyGold-100 font-semibold transition-all cursor-pointer" onClick={handleRowBackBtnClick}><i className="mr-2 fa-solid fa-arrow-left text-xl"/>Back</div> : ""}
                {(showAllData) ? <input className='float-right mb-4 py-1 px-2 text-coolGray-600 outline-none border-2 border-coolGray-200 focus:border-loyaltyGold-100 active:border-loyaltyGold-100 rounded-md shadow-sm transition-all' type="text" placeholder='Search...' /> : ""}
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 border-2 border-b-[1px] border-coolGray-200 rounded-md shadow-sm">
                            <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                            <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP ID</th>
                            <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">BUSINESS ID</th>
                            <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CARD ID</th>
                            <th colSpan={5} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PROMO</th>
                            <th colSpan={3} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">VALIDITY</th>
                        </tr>
                        <tr className="bg-coolGray-50 border-2 border-t-[1px] border-coolGray-200 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">EVENT</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GOLD</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PLATINUM</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">TITANIUM</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CUSTOM</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">FROM</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">TO</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CUSTOM</th>
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

                {(showIndData) ? <IndPromosData/> : "" }
            </div>
        </section>
    );
}
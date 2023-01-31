// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../app/authSlice';
import { promoStore, getAllPromoFromDB } from '../../../app/promoSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports

export function PromosData() {
    const auth = useSelector(authStore);
    const promo = useSelector(promoStore);

    const dispatch = useDispatch();

    const [tableDataRows, setTableDataRows] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: CardsData");
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
                    <tr id={promo.promo_id} key={index} className="border-b border-gray-200">
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-loyaltyGold-100 text-center underline hover:decoration-loyaltyGold-200 cursor-pointer">{promo.promo_id}</th>
                        {/* <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.client_id}</th> */}
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.bus_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.card_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.event_promo}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.gold_promo}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.platinum_promo}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.titanium_promo}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.custom_promo}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.date_valid_from}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.date_valid_to}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{promo.custom_promo_validity}</th>
                    </tr>
                )
            })
            setTableDataRows(rows);
        }
    }, [promo.hasAllPromoExtractedFromDB])

    return (
        <section className="container">
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-4 text-lg text-loyaltyGold-100 font-semibold">All Promos</h2>
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 bg-opacity-80 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-l-md">ID</th>
                            {/* <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">GROUP ID</th> */}
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">BUSINESS ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CARD ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">EVENT PROMO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">GOLD PROMO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">PLATINUM PROMO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">TITANIUM PROMO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CUSTOM PROMO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">VALIDITY FROM</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">VALIDITY TO</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CUSTOM PROMO VALIDITY</th>
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
// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../app/authSlice';
import { cardStore, getAllCardFromDB } from '../../../app/cardSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports

export function CardsData() {
    const auth = useSelector(authStore);
    const card = useSelector(cardStore);

    const dispatch = useDispatch();

    const [tableDataRows, setTableDataRows] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: CardsData");
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated && auth.userSession.jwtToken) {
            let data = {
                card: { limit: 10 }, 
                session: { jwtToken: auth.userSession.jwtToken }
            }
            dispatch(getAllCardFromDB(data));
        }
    }, [dispatch, auth.isAuthenticated, auth.userSession.jwtToken])

    useEffect(() => {
        if(card.hasAllCardExtractedFromDB){
            let rows = card.allCard.map((card, index) => {
                return (
                    <tr id={card.card_id} key={index} className="border-b border-gray-200">
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-loyaltyGold-100 text-center underline hover:decoration-loyaltyGold-200 cursor-pointer">{card.card_id}</th>
                        {/* <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{card.client_id}</th> */}
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{card.security_code}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{card.status}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{card.customer_id}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{card.card_type}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{card.origin}</th>
                    </tr>
                )
            })
            setTableDataRows(rows);
        }
    }, [card.hasAllCardExtractedFromDB])

    return (
        <section className="container">
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-4 text-lg text-loyaltyGold-100 font-semibold">All Cards</h2>
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 bg-opacity-80 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-l-md">ID</th>
                            {/* <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">GROUP ID</th> */}
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">SECURITY CODE</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">STATUS</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CUSTOMER ID</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">CARD TYPE</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">ORIGIN</th>
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
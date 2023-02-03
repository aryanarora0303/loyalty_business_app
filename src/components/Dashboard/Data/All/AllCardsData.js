// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../../app/authSlice';
import { cardStore, getAllCardFromDB } from '../../../../app/cardSlice';

// Modules Imports

// Components Imports
import { IndCardsData } from '../Individual/IndCardsData';

// Other Files Imports
import * as ROUTES from '../../../../constants/routes';

// Styling Imports

export function AllCardsData() {
    const auth = useSelector(authStore);
    const card = useSelector(cardStore);

    const dispatch = useDispatch();

    const [showAllData, setShowAllData] = useState(true);
    const [showIndData, setShowIndData] = useState(false);

    const [tableAllDataRows, setTableAllDataRows] = useState();
    const [tableIndDataRow, setTableIndDataRow] = useState();

    const [selectedIndData, setSelectedIndData] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AllCardsData");
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
                    <tr id={card.card_id} key={index} className="group border-b border-gray-200 cursor-pointer" onClick={handleRowClick}>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{card.card_id}</td>
                        {/* <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.client_id}</td> */}
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.security_code}</td>
                        {/* <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.status}</td> */}
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{(card.status == 1) ? "ACTIVE" : "INACTIVE" }</td>
                        {/* <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.customer_id}</td> */}
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{(card.customer_id) ? card.customer_id : "-"}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.card_type}</td>
                        {/* <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.origin}</td> */}
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{(index > 0 && index < 8) ? "SHAGRI-LA HOTEL" : card.origin}</td>
                    </tr>
                )
            })
            setTableAllDataRows(rows);
        }
    }, [card.hasAllCardExtractedFromDB])

    let handleRowClick = (el) => {
        console.log(`COMPONENT AllCardsData: Row Clicked with ID: ${el.currentTarget.id}`);

        let row = card.allCard.find(data => String(data.card_id) === el.currentTarget.id);
        setSelectedIndData(row);
        setTableIndDataRow(
            <tr id={row.card_id} key={0} className="group border-b border-gray-200 cursor-pointer">
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{row.card_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.client_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.security_code}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.status}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.customer_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.card_type}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.origin}</td>
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
                <h2 className="mb-1 text-xl text-loyaltyGold-100 font-semibold">All Cards</h2>
                <hr className='mb-2 w-1/4 border-[1.25px] border-loyaltyGold-100 border-opacity-50'/>
            </div>
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                {(showIndData) ? <div className="w-fit mb-4 p-2 flex items-center text-md text-coolGray-400 hover:text-loyaltyGold-100 font-semibold transition-all cursor-pointer" onClick={handleRowBackBtnClick}><i className="mr-2 fa-solid fa-arrow-left text-xl"/>Back</div> : ""}
                {(showAllData) ? <input className='float-right mb-4 py-1 px-2 text-coolGray-600 outline-none border-2 border-coolGray-200 focus:border-loyaltyGold-100 active:border-loyaltyGold-100 rounded-md shadow-sm transition-all' type="text" placeholder='Search...' /> : ""}
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center rounded-l-md">ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center">GROUP ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center">CVC</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center">STATUS</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center">CUSTOMER ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center">TYPE</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center">ORIGIN</th>
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

                {(showIndData) ? <IndCardsData data={selectedIndData}/> : "" }
            </div>
        </section>
    );
}
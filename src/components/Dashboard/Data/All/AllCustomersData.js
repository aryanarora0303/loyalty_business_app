// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../../app/authSlice';
import { customerStore, getAllCustomerFromDB } from '../../../../app/customerSlice';

// Modules Imports

// Components Imports
import { IndCustomersData } from '../Individual/IndCustomersData';

// Other Files Imports
import * as ROUTES from '../../../../constants/routes';

// Styling Imports

export function AllCustomersData() {
    const auth = useSelector(authStore);
    const customer = useSelector(customerStore);

    const dispatch = useDispatch();

    const [showAllData, setShowAllData] = useState(true);
    const [showIndData, setShowIndData] = useState(false);

    const [tableAllDataRows, setTableAllDataRows] = useState();
    const [tableIndDataRow, setTableIndDataRow] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AllCustomersData");
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated && auth.userSession.jwtToken) {
            let data = {
                customer: { limit: 10 }, 
                session: { jwtToken: auth.userSession.jwtToken }
            }
            dispatch(getAllCustomerFromDB(data));
        }
    }, [dispatch, auth.isAuthenticated, auth.userSession.jwtToken])

    useEffect(() => {
        if(customer.hasAllCustomerExtractedFromDB){
            let rows = customer.allCustomer.map((customer, index) => {
                return (
                    <tr id={customer.customer_id} key={index} className="group border-b border-gray-200 cursor-pointer" onClick={handleRowClick}>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{customer.customer_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.client_id}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.full_name}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.phone_number}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.email}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.verification}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.address}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.member_since}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.num_referred}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.reward_points}</td>
                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{customer.money_spent}</td>
                    </tr>
                )
            })
            setTableAllDataRows(rows);
        }
    }, [customer.hasAllCustomerExtractedFromDB])

    let handleRowClick = (el) => {
        console.log(`COMPONENT AllCustomersData: Row Clicked with ID: ${el.currentTarget.id}`);

        let row = customer.allCustomer.find(data => String(data.customer_id) === el.currentTarget.id);
        setTableIndDataRow(
            <tr id={row.customer_id} key={0} className="group border-b border-gray-200 cursor-pointer">
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{row.customer_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.client_id}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.full_name}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.phone_number}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.email}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.verification}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.address}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.member_since}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.num_referred}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.reward_points}</td>
                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{row.money_spent}</td>
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
                <h2 className="mb-1 text-xl text-loyaltyGold-100 font-semibold">All Customers</h2>
                <hr className='mb-2 w-1/4 border-[1.25px] border-loyaltyGold-100 border-opacity-50'/>
            </div>
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                {(showIndData) ? <div className="w-fit mb-4 p-2 flex items-center text-md text-coolGray-400 hover:text-loyaltyGold-100 font-semibold transition-all cursor-pointer" onClick={handleRowBackBtnClick}><i className="mr-2 fa-solid fa-arrow-left text-xl"/>Back</div> : ""}
                {(showAllData) ? <input className='float-right mb-4 py-1 px-2 text-coolGray-600 outline-none border-2 border-coolGray-200 focus:border-loyaltyGold-100 active:border-loyaltyGold-100 rounded-md shadow-sm transition-all' type="text" placeholder='Search...' /> : ""}
                <table className="table-fixed overflow-x-scroll w-full border-collapse">
                    <tbody>
                        <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP ID</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">NAME</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PHONE</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">EMAIL</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">VERIFICATION</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">ADDRESS</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">JOINED</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">REFERRED</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">POINTS</th>
                            <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-r-md">MONEY SPENT</th>
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

                {(showIndData) ? <IndCustomersData/> : "" }
            </div>
        </section>
    );
}
// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../app/authSlice';
import { customerStore, getAllCustomerFromDB } from '../../../app/customerSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports

export function CustomersData() {
    const auth = useSelector(authStore);
    const customer = useSelector(customerStore);

    const dispatch = useDispatch();

    const [tableDataRows, setTableDataRows] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: CustomersData");
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
                    <tr id={customer.customer_id} key={index} className="border-b border-gray-200">
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-loyaltyGold-100 text-center underline hover:decoration-loyaltyGold-200 cursor-pointer">{customer.customer_id}</th>
                        {/* <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.client_id}</th> */}
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.full_name}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.phone_number}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.email}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.verification}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.address}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.member_since}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.num_referred}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.reward_points}</th>
                        <th className="py-2 px-3 bg-white text-sm truncate font-medium text-coolGray-600 text-center">{customer.money_spent}</th>
                    </tr>
                )
            })
            setTableDataRows(rows);
        }
    }, [customer.hasAllCustomerExtractedFromDB])

    return (
        <section className="container">
            <div className="p-6 bg-white border border-coolGray-100 rounded-md shadow-md">
                <h2 className="mb-4 text-lg text-loyaltyGold-100 font-semibold">All Customers</h2>
                <table className="table-fixed w-full border-collapse overflow-x-scroll">
                    <tbody>
                        <tr className="bg-coolGray-50 bg-opacity-80 rounded-md shadow-sm">
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-l-md">ID</th>
                            {/* <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">GROUP ID</th> */}
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">FULL NAME</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">PHONE NUMBER</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">EMAIL</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">VERIFICATION</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">ADDRESS</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">MEMBER SINCE</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">REFERRED</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center">REWARD POINTS</th>
                            <th className="py-3 font-semibold text-xs text-coolGray-800 uppercase text-center rounded-r-md">MONEY SPENT</th>
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
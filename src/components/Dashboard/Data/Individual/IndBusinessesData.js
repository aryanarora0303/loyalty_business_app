// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports

// Modules Imports

// Components Imports

// Other Files Imports

// Styling Imports

export function IndBusinessesData(props) {
    useEffect(() => {
        console.log("COMPONENT RENDERED: IndBusinessesData");
        console.log("COMPONENT IndBusinessesData: props", props);
    }, [])

    return (
        <div className="p-6 mb-6 bg-white border border-coolGray-100 rounded-md shadow-md">
            <div className='mb-6'>
                <p className="mb-1 text-lg text-loyaltyGold-100 font-semibold">Analytics</p>
                <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
            </div>

            {/* Time Frame */}
            <div className='flex items-center w-fit mb-4 py-1 text-coolGray-600'>
                <select className='p-[2px] outline-none border-2 border-coolGray-200 focus:border-loyaltyGold-100 active:border-loyaltyGold-100 rounded-md shadow-sm transition-all'>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 30 Days</option>
                    <option>Last 60 Days</option>
                    <option>Last 90 Days</option>
                    <option>Last 12 Months</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>

            {/* OverView */}
            <div className='p-2 mb-6 flex justify-evenly items-center border-2 border-coolGray-200 rounded-md shadow-md transition-all'>
                <div className=''>
                    <p className="text-2xl text-coolGray-700 font-semibold">110</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Total Scans</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xs text-green-600'>
                        <i className="fa-solid fa-arrow-up mr-1"/>
                        <p className=''>127%</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-2xl text-coolGray-700 font-semibold">11</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Total Promos</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xs text-green-600'>
                        <i className="fa-solid fa-arrow-up mr-1"/>
                        <p className=''>7%</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-2xl text-coolGray-700 font-semibold">110</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Total Customers</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xs text-green-600'>
                        <i className="fa-solid fa-arrow-up mr-1"/>
                        <p className=''>127%</p>
                    </div>
                </div>
            </div>

            {/* OverView Awards */}
            <div className='p-2 mb-6 flex justify-evenly items-center border-2 border-coolGray-200 rounded-md shadow-md transition-all'>
                <div className=''>
                    <p className="text-xl text-coolGray-700 font-semibold">Complimentary Dessert</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Most Popular Promos</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xxs text-loyaltyGold-100'>
                        <i className="fa-solid fa-medal mr-1"/>
                        <p className=''>Scanned 5 Times</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-xl text-coolGray-700 font-semibold">500</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Highest Reward Points</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xxs text-loyaltyGold-100'>
                        <i className="fa-solid fa-medal mr-1"/>
                        <p className=''>Rewarded 500</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-xl text-coolGray-700 font-semibold">VIP Upgrade</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Most Popular Promos</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xxs text-loyaltyGold-100'>
                        <i className="fa-solid fa-medal mr-1"/>
                        <p className=''>Scanned 2 Times</p>
                    </div>
                </div>
            </div>

            {/* TODO: ALL DATA BELOW IS GENERATED FOR PRESENATATION, ADD LOGIC(FRONTEND & BACKEND) FOR ACTUAL DATA */}
            {/* Detailed Charts & Tables */}
            <div>
                <div className='p-2 mb-6 border-2 border-coolGray-200 rounded-md'>
                    <div className='mb-6'>
                        <p className="mb-1 text-md text-coolGray-500 font-semibold">Total Scans</p>
                        <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
                    </div>
                    <table className="table-fixed w-full border-collapse overflow-x-scroll">
                        <tbody>
                            <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">TIME</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">SCAN TYPE</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">BUSINESS</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CUSTOMER ID</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CARD ID</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PROMO</th>
                            </tr>
                            {[
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "1", promo_id: "COMPLIMENTARY DESSERT", scan_id:  1, scan_time:  "2023-02-03 11:33:00", scan_type: "PHYSICAL"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id:  "00A1004", client_id: "GLOWBAL", customer_id: "2", promo_id: "BOGO DRINKS", scan_id:  2, scan_time:  "2023-02-03 09:41:00", scan_type: "DIGITAL"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id:  "00A1062", client_id: "GLOWBAL", customer_id: "3", promo_id: "20% OFF SIGN UP", scan_id:  3, scan_time:  "2023-02-03 09:43:00", scan_type: "PHYSICAL"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id:  "00A1089", client_id: "GLOWBAL", customer_id: "4", promo_id: "30% OFF STARTERS", scan_id:  4, scan_time:  "2023-02-03 11:30:00", scan_type: "DIGITAL"},
                            ].map((scan, index) => {
                                return(
                                    <tr id={scan.scan_id} key={index} className="group border-b border-gray-200 cursor-pointer">
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
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-2 mb-6 border-2 border-coolGray-200 rounded-md'>
                    <div className='mb-6'>
                        <p className="mb-1 text-md text-coolGray-500 font-semibold">Total Promos</p>
                        <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
                    </div>
                    <table className="table-fixed w-full border-collapse overflow-x-scroll">
                        <tbody>
                            <tr className="bg-coolGray-50 border-2 border-b-[1px] border-coolGray-200 rounded-md shadow-sm">
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP ID</th>
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">BUSINESS ID</th>
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CARD ID</th>
                                <th colSpan={5} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PROMO</th>
                                <th colSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">VALIDITY</th>
                            </tr>
                            <tr className="bg-coolGray-50 border-2 border-t-[1px] border-coolGray-200 rounded-md shadow-sm">
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">EVENT</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GOLD</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PLATINUM</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">TITANIUM</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CUSTOM</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">FROM</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">TO</th>
                            </tr>
                            {[
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "A1B2C3D", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-01", date_valid_to: "2023-01-15", event_promo: "30%_DISCOUNT", gold_promo: "COMPLIMENTARY_APPETIZER", platinum_promo: "-", promo_id: 5, titanium_promo: "-"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "E4F5G6H", client_id: "GLOWBAL", custom_promo: "3_FOR_2_DEAL", custom_promo_validity: "2023-02-05", date_valid_from: "2023-01-15", date_valid_to: "2023-02-01", event_promo: "-", gold_promo: "COMPLIMENTARY_DRINK", platinum_promo: "PREMIUM_UPGRADE", promo_id: 1, titanium_promo: "-"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "I7J8K9L", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-20", date_valid_to: "2023-02-10", event_promo: "25%_DISCOUNT", gold_promo: "-", platinum_promo: "LUXURY_TREATMENT", promo_id: 3, titanium_promo: "EXCLUSIVE_MENU"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "M0N1O2P", client_id: "GLOWBAL", custom_promo: "WEEKEND_DEAL", custom_promo_validity: "2023-02-15", date_valid_from: "2023-01-10", date_valid_to: "2023-02-05", event_promo: "-", gold_promo: "COMPLIMENTARY_DESSERT", platinum_promo: "-", promo_id: 2, titanium_promo: "-"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "Q3R4S5T", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-05", date_valid_to: "2023-02-15", event_promo: "20%_DISCOUNT", gold_promo: "COMPLIMENTARY_WINE", platinum_promo: "VIP_UPGRADE", promo_id: 4, titanium_promo: "-"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "E4F5G6H", client_id: "GLOWBAL", custom_promo: "3_FOR_2_DEAL", custom_promo_validity: "2023-02-05", date_valid_from: "2023-01-15", date_valid_to: "2023-02-01", event_promo: "-", gold_promo: "COMPLIMENTARY_DRINK", platinum_promo: "PREMIUM_UPGRADE", promo_id: 1, titanium_promo: "-"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "I7J8K9L", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-20", date_valid_to: "2023-02-10", event_promo: "25%_DISCOUNT", gold_promo: "-", platinum_promo: "LUXURY_TREATMENT", promo_id: 3, titanium_promo: "EXCLUSIVE_MENU"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "M0N1O2P", client_id: "GLOWBAL", custom_promo: "WEEKEND_DEAL", custom_promo_validity: "2023-02-15", date_valid_from: "2023-01-10", date_valid_to: "2023-02-05", event_promo: "-", gold_promo: "COMPLIMENTARY_DESSERT", platinum_promo: "-", promo_id: 2, titanium_promo: "-"},
                            ].map((promo, index) => {
                                return(
                                    <tr id={promo.promo_id} key={index} className="group border-b border-gray-200 cursor-pointer">
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-2 mb-6 border-2 border-coolGray-200 rounded-md'>
                    <div className='mb-6'>
                        <p className="mb-1 text-md text-coolGray-500 font-semibold">Total Customers</p>
                        <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
                    </div>
                    <table className="table-fixed w-full border-collapse overflow-x-scroll">
                        <tbody>
                            <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
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
                            {[
                                {address: "159 Maple St, Anytown USA", client_id: 1, customer_id: "10", email: "lisa@icloud.com", full_name: "LISA", member_since: "2022-11-29", money_spent: 0, num_referred: 2, phone_number: "7783337785", reward_points: 100, verification: "COMPLETE"},
                                {address: "753 Cedar St, Anytown USA", client_id: 1, customer_id: "11", email: "john@icloud.com", full_name: "JOHN", member_since: "2022-11-30", money_spent: 0, num_referred: 5, phone_number: "7783337786", reward_points: 200, verification: "COMPLETE"},
                                {address: "123 Main St, Anytown USA", client_id: 1, customer_id: "5", email: "mikedoe@icloud.com", full_name: "MIKE DOE", member_since: "2022-11-24", money_spent: 0, num_referred: 3, phone_number: "7783337780", reward_points: 0, verification: "COMPLETE"},
                                {address: "456 Elm St, Anytown USA", client_id: 1, customer_id: "6", email: "katedoe@icloud.com", full_name: "KATE DOE", member_since: "2022-11-25", money_spent: 0, num_referred: 2, phone_number: "7783337781", reward_points: 5000, verification: "COMPLETE"},,
                                {address: "789 Oak St, Anytown USA", client_id: 1, customer_id: "7", email: "bryandoe@icloud.com", full_name: "BRYAN DOE", member_since: "2022-11-26", money_spent: 0, num_referred: 0, phone_number: "7783337782", reward_points: 1500, verification: "COMPLETE"},
                                {address: "246 Pine St, Anytown USA", client_id: 1, customer_id: "8", email: "amandadoe@icloud.com", full_name: "AMANDA DOE", member_since: "2022-11-27", money_spent: 0, num_referred: 0, phone_number: "7783337783", reward_points: 7500, verification: "COMPLETE"},
                                {address: "369 Cedar St, Anytown USA", client_id: 1, customer_id: "9", email: "daviddoe@icloud.com", full_name: "DAVID DOE", member_since: "2022-11-28", money_spent: 0, num_referred: 7, phone_number: "7783337784", reward_points: 900, verification: "COMPLETE"}
                            ].map((customer, index) => {
                                return(
                                    <tr id={customer.customer_id} key={index} className="group border-b border-gray-200 cursor-pointer">
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{customer.customer_id}</td>
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports

// Modules Imports

// Components Imports

// Other Files Imports

// Styling Imports

export function IndCustomersData(props) {
    useEffect(() => {
        console.log("COMPONENT RENDERED: IndCustomersData");
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
                    <option>This Month</option>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last Week</option>
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
                    <p className="text-2xl text-coolGray-700 font-semibold">10</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Total Scans</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xs text-green-600'>
                        <i className="fa-solid fa-arrow-up mr-1"/>
                        <p className=''>50%</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-2xl text-coolGray-700 font-semibold">5</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Unique Businesses Visited</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xs text-green-600'>
                        <i className="fa-solid fa-arrow-up mr-1"/>
                        <p className=''>30%</p>
                    </div>
                </div>
            </div>

            {/* OverView Awards */}
            <div className='p-2 mb-6 flex justify-evenly items-center border-2 border-coolGray-200 rounded-md shadow-md transition-all'>
                <div className=''>
                    <p className="text-xl text-coolGray-700 font-semibold">Complimentary Dessert</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Favorite Promos</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xxs text-loyaltyGold-100'>
                        <i className="fa-solid fa-medal mr-1"/>
                        <p className=''>Scanned 7 Times</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-xl text-coolGray-700 font-semibold">5000</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Points Rewarded</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xxs text-loyaltyGold-100'>
                        <i className="fa-solid fa-medal mr-1"/>
                        <p className=''>Rewarded 5000</p>
                    </div>
                </div>

                <div className=''>
                    <p className="text-xl text-coolGray-700 font-semibold">Riley's Fish & Grill</p>
                    <p className="mb-1 text-md text-coolGray-500 font-medium">Favorite Business</p>

                    {/* % difference from last month */}
                    <div className='flex items-center text-xxs text-loyaltyGold-100'>
                        <i className="fa-solid fa-medal mr-1"/>
                        <p className=''>Visited 7 Times</p>
                    </div>
                </div>
            </div>

            {/* TODO: ALL DATA BELOW IS GENERATED FOR PRESENATATION, ADD LOGIC(FRONTEND & BACKEND) FOR ACTUAL DATA */}
            {/* Detailed Charts & Tables */}
            <div>
            <div className='p-2 mb-6 border-2 border-coolGray-200 rounded-md'>
                    <div className='mb-6'>
                        <p className="mb-1 text-md text-coolGray-500 font-semibold">Customer Card</p>
                        <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
                    </div>
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
                            {[
                                {card_id: '00A1000', client_id: "GLOWBAL", security_code: 333, status: "ACTIVE", customer_id: 'b68a77d2-1123-4208-8e86-d7721942142f', card_type: 'GOLD', origin: 'ONLINE SIGNUP'},
                            ].map((card, index) => {
                                return(
                                    <tr id={card.card_id} key={index} className="group border-b border-gray-200 cursor-pointer">
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">{card.card_id}</td>
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.client_id}</td>
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.security_code}</td>
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.status}</td>
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.customer_id}</td>
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.card_type}</td>
                                        <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">{card.origin}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

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
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  61, scan_time:  "2023-02-03 11:33:00", scan_type: "PHYSICAL"},
                                {bus_id: "COAST", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  22, scan_time:  "2022-12-03 09:41:00", scan_type: "DIGITAL"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  33, scan_time:  "2022-12-23 09:43:00", scan_type: "DIGITAL"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "BOGO DRINKS", scan_id:  64, scan_time:  "2023-02-03 11:30:00", scan_type: "DIGITAL"},
                                {bus_id: "ITALIAN KITCHEN", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "20% OFF STARTERS", scan_id:  65, scan_time:  "2022-12-13 09:41:00", scan_type: "DIGITAL"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  36, scan_time:  "2023-02-03 09:43:00", scan_type: "DIGITAL"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  57, scan_time:  "2022-12-15 11:30:00", scan_type: "DIGITAL"},
                                {bus_id: "THE ROOF", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "BOGO DRINKS", scan_id:  48, scan_time:  "2022-12-23 09:41:00", scan_type: "DIGITAL"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  19, scan_time:  "2022-12-17 09:43:00", scan_type: "DIGITAL"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id:  "00A1002", client_id: "GLOWBAL", customer_id: "b68a77d2-1123-4208-8e86-d7721942142f", promo_id: "COMPLIMENTARY DESSERT", scan_id:  10, scan_time:  "2023-02-03 11:30:00", scan_type: "DIGITAL"},
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
                        <p className="mb-1 text-md text-coolGray-500 font-semibold">Customer Promos</p>
                        <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
                    </div>
                    <table className="table-fixed w-full border-collapse overflow-x-scroll">
                        <tbody>
                            <tr className="bg-coolGray-50 border-2 border-b-[1px] border-coolGray-200 rounded-md shadow-sm">
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">ID</th>
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP</th>
                                <th rowSpan={2} className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">BUSINESS</th>
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
                                {bus_id: "RILEY'S FISH & GRILL", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-01", date_valid_to: "2023-01-15", event_promo: "30%_DISCOUNT", gold_promo: "COMPLIMENTARY_APPETIZER", platinum_promo: "-", promo_id: 5, titanium_promo: "-"},
                                {bus_id: "RILEY'S FISH & GRILL", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "3_FOR_2_DEAL", custom_promo_validity: "2023-02-05", date_valid_from: "2023-01-15", date_valid_to: "2023-02-01", event_promo: "-", gold_promo: "COMPLIMENTARY_DRINK", platinum_promo: "PREMIUM_UPGRADE", promo_id: 1, titanium_promo: "-"},
                                {bus_id: "FIVE SAILS", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-20", date_valid_to: "2023-02-10", event_promo: "25%_DISCOUNT", gold_promo: "-", platinum_promo: "LUXURY_TREATMENT", promo_id: 3, titanium_promo: "EXCLUSIVE_MENU"},
                                {bus_id: "THE ROOF", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "WEEKEND_DEAL", custom_promo_validity: "2023-02-15", date_valid_from: "2023-01-10", date_valid_to: "2023-02-05", event_promo: "-", gold_promo: "COMPLIMENTARY_DESSERT", platinum_promo: "-", promo_id: 2, titanium_promo: "-"},
                                {bus_id: "COAST", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-05", date_valid_to: "2023-02-15", event_promo: "20%_DISCOUNT", gold_promo: "COMPLIMENTARY_WINE", platinum_promo: "VIP_UPGRADE", promo_id: 4, titanium_promo: "-"},
                                {bus_id: "TRATTORIA", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "3_FOR_2_DEAL", custom_promo_validity: "2023-02-05", date_valid_from: "2023-01-15", date_valid_to: "2023-02-01", event_promo: "-", gold_promo: "COMPLIMENTARY_DRINK", platinum_promo: "PREMIUM_UPGRADE", promo_id: 1, titanium_promo: "-"},
                                {bus_id: "BLACK + BLUE VANCOUVER", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "-", custom_promo_validity: "-", date_valid_from: "2023-01-20", date_valid_to: "2023-02-10", event_promo: "25%_DISCOUNT", gold_promo: "-", platinum_promo: "LUXURY_TREATMENT", promo_id: 3, titanium_promo: "EXCLUSIVE_MENU"},
                                {bus_id: "THE ROOF", card_id: "00A1000", client_id: "GLOWBAL", custom_promo: "WEEKEND_DEAL", custom_promo_validity: "2023-02-15", date_valid_from: "2023-01-10", date_valid_to: "2023-02-05", event_promo: "-", gold_promo: "COMPLIMENTARY_DESSERT", platinum_promo: "-", promo_id: 2, titanium_promo: "-"},
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
                        <p className="mb-1 text-md text-coolGray-500 font-semibold">Customer History</p>
                        <hr className='mb-2 w-1/6 border-[1.25px] border-coolGray-200 border-opacity-50'/>
                    </div>
                    <table className="table-fixed w-full border-collapse overflow-x-scroll">
                        <tbody>
                            <tr className="bg-coolGray-50 border-2 border-coolGray-200 rounded-md shadow-sm">
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200 rounded-l-md">CUSTOMER ID</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">CARD ID</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">DATE TIME</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">DESCRIPTION</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">GROUP</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">BUSINESS</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">SCAN ID</th>
                                <th className="py-3 font-semibold text-xs truncate text-coolGray-800 uppercase text-center border-[1px] border-coolGray-200">PROMO ID</th>
                            </tr>
                            <tr className="group border-b border-gray-200 cursor-pointer">
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">b68a77d2-1123-4208-8e86-d7721942142f</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">2022-11-11</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">ACCOUNT CREATED</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                            </tr>
                            <tr className="group border-b border-gray-200 cursor-pointer">
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">b68a77d2-1123-4208-8e86-d7721942142f</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">00A1000</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">2022-11-11</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GOLD CARD ASSIGNED</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                            </tr>
                            <tr className="group border-b border-gray-200 cursor-pointer">
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">b68a77d2-1123-4208-8e86-d7721942142f</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">00A1000</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">2022-12-03</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">CARD SCANNED</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">RILEY'S FISH & GRILL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">22</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                            </tr>
                            <tr className="group border-b border-gray-200 cursor-pointer">
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">b68a77d2-1123-4208-8e86-d7721942142f</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">00A1000</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">2022-12-03</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">PROMO REDEEMED</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">RILEY'S FISH & GRILL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">COMPLEMENTART DESSERT</td>
                            </tr>
                            <tr className="group border-b border-gray-200 cursor-pointer">
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">b68a77d2-1123-4208-8e86-d7721942142f</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">00A1000</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">2022-12-23</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">CARD SCANNED</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">COAST</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">27</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                            </tr>
                            <tr className="group border-b border-gray-200 cursor-pointer">
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-loyaltyGold-100 text-center transition-all underline">b68a77d2-1123-4208-8e86-d7721942142f</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">00A1000</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">2022-12-23</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">PROMO REDEEMED</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">GLOWBAL</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">COAST</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">-</td>
                                <td className="py-4 px-3 bg-white group-hover:bg-coolGray-50 text-sm truncate font-medium text-coolGray-600 text-center transition-all">BOGO DRINKS</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
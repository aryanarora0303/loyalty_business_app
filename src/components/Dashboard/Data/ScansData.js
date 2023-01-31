// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../../../app/authSlice';
import { scanStore, getAllScanFromDB } from '../../../app/scanSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports

export function ScansData() {
    const auth = useSelector(authStore);
    const scan = useSelector(scanStore);

    const dispatch = useDispatch();

    const [tableDataRows, setTableDataRows] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScansData");
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

    return (
        <div className=''>
            <h3>
                ScansData
            </h3>
        </div>
    );
}
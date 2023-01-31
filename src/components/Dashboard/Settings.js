// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports

export function Settings() {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: Settings");
    }, [])

    return (
        <div className=''>
            <h3>
                Settings
            </h3>
        </div>
    );
}
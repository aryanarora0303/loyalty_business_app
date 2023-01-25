// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isBusinessExtractingFromDB: false,       // Loading variable for extracting/getting Business info. from db
  hasBusinessExtractedFromDB: false,       // True when operation is successful
  hasBusinessExtractingFromDBError: false, // True when operation is unsuccessful
  extractingBusinessFromDBError: null,     // Store the error of the operation

  business: null
};

// Async Function
export const getBusinessFromDB = createAsyncThunk(
'getBusinessFromDB',
async (param) => {
    console.log("businessSlice: getBusinessFromDB");
    try {
        let name = param.client_name;
        // ----------------------
        // TODO: REMOVE THIS LINE
        name = 'glowbal'
        // TODO: REMOVE THIS LINE
        // ----------------------

        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-business-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&client_name=${name}`);
        let business = res.data.data.business;
        business.forEach((businessInfo, index) => {
            businessInfo['bus_image'] = './business-logos/' + businessInfo.bus_name.toUpperCase().replaceAll(' ', '_').replaceAll('+', 'PLUS') + '.png';
        })
        return {message: "Business extracted from db", type: "success", data: business};
    }
    catch(err){
        return {message: err.message, type: "error", data: null};
    }
}
);

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getBusinessFromDB
        builder.addCase(getBusinessFromDB.pending, (state, action) => {
          console.log("businessSlice: getBusinessFromDB Requested");
          console.log('\t Request Pending', action);
          state.isBusinessExtractingFromDB = true;
          state.hasBusinessExtractedFromDB = false;       
          state.hasBusinessExtractingFromDBError = false; 
          state.extractingBusinessFromDBError = null;
        });
        builder.addCase(getBusinessFromDB.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){  
            state.isBusinessExtractingFromDB = false;       
            state.hasBusinessExtractedFromDB = false;       
            state.hasBusinessExtractingFromDBError = true; 
            state.extractingBusinessFromDBError = action.payload.message;
          } else {
            state.business = action.payload.data;

            state.isBusinessExtractingFromDB = false;       
            state.hasBusinessExtractedFromDB = true;       
            state.hasBusinessExtractingFromDBError = false; 
            state.extractingBusinessFromDBError = null;
          }
        });
        builder.addCase(getBusinessFromDB.rejected, (state, action) => {
            console.log('\t Request Rejected', action);
            state.isBusinessExtractingFromDB = false;       
            state.hasBusinessExtractedFromDB = false;       
            state.hasBusinessExtractingFromDBError = true; 
            state.extractingBusinessFromDBError = action.payload.message;
        });
    }
  });

export const businessStore = (state) => state.business;
export const {  } = businessSlice.actions;
export default businessSlice.reducer;
// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isAllBusinessExtractingFromDB: false,       // Loading variable for extracting/getting Business info. from db
  hasAllBusinessExtractedFromDB: false,       // True when operation is successful
  hasAllBusinessExtractingFromDBError: false, // True when operation is unsuccessful
  extractingAllBusinessFromDBError: null,     // Store the error of the operation

  allBusiness: null
};

// Async Function
export const getAllBusinessFromDB = createAsyncThunk(
'getAllBusinessFromDB',
async (param) => {
    console.log("businessSlice: getAllBusinessFromDB");
    try {
      let name = param.client.name;
      // ----------------------
      // TODO: REMOVE THIS LINE
      name = 'glowbal'
      // TODO: REMOVE THIS LINE
      // ----------------------

      // Authheaders(jwt token) not required since this request can be called without authentication(i.e. here during scannning)
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-all-business-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&client_name=${name}`);

      if(res.data.type === "error") { return { message: "business not extracted from db", type: "error", data: null }; }
      if(res.data.type === "success") { 
        let business = res.data.data.business;
        business.forEach((businessInfo, index) => {
            businessInfo['bus_image'] = './business-logos/' + businessInfo.bus_name.toUpperCase().replaceAll(' ', '_').replaceAll('+', 'PLUS') + '.png';
        })
        return { message: "Business extracted from db", type: "success", data: business };
      }
    }
    catch(err){
        return { message: err.message, type: "error", data: null };
    }
}
);

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAllBusinessFromDB
    builder.addCase(getAllBusinessFromDB.pending, (state, action) => {
      console.log("businessSlice: getBusinessFromDB Requested");
      console.log('\t Request Pending', action);
      state.isAllBusinessExtractingFromDB = true;
      state.hasAllBusinessExtractedFromDB = false;       
      state.hasAllBusinessExtractingFromDBError = false; 
      state.extractingAllBusinessFromDBError = null;
    });
    builder.addCase(getAllBusinessFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){  
        state.isAllBusinessExtractingFromDB = false;       
        state.hasAllBusinessExtractedFromDB = false;       
        state.hasAllBusinessExtractingFromDBError = true; 
        state.extractingAllBusinessFromDBError = action.payload.message;
      } else {
        state.allBusiness = action.payload.data;

        state.isAllBusinessExtractingFromDB = false;       
        state.hasAllBusinessExtractedFromDB = true;       
        state.hasAllBusinessExtractingFromDBError = false; 
        state.extractingAllBusinessFromDBError = null;
      }
    });
    builder.addCase(getAllBusinessFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isAllBusinessExtractingFromDB = false;       
      state.hasAllBusinessExtractedFromDB = false;       
      state.hasAllBusinessExtractingFromDBError = true; 
      state.extractingAllBusinessFromDBError = action.payload.message;
    });
  }
});

export const businessStore = (state) => state.business;
export const {  } = businessSlice.actions;
export default businessSlice.reducer;
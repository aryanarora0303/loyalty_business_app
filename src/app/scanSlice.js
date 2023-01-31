// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {

  isScanExtractingFromDB: false,       // Loading variable for extracting/getting Scan info. from db
  hasScanExtractedFromDB: false,       // True when operation is successful
  hasScanExtractingFromDBError: false, // True when operation is unsuccessful
  extractingScanFromDBError: null,     // Store the error of the operation

  isAllScanExtractingFromDB: false,       // Loading variable for extracting/getting Scan info. from db
  hasAllScanExtractedFromDB: false,       // True when operation is successful
  hasAllScanExtractingFromDBError: false, // True when operation is unsuccessful
  extractingAllScanFromDBError: null,     // Store the error of the operation

  scan: {},
  allScan: {}
};

// Async Functions
export const getScanFromDB = createAsyncThunk(
  'getScanFromDB',
  async (param) => {
    console.log("scanSlice: getScanFromDB");
    try {    
        let id = param.card.id;
        let authHeaders = {
            'Authorization': param.session.jwtToken
        }
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-scan-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&card_id=${id}`, {headers: authHeaders});
        
        if(res.data.type === "error") { return { message: "scan not extracted from db", type: "error", data: null}; }
        if(res.data.type === "success") { return { message: "scan extracted from db", type: "success", data: res.data.data.scan }; }
    }
    catch (err){
        return { message: err.message, type: "error", data: null };
    }
  }
);

export const getAllScanFromDB = createAsyncThunk(
    'getAllScanFromDB',
    async (param) => {
        console.log("scanSlice: getAllScanFromDB");
        try {
            let limit = param.scan.limit;
            let authHeaders = {
                'Authorization': param.session.jwtToken
            }
            const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-all-scan-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&limit=${limit}`, {headers: authHeaders});
            
            if(res.data.type === "error") { return { message: "scan not extracted from db", type: "error", data: null}; }
            if(res.data.type === "success") { return { message: "scan extracted from db", type: "success", data: res.data.data.scan }; }
        }
        catch (err){
            return { message: err.message, type: "error", data: null };
        }
    }
);

export const scanSlice = createSlice({

  name: 'scan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getScanFromDB
    builder.addCase(getScanFromDB.pending, (state, action) => {
      console.log("scanSlice: getScanFromDB Requested");
      console.log('\t Request Pending', action);
      state.isScanExtractingFromDB = true;
      state.hasScanExtractedFromDB = false;       
      state.hasScanExtractingFromDBError = false; 
      state.extractingScanFromDBError = null;
    });
    builder.addCase(getScanFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isScanExtractingFromDB = false;       
        state.hasScanExtractedFromDB = false;       
        state.hasScanExtractingFromDBError = true; 
        state.extractingScanFromDBError = action.payload.message;
      } else {
        state.scan = action.payload.data;

        state.isScanExtractingFromDB = false;       
        state.hasScanExtractedFromDB = true;       
        state.hasScanExtractingFromDBError = false; 
        state.extractingScanFromDBError = null;
      }
    });
    builder.addCase(getScanFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isScanExtractingFromDB = false;       
      state.hasScanExtractedFromDB = false;       
      state.hasScanExtractingFromDBError = true; 
      state.extractingScanFromDBError = action.payload.message;
    });

    // getAllScanFromDB
    builder.addCase(getAllScanFromDB.pending, (state, action) => {
      console.log("scanSlice: getAllScanFromDB Requested");
      console.log('\t Request Pending', action);
      state.isAllScanExtractingFromDB = true;
      state.hasAllScanExtractedFromDB = false;       
      state.hasAllScanExtractingFromDBError = false; 
      state.extractingAllScanFromDBError = null;
    });
    builder.addCase(getAllScanFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isAllScanExtractingFromDB = false;       
        state.hasAllScanExtractedFromDB = false;       
        state.hasAllScanExtractingFromDBError = true; 
        state.extractingAllScanFromDBError = action.payload.message;
      } else {
        state.allScan = action.payload.data;

        state.isAllScanExtractingFromDB = false;       
        state.hasAllScanExtractedFromDB = true;       
        state.hasAllScanExtractingFromDBError = false; 
        state.extractingAllScanFromDBError = null;
      }
    });
    builder.addCase(getAllScanFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isAllScanExtractingFromDB = false;       
      state.hasAllScanExtractedFromDB = false;       
      state.hasAllScanExtractingFromDBError = true; 
      state.extractingAllScanFromDBError = action.payload.message;
    });
  }
});

export const scanStore = (state) => state.scan;
export const { } = scanSlice.actions;
export default scanSlice.reducer;
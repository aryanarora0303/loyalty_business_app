// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {

  isCustomerExtractingFromDB: false,       // Loading variable for extracting/getting customer info. from db
  hasCustomerExtractedFromDB: false,       // True when operation is successful
  hasCustomerExtractingFromDBError: false, // True when operation is unsuccessful
  extractingCustomerFromDBError: null,     // Store the error of the operation

  isAllCustomerExtractingFromDB: false,       // Loading variable for extracting/getting customer info. from db
  hasAllCustomerExtractedFromDB: false,       // True when operation is successful
  hasAllCustomerExtractingFromDBError: false, // True when operation is unsuccessful
  extractingAllCustomerFromDBError: null,     // Store the error of the operation

  customer: null,
  allCustomer: null,
};

// Async Function
export const getCustomerFromDB = createAsyncThunk(
  'getCustomerFromDB',
  async (param) => {
    console.log("customerSlice: getCustomerFromDB");
    try {
      let id = param.customer.id;
      let authHeaders = {
        'Authorization': param.session.jwtToken
      }
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&customer_id=${id}`, {headers: authHeaders});

      if(res.data.type === "error") { return {message: "customer not extracted from db", type: "error", data: null}; } 
      if(res.data.type === "success") { 
        let customer = res.data.data.customer;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = customer.member_since.split('-')
        customer['member_since_simplified'] = `${monthNames[date[1]-1]} ${date[0]}`;
        
        return { message: "customer extracted from db", type: "success", data: res.data.data.customer };
      } 
    }
    catch(err){
      return { message: err.message, type: "error", data: null };
    }
  }
);

export const getAllCustomerFromDB = createAsyncThunk(
  'getAllCustomerFromDB',
  async (param) => {
    console.log("customerSlice: getAllCustomerFromDB");
    try{
      let limit = param.customer.limit;
      let authHeaders = {
        'Authorization': param.session.jwtToken
      }
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-all-customer-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&limit=${limit}`, {headers: authHeaders});
      
      if(res.data.type === "error") { return { message: "customer not extracted from db", type: "error", data: null }; } 
      if(res.data.type === "success") { return { message: "customer extracted from db", type: "success", data: res.data.data.customer }; }
    }
    catch(err){
      return { message: err.message, type: "error", data: null };
    }
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    // getCustomerFromDB
    builder.addCase(getCustomerFromDB.pending, (state, action) => {
      console.log("customerSlice: getCustomerFromDB Requested");
      console.log('\t Request Pending', action);
      state.isCustomerExtractingFromDB = true;
    });
    builder.addCase(getCustomerFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isCustomerExtractingFromDB = false;       
        state.hasCustomerExtractedFromDB = false;       
        state.hasCustomerExtractingFromDBError = true; 
        state.extractingCustomerFromDBError = action.payload.message;    
      } else {
        state.customer = action.payload.data;

        state.isCustomerExtractingFromDB = false;       
        state.hasCustomerExtractedFromDB = true;       
        state.hasCustomerExtractingFromDBError = false; 
        state.extractingCustomerFromDBError = null;
      }
    });
    builder.addCase(getCustomerFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isCustomerExtractingFromDB = false;       
      state.hasCustomerExtractedFromDB = false;       
      state.hasCustomerExtractingFromDBError = true; 
      state.extractingCustomerFromDBError = action.payload.message;
    });

    // getAllCustomerFromDB
    builder.addCase(getAllCustomerFromDB.pending, (state, action) => {
      console.log("customerSlice: getAllCustomerFromDB Requested");
      console.log('\t Request Pending', action);
      state.isAllCustomerExtractingFromDB = true;
    });
    builder.addCase(getAllCustomerFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isAllCustomerExtractingFromDB = false;       
        state.hasAllCustomerExtractedFromDB = false;       
        state.hasAllCustomerExtractingFromDBError = true; 
        state.extractingAllCustomerFromDBError = action.payload.message;    
      } else {
        state.allCustomer = action.payload.data;

        state.isAllCustomerExtractingFromDB = false;       
        state.hasAllCustomerExtractedFromDB = true;       
        state.hasAllCustomerExtractingFromDBError = false; 
        state.extractingAllCustomerFromDBError = null;
      }
    });
    builder.addCase(getAllCustomerFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isAllCustomerExtractingFromDB = false;       
      state.hasAllCustomerExtractedFromDB = false;       
      state.hasAllCustomerExtractingFromDBError = true; 
      state.extractingAllCustomerFromDBError = action.payload.message;
    });
  }
});

export const customerStore = (state) => state.customer;
export const { } = customerSlice.actions;
export default customerSlice.reducer;
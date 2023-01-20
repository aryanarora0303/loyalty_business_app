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
    try{
    let id = param.customer.id;
    let authHeaders = {
      'Authorization': param.session.jwtToken
    }
    const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-card-info?customer_id=${id}`, {headers: authHeaders});
    let card = res.data.data.card;
    card['invite_link'] = `${window.location.host}/sign-up?invite_code=${card.invite_code}`;
    card['client_image'] = './client-logos/' + card.client_name.replaceAll(' ', '_') + '.png';
    card['card_corner_image'] = './card-types/' + card.card_type + '_card_corner.png';
    return {message: "Card extracted from db", type: "success", data: res.data.data.card};
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
        });
        builder.addCase(getBusinessFromDB.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){  
          } else {
          }
        });
        builder.addCase(getBusinessFromDB.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
        });
    }
  });

export const businessStore = (state) => state.business;
export const {  } = businessSlice.actions;
export default businessSlice.reducer;
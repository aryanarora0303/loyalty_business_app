// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isClientExtractingFromDB: false,       // Loading variable for extracting/getting Client info. from db
  hasClientExtractedFromDB: false,       // True when operation is successful
  hasClientExtractingFromDBError: false, // True when operation is unsuccessful
  extractingClientFromDBError: null,     // Store the error of the operation

  client: null,
};

// Async Function
export const getClientFromDB = createAsyncThunk(
'getClientFromDB',
async (param) => {
  console.log("clientSlice: getClientFromDB");
  try {
    let name = param.client_name;
    const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-client-info?client_name=${name}`);
    let client = res.data.data.client;
    card['invite_link'] = `${window.location.host}/sign-up?invite_code=${card.invite_code}`;
    card['client_image'] = './client-logos/' + card.client_name.replaceAll(' ', '_') + '.png';
    card['card_corner_image'] = './card-types/' + card.card_type + '_card_corner.png';
    return {message: "Card extracted from db", type: "success", data: res.data.data.card};
  }
  catch(err) {
    return {message: err.message, type: "error", data: null};
  }
}
);

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getClientFromDB
        builder.addCase(getClientFromDB.pending, (state, action) => {
          console.log("clientSlice: getClientFromDB Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(getClientFromDB.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){  
          } else {
          }
        });
        builder.addCase(getClientFromDB.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
        });
    }
  });

export const clientStore = (state) => state.client;
export const {  } = clientSlice.actions;
export default clientSlice.reducer;
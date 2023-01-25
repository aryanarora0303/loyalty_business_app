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
      // ----------------------
      // TODO: REMOVE THIS LINE
      name = 'glowbal'
      // TODO: REMOVE THIS LINE
      // ----------------------

      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-client-info?authorizer=${process.env.REACT_APP_AWS_API_KEY}&client_name=${name}`);
      let client = res.data.data.client;
      client['client_name'] = client.client_name.toLowerCase().split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' ');
      client['client_image'] = './client-logos/' + client.client_name.replaceAll(' ', '_') + '.png';
      return {message: "Client extracted from db", type: "success", data: client};
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
      state.isClientExtractingFromDB = true;
      state.hasClientExtractedFromDB = false;       
      state.hasClientExtractingFromDBError = false; 
      state.extractingClientFromDBError = null;
    });
    builder.addCase(getClientFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){  
        state.isClientExtractingFromDB = false;       
        state.hasClientExtractedFromDB = false;       
        state.hasClientExtractingFromDBError = true; 
        state.extractingClientFromDBError = action.payload.message;
      } else {
        state.client = action.payload.data;

        state.isClientExtractingFromDB = false;       
        state.hasClientExtractedFromDB = true;       
        state.hasClientExtractingFromDBError = false; 
        state.extractingClientFromDBError = null;
      }
    });
    builder.addCase(getClientFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isClientExtractingFromDB = false;       
      state.hasClientExtractedFromDB = false;       
      state.hasClientExtractingFromDBError = true; 
      state.extractingClientFromDBError = action.payload.message;
    });
  }
});

export const clientStore = (state) => state.client;
export const {  } = clientSlice.actions;
export default clientSlice.reducer;
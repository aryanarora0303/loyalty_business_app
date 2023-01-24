// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  // Card Details
  isCardDetailsSaving: false,        // Loading variable for save card details etc.
  hasCardDetailsSaved: false,        //  True when operation is successful
  hasCardDetailsSavedFromURL: false, // True when card information is sourced from URL(via a scan to signup)
  hasCardDetailsSavingError: false,  // True when operation is unsuccessful(produces error)
  cardDetailsSavingError: null,      // Store the error of the operation

  isCardExtractingFromDB: false,       // Loading variable for extracting/getting Card info. from db
  hasCardExtractedFromDB: false,       // True when operation is successful
  hasCardExtractingFromDBError: false, // True when operation is unsuccessful
  extractingCardFromDBError: null,     // Store the error of the operation

  isCardDetailsAssigning: false,          // Loading variable for new assign card details
  hasNewCardDetailsAssigned: false,       // True when opteraion is successful
  hasNewCardDetailsAssigningError: false, // True when operation unsuccessful(produces error)
  newCardDetailsAssigningError: null,     // Store the error of the operation
  
  isCardDetailsVerifying: false,        // Loading variable for verify card details
  hasCardDetailsVerified: false,        // True when opteraion is successful
  hasCardDetailsVerifyingError: false,  // True when operation unsuccessful(produces error)
  verifyCardDetailsError: null,         // Store the error of the operation

  card: null
};

// Async Function
export const getCardFromDB = createAsyncThunk(
  'getCardFromDB',
  async (param) => {
    console.log("cardSlice: getCardFromDB");
    try {
      let id = param.customer.id;
      let authHeaders = {
        'Authorization': param.session.jwtToken
      }
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-card-info?authorizer=${process.env.REACT_APP_AWS_API_GATEWAY}&customer_id=${id}`, {headers: authHeaders});
      let card = res.data.data.card;
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

export const verifyCardDetails = createAsyncThunk(
  'verifyCardDetails',
  async (param) => {
    console.log("cardSlice: verifyCardDetails");
    try {
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/verify-card?authorizer=${process.env.REACT_APP_AWS_API_GATEWAY}&card_id=${param.id}&card_cvc=${param.cvc}`);

      console.log("CARD DETAILS VERIFYING RESPONSE", res.data.type);
      
      if(res.data.type === "success"){ return {message: "card valid", type: "success", data: res.data.data.card}; }
      if(res.data.type === "error"){ return {message: "card not valid", type: "error", data: null}; }
    }
    catch(err) {
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const assignNewCardDetails = createAsyncThunk(
  'assignNewCardDetails',
  async (param) => {
    console.log("cardSlice: assignNewCardDetails");
      try{
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/assign-new-card?authorizer=${process.env.REACT_APP_AWS_API_GATEWAY}`);
        
        if(res.data.type === "success"){ return {message: "card assigned", type: "success", data: res.data.data.card}; }
        if(res.data.type === "error"){ return {message: "card not assigned", type: "error", data: null}; }
      }
      catch(err){
        return {message: err.message, type: "error", data: null};
      }
  }
);

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    saveCardDetails: (state, action) => {
      console.log("cardSlice: saveCardDetails");
      console.log('\t Request Fulfilled', {type: 'saveCardDetails/fulfilled', payload: action.payload});
      
      state.card = action.payload;
      
      state.isCardDetailsSaving = false;
      state.hasCardDetailsSaved = true;
      state.hasCardDetailsSavedFromURL = (action.payload.fromURL) ? true : false;
      state.hasCardDetailsSavingError = false;
      state.cardDetailsSavingError = null;
    }
  },
  extraReducers: (builder) => {
    // getCardFromDB
    builder.addCase(getCardFromDB.pending, (state, action) => {
      console.log("cardSlice: getCardFromDB Requested");
      console.log('\t Request Pending', action);
      state.isCardExtractingFromDB = true;
      state.hasCardExtractedFromDB = false;       
      state.hasCardExtractingFromDBError = false; 
      state.extractingCardFromDBError = null;
    });
    builder.addCase(getCardFromDB.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isCardExtractingFromDB = false;       
        state.hasCardExtractedFromDB = false;       
        state.hasCardExtractingFromDBError = true; 
        state.extractingCardFromDBError = action.payload.message;    
      } else {
        state.card = action.payload.data;

        state.isCardExtractingFromDB = false;       
        state.hasCardExtractedFromDB = true;       
        state.hasCardExtractingFromDBError = false; 
        state.extractingCardFromDBError = null;
      }
    });
    builder.addCase(getCardFromDB.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isCardExtractingFromDB = false;       
      state.hasCardExtractedFromDB = false;       
      state.hasCardExtractingFromDBError = true; 
      state.extractingCardFromDBError = action.payload.message;
    });

    // verifyCardDetails
    builder.addCase(verifyCardDetails.pending, (state, action) => {
      console.log("appSlice: verifyCardDetails Requested");
      console.log('\t Request Pending', action);
      state.isCardDetailsVerifying = true;
      state.hasCardDetailsVerified = false;
      state.hasCardDetailsVerifyingError = false;
      state.verifyCardDetailsError = null;
    });
    builder.addCase(verifyCardDetails.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isCardDetailsVerifying = false;
        state.hasCardDetailsVerified = false;
        state.hasCardDetailsVerifyingError = true;
        state.verifyCardDetailsError = action.payload.message;
      } else {
        state.isCardDetailsVerifying = false;
        state.hasCardDetailsVerified = true;
        state.hasCardDetailsVerifyingError = false;
        state.verifyCardDetailsError = null;
      }
    });
    builder.addCase(verifyCardDetails.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isCardDetailsVerifying = false;
      state.hasCardDetailsVerified = false;
      state.hasCardDetailsVerifyingError = true;
      state.verifyCardDetailsError = action.payload.message;
    });

    //assignNewCardDetails
    builder.addCase(assignNewCardDetails.pending, (state, action) => {
      console.log("appSlice: assignNewCard Requested");
      console.log('\t Request Pending', action);
      state.isCardDetailsAssigning = true;
      state.hasNewCardDetailsAssigned = false;
      state.hasNewCardDetailsAssigningError = false;
      state.newCardDetailsAssigningError = null;
    });
    builder.addCase(assignNewCardDetails.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.isCardDetailsAssigning = false;
        state.hasNewCardDetailsAssigned = false;
        state.hasNewCardDetailsAssigningError = true;
        state.newCardDetailsAssigningError = action.payload.message;
      } else {
        state.card = action.payload.data
        
        state.isCardDetailsSaving = false;
        state.hasCardDetailsSaved = true;
        state.hasCardDetailsSavingError = false;
        state.cardDetailsSavingError = null;

        state.isCardDetailsAssigning = false;
        state.hasNewCardDetailsAssigned = true;
        state.hasNewCardDetailsAssigningError = false;
        state.newCardDetailsAssigningError = null;
      }
    });
    builder.addCase(assignNewCardDetails.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.isCardDetailsAssigning = false;
      state.hasNewCardDetailsAssigned = false;
      state.hasNewCardDetailsAssigningError = true;
      state.newCardDetailsAssigningError = action.payload.message;
    });
  }
});

export const cardStore = (state) => state.card;
export const { saveCardDetails } = cardSlice.actions;
export default cardSlice.reducer;
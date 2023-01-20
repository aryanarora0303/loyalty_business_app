// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  nav: {
    activeLink: ''
  },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateActiveNav: (state, action) => { 
          console.log("appSlice: updateActiveNav");
          console.log('\t Request Fulfilled', {type: 'updateActiveNav/fulfilled', payload: action.payload});
          state.nav.activeLink = action.payload;
        }
    },
    extraReducers: {}
  });

export const appStore = (state) => state.app;
export const { updateActiveNav, saveSignUpDetails, saveCardDetails } = appSlice.actions;
export default appSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from './authSlice';
import clientReducer from './clientSlice';
import businessReducer from './businessSlice';
import customerReducer from './customerSlice';
import cardReducer from './cardSlice';
//import scanSlice from './scanSlice';
import promoReducer from './promoSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    client: clientReducer,
    business: businessReducer,
    customer: customerReducer,
    card: cardReducer,
    //scan: scanReducer,
    promo: promoReducer
  }
});

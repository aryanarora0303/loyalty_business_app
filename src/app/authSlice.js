// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Amplify, Auth } from 'aws-amplify';

const initialState = {
  isAuthenticated: false, // True when all steps of authentication are complete. SignUp/SignIn & Confirmation/Verification.

  isTempSignedIn: false, // True when the user complete SignIn process(with temp password) successfully.

  authError: null, // Stores error that occur during signIn
  
  userSession: {
    jwtToken: null
  },

  user: null
};

Amplify.configure({
  Auth: {
      mandatorySignIn: true,
      region: process.env.REACT_APP_AWS_COGNITO_REGION,
      userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_APP_CLIENT_ID
  }
});

export const signIn = createAsyncThunk(
  'signIn',
  async (param) => {
    console.log("authSlice: signIn");
    try {
      const signInResponse = await Auth.signIn({username: param.username, password: param.password});
      console.log(signInResponse);
      if(signInResponse.challengeName && signInResponse.challengeName === "NEW_PASSWORD_REQUIRED") {
        let user = signInResponse.challengeParam.userAttributes;
        user['temp_password'] = param.password;
        return {message: "temporarily signed in successfully", type: "temp-success", data: {user: user}};
      }

      let user = ((signInResponse && signInResponse.attributes) ? signInResponse.attributes : signInResponse);
      let userSession  = ((signInResponse && signInResponse.signInUserSession) ? signInResponse.signInUserSession : null);
      let jwtToken = (userSession) ? userSession.accessToken.jwtToken : null;

      return {message: "successfully signed in", type: "success", data: {user: user, jwtToken: jwtToken}};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const setPermanentPassword = createAsyncThunk(
  'setPermanentPassword',
  async (param) => {
    console.log("authSlice: setPermanentPassword");
    try {
      let signInResponse = await Auth.signIn({username: param.user.email, password: param.user.temp_password});
      let { requiredAttributes } = signInResponse.challengeParam;
      signInResponse = await Auth.completeNewPassword(signInResponse, param.new_password, requiredAttributes);

      let user = ((signInResponse && signInResponse.challengeParam && signInResponse.challengeParam.userAttributes) ? signInResponse.challengeParam.userAttributes : signInResponse);
      let userSession  = ((signInResponse && signInResponse.signInUserSession) ? signInResponse.signInUserSession : null);
      let jwtToken = (userSession) ? userSession.accessToken.jwtToken : null;

      return {message: "successfully signed in", type: "success", data: {user: user, jwtToken: jwtToken}};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);


export const signOut = createAsyncThunk(
  'signOut',
  async (param) => {
    console.log("authSlice: signOut");
    try {
      const signOutResponse = await Auth.signOut();
      return {message: "successfully logged in", type: "success", data: signOutResponse};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signIn
    builder.addCase(signIn.pending, (state, action) => {
      console.log("authSlice: signIn Requested");
      console.log('\t Request Pending', action);
      state.isAuthenticated = false;
      state.isTempSignedIn = false;
      state.authError = null;
      state.userSession.jwtToken =  null;
      state.user = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'temp-success'){
        state.isTempSignedIn = true;
        state.user = action.payload.data.user;
      } else if(action.payload.type === 'error'){ 
        state.authError = action.payload.message;
      } else {
        state.isAuthenticated = true;
        state.isTempSignedIn = false;
        state.userSession.jwtToken = action.payload.data.jwtToken;
        state.user = action.payload.data.user;
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.authError = action.payload.message;
      console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
    });

    // setPermanentPassword
    builder.addCase(setPermanentPassword.pending, (state, action) => {
      console.log("authSlice: setPermanentPassword Requested");
      console.log('\t Request Pending', action);
      state.isAuthenticated = false;
      state.isTempSignedIn = true;
      state.authError = null;
      state.userSession.jwtToken =  null;
      state.user = null;
    });
    builder.addCase(setPermanentPassword.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.authError = action.payload.message;
      } else {
        state.isAuthenticated = true;
        state.isTempSignedIn = false;
        state.userSession.jwtToken = action.payload.data.jwtToken;
        state.user = action.payload.data.user;
      }
    });
    builder.addCase(setPermanentPassword.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.authError = action.payload.message;
      console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
    });

    // signOut
    builder.addCase(signOut.pending, (state, action) => {
      console.log("authSlice: signOut Requested");
      console.log('\t Request Pending', action);
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      console.log('\t Request Fulfilled', action);
      if(action.payload.type === 'error'){ 
        state.authError = action.payload.message;
      } else { 
        state.isAuthenticated = false;
        state.isTempSignedIn = false;
        state.userSession.jwtToken = null;
        state.user = null;
      }
    });
    builder.addCase(signOut.rejected, (state, action) => {
      console.log('\t Request Rejected', action);
      state.authError = action.payload.message;
      console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
    });
  }
});

export const authStore = (state) => state.auth;
export const { } = authSlice.actions;
export default authSlice.reducer;
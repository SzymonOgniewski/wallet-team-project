import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './AuthThunk';
const handlePendingState = state => {
  state.isLoading = true;
};
const handleRejection = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const isPendingAction = action => action.type.endsWith('pending');
const isRejectedAction = action => action.type.endsWith('reject');
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addMatcher(isPendingAction, handlePendingState)
      .addMatcher(isRejectedAction, handleRejection)
      .addDefaultCase((state, _action) => state);
  },
});

export const authReducer = authSlice.reducer;

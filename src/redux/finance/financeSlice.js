import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance } from './financeThunks';

const initialState = {
  balance: 200,
  isLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
  },
});

export const { setBalance, setLoading, setError } = financeSlice.actions;
export default financeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance } from './financeThunk';
import {
  editTransaction,
  deleteSelectedTransaction,
  addNewTransaction,
} from '../transactions/transactionThunk';

const initialState = {
  balance: 0,
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
    builder
      .addCase(fetchBalance.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.balance = action.payload.balanceAfter;
        console.log('lolo');
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSelectedTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log(action.payload);
        if (action.payload.type === 'INCOME') {
          state.balance = state.balance - action.payload.amount;
        } else {
          state.balance = state.balance + action.payload.amount;
        }
      })
      .addCase(deleteSelectedTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNewTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload.type === 'INCOME') {
          state.balance = state.balance + action.payload.amount;
        } else {
          state.balance = state.balance - action.payload.amount;
        }
      })
      .addCase(addNewTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state, _action) => state);
  },
});

export const { setBalance, setLoading, setError } = financeSlice.actions;
export default financeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addNewTransaction,
  deleteSelectedTransaction,
  fetchTransactionsSummary,
  getTransactionCategories,

} from './transactionThunk';
const handlePendingState = state => {
  state.isLoading = true;
};
const handleRejection = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const initialTransactionsState = {
  items: [],
  summary: [],
  isLoading: false,
  error: null,
};
const isPendingAction = action => action.type.endsWith('pending');
const isRejectedAction = action => action.type.endsWith('reject');

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialTransactionsState,
  extraReducers: builder => {
    builder

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.summary = action.payload;
      })
      .addCase(addNewTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteSelectedTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

      })
      .addCase(getTransactionCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;

      })
      .addMatcher(isPendingAction, handlePendingState)
      .addMatcher(isRejectedAction, handleRejection)
      .addDefaultCase((state, _action) => state);
  },
});

export const transactionsReducer = transactionsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addNewTransaction,
  deleteSelectedTransaction,
  fetchTransactionsSummary,
  getTransactionCategories,
  editTransaction,
} from './transactionThunk';


const handlePendingState = state => {
  state.isLoading = true;
};

const handleRejection = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialTransactionsState = {
  items: {
    userTransactions: [],
  },
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
        state.items.userTransactions.push(action.payload);
      })
      .addCase(deleteSelectedTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log(action.payload);
        const index = state.items.userTransactions.findIndex(
          transaction =>
            transaction.transactionId === action.payload.transactionId
        );
        state.items.userTransactions.splice(index, 1);
      })
      .addCase(getTransactionCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedTransaction = action.payload;
        const transactionIndex = state.items.userTransactions.findIndex(
          transaction => transaction._id === updatedTransaction._id
        );

        if (transactionIndex !== -1) {
          state.items.userTransactions[transactionIndex] = updatedTransaction;
        }
      })

      .addMatcher(isPendingAction, handlePendingState)
      .addMatcher(isRejectedAction, handleRejection)
      .addDefaultCase((state, _action) => state);
  },
});

export const transactionsReducer = transactionsSlice.reducer;

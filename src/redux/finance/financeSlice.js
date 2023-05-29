import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalBalance: 240000.1,
  data: [
    {
      transactionDate: '04.01.19',
      type: 'income',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000.1,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: 'income',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },
    {
      transactionDate: '04.01.19',
      type: '-',
      category: 'Other',
      comment: 'Gift for your wife',
      amount: 3000,
    },    
  ],
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setTotalBalance: (state, action) => {
      state.totalBalance = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTotalBalance, setData } = financeSlice.actions;
export default financeSlice.reducer;

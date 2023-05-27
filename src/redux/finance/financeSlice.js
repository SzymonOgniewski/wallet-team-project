import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalBalance: 240000.1,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setTotalBalance: (state, action) => {
      state.totalBalance = action.payload;
    },
  },
});

export const { setTotalBalance } = financeSlice.actions;
export default financeSlice.reducer;

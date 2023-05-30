import { createSlice } from '@reduxjs/toolkit';

const homeTableSlice = createSlice({
  name: 'homeTable',
  initialState: {
    data: [],
  },
  reducers: {
    setHomeTableData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setHomeTableData } = homeTableSlice.actions;

export default homeTableSlice.reducer;

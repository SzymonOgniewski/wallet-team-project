import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async(_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://wallet-febk.onrender.com/api/users/current'
      );      
      return response.data.data.user.balance;
    } catch (error) {
      toast.error('Failed to fetch balance');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

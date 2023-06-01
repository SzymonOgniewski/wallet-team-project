import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async () => {
    try {
      const response = await axios.get(
        'https://wallet-dybb.onrender.com/api/users/current'
      ); 
      return response.data.balance; 
    } catch (error) {      
      throw new Error('Failed to fetch balance');
    }
  }
);

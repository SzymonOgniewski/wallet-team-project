import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async () => {
    try {
      const response = await axios.get(
        'https://wallet-dybb.onrender.com/api/users/current'
      ); 
      return response.data.balance; 
    } catch (error) { 
      toast.error('Failed to fetch balance')
      throw new Error('Failed to fetch balance');
    }
  }
);

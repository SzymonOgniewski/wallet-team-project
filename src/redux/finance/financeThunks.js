import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async () => {
    try {      
      // API request or manual value assignment
      return 31000.01;
    } catch (error) {
      throw new Error('Failed to fetch balance');
    }
  }
);

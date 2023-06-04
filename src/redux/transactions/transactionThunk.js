import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://wallet-dybb.onrender.com/';
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/transactions');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSelectedTransaction = createAsyncThunk(
  'transactions/deleteTransactions',
  async (TransactionId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/transactions/${TransactionId}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const addNewTransaction = createAsyncThunk(
  'transactions/addTransactions',
  async (newTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/transactions', newTransaction);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getTransactionCategories = createAsyncThunk(
  'transactions/categories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/transactions/categories');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchTransactionsSummary = createAsyncThunk(
  'transactions/fetchTransactionsSummary',
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/transactions-summary?year=${year}&month=${month}`
      );
      console.log(response.data.data.response);
      return response.data.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

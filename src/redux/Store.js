import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from './transactions/transactionSlice.js';
import { authReducer } from './auth/AuthSlice';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import financeReducer from './finance/financeSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

const myApi = {
  transactions: '/api/transactions',
};

const transactionsPersistConfig = {
  key: 'transactions',
  storage,
  whitelist: ['list'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

export const Store = configureStore({
  reducer: {
    transactions: persistReducer(
      transactionsPersistConfig,
      transactionsReducer
    ),
    auth: persistReducer(authPersistConfig, authReducer),
    finance: financeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: myApi },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(Store);

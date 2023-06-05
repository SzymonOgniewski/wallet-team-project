import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

import { transactionsReducer } from './transactions/transactionSlice.js';
import { authReducer } from './auth/AuthSlice';
import { globalReducer } from './data/globalSlice';
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
const financePersistConfig = {
  key: 'finance',
  storage,
  whitelist: ['balance'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const rootReducer = {
  transactions: persistReducer(transactionsPersistConfig, transactionsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  global: globalReducer,
  finance: persistReducer(financePersistConfig, financeReducer),
};

const Store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: { extraArgument: myApi },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(Store);

export { Store, persistor };

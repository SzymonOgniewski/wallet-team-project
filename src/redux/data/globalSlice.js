import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  isModalLogoutOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,

  reducers: {
    toggleModal: (store, _) => {
      store.isModalLogoutOpen = !store.isModalLogoutOpen;
    },
    toggleTransactionModal: (store, _) => {
      store.isTransactionModalOpen = !store.isTransactionModalOpen;
    },
  },
});

export const { toggleModal, toggleTransactionModal } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;

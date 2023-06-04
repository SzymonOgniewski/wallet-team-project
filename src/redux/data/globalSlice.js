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
    toggleTransactionEditModal: (store, _) => {
      store.isTransactionModalOpen = !store.isTransactionEditModalOpen;
    },
  },
});

export const { toggleModal, toggleTransactionModal, toggleTransactionEditModal } =
  globalSlice.actions;

export const globalReducer = globalSlice.reducer;

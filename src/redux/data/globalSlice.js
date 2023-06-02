import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    isModalLogoutOpen: false,
  };
  
  const globalSlice = createSlice({
    name: "global",
    initialState,
  
    reducers: {
      toggleModal: (store, _) => {
        store.isModalLogoutOpen = !store.isModalLogoutOpen;
      },
    },
  });
  
  export const { toggleModal } = globalSlice.actions;

  export const globalReducer = globalSlice.reducer;
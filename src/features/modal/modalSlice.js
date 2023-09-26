import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedMealId: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.selectedMealId = null;
    },

    setSelectedMealId: (state, action) => {
      state.selectedMealId = action.payload;
    },
  },
});

export const { openModal, closeModal, setSelectedMealId } = modalSlice.actions;

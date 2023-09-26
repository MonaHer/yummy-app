import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/meals/apiSlice";
import { modalSlice } from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/meals/apiSlice";
import { modalSlice } from "../features/modal/modalSlice";
import { favoritesSlice } from "../features/favorites/favoritesSlice";
import { cartSlice } from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalSlice.reducer,
    favorites: favoritesSlice.reducer,
    cart: cartSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

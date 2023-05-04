import { configureStore } from "@reduxjs/toolkit";
import { web3Slice, transactionSlice } from "./";

export const store = configureStore({
  reducer: {
    web3: web3Slice.reducer,
    transaction: transactionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

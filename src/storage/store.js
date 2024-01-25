import { configureStore } from "@reduxjs/toolkit";
import contextReducer from "./state";

export const store = configureStore({
  reducer: {
    context: contextReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

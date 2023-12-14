import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./reducers/apiSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

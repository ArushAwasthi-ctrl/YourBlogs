import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
const authStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import menuReducer from "./modules/menuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

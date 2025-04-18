import { UserType } from "@/pages/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userInfo: UserType | null;
  _persist?: { version: number; rehydrated: boolean }; // 如果使用redux-persist
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  userInfo: (() => {
    try {
      const data = localStorage.getItem("userInfo");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      // 同步保存到 localStorage
      localStorage.setItem("token", action.payload.token || "");
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;

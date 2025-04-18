import { MenuItem } from "@/pages/menu/menu";
import { http } from "@/utils/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MenuState {
  menus: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
};

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const response = await http.get("/menu");
  return response.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menus";
      });
  },
});

export default menuSlice.reducer;

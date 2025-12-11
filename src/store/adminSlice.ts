import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isAdmin: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload; 
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;

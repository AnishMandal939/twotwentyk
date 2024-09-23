import { createSlice } from "@reduxjs/toolkit";

const userRoleSlice = createSlice({
  name: "userRole",
  initialState: {
    userRole: null,
  },
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;

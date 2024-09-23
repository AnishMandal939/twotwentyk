import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slice/shared/tokenSlice";
import userRoleSlice from "./slice/shared/userRoleSlice";

export const toolkitstore = configureStore({
  reducer: {
    appToken: tokenSlice,
    userRole: userRoleSlice,
  },
});

import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "root",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = rootReducer.actions;
export default rootReducer.reducer;
export const selectCurrentUser = (state) => state.root.userInfo;

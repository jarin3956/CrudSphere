import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUserCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("name", state.userInfo);
    },
    removeUserCredentials: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { addUserCredentials, removeUserCredentials } = userSlice.actions;

export default userSlice.reducer;

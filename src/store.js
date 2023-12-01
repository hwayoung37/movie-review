import { configureStore, createSlice } from "@reduxjs/toolkit";

const accessToken = createSlice({
  name: "accessToken", //state 이름
  initialState: localStorage.getItem("accessToken"), //state 최초값

  reducers: {
    AddAccessToken(state) {
      state = localStorage.getItem("accessToken");
      return state;
    },
    RemoveAccessToken(state) {
      localStorage.removeItem("accessToken");
      state = null;
      return null;
    },
  },
});

export const { AddAccessToken, RemoveAccessToken } = accessToken.actions;

export default configureStore({
  reducer: {
    accessToken: accessToken.reducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

export const web3Slice = createSlice({
  name: "web3",
  initialState: {
    status: "checking",
    user: {},
    provider: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = state.status;
      state.user = {};
      state.errorMessage = undefined;
    },
    onConnect: (state, { payload }) => {
      state.status = "connected";
      state.user = payload.user;
      state.provider = payload.provider;
      state.errorMessage = undefined;
    },
    onDisconnect: (state, { payload }) => {
      state.status = "not-Connected";
      state.user = [];
      state.errorMessage = payload;
    },
    onNeedInstall: (state, { payload }) => {
      state.status = "Need-Metamask";
      state.user = [];
      state.errorMessage = payload;
    },
  },
});
export const { onChecking, onConnect, onDisconnect, onNeedInstall } =
  web3Slice.actions;

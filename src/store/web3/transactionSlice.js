import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    network: "",
    operation: "Ready",
    tether: {},
    decentralBank: {},
    rwd: {},
    tetherBalance: "0",
    rwdBalance: "0",
    stakingBalance: "0",
  },
  reducers: {
    onConnectTransac: (state, { payload }) => {
      //   console.log(payload);
      state.operation = "Ready";
      state.tether = payload.tether;
      state.decentralBank = payload.decentralBank;
      state.rwd = payload.rwd;
      state.tetherBalance = payload.tetherBalance;
      state.rwdBalance = payload.rwdBalance;
      state.stakingBalance = payload.stakingBalance;
      state.network = payload.network;
    },
    onStandBy: (state) => {
      state.operation = "StandBy";
    },
    onUpdate: (state, { payload }) => {
      state.tetherBalance = payload.tetherBalance;
      state.rwdBalance = payload.rwdBalance;
      state.stakingBalance = payload.stakingBalance;
      state.network = payload.network;
    },
    onDeposit: (state) => {
      state.operation = "Deposit on";
    },
    onWithdraw: (state) => {
      state.operation = "Withdraw on";
    },
  },
});
export const { onDeposit, onWithdraw, onStandBy, onConnectTransac, onUpdate } =
  transactionSlice.actions;

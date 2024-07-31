import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    value: { count: 0, unread: 0 },
    pointmachinedata: { data: [] },
    trackcircuitdata: { data: [] },
    signalcircuitdata: { data: [] },
    axlecounterdata: { data: [] },
    lcgatedata: { data: [] },
    relaydata: { data: [] },
    batterydata: { data: [] },
    ipsdata: { data: [] },
    pointmachinesetup: { data: [] },
    trackcircuitsetup: { data: [] },
    signalcircuitsetup: { data: [] },
    alertmessagesetup: { data: [] },
    relaysetup: { data: [] },
    stationaccesssetup: { data: [] },
    axlecountersetup: { data: [] },
    lcgatesetup: { data: [] },
    batterysetup: { data: [] },
    ipssetup: { data: [] },
    yardsetup: {data: []}
  },
  reducers: {
    count: (state, action) => {
      state.value = action.payload;
    },
    pointmachine_data: (state, action) => {
      state.pointmachinedata = action.payload;
    },
    trackcircuit_data: (state, action) => {
      state.trackcircuitdata = action.payload;
    },
    signalcircuit_data: (state, action) => {
      state.signalcircuitdata = action.payload;
    },
    axlecounter_data: (state, action) => {
      state.axlecounterdata = action.payload;
    },
    lcgate_data: (state, action) => {
      state.lcgatedata = action.payload;
    },
    relay_data: (state, action) => {
      state.relaydata = action.payload;
    },
    battery_data: (state, action) => {
      state.batterydata = action.payload;
    },
    ips_data: (state, action) => {
      state.ipsdata = action.payload;
    },
    pointmachine_setup: (state, action) => {
      state.pointmachinesetup = action.payload;
    },
    trackcircuit_setup: (state, action) => {
      state.trackcircuitsetup = action.payload;
    },
    signalcircuit_setup: (state, action) => {
      state.signalcircuitsetup = action.payload;
    },
    alertmessage_setup: (state, action) => {
      state.alertmessagesetup = action.payload;
    },
    relay_setup: (state, action) => {
      state.relaysetup = action.payload;
    },
    stationaccess_setup : (state, action) => {
      state.stationaccesssetup = action.payload;
    },
    axlecounter_setup : (state, action) => {
      state.axlecountersetup = action.payload;
    },
    lcgate_setup : (state, action) => {
      state.lcgatesetup = action.payload;
    },
    battery_setup : (state, action) => {
      state.batterysetup = action.payload;
    },
    ips_setup : (state, action) => {
      state.ipssetup = action.payload;
    },
    yard_setup : (state, action) => {
      state.yardsetup = action.payload;
    }
  },
});

export const { count, pointmachine_data, trackcircuit_data, signalcircuit_data, axlecounter_data, lcgate_data, relay_data, battery_data, ips_data, pointmachine_setup, trackcircuit_setup, signalcircuit_setup, alertmessage_setup, relay_setup, stationaccess_setup, axlecounter_setup, lcgate_setup, battery_setup, ips_setup, yard_setup } = notificationSlice.actions;

export default notificationSlice.reducer;
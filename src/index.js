import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import NotifiReducer from "./features/Notification";
import authService from './Components/Authentication/authService';


if (!authService.isAuthenticateduser()) {
  authService.logout();
}

const store = configureStore({
  reducer: {
    count: NotifiReducer,
    pointmachine_data: NotifiReducer,
    trackcircuit_data: NotifiReducer,
    signalcircuit_data: NotifiReducer,
    axlecounter_data: NotifiReducer,
    lcgate_data: NotifiReducer,
    relay_data: NotifiReducer,
    battery_data: NotifiReducer,
    ips_data: NotifiReducer,
    pointmachine_setup: NotifiReducer,
    trackcircuit_setup: NotifiReducer,
    signalcircuit_setup: NotifiReducer,
    alertmessage_setup: NotifiReducer,
    stationaccess_setup: NotifiReducer,
    relay_setup: NotifiReducer,
    battery_setup: NotifiReducer,
    ips_setup: NotifiReducer,
    yard_setup: NotifiReducer
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   <Provider  store={store}>
    <App />
   </Provider>
 
  // </React.StrictMode>
);


export default store;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



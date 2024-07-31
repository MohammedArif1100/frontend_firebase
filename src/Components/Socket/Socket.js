import { io } from "socket.io-client";
import authService from "../Authentication/authService";
import moment from "moment/moment";
import $ from "jquery";
import "jquery-confirm";
import React, { useEffect } from "react";
import axiosClient from "../Authentication/ApiCall";
import { message } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { count, pointmachine_data, trackcircuit_data, signalcircuit_data, axlecounter_data, lcgate_data, relay_data, battery_data, ips_data } from "../../features/Notification";
import store from "../../index";

function UpdateCount() {
  axiosClient
    .get("/notification/getNotificationcount")
    .then((response) => {
      if (response.data.issuccess === true) {
        store.dispatch(
          count({
            count: response.data.newMSG,
            unread: response.data.unseencount,
          })
        );

        // setcameralist(response.data.data);
      } else {
       //console.log("Something went wrong");
      }
    })
    .catch((err) => {
     //console.log("errr", err);
      if (err.status === 0) {
        message.error("Server error");
      } else {
        message.error(err.msg);
      }
    });
  // store.dispatch(count({ count: 30 }));
}

export let socket = io(process.env.REACT_APP_SOCKET_KEY, {

  // transports: ["polling"],
  // transportOptions: {
  //   polling: {
  //     extraHeaders: { authorization: authService.getCurrentUser() },
  //   },
  // },
  transports: ["websocket"],
  query: {
    authorization: authService.getCurrentUser(),
  },
  reconnectionAttempts: "Infinity",
  // auth: {
  //   token: authService.getCurrentUser(),
  // },
  // extraHeaders: {
  //       authorization: authService.getCurrentUser(),
  //     },
  upgrade: false,
  reconnection: true,
  rejectUnauthorized: true,
  // reconnectionDelay: 1000,
  // reconnectionDelayMax : 5000,
});

socket.on("connect", (...args) => {
 //console.log("connected" + socket.id);  
});

socket.on("Notification", (data)  => {
 //console.log("Notification")
  UpdateCount()
})

// Notification for point machine data
socket.on("pointmachinedata", (data) => {
//  console.log("socket_pointmachinedata",data)
  store.dispatch(
    pointmachine_data({
      data :data
    })
  );
});

// Notification for signal circuit data
socket.on("signalcircuitdata", (data) => {
 //console.log("signalcircuitdata")
  store.dispatch(
    signalcircuit_data({
      data :data
    })
  );
});

// Notification for track circuit data
socket.on("trackcircuitdata", (data) => {
 //console.log("trackcircuitdata")
  store.dispatch(
    trackcircuit_data({
      data :data
    })
  );
});

// Notification for axle counter data
socket.on("axlecounterdata", (data) => {
  //console.log("axlecounterdata")
   store.dispatch(
     axlecounter_data({
       data :data
     })
   );
 });

 // Notification for lc gate data
socket.on("lcgatedata", (data) => {
  //console.log("lcgatedata")
   store.dispatch(
    lcgate_data({
       data :data
     })
   );
 });

// Notification for relay data
socket.on("relaydata", (data) => {
   store.dispatch(
    relay_data({
       data :data
     })
   );
 });

// Notification for battery data
socket.on("batterydata", (data) => {

   store.dispatch(
    battery_data({
       data :data
     })
   );
 });

 // Notification for ips data
socket.on("ipsdata", (data) => {
   store.dispatch(
    ips_data({
       data :data
     })
   );
 });

 return <div>WebSocket Connection Example</div>;

export default socket;



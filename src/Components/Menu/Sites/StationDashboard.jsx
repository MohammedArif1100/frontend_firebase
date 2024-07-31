import React, { useState, useEffect } from "react";
import { Image, message, Col, Row } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../Authentication/ApiCall";
import Iframe from "react-iframe";

function StationDashboard() {

  const location = useLocation();;
  const queryParams = new URLSearchParams(location.search);
  var station_id = queryParams.get("stationid")
  var station_name = queryParams.get("stationname");

  document.title = "RDPMS - Station Dashboard";
  var apiKey = process.env.REACT_APP_SOCKET_KEY;

  return (

    <Iframe
      // src = {process.env.PUBLIC_URL + '/dashboard_new.html?stationid=' + localStorage.getItem("sipstationid")}
      src={process.env.PUBLIC_URL + '/dashboard_new.html?stationid=' + station_id + '&&api=' + apiKey}
      // url={"http://127.0.0.1:8080"} //http://192.168.10.209:8080
      // url={"http://192.168.10.209:8080"}
      frameBorder="0"
      seamless
      width="100%"
      height="800"
      id=""
      className=""
      allowFullScreen
    />
    // <div id="root"></div> 
  );



}/*  */

export default StationDashboard/*  */
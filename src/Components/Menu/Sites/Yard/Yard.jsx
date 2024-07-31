import { Card, ConfigProvider, Typography, Table } from "antd";
import React, { useState, useEffect } from "react";
import { Image, message, Col, Row } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../../Authentication/ApiCall";
import Iframe from "react-iframe";
import { Modal } from "antd";
import moment from "moment/moment";
import "./Yard.css";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { pointmachine_data } from "../../../../features/Notification";
import $ from "jquery";
import { io } from "socket.io-client";
import authService from "../../../Authentication/authService";
import { ImArrowRight, ImArrowLeft, ImArrowUp } from "react-icons/im";


const { Link, Title, Text } = Typography;

var pointData = []; var signalData = []; var trackData = [];
var check_pm = false; var check_pm_socket = false;
var check_track = false; var check_track_socket = false;
var check_signal = false; var check_signal_socket = false;


function Dashboard() {

  document.title = "RDPMS - Station Dashboard";
  var apiKey = process.env.REACT_APP_SOCKET_KEY;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [TrackCircuitID, setTrackCircuitID] = useState(null);
  const [SignalCircuitID, setSignalCircuitID] = useState(null);
  const [loading, setloading] = useState(false);
  const [PointMachineABData, setPointMachineABData] = useState([]);
  const [SignalCircuitData, setSignalCircuitData] = useState([]);
  const [TrackCircuitData, setTrackCircuitData] = useState([]);

  const [pointMachine_1, set_pointMachine_1] = useState('');
  const [pointMachine_2, set_pointMachine_2] = useState('');
  const [pointMachine_3, set_pointMachine_3] = useState('');

  const [trackCircuit_1, set_trackCircuit_1] = useState('');
  const [trackCircuit_2, set_trackCircuit_2] = useState('');
  const [trackCircuit_3, set_trackCircuit_3] = useState('');
  const [trackCircuit_4, set_trackCircuit_4] = useState('');
  const [trackCircuit_5, set_trackCircuit_5] = useState('');
  const [trackCircuit_6, set_trackCircuit_6] = useState('');
  const [trackCircuit_7, set_trackCircuit_7] = useState('');
  const [trackCircuit_8, set_trackCircuit_8] = useState('');
  const [trackCircuit_9, set_trackCircuit_9] = useState('');
  const [trackCircuit_10, set_trackCircuit_10] = useState('');
  const [trackCircuit_11, set_trackCircuit_11] = useState('');
  const [trackCircuit_12, set_trackCircuit_12] = useState('');
  const [trackCircuit_13, set_trackCircuit_13] = useState('');

  const [signalCircuit_1, set_signalCircuit_1] = useState('');
  const [signalCircuit_2, set_signalCircuit_2] = useState('');
  const [signalCircuit_3, set_signalCircuit_3] = useState('');
  const [signalCircuit_4, set_signalCircuit_4] = useState('');
  const [signalCircuit_5, set_signalCircuit_5] = useState('');
  const [signalCircuit_6, set_signalCircuit_6] = useState('');
  const [signalCircuit_7, set_signalCircuit_7] = useState('');
  const [signalCircuit_8, set_signalCircuit_8] = useState('');
  const [signalCircuit_8_AU, set_signalCircuit_8_AU] = useState('');
  const [signalCircuit_8_B, set_signalCircuit_8_B] = useState('');
  const [signalCircuit_9, set_signalCircuit_9] = useState('');
  const [signalCircuit_9_AU, set_signalCircuit_9_AU] = useState('');
  const [signalCircuit_9_B, set_signalCircuit_9_B] = useState('');
  const [signalCircuit_10, set_signalCircuit_10] = useState('');

  const [pointMachineTableName, set_pointMachineTableName] = useState('');
  const [signalCircuitTableName, set_signalCircuitTableName] = useState('');
  const [trackCircuitTableName, set_trackCircuitTableName] = useState('');

  function _fun_pointMachine(data) {
    var get_pointData = pointData.filter(res => res.pointmachineid == data.pointmachineid).sort(res => res.createddate).reverse()
    var point = [];
    point.push(data);
    const popdata = get_pointData[get_pointData.length - 1]
    if (popdata != null && popdata != undefined) {
      get_pointData.pop()
      point = point.concat(get_pointData);
      pointData.splice(pointData.findIndex(data => data.id == popdata.id), 1);
      pointData = pointData.concat(data)
      setPointMachineABData(pointData)

      if (data.pointmachineid == 1) {
        if (data.a_direction == "Normal") {
          $('#pm1_N').addClass('YardRectangle21G');
          $('#pm1_C').removeClass('YardRectangle22G');
          $('#pm1_R').removeClass('YardRectangle23G');
          $('#pm1_knob').removeClass('KnobWithSwitch_1');
          var newDiv = $('<div>', {
            id: 'pm1_knob',
            class: 'KnobWithSwitch_1',
            html: '<div class="knob"></div><div class="switchLeft"></div>'
          });
          $('#pm1_knob').replaceWith(newDiv)
        }
        else if (data.a_direction == "Reverse") {
          $('#pm1_N').removeClass('YardRectangle21G');
          $('#pm1_C').removeClass('YardRectangl22G');
          $('#pm1_R').addClass('YardRectangle23G');
          $('#pm1_knob').removeClass('KnobWithSwitch_1');
          var newDiv = $('<div>', {
            id: 'pm1_knob',
            class: 'KnobWithSwitch_1',
            html: '<div class="knob"></div><div class="switchRight"></div>'
          });
          $('#pm1_knob').replaceWith(newDiv)
        }
        else {
          $('#pm1_N').removeClass('YardRectangle21G');
          $('#pm1_C').addClass('YardRectangle22G');
          $('#pm1_R').removeClass('YardRectangle23G');
          $('#pm1_knob').removeClass('KnobWithSwitch_1');
          var newDiv = $('<div>', {
            id: 'pm1_knob',
            class: 'KnobWithSwitch_1',
            html: '<div class="knob"></div><div class="switchCenter"></div>'
          });
          $('#pm1_knob').replaceWith(newDiv)
        }
      }
      else if (data.pointmachineid == 2) {
        if (data.a_direction == "Normal") {
          $('#pm2_N').addClass('YardRectangle15G');
          $('#pm2_C').removeClass('YardRectangle16G');
          $('#pm2_R').removeClass('YardRectangle17G');
          $('#pm2_knob').removeClass('KnobWithSwitch_2');
          var newDiv = $('<div>', {
            id: 'pm2_knob',
            class: 'KnobWithSwitch_2',
            html: '<div class="knob"></div><div class="switchLeft"></div>'
          });
          $('#pm2_knob').replaceWith(newDiv)
        }
        else if (data.a_direction == "Reverse") {
          $('#pm2_N').removeClass('YardRectangle15G');
          $('#pm2_C').removeClass('YardRectangle16G');
          $('#pm2_R').addClass('YardRectangle17G');
          $('#pm2_knob').removeClass('KnobWithSwitch_2');
          var newDiv = $('<div>', {
            id: 'pm2_knob',
            class: 'KnobWithSwitch_2',
            html: '<div class="knob"></div><div class="switchRight"></div>'
          });
          $('#pm2_knob').replaceWith(newDiv)
        }
        else {
          $('#pm2_N').removeClass('YardRectangle15G');
          $('#pm2_C').addClass('YardRectangle16G');
          $('#pm2_R').removeClass('YardRectangle17G');
          $('#pm2_knob').removeClass('KnobWithSwitch_2');
          var newDiv = $('<div>', {
            id: 'pm2_knob',
            class: 'KnobWithSwitch_2',
            html: '<div class="knob"></div><div class="switchCenter"></div>'
          });
          $('#pm2_knob').replaceWith(newDiv)
        }
      }
      else if (data.pointmachineid == 3) {
        if (data.a_direction == "Normal") {
          $('#pm3_N').addClass('YardRectangle18G');
          $('#pm3_C').removeClass('YardRectangle19G');
          $('#pm3_R').removeClass('YardRectangle20G');
          $('#pm3_knob').removeClass('KnobWithSwitch_3');
          var newDiv = $('<div>', {
            id: 'pm3_knob',
            class: 'KnobWithSwitch_3',
            html: '<div class="knob"></div><div class="switchLeft"></div>'
          });
          $('#pm3_knob').replaceWith(newDiv)
        }
        else if (data.a_direction == "Reverse") {
          $('#pm3_N').removeClass('YardRectangle18G');
          $('#pm3_C').removeClass('YardRectangle19G');
          $('#pm3_R').addClass('YardRectangle20G');
          $('#pm3_knob').removeClass('KnobWithSwitch_3');
          var newDiv = $('<div>', {
            id: 'pm3_knob',
            class: 'KnobWithSwitch_3',
            html: '<div class="knob"></div><div class="switchRight"></div>'
          });
          $('#pm3_knob').replaceWith(newDiv)
        }
        else {
          $('#pm3_N').removeClass('YardRectangle18G');
          $('#pm3_C').addClass('YardRectangle19G');
          $('#pm3_R').removeClass('YardRectangle20G');
          $('#pm3_knob').removeClass('KnobWithSwitch_3');
          var newDiv = $('<div>', {
            id: 'pm3_knob',
            class: 'KnobWithSwitch_3',
            html: '<div class="knob"></div><div class="switchCenter"></div>'
          });
          $('#pm3_knob').replaceWith(newDiv)
        }
      }
    }
  }

  function _fun_trackData(data) {
    var get_trackData = trackData.filter(res => res.trackcircuitid == data.trackcircuitid).sort(res => res.createddate).reverse()
    var track = [];
    track.push(data);
    const popdata = get_trackData[get_trackData.length - 1]
    if (popdata != null && popdata != undefined) {
      get_trackData.pop()
      track = track.concat(get_trackData);
      trackData.splice(trackData.findIndex(data => data.id == popdata.id), 1);
      trackData = trackData.concat(data)
      setTrackCircuitData(trackData)

      if (data.trackcircuitid == 1) {
        if (data.track_OC == 'C') {
          $('#tc1').removeClass('YardLine12_R');
          $('#tc1').addClass('YardLine12');
        }
        else {
          $('#tc1').removeClass('YardLine12');
          $('#tc1').addClass('YardLine12_R');
        }
      }
      else if (data.trackcircuitid == 2) {
        if (data.track_OC == 'C') {
          $('#tc2').removeClass('YardLine11_R');
          $('#tc2').addClass('YardLine11');
        }
        else {
          $('#tc2').removeClass('YardLine11');
          $('#tc2').addClass('YardLine11_R');
        }
      }
      else if (data.trackcircuitid == 3) {
        if (data.track_OC == 'C') {
          $('#tc3').removeClass('YardLine9_R');
          $('#tc3').addClass('YardLine9');
        }
        else {
          $('#tc3').removeClass('YardLine9');
          $('#tc3').addClass('YardLine9_R');
        }
      }
      else if (data.trackcircuitid == 4) {
        if (data.track_OC == 'C') {
          $('#tc4').removeClass('YardLine8_R');
          $('#tc4').addClass('YardLine8');
        }
        else {
          $('#tc4').removeClass('YardLine8');
          $('#tc4').addClass('YardLine8_R');
        }
      }
      else if (data.trackcircuitid == 5) {
        if (data.track_OC == 'C') {
          $('#tc5').removeClass('YardLine6_R');
          $('#tc5').addClass('YardLine6');
        }
        else {
          $('#tc5').removeClass('YardLine6');
          $('#tc5').addClass('YardLine6_R');
        }
      }
      else if (data.trackcircuitid == 6) {
        if (data.track_OC == 'C') {
          $('#tc6').removeClass('YardLine7_R');
          $('#tc6').addClass('YardLine7');
        }
        else {
          $('#tc6').removeClass('YardLine7');
          $('#tc6').addClass('YardLine7_R');
        }
      }
      else if (data.trackcircuitid == 7) {
        if (data.track_OC == 'C') {
          $('#tc7').removeClass('YardLine4_R');
          $('#tc7').addClass('YardLine4');
        }
        else {
          $('#tc7').removeClass('YardLine4');
          $('#tc7').addClass('YardLine4_R');
        }
      }
      else if (data.trackcircuitid == 8) {
        if (data.track_OC == 'C') {
          $('#tc8').removeClass('YardLine1_R');
          $('#tc8').addClass('YardLine1');
        }
        else {
          $('#tc8').removeClass('YardLine1');
          $('#tc8').addClass('YardLine1_R');
        }
      }
      else if (data.trackcircuitid == 9) {
        if (data.track_OC == 'C') {
          $('#tc9').removeClass('YardLine2_R');
          $('#tc9').addClass('YardLine2');
        }
        else {
          $('#tc9').removeClass('YardLine2');
          $('#tc9').addClass('YardLine2_R');
        }
      }
      else if (data.trackcircuitid == 10) {
        if (data.track_OC == 'C') {
          $('#tc10').removeClass('YardLine5_R');
          $('#tc10').addClass('YardLine5');
        }
        else {
          $('#tc10').removeClass('YardLine5');
          $('#tc10').addClass('YardLine5_R');
        }
      }
      else if (data.trackcircuitid == 11) {
        if (data.track_OC == 'C') {
          $('#tc11').removeClass('YardLine14_R');
          $('#tc11').addClass('YardLine14');
        }
        else {
          $('#tc11').removeClass('YardLine14');
          $('#tc11').addClass('YardLine14_R');
        }
      }
      else if (data.trackcircuitid == 12) {
        if (data.track_OC == 'C') {
          $('#tc12').removeClass('YardLine15_R');
          $('#tc12').addClass('YardLine15');
        }
        else {
          $('#tc12').removeClass('YardLine15');
          $('#tc12').addClass('YardLine15_R');
        }
      }
      else if (data.trackcircuitid == 13) {
        if (data.track_OC == 'C') {
          $('#tc13').removeClass('YardLine16_R');
          $('#tc13').addClass('YardLine16');
        }
        else {
          $('#tc13').removeClass('YardLine16');
          $('#tc13').addClass('YardLine16_R');
        }
      }
    }
  }

  function _fun_signalData(data) {    
    var get_signalData = signalData.filter(res => res.signalcircuitid == data.signalcircuitid).sort(res => res.createddate).reverse()
    var signal = [];
    signal.push(data);
    const popdata = get_signalData[get_signalData.length - 1]
    if (popdata != null && popdata != undefined) {
      get_signalData.pop()
      signal = signal.concat(get_signalData);
      signalData.splice(signalData.findIndex(data => data.id == popdata.id), 1);
      signalData = signalData.concat(data);
      setSignalCircuitData(signalData)
      if (data.signalcircuitid == 1) {
        if (data.gui == 1) {
          $('#_col_red_1').addClass('YardRectangle60_R');
          $('#_col_yellow_1').removeClass('YardRectangle61_Y');
          $('#_col_green_1').removeClass('YardRectangle62_G');
        }
        else if (data.gui == 2) {
          $('#_col_red_1').removeClass('YardRectangle60_R');
          $('#_col_yellow_1').removeClass('YardRectangle61_Y');
          $('#_col_green_1').addClass('YardRectangle62_G');
        }
        else if (data.gui == 3) {
          $('#_col_red_1').removeClass('YardRectangle60_R');
          $('#_col_yellow_1').addClass('YardRectangle61_Y');
          $('#_col_green_1').removeClass('YardRectangle62_G');
        }
        else if (data.gui == 5) {
          $('#_col_red_1').addClass('YardRectangle60_R');
          $('#_col_yellow_1').removeClass('YardRectangle61_Y');
          $('#_col_green_1').addClass('YardRectangle62_G');
        }
        else if (data.gui == 6) {
          $('#_col_red_1').addClass('YardRectangle60_R');
          $('#_col_yellow_1').addClass('YardRectangle61_Y');
          $('#_col_green_1').removeClass('YardRectangle62_G');
        }
        else if (data.gui == 8) {
          $('#_col_red_1').removeClass('YardRectangle60_R');
          $('#_col_yellow_1').addClass('YardRectangle61_Y');
          $('#_col_green_1').addClass('YardRectangle62_G');
        }
        else if (data.gui == 11) {
          $('#_col_red_1').addClass('YardRectangle60_R');
          $('#_col_yellow_1').addClass('YardRectangle61_Y');
          $('#_col_green_1').addClass('YardRectangle62_G');
        }
        else if (data.gui == 12) {
          $('#_col_red_1').removeClass('YardRectangle60_R');
          $('#_col_yellow_1').removeClass('YardRectangle61_Y');
          $('#_col_green_1').removeClass('YardRectangle62_G');
        }
        else {
          $('#_col_red_1').removeClass('YardRectangle60_R');
          $('#_col_yellow_1').removeClass('YardRectangle61_Y');
          $('#_col_green_1').removeClass('YardRectangle62_G');
        }
      }
      else if (data.signalcircuitid == 2) {
        if (data.gui == 1) {
          $('#_col_red_2').addClass('YardRectangle64_R');
          $('#_col_yellow_2').removeClass('YardRectangle65_Y');
        }
        else if (data.gui == 3) {
          $('#_col_red_2').removeClass('YardRectangle64_R');
          $('#_col_yellow_2').addClass('YardRectangle65_Y');
        }
        else if (data.gui == 6) {
          $('#_col_red_2').addClass('YardRectangle64_R');
          $('#_col_yellow_2').addClass('YardRectangle65_Y');
        }
        else if (data.gui == 12) {
          $('#_col_red_2').removeClass('YardRectangle64_R');
          $('#_col_yellow_2').removeClass('YardRectangle65_Y');
        }
        else {
          $('#_col_red_2').removeClass('YardRectangle64_R');
          $('#_col_yellow_2').removeClass('YardRectangle65_Y');
        }
      }
      else if (data.signalcircuitid == 3) {
        if (data.gui == 1) {
          $('#_col_red_3').addClass('YardRectangle50_R');
          $('#_col_yellow_3').removeClass('YardRectangle49_Y');
          $('#_col_green_3').removeClass('YardRectangle48_G');
        }
        else if (data.gui == 2) {
          $('#_col_red_3').removeClass('YardRectangle50_R');
          $('#_col_yellow_3').removeClass('YardRectangle49_Y');
          $('#_col_green_3').addClass('YardRectangle48_G');
        }
        else if (data.gui == 3) {
          $('#_col_red_3').removeClass('YardRectangle50_R');
          $('#_col_yellow_3').addClass('YardRectangle49_Y');
          $('#_col_green_3').removeClass('YardRectangle48_G');
        }
        else if (data.gui == 5) {
          $('#_col_red_3').addClass('YardRectangle50_R');
          $('#_col_yellow_3').removeClass('YardRectangle49_Y');
          $('#_col_green_3').addClass('YardRectangle48_G');
        }
        else if (data.gui == 6) {
          $('#_col_red_3').addClass('YardRectangle50_R');
          $('#_col_yellow_3').addClass('YardRectangle49_Y');
          $('#_col_green_3').removeClass('YardRectangle48_G');
        }
        else if (data.gui == 8) {
          $('#_col_red_3').removeClass('YardRectangle50_R');
          $('#_col_yellow_3').addClass('YardRectangle49_Y');
          $('#_col_green_3').addClass('YardRectangle48_G');
        }
        else if (data.gui == 11) {
          $('#_col_red_3').addClass('YardRectangle50_R');
          $('#_col_yellow_3').addClass('YardRectangle49_Y');
          $('#_col_green_3').addClass('YardRectangle48_G');
        }
        else if (data.gui == 12) {
          $('#_col_red_3').removeClass('YardRectangle50_R');
          $('#_col_yellow_3').removeClass('YardRectangle49_Y');
          $('#_col_green_3').removeClass('YardRectangle48_G');
        }
        else {
          $('#_col_red_3').removeClass('YardRectangle50_R');
          $('#_col_yellow_3').removeClass('YardRectangle49_Y');
          $('#_col_green_3').removeClass('YardRectangle48_G');
        }
      }
      else if (data.signalcircuitid == 4) {
        if (data.gui == 1) {
          $('#_col_red_4').addClass('YardRectangle46_R');
          $('#_col_yellow_4').removeClass('YardRectangle45_Y');
        }
        else if (data.gui == 3) {
          $('#_col_red_4').removeClass('YardRectangle46_R');
          $('#_col_yellow_4').addClass('YardRectangle45_Y');
        }
        else if (data.gui == 6) {
          $('#_col_red_4').addClass('YardRectangle46_R');
          $('#_col_yellow_4').addClass('YardRectangle45_Y');
        }
        else if (data.gui == 12) {
          $('#_col_red_4').removeClass('YardRectangle46_R');
          $('#_col_yellow_4').removeClass('YardRectangle45_Y');
        }
        else {
          $('#_col_red_4').removeClass('YardRectangle46_R');
          $('#_col_yellow_4').removeClass('YardRectangle45_Y');
        }
      }
      else if (data.signalcircuitid == 5) {
        if (data.gui == 1) {
          $('#_col_red_5').addClass('YardRectangle43_R');
          $('#_col_green_5').removeClass('YardRectangle41_G');
        }
        else if (data.gui == 2) {
          $('#_col_red_5').removeClass('YardRectangle43_R');
          $('#_col_green_5').addClass('YardRectangle41_G');
        }
        else if (data.gui == 5) {
          $('#_col_red_5').addClass('YardRectangle43_R');
          $('#_col_green_5').addClass('YardRectangle41_G');
        }
        else if (data.gui == 12) {
          $('#_col_red_5').removeClass('YardRectangle43_R');
          $('#_col_green_5').removeClass('YardRectangle41_G');
        }
        else {
          $('#_col_red_5').removeClass('YardRectangle43_R');
          $('#_col_green_5').removeClass('YardRectangle41_G');
        }
      }
      else if (data.signalcircuitid == 6) {
        if (data.gui == 1) {
          $('#_col_red_6').addClass('YardRectangle67_R');
          $('#_col_green_6').removeClass('YardRectangle68_G');
        }
        else if (data.gui == 2) {
          $('#_col_red_6').removeClass('YardRectangle67_R');
          $('#_col_green_6').addClass('YardRectangle68_G');
        }
        else if (data.gui == 5) {
          $('#_col_red_6').addClass('YardRectangle67_R');
          $('#_col_green_6').addClass('YardRectangle68_G');
        }
        else if (data.gui == 12) {
          $('#_col_red_6').removeClass('YardRectangle67_R');
          $('#_col_green_6').removeClass('YardRectangle68_G');
        }
        else {
          $('#_col_red_6').removeClass('YardRectangle67_R');
          $('#_col_green_6').removeClass('YardRectangle68_G');
        }
      }
      else if (data.signalcircuitid == 7) {
        if (data.gui == 2) {
          $('#_col_yellow_7').removeClass('YardRectangle37_Y');
          $('#_col_green_7').addClass('YardRectangle38_G');
          $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
        }
        else if (data.gui == 3) {
          $('#_col_yellow_7').addClass('YardRectangle37_Y');
          $('#_col_green_7').removeClass('YardRectangle38_G');
          $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
        }
        else if (data.gui == 4) {
          $('#_col_yellow_7').removeClass('YardRectangle37_Y');
          $('#_col_green_7').removeClass('YardRectangle38_G');
          $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
        }
        else if (data.gui == 8) {
          $('#_col_yellow_7').addClass('YardRectangle37_Y');
          $('#_col_green_7').addClass('YardRectangle38_G');
          $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
        }
        else if (data.gui == 9) {
          $('#_col_yellow_7').removeClass('YardRectangle37_Y');
          $('#_col_green_7').addClass('YardRectangle38_G');
          $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
        }
        else if (data.gui == 10) {
          $('#_col_yellow_7').addClass('YardRectangle37_Y');
          $('#_col_green_7').removeClass('YardRectangle38_G');
          $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
        }
        else if (data.gui == 11) {
          $('#_col_yellow_7').addClass('YardRectangle37_Y');
          $('#_col_green_7').addClass('YardRectangle38_G');
          $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
        }
        else if (data.gui == 12) {
          $('#_col_yellow_7').removeClass('YardRectangle37_Y');
          $('#_col_green_7').removeClass('YardRectangle38_G');
          $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
        }
        else {
          $('#_col_yellow_7').removeClass('YardRectangle37_Y');
          $('#_col_green_7').removeClass('YardRectangle38_G');
          $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
        }
      }
      else if (data.signalcircuitid == 8) {
        if (data.gui == 1) {
          $('#_col_red_8').addClass('YardRectangle32_R');
          $('#_col_yellow_8').removeClass('YardRectangle33_Y');
          $('#_col_green_8').removeClass('YardRectangle34_G');  
        }
        else if (data.gui == 2) {
          $('#_col_red_8').removeClass('YardRectangle32_R');
          $('#_col_yellow_8').removeClass('YardRectangle33_Y');
          $('#_col_green_8').addClass('YardRectangle34_G');
        }
        else if (data.gui == 3) {
          $('#_col_red_8').removeClass('YardRectangle32_R');
          $('#_col_yellow_8').addClass('YardRectangle33_Y');
          $('#_col_green_8').removeClass('YardRectangle34_G');
        }
        else if (data.gui == 5) {
          $('#_col_red_8').addClass('YardRectangle32_R');
          $('#_col_yellow_8').removeClass('YardRectangle33_Y');
          $('#_col_green_8').addClass('YardRectangle34_G');
        }
        else if (data.gui == 6) {
          $('#_col_red_8').addClass('YardRectangle32_R');
          $('#_col_yellow_8').addClass('YardRectangle33_Y');
          $('#_col_green_8').removeClass('YardRectangle34_G');
        }
        else if (data.gui == 8) {
          $('#_col_red_8').removeClass('YardRectangle32_R');
          $('#_col_yellow_8').addClass('YardRectangle33_Y');
          $('#_col_green_8').addClass('YardRectangle34_G');
        }
        else if (data.gui == 9) {
          $('#_col_red_8').removeClass('YardRectangle32_R');
          $('#_col_yellow_8').removeClass('YardRectangle33_Y');
          $('#_col_green_8').addClass('YardRectangle34_G');
        }
        else if (data.gui == 11) {
          $('#_col_red_8').addClass('YardRectangle32_R');
          $('#_col_yellow_8').addClass('YardRectangle33_Y');
          $('#_col_green_8').addClass('YardRectangle34_G');
        }
        else if (data.gui == 12) {
          $('#_col_red_8').removeClass('YardRectangle32_R');
          $('#_col_yellow_8').removeClass('YardRectangle33_Y');
          $('#_col_green_8').removeClass('YardRectangle34_G');
        }
        else {
          $('#_col_red_8').removeClass('YardRectangle32_R');
          $('#_col_yellow_8').removeClass('YardRectangle33_Y');
          $('#_col_green_8').removeClass('YardRectangle34_G');
          $('#_col_lightyellow_8').removeClass('YardRectangle35_LY');
        }

        parseFloat(data.lightyellowvoltage) >= parseFloat(100) && parseFloat(data.lightyellowvoltage) <= parseFloat(150) && parseFloat(data.lightyellowcurrent) >= parseFloat(0.105) && parseFloat(data.lightyellowcurrent) <= parseFloat(0.6)
        ? $('#_col_lightyellow_8').addClass('YardRectangle35_LY')
        : parseFloat(data.lightyellowvoltage) >= parseFloat(100) && parseFloat(data.lightyellowvoltage) <= parseFloat(150)
          ? parseFloat(data.lightyellowcurrent) < parseFloat(0.105)
            ? $('#_col_lightyellow_8').addClass('YardRectangle35_LY')
            : parseFloat(data.lightyellowcurrent > parseFloat(0.6))
              ? $('#_col_lightyellow_8').addClass('YardRectangle35_LY')
              : $('#_col_lightyellow_8').removeClass('YardRectangle35_LY') : $('#_col_lightyellow_8').removeClass('YardRectangle35_LY')      

        if (parseFloat(data.whitevoltage) >= parseFloat(100) && parseFloat(data.whitevoltage) <= parseFloat(150) && parseFloat(data.whitecurrent) >= parseFloat(0.105) && parseFloat(data.whitecurrent) <= parseFloat(0.6)) {
          $('#_col_white_8_1').addClass('YardRectangle78_W');
          $('#_col_white_8_2').addClass('YardRectangle79_W');
          $('#_col_white_8_3').addClass('YardRectangle80_W');
          $('#_col_white_8_4').addClass('YardRectangle80_1_W');
          $('#_col_white_8_5').addClass('YardRectangle80_2_W');
        }
        else if (parseFloat(data.whitevoltage) >= parseFloat(100) && parseFloat(data.whitevoltage) <= parseFloat(150)) {
          if (parseFloat(data.whitecurrent) < parseFloat(0.105)) {
            $('#_col_white_8_1').addClass('YardRectangle78_W');
            $('#_col_white_8_2').addClass('YardRectangle79_W');
            $('#_col_white_8_3').addClass('YardRectangle80_W');
            $('#_col_white_8_4').addClass('YardRectangle80_1_W');
            $('#_col_white_8_5').addClass('YardRectangle80_2_W');
          }
          else if (parseFloat(data.whitecurrent > parseFloat(0.6))) {
            $('#_col_white_8_1').addClass('YardRectangle78_W');
            $('#_col_white_8_2').addClass('YardRectangle79_W');
            $('#_col_white_8_3').addClass('YardRectangle80_W');
            $('#_col_white_8_4').addClass('YardRectangle80_1_W');
            $('#_col_white_8_5').addClass('YardRectangle80_2_W');
          }
          else {
            $('#_col_white_8_1').removeClass('YardRectangle78_W');
            $('#_col_white_8_2').removeClass('YardRectangle79_W');
            $('#_col_white_8_3').removeClass('YardRectangle80_W');
            $('#_col_white_8_4').removeClass('YardRectangle80_1_W');
            $('#_col_white_8_5').removeClass('YardRectangle80_2_W');
          }
        }
        else {
          $('#_col_white_8_1').removeClass('YardRectangle78_W');
          $('#_col_white_8_2').removeClass('YardRectangle79_W');
          $('#_col_white_8_3').removeClass('YardRectangle80_W');
          $('#_col_white_8_4').removeClass('YardRectangle80_1_W');
          $('#_col_white_8_5').removeClass('YardRectangle80_2_W');
        }      
      }
      else if (data.signalcircuitid == 9) {
        if (data.gui == 1) {
          $('#_col_red_9').addClass('YardRectangle54_R');
          $('#_col_yellow_9').removeClass('YardRectangle53_Y');
          $('#_col_green_9').removeClass('YardRectangle52_G');
        }
        else if (data.gui == 2) {
          $('#_col_red_9').removeClass('YardRectangle54_R');
          $('#_col_yellow_9').removeClass('YardRectangle53_Y');
          $('#_col_green_9').addClass('YardRectangle52_G')
        }
        else if (data.gui == 3) {
          $('#_col_red_9').removeClass('YardRectangle54_R');
          $('#_col_yellow_9').addClass('YardRectangle53_Y');
          $('#_col_green_9').removeClass('YardRectangle52_G');
        }
        else if (data.gui == 5) {
          $('#_col_red_9').addClass('YardRectangle54_R');
          $('#_col_yellow_9').removeClass('YardRectangle53_Y');
          $('#_col_green_9').addClass('YardRectangle52_G');
        }
        else if (data.gui == 6) {
          $('#_col_red_9').addClass('YardRectangle54_R');
          $('#_col_yellow_9').addClass('YardRectangle53_Y');
          $('#_col_green_9').removeClass('YardRectangle52_G');
        }
        else if (data.gui == 8) {
          $('#_col_red_9').removeClass('YardRectangle54_R');
          $('#_col_yellow_9').addClass('YardRectangle53_Y');
          $('#_col_green_9').addClass('YardRectangle52_G');
        }
        else if (data.gui == 9) {
          $('#_col_red_9').removeClass('YardRectangle54_R');
          $('#_col_yellow_9').removeClass('YardRectangle53_Y');
          $('#_col_green_9').addClass('YardRectangle52_G');
        }
        else if (data.gui == 11) {
          $('#_col_red_9').addClass('YardRectangle54_R');
          $('#_col_yellow_9').addClass('YardRectangle53_Y');
          $('#_col_green_9').addClass('YardRectangle52_G');
        }
        else if (data.gui == 12) {
          $('#_col_red_9').removeClass('YardRectangle54_R');
          $('#_col_yellow_9').removeClass('YardRectangle53_Y');
          $('#_col_green_9').removeClass('YardRectangle52_G');
        }
        else {
          $('#_col_red_9').removeClass('YardRectangle54_R');
          $('#_col_yellow_9').removeClass('YardRectangle53_Y');
          $('#_col_green_9').removeClass('YardRectangle52_G');
        }      
        
        parseFloat(data.lightyellowvoltage) >= parseFloat(100) && parseFloat(data.lightyellowvoltage) <= parseFloat(150) && parseFloat(data.lightyellowcurrent) >= parseFloat(0.105) && parseFloat(data.lightyellowcurrent) <= parseFloat(0.6)
          ? $('#_col_lightyellow_9').addClass('YardRectangle94_LY')
          : parseFloat(data.lightyellowvoltage) >= parseFloat(100) && parseFloat(data.lightyellowvoltage) <= parseFloat(150)
            ? parseFloat(data.lightyellowcurrent) < parseFloat(0.105)
              ? $('#_col_lightyellow_9').addClass('YardRectangle94_LY')
              : parseFloat(data.lightyellowcurrent > parseFloat(0.6))
                ? $('#_col_lightyellow_9').addClass('YardRectangle94_LY')
                : $('#_col_lightyellow_9').removeClass('YardRectangle94_LY') : $('#_col_lightyellow_9').removeClass('YardRectangle94_LY')

        if (parseFloat(data.whitevoltage) >= parseFloat(100) && parseFloat(data.whitevoltage) <= parseFloat(150) && parseFloat(data.whitecurrent) >= parseFloat(0.105) && parseFloat(data.whitecurrent) <= parseFloat(0.6)) {
          $('#_col_white_9_1').addClass('YardRectangle74_W');
          $('#_col_white_9_2').addClass('YardRectangle75_W');
          $('#_col_white_9_3').addClass('YardRectangle76_W');
          $('#_col_white_9_4').addClass('YardRectangle76_1_W');
          $('#_col_white_9_5').addClass('YardRectangle76_2_W');
        }
        else if (parseFloat(data.whitevoltage) >= parseFloat(100) && parseFloat(data.whitevoltage) <= parseFloat(150)) {
          if (parseFloat(data.whitecurrent) < parseFloat(0.105)) {
            $('#_col_white_9_1').addClass('YardRectangle74_W');
            $('#_col_white_9_2').addClass('YardRectangle75_W');
            $('#_col_white_9_3').addClass('YardRectangle76_W');
            $('#_col_white_9_4').addClass('YardRectangle76_1_W');
            $('#_col_white_9_5').addClass('YardRectangle76_2_W');
          }
          else if (parseFloat(data.whitecurrent > parseFloat(0.6))) {
            $('#_col_white_9_1').addClass('YardRectangle74_W');
            $('#_col_white_9_2').addClass('YardRectangle75_W');
            $('#_col_white_9_3').addClass('YardRectangle76_W');
            $('#_col_white_9_4').addClass('YardRectangle76_1_W');
            $('#_col_white_9_5').addClass('YardRectangle76_2_W');
          }
          else {
            $('#_col_white_9_1').removeClass('YardRectangle74_W');
            $('#_col_white_9_2').removeClass('YardRectangle75_W');
            $('#_col_white_9_3').removeClass('YardRectangle76_W');
            $('#_col_white_9_4').removeClass('YardRectangle76_1_W');
            $('#_col_white_9_5').removeClass('YardRectangle76_2_W');
          }
        }
        else {
          $('#_col_white_9_1').removeClass('YardRectangle74_W');
          $('#_col_white_9_2').removeClass('YardRectangle75_W');
          $('#_col_white_9_3').removeClass('YardRectangle76_W');
          $('#_col_white_9_4').removeClass('YardRectangle76_1_W');
          $('#_col_white_9_5').removeClass('YardRectangle76_2_W');
        }
      }
      else if (data.signalcircuitid == 10) {
        if (data.gui == 2) {
          $('#_col_yellow_10').removeClass('YardRectangle58_Y');
          $('#_col_green_10').addClass('YardRectangle57_G');
          $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
        }
        else if (data.gui == 3) {
          $('#_col_yellow_10').addClass('YardRectangle58_Y');
          $('#_col_green_10').removeClass('YardRectangle57_G');
          $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
        }
        else if (data.gui == 4) {
          $('#_col_yellow_10').removeClass('YardRectangle58_Y');
          $('#_col_green_10').removeClass('YardRectangle57_G');
          $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
        }
        else if (data.gui == 8) {
          $('#_col_yellow_10').addClass('YardRectangle58_Y');
          $('#_col_green_10').addClass('YardRectangle57_G');
          $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
        }
        else if (data.gui == 9) {
          $('#_col_yellow_10').removeClass('YardRectangle58_Y');
          $('#_col_green_10').addClass('YardRectangle57_G');
          $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
        }
        else if (data.gui == 10) {
          $('#_col_yellow_10').addClass('YardRectangle58_Y');
          $('#_col_green_10').removeClass('YardRectangle57_G');
          $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
        }
        else if (data.gui == 11) {
          $('#_col_yellow_10').addClass('YardRectangle58_Y');
          $('#_col_green_10').addClass('YardRectangle57_G');
          $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
        }
        else if (data.gui == 12) {
          $('#_col_yellow_10').removeClass('YardRectangle58_Y');
          $('#_col_green_10').removeClass('YardRectangle57_G');
          $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
        }
        else {
          $('#_col_yellow_10').removeClass('YardRectangle58_Y');
          $('#_col_green_10').removeClass('YardRectangle57_G');
          $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
        }
      }
    }  
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var station_id = queryParams.get("stationid")
  var station_name = queryParams.get("stationname");

  useEffect(() => {
    getStationDashboard();

    var socket = io(apiKey)

    socket.on('pointmachinedata', async data => {
      _fun_pointMachine(data.data_logs);
      //console.log("pointsocketdata", data.data_logs);
    });

    socket.on('trackcircuitdata', async data => {
      _fun_trackData(data.data_logs)
      //console.log("tracksocketdata", data.data_logs);
    });
    socket.on('signalcircuitdata', async data => {
      _fun_signalData(data.data_logs)
      //console.log("signalsocketdata", data.data_logs);
    });

  }, []);


  function getStationDashboard() {
    axiosClient.get('/railwaystation/getstationdashboard?stationid=' + station_id)
      .then((response) => {
        if (response.data.issuccess === true) {

          // Over all final data //
          var finalData = response.data.data;

          // Registered pointmachines //

          var names = finalData[0].pointmachines.length > 0 ? set_pointMachine_1(finalData[0].pointmachines[0].pointmachinename) : ""
          names = finalData[0].pointmachines.length > 1 ? set_pointMachine_2(finalData[0].pointmachines[1].pointmachinename) : ""
          names = finalData[0].pointmachines.length > 2 ? set_pointMachine_3(finalData[0].pointmachines[2].pointmachinename) : ""

          if (finalData[0].pointmachinedata.length > 0) {
            const result = Object.values(finalData[0].pointmachinedata.sort((a, b) => a.id - b.id).reduce((acc, cur) => {
              acc[cur.pointmachineid] = cur;
              return acc;
            }, {}))

            if (result.length > 0) {
              pointData = finalData[0].pointmachinedata                
              setPointMachineABData(pointData)
              if (result[0].pointmachineid == 1) {
                if (result[0].a_direction == "Normal") {
                  $('#pm1_N').addClass('YardRectangle21G');
                  $('#pm1_C').removeClass('YardRectangle22G');
                  $('#pm1_R').removeClass('YardRectangle23G');
                  $('#pm1_knob').removeClass('KnobWithSwitch_1');
                  var newDiv = $('<div>', {
                    id: 'pm1_knob',
                    class: 'KnobWithSwitch_1',
                    html: '<div class="knob"></div><div class="switchLeft"></div>'
                  });
                  $('#pm1_knob').replaceWith(newDiv)
                }
                else if (result[0].a_direction == "Reverse") {
                  $('#pm1_N').removeClass('YardRectangle21G');
                  $('#pm1_C').removeClass('YardRectangl22G');
                  $('#pm1_R').addClass('YardRectangle23G');
                  $('#pm1_knob').removeClass('KnobWithSwitch_1');
                  var newDiv = $('<div>', {
                    id: 'pm1_knob',
                    class: 'KnobWithSwitch_1',
                    html: '<div class="knob"></div><div class="switchRight"></div>'
                  });
                  $('#pm1_knob').replaceWith(newDiv)
                }
                else {
                  $('#pm1_N').removeClass('YardRectangle21G');
                  $('#pm1_C').addClass('YardRectangle22G');
                  $('#pm1_R').removeClass('YardRectangle23G');
                  $('#pm1_knob').removeClass('KnobWithSwitch_1');
                  var newDiv = $('<div>', {
                    id: 'pm1_knob',
                    class: 'KnobWithSwitch_1',
                    html: '<div class="knob"></div><div class="switchCenter"></div>'
                  });
                  $('#pm1_knob').replaceWith(newDiv)
                }
              }
            }

            if (result.length > 1) {
              if (result[1].pointmachineid == 2) {
                if (result[1].a_direction == "Normal") {
                  $('#pm2_N').addClass('YardRectangle15G');
                  $('#pm2_C').removeClass('YardRectangle16G');
                  $('#pm2_R').removeClass('YardRectangle17G');
                  $('#pm2_knob').removeClass('KnobWithSwitch_2');
                  var newDiv = $('<div>', {
                    id: 'pm2_knob',
                    class: 'KnobWithSwitch_2',
                    html: '<div class="knob"></div><div class="switchLeft"></div>'
                  });
                  $('#pm2_knob').replaceWith(newDiv)
                }
                else if (result[1].a_direction == "Reverse") {
                  $('#pm2_N').removeClass('YardRectangle15G');
                  $('#pm2_C').removeClass('YardRectangle16G');
                  $('#pm2_R').addClass('YardRectangle17G');
                  $('#pm2_knob').removeClass('KnobWithSwitch_2');
                  var newDiv = $('<div>', {
                    id: 'pm2_knob',
                    class: 'KnobWithSwitch_2',
                    html: '<div class="knob"></div><div class="switchRight"></div>'
                  });
                  $('#pm2_knob').replaceWith(newDiv)
                }
                else {
                  $('#pm2_N').removeClass('YardRectangle15G');
                  $('#pm2_C').addClass('YardRectangle16G');
                  $('#pm2_R').removeClass('YardRectangle17G');
                  $('#pm2_knob').removeClass('KnobWithSwitch_2');
                  var newDiv = $('<div>', {
                    id: 'pm2_knob',
                    class: 'KnobWithSwitch_2',
                    html: '<div class="knob"></div><div class="switchCenter"></div>'
                  });
                  $('#pm2_knob').replaceWith(newDiv)
                }
              }
            }

            if (result.length > 2) {
              if (result[2].pointmachineid == 3) {
                if (result[2].a_direction == "Normal") {
                  $('#pm3_N').addClass('YardRectangle18G');
                  $('#pm3_C').removeClass('YardRectangle19G');
                  $('#pm3_R').removeClass('YardRectangle20G');
                  $('#pm3_knob').removeClass('KnobWithSwitch_3');
                  var newDiv = $('<div>', {
                    id: 'pm3_knob',
                    class: 'KnobWithSwitch_3',
                    html: '<div class="knob"></div><div class="switchLeft"></div>'
                  });
                  $('#pm3_knob').replaceWith(newDiv)
                }
                else if (result[2].a_direction == "Reverse") {
                  $('#pm3_N').removeClass('YardRectangle18G');
                  $('#pm3_C').removeClass('YardRectangle19G');
                  $('#pm3_R').addClass('YardRectangle20G');
                  $('#pm3_knob').removeClass('KnobWithSwitch_3');
                  var newDiv = $('<div>', {
                    id: 'pm3_knob',
                    class: 'KnobWithSwitch_3',
                    html: '<div class="knob"></div><div class="switchRight"></div>'
                  });
                  $('#pm3_knob').replaceWith(newDiv)
                }
                else {
                  $('#pm3_N').removeClass('YardRectangle18G');
                  $('#pm3_C').addClass('YardRectangle19G');
                  $('#pm3_R').removeClass('YardRectangle20G');
                  $('#pm3_knob').removeClass('KnobWithSwitch_3');
                  var newDiv = $('<div>', {
                    id: 'pm3_knob',
                    class: 'KnobWithSwitch_3',
                    html: '<div class="knob"></div><div class="switchCenter"></div>'
                  });
                  $('#pm3_knob').replaceWith(newDiv)
                }
              }
            }
          }
          else {
            $('#pm1_N').removeClass('YardRectangle21G');
            $('#pm1_C').removeClass('YardRectangle22G');
            $('#pm1_R').removeClass('YardRectangle23G');

            $('#pm2_N').removeClass('YardRectangle15G');
            $('#pm2_C').removeClass('YardRectangle16G');
            $('#pm2_R').removeClass('YardRectangle17G');

            $('#pm3_N').removeClass('YardRectangle18G');
            $('#pm3_C').removeClass('YardRectangle19G');
            $('#pm3_R').removeClass('YardRectangle20G');

            $('#pm1_knob').removeClass('KnobWithSwitch_1');
            $('#pm2_knob').removeClass('KnobWithSwitch_2');
            $('#pm3_knob').removeClass('KnobWithSwitch_3');
          }

          // Registered tracks //
          names = finalData[0].trackcircuits.length > 0 ? set_trackCircuit_1(finalData[0].trackcircuits[0].trackname) : ""
          names = finalData[0].trackcircuits.length > 1 ? set_trackCircuit_2(finalData[0].trackcircuits[1].trackname) : ""
          names = finalData[0].trackcircuits.length > 2 ? set_trackCircuit_3(finalData[0].trackcircuits[2].trackname) : ""
          names = finalData[0].trackcircuits.length > 3 ? set_trackCircuit_4(finalData[0].trackcircuits[3].trackname) : ""
          names = finalData[0].trackcircuits.length > 4 ? set_trackCircuit_5(finalData[0].trackcircuits[4].trackname) : ""
          names = finalData[0].trackcircuits.length > 6 ? set_trackCircuit_6(finalData[0].trackcircuits[5].trackname) : ""
          names = finalData[0].trackcircuits.length > 7 ? set_trackCircuit_7(finalData[0].trackcircuits[6].trackname) : ""
          names = finalData[0].trackcircuits.length > 8 ? set_trackCircuit_8(finalData[0].trackcircuits[7].trackname) : ""
          names = finalData[0].trackcircuits.length > 9 ? set_trackCircuit_9(finalData[0].trackcircuits[8].trackname) : ""
          names = finalData[0].trackcircuits.length > 9 ? set_trackCircuit_10(finalData[0].trackcircuits[9].trackname) : ""
          names = finalData[0].trackcircuits.length > 10 ? set_trackCircuit_11(finalData[0].trackcircuits[10].trackname) : ""
          names = finalData[0].trackcircuits.length > 11 ? set_trackCircuit_12(finalData[0].trackcircuits[11].trackname) : ""
          names = finalData[0].trackcircuits.length > 12 ? set_trackCircuit_13(finalData[0].trackcircuits[12].trackname) : ""

          if (finalData[0].trackcircuitdata.length > 0) {
            const result = Object.values(finalData[0].trackcircuitdata.sort((a, b) => a.id - b.id).reduce((acc, cur) => {
              acc[cur.trackcircuitid] = cur;
              return acc;
            }, {}))

            if (result.length > 0) {
              trackData = finalData[0].trackcircuitdata;
              setTrackCircuitData(trackData)
              if (result[0].trackcircuitid == 1) {
                if (result[0].track_OC == 'C') {
                  $('#tc1').removeClass('YardLine12_R');
                  $('#tc1').addClass('YardLine12');
                }
                else {
                  $('#tc1').removeClass('YardLine12');
                  $('#tc1').addClass('YardLine12_R');
                }
              }
            }

            if (result.length > 1) {
              if (result[1].trackcircuitid == 2) {
                if (result[1].track_OC == 'C') {
                  $('#tc2').removeClass('YardLine11_R');
                  $('#tc2').addClass('YardLine11');
                }
                else {
                  $('#tc2').removeClass('YardLine11');
                  $('#tc2').addClass('YardLine11_R');
                }
              }
            }

            if (result.length > 2) {
              if (result[2].trackcircuitid == 3) {
                if (result[2].track_OC == 'C') {
                  $('#tc3').removeClass('YardLine9_R');
                  $('#tc3').addClass('YardLine9');
                }
                else {
                  $('#tc3').removeClass('YardLine9');
                  $('#tc3').addClass('YardLine9_R');
                }
              }
            }

            if (result.length > 3) {
              if (result[3].trackcircuitid == 4) {
                if (result[3].track_OC == 'C') {
                  $('#tc4').removeClass('YardLine8_R');
                  $('#tc4').addClass('YardLine8');
                }
                else {
                  $('#tc4').removeClass('YardLine8');
                  $('#tc4').addClass('YardLine8_R');
                }
              }
            }

            if (result.length > 4) {
              if (result[4].trackcircuitid == 5) {
                if (result[4].track_OC == 'C') {
                  $('#tc5').removeClass('YardLine6_R');
                  $('#tc5').addClass('YardLine6');
                }
                else {
                  $('#tc5').removeClass('YardLine6');
                  $('#tc5').addClass('YardLine6_R');
                }
              }
            }

            if (result.length > 5) {
              if (result[5].trackcircuitid == 6) {
                if (result[5].track_OC == 'C') {
                  $('#tc6').removeClass('YardLine7_R');
                  $('#tc6').addClass('YardLine7');
                }
                else {
                  $('#tc6').removeClass('YardLine7');
                  $('#tc6').addClass('YardLine7_R');
                }
              }
            }

            if (result.length > 6) {
              if (result[6].trackcircuitid == 7) {
                if (result[6].track_OC == 'C') {
                  $('#tc7').removeClass('YardLine4_R');
                  $('#tc7').addClass('YardLine4');
                }
                else {
                  $('#tc7').removeClass('YardLine4');
                  $('#tc7').addClass('YardLine4_R');
                }
              }
            }

            if (result.length > 7) {
              if (result[7].trackcircuitid == 8) {
                if (result[7].track_OC == 'C') {
                  $('#tc8').removeClass('YardLine1_R');
                  $('#tc8').addClass('YardLine1');
                }
                else {
                  $('#tc8').removeClass('YardLine1');
                  $('#tc8').addClass('YardLine1_R');
                }
              }
            }

            if (result.length > 8) {
              if (result[8].trackcircuitid == 9) {
                if (result[8].track_OC == 'C') {
                  $('#tc9').removeClass('YardLine2_R');
                  $('#tc9').addClass('YardLine2');
                }
                else {
                  $('#tc9').removeClass('YardLine2');
                  $('#tc9').addClass('YardLine2_R');
                }
              }
            }

            if (result.length > 9) {
              if (result[9].trackcircuitid == 10) {
                if (result[9].track_OC == 'C') {
                  $('#tc10').removeClass('YardLine5_R');
                  $('#tc10').addClass('YardLine5');
                }
                else {
                  $('#tc10').removeClass('YardLine5');
                  $('#tc10').addClass('YardLine5_R');
                }
              }
            }

            if (result.length > 10) {
              if (result[10].trackcircuitid == 11) {
                if (result[10].track_OC == 'C') {
                  $('#tc11').removeClass('YardLine14_R');
                  $('#tc11').addClass('YardLine14');
                }
                else {
                  $('#tc11').removeClass('YardLine14');
                  $('#tc11').addClass('YardLine14_R');
                }
              }
            }

            if (result.length > 11) {
              if (result[11].trackcircuitid == 12) {
                if (result[11].track_OC == 'C') {
                  $('#tc12').removeClass('YardLine15_R');
                  $('#tc12').addClass('YardLine15');
                }
                else {
                  $('#tc12').removeClass('YardLine15');
                  $('#tc12').addClass('YardLine15_R');
                }
              }
            }

            if (result.length > 12) {
              if (result[12].trackcircuitid == 13) {
                if (result[12].track_OC == 'C') {
                  $('#tc13').removeClass('YardLine16_R');
                  $('#tc13').addClass('YardLine16');
                }
                else {
                  $('#tc13').removeClass('YardLine16');
                  $('#tc13').addClass('YardLine16_R');
                }
              }
            }
          }
          else {
            $('#tc1').removeClass('YardLine12_R');
            $('#tc2').removeClass('YardLine11_R');
            $('#tc3').removeClass('YardLine9_R');
            $('#tc4').removeClass('YardLine8_R');
            $('#tc5').removeClass('YardLine6_R');
            $('#tc6').removeClass('YardLine7_R');
            $('#tc7').removeClass('YardLine4_R');
            $('#tc8').removeClass('YardLine1_R');
            $('#tc9').removeClass('YardLine2_R');
            $('#tc10').removeClass('YardLine5_R');
            $('#tc11').removeClass('YardLine14_R');
            $('#tc12').removeClass('YardLine15_R');
            $('#tc13').removeClass('YardLine16_R');
          }

          // Registered signals //
          names = finalData[0].signalcircuits.length > 0 ? set_signalCircuit_1(finalData[0].signalcircuits[0].signalname) : ""
          names = finalData[0].signalcircuits.length > 1 ? set_signalCircuit_2(finalData[0].signalcircuits[1].signalname) : ""
          names = finalData[0].signalcircuits.length > 2 ? set_signalCircuit_3(finalData[0].signalcircuits[2].signalname) : ""
          names = finalData[0].signalcircuits.length > 3 ? set_signalCircuit_4(finalData[0].signalcircuits[3].signalname) : ""
          names = finalData[0].signalcircuits.length > 4 ? set_signalCircuit_5(finalData[0].signalcircuits[4].signalname) : ""
          names = finalData[0].signalcircuits.length > 5 ? set_signalCircuit_6(finalData[0].signalcircuits[5].signalname) : ""
          names = finalData[0].signalcircuits.length > 6 ? set_signalCircuit_7(finalData[0].signalcircuits[6].signalname) : ""
          names = finalData[0].signalcircuits.length > 7 ? set_signalCircuit_8((finalData[0].signalcircuits[7].signalname).split(',')[0]) : ""
          names = finalData[0].signalcircuits.length > 7 ? set_signalCircuit_8_AU((finalData[0].signalcircuits[7].signalname).split(',')[1]) : ""
          names = finalData[0].signalcircuits.length > 7 ? set_signalCircuit_8_B((finalData[0].signalcircuits[7].signalname).split(',')[2]) : ""
          names = finalData[0].signalcircuits.length > 8 ? set_signalCircuit_9((finalData[0].signalcircuits[8].signalname).split(',')[0]) : ""
          names = finalData[0].signalcircuits.length > 8 ? set_signalCircuit_9_AU((finalData[0].signalcircuits[8].signalname).split(',')[1]) : ""
          names = finalData[0].signalcircuits.length > 8 ? set_signalCircuit_9_B((finalData[0].signalcircuits[8].signalname).split(',')[2]) : ""
          names = finalData[0].signalcircuits.length > 9 ? set_signalCircuit_10(finalData[0].signalcircuits[9].signalname) : ""


          if (finalData[0].signalcircuitdata.length > 0) {
            const result = Object.values(finalData[0].signalcircuitdata.sort((a, b) => a.id - b.id).reduce((acc, cur) => {
              acc[cur.signalcircuitid] = cur;
              return acc;
            }, {}))

            if (result.length > 0) {
              signalData = finalData[0].signalcircuitdata;
              setSignalCircuitData(signalData)
              if (result[0].signalcircuitid == 1) {
                if (result[0].gui == 1) {
                  $('#_col_red_1').addClass('YardRectangle60_R');
                  $('#_col_yellow_1').removeClass('YardRectangle61_Y');
                  $('#_col_green_1').removeClass('YardRectangle62_G');
                }
                else if (result[0].gui == 2) {
                  $('#_col_red_1').removeClass('YardRectangle60_R');
                  $('#_col_yellow_1').removeClass('YardRectangle61_Y');
                  $('#_col_green_1').addClass('YardRectangle62_G');
                }
                else if (result[0].gui == 3) {
                  $('#_col_red_1').removeClass('YardRectangle60_R');
                  $('#_col_yellow_1').addClass('YardRectangle61_Y');
                  $('#_col_green_1').removeClass('YardRectangle62_G');
                }
                else if (result[0].gui == 5) {
                  $('#_col_red_1').addClass('YardRectangle60_R');
                  $('#_col_yellow_1').removeClass('YardRectangle61_Y');
                  $('#_col_green_1').addClass('YardRectangle62_G');
                }
                else if (result[0].gui == 6) {
                  $('#_col_red_1').addClass('YardRectangle60_R');
                  $('#_col_yellow_1').addClass('YardRectangle61_Y');
                  $('#_col_green_1').removeClass('YardRectangle62_G');
                }
                else if (result[0].gui == 8) {
                  $('#_col_red_1').removeClass('YardRectangle60_R');
                  $('#_col_yellow_1').addClass('YardRectangle61_Y');
                  $('#_col_green_1').addClass('YardRectangle62_G');
                }
                else if (result[0].gui == 11) {
                  $('#_col_red_1').addClass('YardRectangle60_R');
                  $('#_col_yellow_1').addClass('YardRectangle61_Y');
                  $('#_col_green_1').addClass('YardRectangle62_G');
                }
                else if (result[0].gui == 12) {
                  $('#_col_red_1').removeClass('YardRectangle60_R');
                  $('#_col_yellow_1').removeClass('YardRectangle61_Y');
                  $('#_col_green_1').removeClass('YardRectangle62_G');
                }
                else {
                  $('#_col_red_1').removeClass('YardRectangle60_R');
                  $('#_col_yellow_1').removeClass('YardRectangle61_Y');
                  $('#_col_green_1').removeClass('YardRectangle62_G');
                }
              }
            }

            if (result.length > 1) {
              if (result[1].signalcircuitid == 2) {
                if (result[1].gui == 1) {
                  $('#_col_red_2').addClass('YardRectangle64_R');
                  $('#_col_yellow_2').removeClass('YardRectangle65_Y');
                }
                else if (result[1].gui == 3) {
                  $('#_col_red_2').removeClass('YardRectangle64_R');
                  $('#_col_yellow_2').addClass('YardRectangle65_Y');
                }
                else if (result[1].gui == 6) {
                  $('#_col_red_2').addClass('YardRectangle64_R');
                  $('#_col_yellow_2').addClass('YardRectangle65_Y');
                }
                else if (result[1].gui == 12) {
                  $('#_col_red_2').removeClass('YardRectangle64_R');
                  $('#_col_yellow_2').removeClass('YardRectangle65_Y');
                }
                else {
                  $('#_col_red_2').removeClass('YardRectangle64_R');
                  $('#_col_yellow_2').removeClass('YardRectangle65_Y');
                }
              }
            }

            if (result.length > 2) {
              if (result[2].signalcircuitid == 3) {
                if (result[2].gui == 1) {
                  $('#_col_red_3').addClass('YardRectangle50_R');
                  $('#_col_yellow_3').removeClass('YardRectangle49_Y');
                  $('#_col_green_3').removeClass('YardRectangle48_G');
                }
                else if (result[2].gui == 2) {
                  $('#_col_red_3').removeClass('YardRectangle50_R');
                  $('#_col_yellow_3').removeClass('YardRectangle49_Y');
                  $('#_col_green_3').addClass('YardRectangle48_G');
                }
                else if (result[2].gui == 3) {
                  $('#_col_red_3').removeClass('YardRectangle50_R');
                  $('#_col_yellow_3').addClass('YardRectangle49_Y');
                  $('#_col_green_3').removeClass('YardRectangle48_G');
                }
                else if (result[2].gui == 5) {
                  $('#_col_red_3').addClass('YardRectangle50_R');
                  $('#_col_yellow_3').removeClass('YardRectangle49_Y');
                  $('#_col_green_3').addClass('YardRectangle48_G');
                }
                else if (result[2].gui == 6) {
                  $('#_col_red_3').addClass('YardRectangle50_R');
                  $('#_col_yellow_3').addClass('YardRectangle49_Y');
                  $('#_col_green_3').removeClass('YardRectangle48_G');
                }
                else if (result[2].gui == 8) {
                  $('#_col_red_3').removeClass('YardRectangle50_R');
                  $('#_col_yellow_3').addClass('YardRectangle49_Y');
                  $('#_col_green_3').addClass('YardRectangle48_G');
                }
                else if (result[2].gui == 11) {
                  $('#_col_red_3').addClass('YardRectangle50_R');
                  $('#_col_yellow_3').addClass('YardRectangle49_Y');
                  $('#_col_green_3').addClass('YardRectangle48_G');
                }
                else if (result[2].gui == 12) {
                  $('#_col_red_3').removeClass('YardRectangle50_R');
                  $('#_col_yellow_3').removeClass('YardRectangle49_Y');
                  $('#_col_green_3').removeClass('YardRectangle48_G');
                }
                else {
                  $('#_col_red_3').removeClass('YardRectangle50_R');
                  $('#_col_yellow_3').removeClass('YardRectangle49_Y');
                  $('#_col_green_3').removeClass('YardRectangle48_G');
                }
              }
            }

            if (result.length > 3) {
              if (result[3].signalcircuitid == 4) {
                if (result[3].gui == 1) {
                  $('#_col_red_4').addClass('YardRectangle46_R');
                  $('#_col_yellow_4').removeClass('YardRectangle45_Y');
                }
                else if (result[3].gui == 3) {
                  $('#_col_red_4').removeClass('YardRectangle46_R');
                  $('#_col_yellow_4').addClass('YardRectangle45_Y');
                }
                else if (result[3].gui == 6) {
                  $('#_col_red_4').addClass('YardRectangle46_R');
                  $('#_col_yellow_4').addClass('YardRectangle45_Y');
                }
                else if (result[3].gui == 12) {
                  $('#_col_red_4').removeClass('YardRectangle46_R');
                  $('#_col_yellow_4').removeClass('YardRectangle45_Y');
                }
                else {
                  $('#_col_red_4').removeClass('YardRectangle46_R');
                  $('#_col_yellow_4').removeClass('YardRectangle45_Y');
                }
              }
            }

            if (result.length > 4) {
              if (result[4].signalcircuitid == 5) {
                if (result[4].gui == 1) {
                  $('#_col_red_5').addClass('YardRectangle43_R');
                  $('#_col_green_5').removeClass('YardRectangle41_G');
                }
                else if (result[4].gui == 2) {
                  $('#_col_red_5').removeClass('YardRectangle43_R');
                  $('#_col_green_5').addClass('YardRectangle41_G');
                }
                else if (result[4].gui == 5) {
                  $('#_col_red_5').addClass('YardRectangle43_R');
                  $('#_col_green_5').addClass('YardRectangle41_G');
                }
                else if (result[4].gui == 12) {
                  $('#_col_red_5').removeClass('YardRectangle43_R');
                  $('#_col_green_5').removeClass('YardRectangle41_G');
                }
                else {
                  $('#_col_red_5').removeClass('YardRectangle43_R');
                  $('#_col_green_5').removeClass('YardRectangle41_G');
                }
              }
            }

            if (result.length > 5) {
              if (result[5].signalcircuitid == 6) {
                if (result[5].gui == 1) {
                  $('#_col_red_6').addClass('YardRectangle67_R');
                  $('#_col_green_6').removeClass('YardRectangle68_G');
                }
                else if (result[5].gui == 2) {
                  $('#_col_red_6').removeClass('YardRectangle67_R');
                  $('#_col_green_6').addClass('YardRectangle68_G');
                }
                else if (result[5].gui == 5) {
                  $('#_col_red_6').addClass('YardRectangle67_R');
                  $('#_col_green_6').addClass('YardRectangle68_G');
                }
                else if (result[5].gui == 12) {
                  $('#_col_red_6').removeClass('YardRectangle67_R');
                  $('#_col_green_6').removeClass('YardRectangle68_G');
                }
                else {
                  $('#_col_red_6').removeClass('YardRectangle67_R');
                  $('#_col_green_6').removeClass('YardRectangle68_G');
                }
              }
            }

            if (result.length > 6) {
              if (result[6].signalcircuitid == 7) {
                if (result[6].gui == 2) {
                  $('#_col_yellow_7').removeClass('YardRectangle37_Y');
                  $('#_col_green_7').addClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 3) {
                  $('#_col_yellow_7').addClass('YardRectangle37_Y');
                  $('#_col_green_7').removeClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 4) {
                  $('#_col_yellow_7').removeClass('YardRectangle37_Y');
                  $('#_col_green_7').removeClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 8) {
                  $('#_col_yellow_7').addClass('YardRectangle37_Y');
                  $('#_col_green_7').addClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 9) {
                  $('#_col_yellow_7').removeClass('YardRectangle37_Y');
                  $('#_col_green_7').addClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 10) {
                  $('#_col_yellow_7').addClass('YardRectangle37_Y');
                  $('#_col_green_7').removeClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 11) {
                  $('#_col_yellow_7').addClass('YardRectangle37_Y');
                  $('#_col_green_7').addClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').addClass('YardRectangle39_LY');
                }
                else if (result[6].gui == 12) {
                  $('#_col_yellow_7').removeClass('YardRectangle37_Y');
                  $('#_col_green_7').removeClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
                }
                else {
                  $('#_col_yellow_7').removeClass('YardRectangle37_Y');
                  $('#_col_green_7').removeClass('YardRectangle38_G');
                  $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');
                }
              }
            }

            if (result.length > 7) {
              if (result[7].signalcircuitid == 8) {
                if (result[7].gui == 1) {
                  $('#_col_red_8').addClass('YardRectangle32_R');
                  $('#_col_yellow_8').removeClass('YardRectangle33_Y');
                  $('#_col_green_8').removeClass('YardRectangle34_G');
                }
                else if (result[7].gui == 2) {
                  $('#_col_red_8').removeClass('YardRectangle32_R');
                  $('#_col_yellow_8').removeClass('YardRectangle33_Y');
                  $('#_col_green_8').addClass('YardRectangle34_G');
                }
                else if (result[7].gui == 3) {
                  $('#_col_red_8').removeClass('YardRectangle32_R');
                  $('#_col_yellow_8').addClass('YardRectangle33_Y');
                  $('#_col_green_8').removeClass('YardRectangle34_G');
                }
                else if (result[7].gui == 5) {
                  $('#_col_red_8').addClass('YardRectangle32_R');
                  $('#_col_yellow_8').removeClass('YardRectangle33_Y');
                  $('#_col_green_8').addClass('YardRectangle34_G');
                }
                else if (result[7].gui == 6) {
                  $('#_col_red_8').addClass('YardRectangle32_R');
                  $('#_col_yellow_8').addClass('YardRectangle33_Y');
                  $('#_col_green_8').removeClass('YardRectangle34_G');
                }
                else if (result[7].gui == 8) {
                  $('#_col_red_8').removeClass('YardRectangle32_R');
                  $('#_col_yellow_8').addClass('YardRectangle33_Y');
                  $('#_col_green_8').addClass('YardRectangle34_G');
                }
                else if (result[7].gui == 9) {
                  $('#_col_red_8').removeClass('YardRectangle32_R');
                  $('#_col_yellow_8').removeClass('YardRectangle33_Y');
                  $('#_col_green_8').addClass('YardRectangle34_G');
                }
                else if (result[7].gui == 11) {
                  $('#_col_red_8').addClass('YardRectangle32_R');
                  $('#_col_yellow_8').addClass('YardRectangle33_Y');
                  $('#_col_green_8').addClass('YardRectangle34_G');
                }
                else if (result[7].gui == 12) {
                  $('#_col_red_8').removeClass('YardRectangle32_R');
                  $('#_col_yellow_8').removeClass('YardRectangle33_Y');
                  $('#_col_green_8').removeClass('YardRectangle34_G');
                }
                else {
                  $('#_col_red_8').removeClass('YardRectangle32_R');
                  $('#_col_yellow_8').removeClass('YardRectangle33_Y');
                  $('#_col_green_8').removeClass('YardRectangle34_G');
                }
                parseFloat(result[7].lightyellowvoltage) >= parseFloat(100) && parseFloat(result[7].lightyellowvoltage) <= parseFloat(150) && parseFloat(result[7].lightyellowcurrent) >= parseFloat(0.105) && parseFloat(result[7].lightyellowcurrent) <= parseFloat(0.6)
                  ? $('#_col_lightyellow_8').addClass('YardRectangle35_LY')
                  : parseFloat(result[7].lightyellowvoltage) >= parseFloat(100) && parseFloat(result[7].lightyellowvoltage) <= parseFloat(150)
                    ? parseFloat(result[7].lightyellowcurrent) < parseFloat(0.105)
                      ? $('#_col_lightyellow_8').addClass('YardRectangle35_LY')
                      : parseFloat(result[7].lightyellowcurrent > parseFloat(0.6))
                        ? $('#_col_lightyellow_8').addClass('YardRectangle35_LY')
                        : $('#_col_lightyellow_8').removeClass('YardRectangle35_LY') : $('#_col_lightyellow_8').removeClass('YardRectangle35_LY')

                if (parseFloat(result[7].whitevoltage) >= parseFloat(100) && parseFloat(result[7].whitevoltage) <= parseFloat(150) && parseFloat(result[7].whitecurrent) >= parseFloat(0.105) && parseFloat(result[7].whitecurrent) <= parseFloat(0.6)) {
                  $('#_col_white_8_1').addClass('YardRectangle78_W');
                  $('#_col_white_8_2').addClass('YardRectangle79_W');
                  $('#_col_white_8_3').addClass('YardRectangle80_W');
                  $('#_col_white_8_4').addClass('YardRectangle80_1_W');
                  $('#_col_white_8_5').addClass('YardRectangle80_2_W');
                }
                else if (parseFloat(result[7].whitevoltage) >= parseFloat(100) && parseFloat(result[7].whitevoltage) <= parseFloat(150)) {
                  if (parseFloat(result[7].whitecurrent) < parseFloat(0.105)) {
                    $('#_col_white_8_1').addClass('YardRectangle78_W');
                    $('#_col_white_8_2').addClass('YardRectangle79_W');
                    $('#_col_white_8_3').addClass('YardRectangle80_W');
                    $('#_col_white_8_4').addClass('YardRectangle80_1_W');
                    $('#_col_white_8_5').addClass('YardRectangle80_2_W');
                  }
                  else if (parseFloat(result[7].whitecurrent > parseFloat(0.6))) {
                    $('#_col_white_8_1').addClass('YardRectangle78_W');
                    $('#_col_white_8_2').addClass('YardRectangle79_W');
                    $('#_col_white_8_3').addClass('YardRectangle80_W');
                    $('#_col_white_8_4').addClass('YardRectangle80_1_W');
                    $('#_col_white_8_5').addClass('YardRectangle80_2_W');
                  }
                  else {
                    $('#_col_white_8_1').removeClass('YardRectangle78_W');
                    $('#_col_white_8_2').removeClass('YardRectangle79_W');
                    $('#_col_white_8_3').removeClass('YardRectangle80_W');
                    $('#_col_white_8_4').removeClass('YardRectangle80_1_W');
                    $('#_col_white_8_5').removeClass('YardRectangle80_2_W');
                  }
                }
                else {
                  $('#_col_white_8_1').removeClass('YardRectangle78_W');
                  $('#_col_white_8_2').removeClass('YardRectangle79_W');
                  $('#_col_white_8_3').removeClass('YardRectangle80_W');
                  $('#_col_white_8_4').removeClass('YardRectangle80_1_W');
                  $('#_col_white_8_5').removeClass('YardRectangle80_2_W');
                }
              }
            }

            if (result.length > 8) {
              if (result[8].signalcircuitid == 9) {
                if (result[8].gui == 1) {
                  $('#_col_red_9').addClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                else if (result[8].gui == 2) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').addClass('YardRectangle52_G');
                }
                else if (result[8].gui == 3) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').addClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                else if (result[8].gui == 4) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                else if (result[8].gui == 5) {
                  $('#_col_red_9').addClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').addClass('YardRectangle52_G');
                }
                else if (result[8].gui == 6) {
                  $('#_col_red_9').addClass('YardRectangle54_R');
                  $('#_col_yellow_9').addClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                else if (result[8].gui == 8) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').addClass('YardRectangle53_Y');
                  $('#_col_green_9').addClass('YardRectangle52_G');
                }
                else if (result[8].gui == 9) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').addClass('YardRectangle52_G');
                }
                else if (result[8].gui == 10) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').addClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                else if (result[8].gui == 11) {
                  $('#_col_red_9').addClass('YardRectangle54_R');
                  $('#_col_yellow_9').addClass('YardRectangle53_Y');
                  $('#_col_green_9').addClass('YardRectangle52_G');
                }
                else if (result[8].gui == 12) {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                else {
                  $('#_col_red_9').removeClass('YardRectangle54_R');
                  $('#_col_yellow_9').removeClass('YardRectangle53_Y');
                  $('#_col_green_9').removeClass('YardRectangle52_G');
                }
                parseFloat(result[8].lightyellowvoltage) >= parseFloat(100) && parseFloat(result[8].lightyellowvoltage) <= parseFloat(150) && parseFloat(result[8].lightyellowcurrent) >= parseFloat(0.105) && parseFloat(result[8].lightyellowcurrent) <= parseFloat(0.6)
                  ? $('#_col_lightyellow_9').addClass('YardRectangle94_LY')
                  : parseFloat(result[8].lightyellowvoltage) >= parseFloat(100) && parseFloat(result[8].lightyellowvoltage) <= parseFloat(150)
                    ? parseFloat(result[8].lightyellowcurrent) < parseFloat(0.105)
                      ? $('#_col_lightyellow_9').addClass('YardRectangle94_LY')
                      : parseFloat(result[8].lightyellowcurrent > parseFloat(0.6))
                        ? $('#_col_lightyellow_9').addClass('YardRectangle94_LY')
                        : $('#_col_lightyellow_9').removeClass('YardRectangle94_LY') : $('#_col_lightyellow_9').removeClass('YardRectangle94_LY')

                if (parseFloat(result[8].whitevoltage) >= parseFloat(100) && parseFloat(result[8].whitevoltage) <= parseFloat(150) && parseFloat(result[8].whitecurrent) >= parseFloat(0.105) && parseFloat(result[8].whitecurrent) <= parseFloat(0.6)) {
                  $('#_col_white_9_1').addClass('YardRectangle74_W');
                  $('#_col_white_9_2').addClass('YardRectangle75_W');
                  $('#_col_white_9_3').addClass('YardRectangle76_W');
                  $('#_col_white_9_4').addClass('YardRectangle76_1_W');
                  $('#_col_white_9_5').addClass('YardRectangle76_2_W');
                }
                else if (parseFloat(result[8].whitevoltage) >= parseFloat(100) && parseFloat(result[8].whitevoltage) <= parseFloat(150)) {
                  if (parseFloat(result[8].whitecurrent) < parseFloat(0.105)) {
                    $('#_col_white_9_1').addClass('YardRectangle74_W');
                    $('#_col_white_9_2').addClass('YardRectangle75_W');
                    $('#_col_white_9_3').addClass('YardRectangle76_W');
                    $('#_col_white_9_4').addClass('YardRectangle76_1_W');
                    $('#_col_white_9_5').addClass('YardRectangle76_2_W');
                  }
                  else if (parseFloat(result[8].whitecurrent > parseFloat(0.6))) {
                    $('#_col_white_9_1').addClass('YardRectangle74_W');
                    $('#_col_white_9_2').addClass('YardRectangle75_W');
                    $('#_col_white_9_3').addClass('YardRectangle76_W');
                    $('#_col_white_9_4').addClass('YardRectangle76_1_W');
                    $('#_col_white_9_5').addClass('YardRectangle76_2_W');
                  }
                  else {
                    $('#_col_white_9_1').removeClass('YardRectangle74_W');
                    $('#_col_white_9_2').removeClass('YardRectangle75_W');
                    $('#_col_white_9_3').removeClass('YardRectangle76_W');
                    $('#_col_white_9_4').removeClass('YardRectangle76_1_W');
                    $('#_col_white_9_5').removeClass('YardRectangle76_2_W');
                  }
                }
                else {
                  $('#_col_white_9_1').removeClass('YardRectangle74_W');
                  $('#_col_white_9_2').removeClass('YardRectangle75_W');
                  $('#_col_white_9_3').removeClass('YardRectangle76_W');
                  $('#_col_white_9_4').removeClass('YardRectangle76_1_W');
                  $('#_col_white_9_5').removeClass('YardRectangle76_2_W');
                }
              }
            }

            if (result.length > 9) {
              if (result[9].signalcircuitid == 10) {
                if (result[9].gui == 2) {
                  $('#_col_yellow_10').removeClass('YardRectangle58_Y');
                  $('#_col_green_10').addClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 3) {
                  $('#_col_yellow_10').addClass('YardRectangle58_Y');
                  $('#_col_green_10').removeClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 4) {
                  $('#_col_yellow_10').removeClass('YardRectangle58_Y');
                  $('#_col_green_10').removeClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 8) {
                  $('#_col_yellow_10').addClass('YardRectangle58_Y');
                  $('#_col_green_10').addClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 9) {
                  $('#_col_yellow_10').removeClass('YardRectangle58_Y');
                  $('#_col_green_10').addClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 10) {
                  $('#_col_yellow_10').addClass('YardRectangle58_Y');
                  $('#_col_green_10').removeClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 11) {
                  $('#_col_yellow_10').addClass('YardRectangle58_Y');
                  $('#_col_green_10').addClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').addClass('YardRectangle56_LY');
                }
                else if (result[9].gui == 12) {
                  $('#_col_yellow_10').removeClass('YardRectangle58_Y');
                  $('#_col_green_10').removeClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
                }
                else {
                  $('#_col_yellow_10').removeClass('YardRectangle58_Y');
                  $('#_col_green_10').removeClass('YardRectangle57_G');
                  $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
                }
              }
            }
          }
          else {
            $('#_col_red_1').removeClass('YardRectangle60_R');
            $('#_col_yellow_1').removeClass('YardRectangle61_Y');
            $('#_col_green_1').removeClass('YardRectangle62_G');

            $('#_col_red_2').removeClass('YardRectangle64_R');
            $('#_col_yellow_2').removeClass('YardRectangle65_Y');

            $('#_col_red_3').removeClass('YardRectangle50_R');
            $('#_col_yellow_3').removeClass('YardRectangle49_Y');
            $('#_col_green_3').removeClass('YardRectangle48_G');

            $('#_col_red_4').removeClass('YardRectangle46_R');
            $('#_col_yellow_4').removeClass('YardRectangle45_Y');

            $('#_col_red_5').removeClass('YardRectangle43_R');
            $('#_col_green_5').removeClass('YardRectangle41_G');

            $('#_col_red_6').removeClass('YardRectangle67_R');
            $('#_col_green_6').removeClass('YardRectangle68_G');

            $('#_col_yellow_7').removeClass('YardRectangle37_Y');
            $('#_col_green_7').removeClass('YardRectangle38_G');
            $('#_col_lightyellow_7').removeClass('YardRectangle39_LY');

            $('#_col_red_8').removeClass('YardRectangle32_R');
            $('#_col_yellow_8').removeClass('YardRectangle33_Y');
            $('#_col_green_8').removeClass('YardRectangle34_G');
            $('#_col_lightyellow_8').removeClass('YardRectangle35_LY');
            $('#_col_white_8_1').removeClass('YardRectangle78_W');
            $('#_col_white_8_2').removeClass('YardRectangle79_W');
            $('#_col_white_8_3').removeClass('YardRectangle80_W');
            $('#_col_white_8_4').removeClass('YardRectangle80_1_W');
            $('#_col_white_8_5').removeClass('YardRectangle80_2_W');

            $('#_col_red_9').removeClass('YardRectangle54_R');
            $('#_col_yellow_9').removeClass('YardRectangle53_Y');
            $('#_col_green_9').removeClass('YardRectangle52_G');
            $('#_col_lightyellow_9').removeClass('YardRectangle94_LY');
            $('#_col_white_9_1').removeClass('YardRectangle74_W');
            $('#_col_white_9_2').removeClass('YardRectangle75_W');
            $('#_col_white_9_3').removeClass('YardRectangle76_W');
            $('#_col_white_9_4').removeClass('YardRectangle76_1_W');
            $('#_col_white_9_5').removeClass('YardRectangle76_2_W');

            $('#_col_yellow_10').removeClass('YardRectangle58_Y');
            $('#_col_green_10').removeClass('YardRectangle57_G');
            $('#_col_lightyellow_10').removeClass('YardRectangle56_LY');
          }
        }
      })
      .catch((err) => {
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  }

  const handlePointMachineClick = (pointMachine) => {
    if (pointMachine == 1) {
      set_pointMachineTableName(pointMachine_1)
    } else if (pointMachine == 2) {
      set_pointMachineTableName(pointMachine_2)
    } else if (pointMachine == 3) {
      set_pointMachineTableName(pointMachine_3)
    }
    setModalData("pointMachine" + pointMachine)
    setModalVisible(true);
  };
  const handleSignalCircuitClick = (signal) => {
    if (signal == 1) {
      set_signalCircuitTableName(signalCircuit_1)
    } else if (signal == 2) {
      set_signalCircuitTableName(signalCircuit_2)
    } else if (signal == 3) {
      set_signalCircuitTableName(signalCircuit_3)
    } else if (signal == 4) {
      set_signalCircuitTableName(signalCircuit_4)
    } else if (signal == 5) {
      set_signalCircuitTableName(signalCircuit_5)
    } else if (signal == 6) {
      set_signalCircuitTableName(signalCircuit_6)
    } else if (signal == 7) {
      set_signalCircuitTableName(signalCircuit_7)
    } else if (signal == 8) {
      set_signalCircuitTableName(signalCircuit_8 + ',' + signalCircuit_8_AU + ',' + signalCircuit_8_B)
    } else if (signal == 9) {
      set_signalCircuitTableName(signalCircuit_9 + ',' + signalCircuit_9_AU + ',' + signalCircuit_9_B)
    } else if (signal == 10) {
      set_signalCircuitTableName(signalCircuit_10)
    }
    setModalData("signalCircuit");
    setSignalCircuitID(signal)
    setModalVisible(true);
  }
  const handleTrackCircuitClick = (track) => {
    if (track == 1) {
      set_trackCircuitTableName(trackCircuit_1)
    } else if (track == 2) {
      set_trackCircuitTableName(trackCircuit_2)
    } else if (track == 3) {
      set_trackCircuitTableName(trackCircuit_3)
    } else if (track == 4) {
      set_trackCircuitTableName(trackCircuit_4)
    } else if (track == 5) {
      set_trackCircuitTableName(trackCircuit_5)
    } else if (track == 6) {
      set_trackCircuitTableName(trackCircuit_6)
    } else if (track == 7) {
      set_trackCircuitTableName(trackCircuit_7)
    } else if (track == 8) {
      set_trackCircuitTableName(trackCircuit_8)
    } else if (track == 9) {
      set_trackCircuitTableName(trackCircuit_9)
    } else if (track == 10) {
      set_trackCircuitTableName(trackCircuit_10)
    } else if (track == 11) {
      set_trackCircuitTableName(trackCircuit_11)
    } else if (track == 12) {
      set_trackCircuitTableName(trackCircuit_12)
    } else if (track == 13) {
      set_trackCircuitTableName(trackCircuit_13)
    }
    setModalData("trackCircuit");
    setTrackCircuitID(track)
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  const point_AB_table_column = [
    {
      title: "DateTime",
      dataIndex: "createddate",
      key: "createddate",
      render: (_, record) => {
        return (
          <Text>
            {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        );
      },
    },
    {
      title: "Direction",
      dataIndex: "a_direction",
      key: "a_direction",
    },
    {
      title: "A Current Max/Avg(A)",
      dataIndex: ["a_current_max", "a_current_avg"],
      key: "a_current_max",
      // render: (text,row) => <a title={row["a_current_max"]}>{row["a_current_avg"]}</a>,
      render: (_, record) => {
        return (
          <Text>
            {record.a_current_max} / {record.a_current_avg}
          </Text>
        );
      },
    },
    {
      title: "A Vdc",
      dataIndex: "a_voltage",
      key: "a_voltage",
    },
    {
      title: "B Current Max/Avg(A)",
      dataIndex: ["b_current_max", "b_current_avg"],
      key: "b_current_max",
      // render: (text,row) => <a title={row["b_current_max"]}>{row["b_current_avg"]}</a>,
      render: (_, record) => {
        return (
          <Text>
            {record.b_current_max} / {record.b_current_avg}
          </Text>
        );
      },
    },
    {
      title: "B Vdc",
      dataIndex: "b_voltage",
      key: "b_voltage",
    },   
  ];
  const point_A_table_column = [
    {
      title: "DateTime",
      dataIndex: "createddate",
      key: "createddate",
      render: (_, record) => {
        return (
          <Text>
            {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        );
      },
    },
    {
      title: "Direction",
      dataIndex: "a_direction",
      key: "a_direction",
    },
    {
      title: "Current Max/Avg(A)",
      dataIndex: ["a_current_max", "a_current_avg"],
      key: "a_current_max",
      // render: (text,row) => <a title={row["a_current_max"]}>{row["a_current_avg"]}</a>,
      render: (_, record) => {
        return (
          <Text>
            {record.a_current_max} / {record.a_current_avg}
          </Text>
        );
      },
    },
    {
      title: "Vdc",
      dataIndex: "a_voltage",
      key: "a_voltage",
    },    
  ];
  const signal_table_column = [
    {
      title: "DateTime",
      dataIndex: "createddate",
      key: "createddate",
      render: (_, record) => {
        return (
          <Text>
            {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        );
      },
    },
    {
      title: "Signal Aspect",
      dataIndex: "signal_aspect",
      key: "signal_aspect",
    },
    {
      title: "Aspect Current(Iac)(A)",
      dataIndex: "aspect_current",
      key: "aspect_current",
    },
    {
      title: "Aspect Voltage(Vac)",
      dataIndex: "aspect_voltage",
      key: "aspect_voltage",
    },   
  ];
  const track_table_column = [
    {
      title: "DateTime",
      dataIndex: "createddate",
      key: "createddate",
      render: (_, record) => {
        return (
          <Text>
            {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        );
      },
    },
    {
      title: "TF(Idc)(A)",
      dataIndex: "feed_current",
      key: "feed_current",
    },
    {
      title: "TF(Vdc)",
      dataIndex: "feed_voltage",
      key: "feed_voltage",
    },
    {
      title: "TR(Idc)(A)",
      dataIndex: "relay_current",
      key: "relay_current",
    },
    {
      title: "TR(Vdc)",
      dataIndex: "relay_voltage",
      key: "relay_voltage",
    },   
  ];



  return (

    <>
      <div className="YardFrame1">
        <div className="YardMettupalayamMtp714km">METTUPALAYAM         MTP(7.14KM)</div>
        <div className="YardKaramadai">{station_name}</div>

        {/* Point Machine */}
        <div id="point_machine_1" onClick={() => handlePointMachineClick(1)}>
          <div className="YardRectangle2" />
          <div className="YardN-1" >N</div>
          <div className="YardC-1" >C</div>
          <div className="YardR-1" >R</div>
          <div className="YardRectangle21" id="pm1_N" />
          <div className="YardRectangle22" id="pm1_C" />
          <div className="YardRectangle23" id="pm1_R" />

          {/* knob center */}
          <div className="KnobWithSwitch_1" id="pm1_knob">
            <div className="knob"></div>
            <div className="switchCenter"></div>
          </div>

          {/* <div className="YardRectangle26" /> */}
          <div className="poitmachinename_1" >{pointMachine_1}</div>

        </div>
        <div id="point_machine_2" onClick={() => handlePointMachineClick(2)}>
          <div className="YardRectangle1" />
          <div className="YardN-2" >N</div>
          <div className="YardC-2">C</div>
          <div className="YardR-2" >R</div>
          <div className="YardRectangle15" id="pm2_N" />
          <div className="YardRectangle16" id="pm2_C" />
          <div className="YardRectangle17" id="pm2_R" />

          {/* knob center */}
          <div className="KnobWithSwitch_2" id="pm2_knob">
            <div className="knob"></div>
            <div className="switchCenter"></div>
          </div>

          {/* <div className="YardRectangle25" /> */}
          <div className="pointmachinename_2" >{pointMachine_2}</div>

        </div>
        <div id="point_machine_3" onClick={() => handlePointMachineClick(3)}>
          <div className="YardRectangle3" />
          <div className="YardRectangle18" id="pm3_N" />
          <div className="YardRectangle19" id="pm3_C" />
          <div className="YardRectangle20" id="pm3_R" />
          <div className="YardN-3" >N</div>
          <div className="YardC-3" >C</div>
          <div className="YardR-3">R</div>

          {/* knob center */}
          <div className="KnobWithSwitch_3" id="pm3_knob">
            <div className="knob"></div>
            <div className="switchCenter"></div>
          </div>


          {/* <div className="YardRectangle24" /> */}
          <div className="pointmachinename_3" >{pointMachine_3}</div>
        </div>

        {/* Signal Circuit */}
        {/* <div onClick={() => handleSignalCircuitClick()}> */}
        <div className="YardRectangle29" />
        {/* <div className="YardRectangle31" /> */}
        <div className="YardRectangle32" id="_col_red_8" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle33" id="_col_yellow_8" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle34" id="_col_green_8" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle35" id="_col_lightyellow_8" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle36" />
        <div className="YardRectangle37" id="_col_yellow_7" onClick={() => handleSignalCircuitClick(7)} />
        <div className="YardRectangle38" id="_col_green_7" onClick={() => handleSignalCircuitClick(7)} />
        <div className="YardRectangle39" id="_col_lightyellow_7" onClick={() => handleSignalCircuitClick(7)} />
        <div className="YardRectangle40" />
        <div className="YardRectangle41" id="_col_green_5" onClick={() => handleSignalCircuitClick(5)} />
        <div className="YardRectangle43" id="_col_red_5" onClick={() => handleSignalCircuitClick(5)} />
        <div className="YardRectangle44" />
        <div className="YardRectangle45" id="_col_yellow_4" onClick={() => handleSignalCircuitClick(4)} />
        <div className="YardRectangle46" id="_col_red_4" onClick={() => handleSignalCircuitClick(4)} />
        <div className="YardRectangle47" />
        <div className="YardRectangle48" id="_col_green_3" onClick={() => handleSignalCircuitClick(3)} />
        <div className="YardRectangle49" id="_col_yellow_3" onClick={() => handleSignalCircuitClick(3)} />
        <div className="YardRectangle50" id="_col_red_3" onClick={() => handleSignalCircuitClick(3)} />
        <div className="YardRectangle51" />
        <div className="YardRectangle55" />
        <div className="YardRectangle59" />
        <div className="signalName_2" >{signalCircuit_1}</div>
        <div className="YardRectangle60" id="_col_red_1" onClick={() => handleSignalCircuitClick(1)} />
        <div className="YardRectangle61" id="_col_yellow_1" onClick={() => handleSignalCircuitClick(1)} />
        <div className="YardRectangle62" id="_col_green_1" onClick={() => handleSignalCircuitClick(1)} />
        <div className="YardRectangle63" />
        {/* <Signals/> */}
        <div className="signalName_1" >{signalCircuit_2}</div>
        <div className="YardRectangle64" id="_col_red_2" onClick={() => handleSignalCircuitClick(2)} />
        <div className="YardRectangle65" id="_col_yellow_2" onClick={() => handleSignalCircuitClick(2)} />
        <div className="YardRectangle66" />
        <div className="YardRectangle67" id="_col_red_6" onClick={() => handleSignalCircuitClick(6)} />
        <div className="YardRectangle68" id="_col_green_6" onClick={() => handleSignalCircuitClick(6)} />
        <div className="YardRectangle52" id="_col_green_9" onClick={() => handleSignalCircuitClick(9)} />
        <div className="YardRectangle53" id="_col_yellow_9" onClick={() => handleSignalCircuitClick(9)} />
        <div className="YardRectangle54" id="_col_red_9" onClick={() => handleSignalCircuitClick(9)} />
        <div className="YardRectangle56" id="_col_lightyellow_10" onClick={() => handleSignalCircuitClick(10)} />
        <div className="YardRectangle57" id="_col_green_10" onClick={() => handleSignalCircuitClick(10)} />
        <div className="YardRectangle58" id="_col_yellow_10" onClick={() => handleSignalCircuitClick(10)} />
        {/* <div className="YardRectangle93" /> */}
        <div className="YardRectangle94" id="_col_lightyellow_9" onClick={() => handleSignalCircuitClick(9)} />
        {/* </div> */}
        <div className="YardLine1" id="tc8" onClick={() => handleTrackCircuitClick(8)}></div>
        <div className="YardLine2" id="tc9" onClick={() => handleTrackCircuitClick(9)}></div>
        <div className="YardLine7" id="tc6" onClick={() => handleTrackCircuitClick(6)}></div>
        <div className="YardLine18"></div>
        <div className="YardLine19"></div>
        <div className="YardLine20"></div>
        <div className="YardRectangle4" />
        <div className="YardLine21"></div>
        <div className="YardRectangle5" />
        <div className="YardLine22"></div>
        <div className="YardLine23"></div>
        <div className="YardLine24" ></div>
        <div className="YardRectangle6" />
        <div className="YardRectangle7" />
        <div className="YardRectangle8" />
        <div className="YardRectangle12" />
        <div className="YardRectangle13" />
        <div className="YardLine25"></div>
        <div className="YardRectangle14" />
        <div className="YardPassengerPlatform">PASSENGER PLATFORM</div>
        <div className="YardControlPanel" >CONTROL PANEL</div>
        <div className="YardLine26"></div>
        <div className="YardRectangle28" />
        <div className="YardP-1">P</div>

        <div className="YardLine27"></div>
        <div className="YardRectangle30" />
        <div className="YardP-2">P</div>


        <div className="YardLine28" ></div>
        <div className="YardRectangle69" />
        <div className="YardP-3">P</div>
        <div className="YardLine29"></div>
        <div className="YardRectangle70" />
        <div className="YardP-4">P</div>
        <div className="YardLine30"></div>
        <div className="YardLine31"></div>
        <div className="YardRectangle71" />
        <div className="YardLine32"></div>
        <div className="YardRectangle72" />
        <div className="YardLine33" ></div>
        <div className="YardLine35" ></div>
        <div className="YardRectangle73" />
        <div className="YardRectangle74" id="_col_white_9_1" onClick={() => handleSignalCircuitClick(9)} />
        <div className="YardRectangle75" id="_col_white_9_2" onClick={() => handleSignalCircuitClick(9)} />
        <div className="YardRectangle76" id="_col_white_9_3" onClick={() => handleSignalCircuitClick()} />
        <div className="YardRectangle76_1" id="_col_white_9_4" onClick={() => handleSignalCircuitClick()} />
        <div className="YardRectangle76_2" id="_col_white_9_5" onClick={() => handleSignalCircuitClick()} />

        <div className="YardRectangle77" />
        <div className="YardRectangle78" id="_col_white_8_1" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle79" id="_col_white_8_2" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle80" id="_col_white_8_3" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle80_1" id="_col_white_8_4" onClick={() => handleSignalCircuitClick(8)} />
        <div className="YardRectangle80_2" id="_col_white_8_5" onClick={() => handleSignalCircuitClick(8)} />

        <div className="YardRectangle81" />
        <div className="YardLine36" ></div>
        <div className="YardRectangle82" />
        <div className="YardLine37" ></div>
        <div className="YardLine38" ></div>
        <div className="Arrow1">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="Arrow2">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="Arrow3">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardD-1">{signalCircuit_7}</div>
        <div className="YardUp-1">UP</div>
        <div className="YardDown-1">DOWN</div>
        {/* <div className="YardCit" >C1T</div> */}
        {/* <div className="YardT" style={{ width: 36, height: 16, left: 293, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>25T</div> */}
        <div style={{ width: 37, height: 16, left: 387, top: 403, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_5}</div>
        <div className="YardAscr-1" >25 ASCR</div>
        <div className="YardRectangle83" />
        <div className="YardJ" >J</div>
        <div className="YardRectangle84" />
        <div className="YardH" >H</div>
        <div className="YardRectangle85" />
        <div className="YardB1">B1</div>
        <div className="YardRectangle86" />
        <div className="YardB-1" >B</div>
        <div className="YardRectangle87" />
        <div className="YardA-1" >A</div>
        <div className="YardRectangle88" />
        <div className="YardK">K</div>
        <div className="YardRectangle89" />
        <div className="YardL">L</div>
        <div className="YardRectangle90" />
        <div className="YardCob">COB</div>
        <div className="YardAU-2" >{signalCircuit_9_AU}</div>
        <div className="YardA-2" >{signalCircuit_9}</div>
        <div className="YardB-2">{signalCircuit_9_B}</div>
        <div className="YardD-2">{signalCircuit_10}</div>
        <div className="YardDown-2" >DOWN</div>
        <div className="YardUp-2" >UP</div>
        {/* <div className="YardC32t" >C32T</div> */}
        <div style={{ width: 26, height: 12, left: 1274, top: 310, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_6}</div>
        {/* <div className="YardT" style={{ width: 37, height: 17, left: 1298, top: 336, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>8T</div> */}
        <div className="YardSlipSiding" >SLIP SIDING</div>
        {/* <div className="YardT" style={{ width: 41, height: 24, left: 1189, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>65T</div> */}
        {/* <div style={{ width: 32, height: 21, left: 1126, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>65</div> */}
        <div style={{ width: 32, height: 21, left: 1044, top: 335, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>63</div>
        {/* <div className="YardT" style={{ width: 41, height: 24, left: 1061, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>32T</div> */}
        <div style={{ width: 32, height: 21, left: 995, top: 215, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>63</div>
        {/* <div className="YardAt" style={{ width: 41, height: 23, left: 1023, top: 180, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>63AT</div> */}
        <div className="YardAscr-2" >8 ASCR</div>
        <div className="YardLine42"></div>
        {/* <div className="Yard02at">02/02AT</div>
        <div className="Yard01at">01/01AT</div> */}
        {/* <div className="YardT" style={{ width: 42, height: 24, left: 392, top: 366, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>1T</div> */}
        {/* <div className="YardAt" style={{ width: 47, height: 22, left: 458, top: 181, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>50AT</div> */}
        <div style={{ width: 50, height: 58, left: 502, top: 218, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>50</div>
        <div style={{ width: 50, height: 29, left: 453, top: 340, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>50</div>
        {/* <div className="YardBt" style={{ width: 47, height: 22, left: 500, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>50BT</div> */}
        <div style={{ width: 34, height: 23, left: 608, top: 252, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_4}</div>
        <div style={{ width: 34, height: 23, left: 622, top: 402, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_3}</div>
        <div className="YardCoimbatoreNorthJnCbf2569km">COIMBATORE NORTH JN       CBF(25.69KM)</div>
        <div className="YardB" style={{ width: 26, height: 16, left: 235, top: 290, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_8_B}</div>
        <div className="YardA" style={{ width: 28, height: 14, left: 276, top: 290, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_8}</div>
        <div className="YardAU" style={{ width: 28, height: 14, left: 315, top: 270, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{signalCircuit_8_AU}</div>
        <div className="YardLine43"></div>
        <div className="Arrow4">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardLine44"></div>
        <div className="Arrow5">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardLine45"></div>
        <div className="Arrow6">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardLine46"></div>
        <div className="Arrow7">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardLine47"></div>
        <div className="Arrow8">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="Arrow9">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardLine48"></div>
        <div className="Arrow10">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="YardLine49"></div>
        <div className="Arrow11">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="Arrow12">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        <div className="Arrow13">
          <div className="YardLine39" ></div>
          <div className="YardLine40" ></div>
          <div className="YardLine41"></div>
        </div>
        {/* Track Circuit */}
        <div className="trackCircuit" >
          <div className="YardLine11" id="tc2" onClick={() => handleTrackCircuitClick(2)}></div>
          {/* <div className="YardLine10" ></div> */}
          <div className="YardCit" >{trackCircuit_2}</div>
          <div className="YardT" style={{ width: 36, height: 16, left: 293, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_3}</div>
          <div className="YardT" style={{ width: 42, height: 24, left: 392, top: 366, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_4}</div>
          <div className="YardAt" style={{ width: 47, height: 22, left: 458, top: 181, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_6}</div>
          <div className="YardBt" style={{ width: 47, height: 22, left: 500, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_5}</div>
          <div className="Yard02at">{trackCircuit_8}</div>
          <div className="Yard01at">{trackCircuit_7}</div>
          <div className="YardAt" style={{ width: 41, height: 23, left: 1023, top: 180, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_9}</div>
          <div className="trackcircuitname_1">{trackCircuit_1}</div>
          <div className="YardT" style={{ width: 41, height: 24, left: 1061, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_10}</div>
          <div className="YardT" style={{ width: 41, height: 24, left: 1189, top: 370, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_11}</div>
          <div className="YardT" style={{ width: 37, height: 17, left: 1298, top: 368, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{trackCircuit_12}</div>
          <div className="YardC32t" >{trackCircuit_13}</div>
          <div className="YardLine8" id="tc4" onClick={() => handleTrackCircuitClick(4)}></div>
          <div className="YardLine9" id="tc3" onClick={() => handleTrackCircuitClick(3)}></div>
          <div className="YardLine6" id="tc5" onClick={() => handleTrackCircuitClick(5)}></div>
          <div className="YardLine4" id="tc7" onClick={() => handleTrackCircuitClick(7)}></div>

          <div className="YardLine12" id="tc1" onClick={() => handleTrackCircuitClick(1)}></div>
          <div className="YardLine5" id="tc10" onClick={() => handleTrackCircuitClick(10)}></div>
          {/* <div className="YardLine13"></div> */}
          <div className="YardLine14" id="tc11" onClick={() => handleTrackCircuitClick(11)}></div>
          <div className="YardLine15" id="tc12" onClick={() => handleTrackCircuitClick(12)}></div>
          <div className="YardLine16" id="tc13" onClick={() => handleTrackCircuitClick(13)}></div>
          <div className="YardRectangle9" />
          <div className="YardRectangle10" />
          <div className="YardRectangle11" />
          <div className="YardRectangle91" />
          <div className="YardRectangle92" />
        </div>
      </div>
      <Modal
        open={modalVisible}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
        onClick={handleModalClick}
        width={1400}
        footer={false}
        style={{ maxHeight: '320px', paddingTop: "10%" }}

      >
        {modalData === "pointMachine1" && (
          <>
            <div id="content" style={{ maxHeight: '230px', paddingTop: "1.5%", overflow: "hidden" }}>
              <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{'PointMachine - ' + pointMachineTableName}</h2>
              {/* overflowY: 'scroll' */}
              <ConfigProvider>
                <Table
                  id="AssertTable"
                  className="Reports-table"
                  size="small"
                  scroll={{ x: "max-content" }}
                  rowKey={(record) => record.id}
                  loading={loading}
                  columns={point_AB_table_column}
                  dataSource={PointMachineABData.filter(res => res.pointmachineid == 1).sort(res => res.createddate).reverse()}
                />
              </ConfigProvider>
            </div>
          </>
        )}
        {modalData === "pointMachine2" && (
          <>
            <div id="content" style={{ maxHeight: '230px', paddingTop: "1.5%", overflow: "hidden" }}>
              <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{'PointMachine - ' + pointMachineTableName}</h2>
              {/* overflowY: 'scroll' */}
              <ConfigProvider>
                <Table
                  id="AssertTable"
                  className="Reports-table"
                  size="small"
                  scroll={{ x: "max-content" }}
                  rowKey={(record) => record.id}
                  loading={loading}
                  columns={point_A_table_column}
                  dataSource={PointMachineABData.filter(res => res.pointmachineid == 2).sort(res => res.createddate).reverse()}
                />
              </ConfigProvider>
            </div>
          </>
        )}
        {modalData === "pointMachine3" && (
          <>
            <div id="content" style={{ maxHeight: '230px', paddingTop: "1.5%", overflow: "hidden" }}>
              <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{'PointMachine - ' + pointMachineTableName}</h2>
              {/* overflowY: 'scroll' */}
              <ConfigProvider>
                <Table
                  id="AssertTable"
                  className="Reports-table"
                  size="small"
                  scroll={{ x: "max-content" }}
                  rowKey={(record) => record.id}
                  loading={loading}
                  columns={point_AB_table_column}
                  dataSource={PointMachineABData.filter(res => res.pointmachineid == 3).sort(res => res.createddate).reverse()}
                />
              </ConfigProvider>
            </div>
          </>
        )}
        {modalData === "signalCircuit" && (
          <>
            <div id="content" style={{ maxHeight: '230px', paddingTop: "1.5%", overflow: "hidden" }}>
              <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{'SignalCircuit - ' + signalCircuitTableName}</h2>
              {/*  overflowY: 'scroll' */}
              <ConfigProvider>
                <Table
                  id="AssertTable"
                  className="Reports-table"
                  size="small"
                  scroll={{ x: "max-content" }}
                  rowKey={(record) => record.id}
                  loading={loading}
                  columns={signal_table_column}
                  dataSource={SignalCircuitData.filter(res => res.signalcircuitid == SignalCircuitID).sort(res => res.createddate).reverse()}
                />
              </ConfigProvider>
            </div>
          </>
        )}
        {modalData === "trackCircuit" && (
          <>
            <div id="content" style={{ maxHeight: '230px', paddingTop: "1.5%", overflow: "hidden" }}>
              <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{'TrackCircuit - ' + trackCircuitTableName}</h2>
              {/* overflowY: 'scroll' */}
              <ConfigProvider>
                <Table
                  id="AssertTable"
                  className="Reports-table"
                  size="small"
                  scroll={{ x: "max-content" }}
                  rowKey={(record) => record.id}
                  loading={loading}
                  columns={track_table_column}
                  dataSource={TrackCircuitData.filter(res => res.trackcircuitid == TrackCircuitID).sort(res => res.createddate).reverse()}
                />
              </ConfigProvider>
            </div>
          </>
        )}
      </Modal>
      
      {/* display msg for smaller screen */}
      {/* <div class="content_msg">
        <h2>Kindly use the laptop or desktop to view this content....!!!</h2>
      </div> */}
    </>
  )
}

export default Dashboard;

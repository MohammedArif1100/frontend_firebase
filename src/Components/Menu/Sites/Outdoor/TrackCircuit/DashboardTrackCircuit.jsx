import React, { useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import "./DashboardTrackCircuit.css";
import axiosClient from "../../../../Authentication/ApiCall";
import { message } from "antd";
import moment from "moment/moment";


const Dashboard = ({ data }) => {
  const [TrackDashboardData, setTrackDashboardData] = useState([]);
 
  var stationid = data.stationid
  var trackcircuitid = data.trackcircuitid

  setTrackDashboardData(data.socketdata != null ? data.socketdata : null)
  //var TrackDashboardData = data.socketdata != null ? data.socketdata : null
  var TrackDashboardRelay = data.relays != null ? data.relays : null
  var TrackColor = data.relays != null ? data.relays == 1 ? '#1D6D2A' : data.relays == 0 ? '#FF0000' : '#808080' : null

 
  const [Pageload, setPageload] = useState(false);

  // useEffect(() => { 
  //   if (socketData != null && socketData != undefined) {
  //     TrackDashboardData = socketData
  //   }
  //   if (relays != null && relays != undefined) {
  //     TrackDashboardRelay = relays
  //     TrackColor = relays.value == 1 ? '#1D6D2A' : relays.value == 0 ? '#FF0000' : '#808080'
  //   }
  // }, [count])

  useEffect(() => {   
    if (trackcircuitid != "") {
      getLastDashboardData();
    }           
  }, [])

  function getLastDashboardData() {
    setPageload(true);
    axiosClient
      .get(
        "/trackcircuit/getstationtrackcircuitfinaldata?stationid=" +
        stationid +
        "&&trackcircuitid=" +
        trackcircuitid
      )
      .then((response) => {
        setPageload(false);
        if (response.data.issuccess === true) {
          setTrackDashboardData(response.data.data)
          //TrackDashboardData = response.data.data      
          let relayobj = {
            relayname : response.data.data.relayname,
            value : response.data.data.value,
            createddate : response.data.data.relaycreateddate
          }        
          TrackDashboardRelay = relayobj 
          TrackColor = response.data.data.value == 1 ? '#1D6D2A' : response.data.data.value == 0 ? '#FF0000' : '#808080'       
        }
      })
      .catch((err) => {
        setPageload(false);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
      console.log('data2',TrackDashboardData)          
  }

  return (
    TrackDashboardData != null ?
      <>
        <div style={{ width: 1249, height: 612, position: 'relative', background: 'white' }}>
          <div style={{ width: 378, height: 0, left: 185, top: 69, position: 'absolute', border: '1px black solid' }}></div>
          <div style={{ width: 378, height: 0, left: 185, top: 142, position: 'absolute', border: '1px black solid' }}></div>
          <div style={{ width: 438, height: 0, left: 236, top: 142, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 454, height: 0, left: 291, top: 69, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 207, height: 0, left: 452, top: 69, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 134, height: 0, left: 507, top: 142, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 968, height: 0, left: 185, top: 580, position: 'absolute', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 968, height: 0, left: 185, top: 523, position: 'absolute', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 89, height: 20, left: 435, top: 276, position: 'absolute', background: TrackColor }} />
          <div style={{ width: 765, height: 0, left: 388, top: 311, position: 'absolute', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 765, height: 0, left: 388, top: 375, position: 'absolute', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 105, height: 0, left: 450, top: 311, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 75, height: 0, left: 401, top: 375, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 611, height: 0, left: 401, top: 447, position: 'absolute', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 562, height: 0, left: 450, top: 415, position: 'absolute', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 34, height: 0, left: 1012, top: 413, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          {/* <div style={{ width: 195, height: 78, left: 279, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>DCTC-C1T</div> */}
          <div style={{ width: 58, height: 0, left: 648, top: 317, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 58, height: 0, left: 691, top: 317, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 60, height: 0, left: 734, top: 315, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 58, height: 0, left: 783, top: 317, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 60, height: 0, left: 828, top: 315, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 57, height: 0, left: 876, top: 318, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 58, height: 0, left: 921, top: 317, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 58, height: 0, left: 970, top: 317, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 60, height: 0, left: 1015, top: 315, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 411, height: 29, left: 628, top: 332, position: 'absolute', background: 'white', borderRadius: 3, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 30, height: 14, left: 634, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 30, height: 14, left: 634, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 34, height: 14, left: 674, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 33, height: 14, left: 719, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 33, height: 14, left: 767, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 33, height: 14, left: 812, top: 338, position: 'absolute', opacity: 0.90, textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 32, height: 14, left: 861, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 33, height: 14, left: 906, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 32, height: 14, left: 955, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <div style={{ width: 34, height: 14, left: 997, top: 338, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>24.2</div>
          <img style={{ width: 24, height: 22, left: 1101, top: 323, position: 'absolute', mixBlendMode: 'multiply', borderRadius: 3 }} src="/ground.png" />
          <div style={{ width: 160, height: 114, left: 1086, top: 488, position: 'absolute', mixBlendMode: 'multiply', background: 'white', borderRadius: 3, border: '1px rgba(0, 0, 0, 0.66) solid' }} />
          <div style={{ width: 89, height: 27, left: 222, top: 466, position: 'absolute', background: 'white', border: '1px rgba(0, 0, 0, 0.66) solid' }} />
          <div style={{ width: 50, height: 12, left: 240, top: 475, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>TFC</div>
          <div style={{ width: 50, height: 0, left: 572, top: 528, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 50, height: 0, left: 618, top: 528, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 50, height: 0, left: 663, top: 528, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 50, height: 0, left: 713, top: 528, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 50, height: 0, left: 762, top: 528, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }}></div>
          <div style={{ width: 252, height: 24, left: 544, top: 541, position: 'absolute', background: 'white', borderRadius: 2, border: '1px rgba(0, 0, 0, 0.66) solid', display: 'none' }} />
          <div style={{ width: 30, height: 14, left: 559, top: 546, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 30, height: 14, left: 604, top: 546, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 28, height: 14, left: 651, top: 546, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 30, height: 14, left: 701, top: 546, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 29, height: 14, left: 749, top: 546, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word', display: 'none' }}>35.8</div>
          <div style={{ width: 16, height: 21, left: 595, top: 317, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 20, left: 639, top: 317, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 23, left: 679, top: 317, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 22, left: 724, top: 317, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 22, left: 773, top: 318, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 22, left: 818, top: 318, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 21, left: 866, top: 318, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 21, left: 911, top: 318, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 21, left: 960, top: 318, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 16, height: 22, left: 1004, top: 317, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 15, height: 20, left: 563, top: 528, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 575, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 15, height: 21, left: 608, top: 528, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 621, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 611, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 15, height: 21, left: 653, top: 528, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 656, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 666, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 15, height: 21, left: 703, top: 528, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 717, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 707, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 15, height: 21, left: 752, top: 528, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid', display: 'none' }} />
          <div style={{ width: 7, height: 6, left: 754, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 764, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 16, height: 21, left: 502, top: 421, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 6, height: 6, left: 504, top: 410, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 16, height: 22, left: 565, top: 421, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 16, height: 22, left: 465, top: 456, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 16, height: 20, left: 552, top: 456, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 14, height: 24, left: 285, top: 169, position: 'absolute', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 14, height: 24, left: 230, top: 169, position: 'absolute', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 14, height: 23, left: 445, top: 169, position: 'absolute', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 15, height: 24, left: 499, top: 169, position: 'absolute', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 88, height: 16, left: 435, top: 276, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 12, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word' }}>{TrackDashboardRelay?.relayname}</div>
          <div style={{ width: 142, height: 17, left: 435, top: 335, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 9, fontFamily: 'Inter', fontWeight: '200', wordWrap: 'break-word' }}>24V DC Busbar</div>
          <div style={{ width: 323, height: 38, left: 459, top: 31, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Location Box</div>
          <div style={{ width: 104, height: 33, left: 524, top: 86, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 105, height: 33, left: 106, top: 86, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 113, height: 31, left: 57, top: 348, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 112, height: 31, left: 57, top: 385, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 100, height: 25, left: 259, top: 527, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 100, height: 25, left: 259, top: 554, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 204, height: 38, left: 47, top: 31, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Location Box</div>
          <div style={{ width: 41, height: 30, left: 525, top: 87, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.relay_voltage}</div>
          <div style={{ width: 106, height: 17, left: 544, top: 92, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 184, height: 26, left: 583, top: 89, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>TR(Vdc)</div>
          <div style={{ width: 6, height: 6, left: 449, top: 171, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 6, height: 7, left: 449, top: 182, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 6, height: 6, left: 504, top: 171, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 6, height: 6, left: 504, top: 185, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 598, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 608, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 642, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 652, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 683, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 693, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 728, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 737, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 776, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 786, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 821, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 831, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 7, height: 6, left: 868, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 7, height: 6, left: 878, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 915, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 7, height: 6, left: 923, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 962, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 972, top: 307, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 1006, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 5, height: 6, left: 1017, top: 306, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 468, top: 445, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 478, top: 445, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 554, top: 445, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 564, top: 445, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 565, top: 518, position: 'absolute', background: 'black', borderRadius: 9999, display: 'none' }} />
          <div style={{ width: 6, height: 6, left: 514, top: 410, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 6, height: 6, left: 568, top: 410, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 578, top: 410, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 234, top: 171, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 234, top: 185, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 289, top: 171, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 6, left: 289, top: 185, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 18, height: 10, left: 499, top: 226, position: 'absolute', background: 'white', border: '2px #6FF4EC solid' }} />
          <div style={{ width: 188, height: 0, left: 515, top: 229, position: 'absolute', border: '0.80px rgba(0, 0, 0, 0.17) solid' }}></div>
          <div style={{ width: 18, height: 10, left: 228, top: 210, position: 'absolute', background: 'white', border: '2px #6FF4EC solid' }} />
          <div style={{ width: 18, height: 10, left: 227, top: 361, position: 'absolute', background: 'white', border: '2px #6FF4EC solid' }} />
          <div style={{ width: 14, height: 24, left: 230, top: 389, position: 'absolute', background: 'white', borderRadius: 5, border: '1px black solid' }} />
          <div style={{ width: 5, height: 6, left: 234, top: 404, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 5, height: 7, left: 234, top: 392, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 6, height: 7, left: 234, top: 426, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 6, height: 8, left: 234, top: 438, position: 'absolute', background: 'black', borderRadius: 9999 }} />
          <div style={{ width: 10, height: 0, left: 236, top: 435, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 163, height: 31, left: 420, top: 531, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>110v AC-Busbar</div>
          <div style={{ width: 44, height: 20, left: 251, top: 528, position: 'absolute', textAlign: 'center', color: '#1D6D2A', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>105</div>
          <div style={{ width: 9, height: 6, left: 290, top: 540, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 6, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 65, height: 12, left: 291, top: 535, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 8, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 100, height: 25, left: 259, top: 527, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 44, height: 20, left: 253, top: 531, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.battery_charger_ac_current}</div>
          <div style={{ width: 9, height: 6, left: 290, top: 538, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 65, height: 12, left: 291, top: 535, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 44, height: 20, left: 253, top: 561, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.battery_charger_ac_voltage}</div>
          <div style={{ width: 9, height: 6, left: 290, top: 568, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 65, height: 12, left: 291, top: 565, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 102, height: 24, left: 693, top: 216, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 44, height: 19, left: 697, top: 217, position: 'absolute', textAlign: 'center', color: '#1D6D2A', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>105</div>
          <div style={{ width: 9, height: 7, left: 734, top: 227, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 6, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 65, height: 12, left: 736, top: 223, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 8, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 102, height: 24, left: 703, top: 216, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 43, height: 19, left: 698, top: 219, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.relay_current}</div>
          <div style={{ width: 22, height: 7, left: 735, top: 225, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>A</div>
          <div style={{ width: 65, height: 12, left: 746, top: 223, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 102, height: 25, left: 703, top: 252, position: 'absolute', background: '#95E8AC', borderRadius: 4, display: 'none' }} />
          <div style={{ width: 44, height: 21, left: 697, top: 254, position: 'absolute', textAlign: 'center', color: '#1D6D2A', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', display: 'none' }}>105</div>
          <div style={{ width: 9, height: 6, left: 734, top: 265, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 6, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'none' }}>v</div>
          <div style={{ width: 65, height: 12, left: 736, top: 260, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 8, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word', display: 'none' }}>{moment(TrackDashboardData.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 102, height: 25, left: 703, top: 252, position: 'absolute', background: '#95E8AC', borderRadius: 4, display: 'none' }} />
          <div style={{ width: 43, height: 21, left: 701, top: 254, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', display: 'none' }}>32.2</div>
          <div style={{ width: 8, height: 6, left: 741, top: 261, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', display: 'none' }}>v</div>
          <div style={{ width: 65, height: 12, left: 742, top: 258, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word', display: 'none' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 98, height: 26, left: 1141, top: 321, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 68, height: 12, left: 1180, top: 331, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 53, height: 20, left: 1135, top: 325, position: 'absolute', textAlign: 'center', color: '#1D6D2A', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>31.4</div>
          <div style={{ width: 9, height: 6, left: 1181, top: 334, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 87, height: 25, left: 1153, top: 530, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 45, height: 21, left: 1148, top: 533, position: 'absolute', textAlign: 'center', color: '#1D6D2A', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>105</div>
          <div style={{ width: 9, height: 6, left: 1184, top: 542, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 65, height: 14, left: 1184, top: 537, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 183, height: 25, left: 762, top: 215, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>TR(Idc)(A)</div>
          <div style={{ width: 183, height: 26, left: 749, top: 251, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', display: 'none' }}>Voltage</div>
          <div style={{ width: 101, height: 25, left: 633, top: 470, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 9, height: 6, left: 664, top: 482, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 6, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 66, height: 13, left: 666, top: 477, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 8, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 101, height: 25, left: 633, top: 470, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 9, height: 6, left: 670, top: 481, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 65, height: 13, left: 672, top: 477, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '300', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 184, height: 27, left: 680, top: 472, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>TRV(Vdc)</div>
          <div style={{ width: 44, height: 21, left: 632, top: 472, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.trv}</div>
          <div style={{ width: 148, height: 23, left: 797, top: 415, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>TO Relay Room</div>
          <div style={{ width: 97, height: 39, left: 324, top: 142, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>240 Meters</div>
          <div style={{ width: 48, height: 30, left: 42, top: 91, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>TF(Vdc)</div>
          <div style={{ width: 40, height: 30, left: 107, top: 91, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.feed_voltage}</div>
          <div style={{ width: 8, height: 6, left: 149, top: 99, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 107, height: 17, left: 129, top: 95, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 109, height: 30, left: 71, top: 197, position: 'absolute', background: '#95E8AC', borderRadius: 4 }} />
          <div style={{ width: 48, height: 29, left: 15, top: 198, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>TF(Idc)(A)</div>
          <div style={{ width: 40, height: 29, left: 72, top: 198, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.feed_current}</div>
          <div style={{ width: 108, height: 17, left: 97, top: 203, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 11, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 23, height: 6, left: 107, top: 211, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>A</div>
          <div style={{ width: 47, height: 0, left: 180, top: 212, position: 'absolute', border: '0.50px #D7D0D0 solid' }}></div>
          <div style={{ width: 59, height: 0, left: 170, top: 363, position: 'absolute', border: '0.50px #D7D0D0 solid' }}></div>
          <div style={{ width: 60, height: 0, left: 170, top: 401, position: 'absolute', border: '0.50px #D7D0D0 solid' }}></div>
          <div style={{ width: 184, height: 27, left: 0, top: 320, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Charger(Idc)(A) </div>
          <div style={{ width: 45, height: 29, left: 54, top: 350, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.battery_charger_dc_current}</div>
          <div style={{ width: 22, height: 6, left: 95, top: 362, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>A</div>
          <div style={{ width: 106, height: 18, left: 86, top: 354, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 42, height: 30, left: 61, top: 387, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>{TrackDashboardData?.battery_charger_dc_voltage}</div>
          <div style={{ width: 10, height: 6, left: 103, top: 399, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
          <div style={{ width: 111, height: 16, left: 83, top: 393, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{moment(TrackDashboardData?.createddate).format("HH:mm:ss")}</div>
          <div style={{ width: 184, height: 27, left: 0, top: 428, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Charger(Vdc)</div>
          <div style={{ width: 184, height: 26, left: 310, top: 530, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Charger(Vac)</div>
          <div style={{ width: 184, height: 26, left: 310, top: 560, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>Charger(Iac)(A)</div>
          <div style={{ width: 92, height: 30, left: 1126, top: 277, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>IPS ROOM</div>
          <div style={{ width: 92, height: 30, left: 1126, top: 488, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>IPS ROOM</div>
          <img style={{ width: 35, height: 53, left: 435, top: 212, position: 'absolute' }} src="/choke.png" />
          <img style={{ width: 37, height: 63, left: 274, top: 219, position: 'absolute' }} src="/choke.png" />
          <img style={{ width: 36, height: 36, left: 219, top: 230, position: 'absolute' }} src="/register.png" />
          <div style={{ width: 55, height: 0, left: 236, top: 320, position: 'absolute', border: '1px black solid' }}></div>
          <img style={{ width: 38, height: 13, left: 244, top: 315, position: 'absolute' }} src="/battery.png" />
          <div style={{ width: 96, height: 25, left: 272, top: 236, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Choke</div>
          <div style={{ width: 93, height: 25, left: 379, top: 225, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Choke</div>
          <div style={{ width: 42, height: 11, left: 949, top: 415, position: 'absolute', background: '#1D6D2A' }} />
          <div style={{ width: 14, height: 0, left: 1113, top: 311, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 160, height: 114, left: 1082, top: 278, position: 'absolute', mixBlendMode: 'multiply', background: 'white', borderRadius: 3, border: '1px rgba(0, 0, 0, 0.66) solid' }} />
          <img style={{ width: 24, height: 21, left: 1115, top: 535, position: 'absolute', mixBlendMode: 'multiply', borderRadius: 3 }} src="/ground.png" />
          <div style={{ width: 13, height: 0, left: 1126, top: 523, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px rgba(0, 0, 0, 0.66) solid' }}></div>
          <div style={{ width: 98, height: 19, left: 1141, top: 347, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 8, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>24v DC EXT-IV</div>
          <div style={{ width: 97, height: 18, left: 1148, top: 555, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 8, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>24v DC EXT-IV</div>
          <div style={{ width: 42.51, height: 0, left: 604.79, top: 301, position: 'absolute', transform: 'rotate(-57.55deg)', transformOrigin: '0 0', border: '0.80px rgba(0, 0, 0, 0.17) solid', display: 'none' }}></div>
          <div style={{ width: 77, height: 0, left: 626, top: 265, position: 'absolute', border: '0.80px rgba(0, 0, 0, 0.17) solid', display: 'none' }}></div>
          <div style={{ width: 31.55, height: 0, left: 560.60, top: 455.40, position: 'absolute', transform: 'rotate(57.17deg)', transformOrigin: '0 0', border: '0.80px rgba(0, 0, 0, 0.17) solid' }}></div>
          <div style={{ width: 55, height: 0, left: 578, top: 482, position: 'absolute', border: '0.80px rgba(0, 0, 0, 0.17) solid' }}></div>
          <div style={{ width: 7.49, height: 0, left: 541.07, top: 409.66, position: 'absolute', transform: 'rotate(49.43deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.49, height: 0, left: 546.77, top: 415.36, position: 'absolute', transform: 'rotate(-49.43deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.49, height: 0, left: 521.11, top: 442.42, position: 'absolute', transform: 'rotate(49.43deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.49, height: 0, left: 526.81, top: 448.11, position: 'absolute', transform: 'rotate(-49.43deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.38, height: 0, left: 499.32, top: 527.14, position: 'absolute', transform: 'rotate(-39.38deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.38, height: 0, left: 499.32, top: 580.17, position: 'absolute', transform: 'rotate(-39.38deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.38, height: 0, left: 497.89, top: 580.17, position: 'absolute', transform: 'rotate(39.38deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 7.38, height: 0, left: 497.89, top: 517.78, position: 'absolute', transform: 'rotate(39.38deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
          <div style={{ width: 9, height: 6, left: 564, top: 99, position: 'absolute', textAlign: 'center', color: '#F90C0C', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>v</div>
        </div>
      </>
      : <></>
  )
}

export default Dashboard;

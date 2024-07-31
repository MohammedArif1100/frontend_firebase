import React, { useEffect, useState } from "react";
import axiosClient from "../../../../Authentication/ApiCall";
import { message } from "antd";
import "./DashboardAxleCounter.css";
const DashboardAxleCounter = ({ axlecounterid, socketData }) => {

  const [RealTimeAxleCounterData, setRealTimeAxleCounterData] = useState([]);
  const [Pageload, setPageload] = useState(false);

  useEffect(() => {
    if (axlecounterid !== "" && (socketData !== undefined || socketData.length > 0)) {
      setRealTimeAxleCounterData(socketData);
    } else {
      getLastDashboardData();
    }
  }, [])

  function getLastDashboardData() {
    setPageload(true);
    axiosClient
      .get("/pointmachine/getstationpointmachine", {
        // params: {
        //   stationid: station_id,
        // },
      })
      .then((response) => {
        setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimeAxleCounterData(response.data.data);
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
  }
  const lineStyle = {
    width: 192,
    height: 630,
    left: 967,
    top: -5,
    position: 'absolute',
    borderLeft: '2px dotted black',
    background: 'none'
  };

  return (
    <>
      <div className="AxeCounterGroup1">
        <div className="AxeCounterRectangle1" />
        <div className="AxeCounterLine1"></div>
        <div className="AxeCounterLine2"></div>
        <div className="AxeCounterRectangle2" />
        <div className="AxeCounterLine3"></div>
        <div className="AxeCounterRectangle3" />
        <div className="AxeCounterLine5"></div>
        <div className="AxeCounterLine7"></div>
        <div className="AxeCounterLine8"></div>
        <div className="AxeCounterLine9"></div>
        <div className="AxeCounterLine10"></div>
        <div className="AxeCounterLine11"></div>
        <div className="AxeCounterLine12"></div>
        <div className="AxeCounterLine14"></div>
        <div className="AxeCounterLine15"></div>
        <div className="AxeCounterLine16"></div>
        <div className="AxeCounterLine17"></div>
        <div className="AxeCounterLine18"></div>
        <div className="AxeCounterLine19"></div>
        <div className="AxeCounterLine20"></div>
        <div className="AxeCounterLine21"></div>
        <div className="AxeCounterLine22"></div>
        <div className="AxeCounterLine23"></div>
        <div className="AxeCounterLine24"></div>
        <div className="AxeCounterLine25"></div>
        <div className="AxeCounterEllipse1" />
        <div className="AxeCounterEllipse2" />
        <div className="AxeCounterEllipse3" />
        <div className="AxeCounterEllipse4" />
        <div className="AxeCounterEllipse5" />
        <div className="AxeCounterEllipse6" />
        <div className="AxeCounterEllipse7" />
        <div className="AxeCounterEllipse8" />
        <div className="AxeCounterEllipse9" />
        <div className="AxeCounterEllipse10" />
        <div className="AxeCounterEllipse11" />
        <div className="AxeCounterEllipse12" />
        <div className="AxeCounterEllipse13" />
        <div className="AxeCounterEllipse14" />
        <div className="AxeCounterP24vDc_1">P 24V DC</div>
        <div className="AxeCounterP24vDc_2">P 24V DC</div>
        <div className="AxeCounterN24vDc_1">N 24V DC</div>
        <div className="AxeCounterN24vDc_2">N 24V DC</div>
        <div className="AxeCounterVpr2_1">VPR2</div>
        <div className="AxeCounterVpr2_2">VPR2</div>
        <div className="AxeCounterVpr1_1">VPR1</div>
        <div className="AxeCounterVpr1_2">VPR1</div>
        <div className="AxeCounterVpr1_3">VPR1</div>
        <div className="AxeCounterVpr1_4">VPR1</div>
        <div className="AxeCounterVpr2_3">VPR2</div>
        <div className="AxeCounterVpr2_4">VPR2</div>
        <div className="AxeCounterPpr1_1">PPR1</div>
        <div className="AxeCounterPpr2_1">PPR2</div>
        <div className="AxeCounterPpr1_2">PPR1</div>
        <div className="AxeCounterPpr2_2">PPR2</div>
        <div className="AxeCounterElectronicLagTimer10sec02To10secResetPulseGenerator">
          Electronic LAG TIMER 10sec & 0.2 to 10sec Reset pulse generator
        </div>
        <div className="AxeCounterAutoResetCounter">Auto Reset Counter</div>
        <div className="AxeCounterRtsr_1">RTSR</div>
        <div className="AxeCounterAutoResetCircuit">Auto Reset circuit</div>
        <div className="AxeCounterLine26"></div>
        <div className="AxeCounterLine27"></div>
        <div className="AxeCounterLine28"></div>
        <div className="AxeCounterLine29"></div>
        <div className="AxeCounterLine30"></div>
        <div className="AxeCounterLine31"></div>
        <div className="AxeCounterLine32"></div>
        <div className="AxeCounterLine33"></div>
        <div className="AxeCounterLine40"></div>
        <div className="AxeCounterLine41"></div>
        <div className="AxeCounterLine42"></div>
        <div className="AxeCounterLine43"></div>
        <div className="AxeCounterLine44"></div>
        <div className="AxeCounterLine45"></div>
        <div className="AxeCounterLine46"></div>
        <div className="AxeCounterLine47"></div>
        <div className="AxeCounterLine48"></div>
        <div className="AxeCounterLine49"></div>
        <div className="AxeCounterEllipse15" />
        <div className="AxeCounterEllipse16" />
        <div className="AxeCounterEllipse17" />
        <div className="AxeCounterEllipse18" />
        <div className="AxeCounterEllipse19" />
        <div className="AxeCounterEllipse20" />
        <div className="AxeCounterEllipse21" />
        <div className="AxeCounterEllipse22" />
        <div className="AxeCounterEllipse23" />
        <div className="AxeCounterEllipse24" />
        <div className="AxeCounterLine50"></div>
        <div className="AxeCounterLine51"></div>
        <div className="AxeCounterLine52"></div>
        <div className="AxeCounterLine53"></div>
        <div className="AxeCounterRectangle4" />
        <div className="AxeCounterRectangle5"></div>
        <div className="AxeCounterRectangle6" />
        <div className="AxeCounterRectangle11" />
        <div className="AxeCounterLine54"></div>
        <div className="AxeCounterLine55"></div>
        <div className="AxeCounterLine56"></div>
        <div className="AxeCounterLine57"></div>
        <div className="AxeCounterLine58"></div>
        <div className="AxeCounterLine59"></div>
        <div className="AxeCounterLine60"></div>
        <div className="AxeCounterRectangle12" />
        <div className="AxeCounterRectangle13"></div>
        <div className="AxeCounterRectangle14" />
        <div className="AxeCounterRectangle15" />
        <div className="AxeCounterLine61"></div>
        <div className="AxeCounterLine62"></div>
        <div className="AxeCounterLine63"></div>
        <div className="AxeCounterEllipse25" />
        <div className="AxeCounterEllipse26" />
        <div className="AxeCounterVr1">VR1</div>
        <div className="AxeCounterVr1_2">VR1</div>
        <div className="AxeCounterPr1_1">PR1</div>
        <div className="AxeCounterPr1_2">PR1</div>
        <div className="AxeCounterVr2_1">VR2</div>
        <div className="AxeCounterVr2_2">VR2</div>
        <div className="AxeCounterPr2_1">PR2</div>
        <div className="AxeCounterPr2_2">PR2</div>
        <div className="AxeCounterToSytem1Reset">To sytem 1 Reset</div>
        <div className="AxeCounterToSystem2Reset">To system 2 Reset</div>
        <div className="AxeCounterMannualResetCircuit">
          Mannual Reset Circuit
        </div>
        <div className="AxeCounterRtsr_2">RTSR</div>
        <div className="AxeCounterRtsr_3">RTSR</div>
        <div className="AxeCounterSmKey">SM Key </div>
        <div className="AxeCounterResetPushButton">Reset Push Button</div>
        <div className="AxeCounterP48vDc">P 48V DC</div>
        <div className="AxeCounterN48vDc">N 48V DC</div>
        <div className="AxeCounterLine86"></div>
        <div className="AxeCounterLine87"></div>
        <div className="AxeCounterLine88"></div>
        <div className="AxeCounterLine89"></div>
        <div className="AxeCounterLine90"></div>
        <div className="AxeCounterLine91"></div>
        <div className="AxeCounterLine92"></div>
        <div className="AxeCounterLine93"></div>
        <div className="AxeCounterLine94"></div>
        <div className="AxeCounterLine95"></div>
        <div className="AxeCounterLine96"></div>
        <div className="AxeCounterLine97"></div>
        <div className="AxeCounterLine98"></div>
        <div className="AxeCounterLine99"></div>
        <div className="AxeCounterLine100"></div>
        <div className="AxeCounterLine101"></div>
        <div className="AxeCounterLine102"></div>
        <div className="AxeCounterLine103"></div>
        <div className="AxeCounterLine104"></div>
        <div className="AxeCounterLine105"></div>
        <div className="AxeCounterLine106"></div>
        <div className="AxeCounterLine107"></div>
        <div className="AxeCounterLine108"></div>
        <div className="AxeCounterLine109"></div>
        <div className="AxeCounterLine110"></div>
        <div className="AxeCounterLine111"></div>
        <div className="AxeCounterLine112"></div>
        <div className="AxeCounterLine113"></div>
        <div className="AxeCounterLine114"></div>
        <div className="AxeCounterLine115"></div>
        <div className="AxeCounterLine116"></div>
        <div className="AxeCounterLine117"></div>
        <div className="AxeCounterLine118"></div>
        <div className="AxeCounterLine119"></div>
        <div className="AxeCounterLine120"></div>
        <div className="AxeCounterLine121"></div>
        <div className="AxeCounterLine122"></div>
        <div className="AxeCounterLine123"></div>
        <div className="AxeCounterLine124"></div>
        <div className="AxeCounterLine125"></div>
        <div className="AxeCounterLine126"></div>
        <div className="AxeCounterLine127"></div>
        <div className="AxeCounterLine128"></div>
        <div className="AxeCounterLine129"></div>
        <div className="AxeCounterRelayRoomResertBox">
          RELAY ROOM / RESERT BOX
        </div>
        <div className="AxeCounterLocation">LOCATION</div>
        <div className="arrow">
          <div className="arrow-shaft"></div>
          <div className="arrow-head"></div>
        </div>
        <div className="arrow_1">
          <div className="arrow-shaft_1"></div>
          <div className="arrow-head_1"></div>
        </div>
        <div className="arrow_2">
          <div className="arrow-shaft_2"></div>
          <div className="arrow-head_2"></div>
        </div>
        <div className="arrow_3">
          <div className="arrow-shaft_3"></div>
          <div className="arrow-head_3"></div>
        </div>
      </div>
    </>
  );
};

export default DashboardAxleCounter;


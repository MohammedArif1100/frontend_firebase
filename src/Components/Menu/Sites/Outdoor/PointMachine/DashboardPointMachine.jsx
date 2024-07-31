import React, { useEffect, useState } from "react";
import "./DashboardPointMachine.css";
import axiosClient from "../../../../Authentication/ApiCall";
import { message } from "antd";

const Dashboard = ({ PointMachineId, socketData }) => {
  const [RealTimePointMachineData, setRealTimePointMachineData] = useState([]);
  const [Pageload, setPageload] = useState(false);



  useEffect(() => {
    if (PointMachineId !== "" && (socketData !== undefined || socketData.length > 0)) {
      setRealTimePointMachineData(socketData);
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
          setRealTimePointMachineData(response.data.data);
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

  return (
    <div className="PMparent-div">
      <div className="PMFrame1" >
        <div className="PMRectangle1" />
        <div className="PMRectangle2" ></div>
        <div className="PMRectangle3" />
        <div className="PMRectangle4" />
        <div className="PMEiBits" >EI BITS</div>
        <div className="PMRelayRoomDlBits">RELAY ROOM(DL BITS)</div>
        <div className="PMPoint50" >POINT-50</div>
        <div className="PMLocationBox7" >LOCATION BOX-7</div>
        <div className="PMLine1" ></div>
        <div className="PMLine2" ></div>
        <div className="PMLine3" ></div>
        <div className="PMLine4" ></div>
        <div className="PMLine5" ></div>
        <div className="PMLine6" ></div>
        <div className="PMLine7" ></div>
        <div className="PMLine8" ></div>
        <div className="PMLine9" ></div>
        <div className="PMLine10"></div>
        <div className="PMLine11" ></div>
        <div className="PMLine12" ></div>
        <div className="PMLine13" ></div>
        <div className="PMLine14" ></div>
        <div className="PMLine15" ></div>
        <div className="PMLine16" ></div>
        <div className="PMLine17" ></div>
        <div className="PMLine18" ></div>
        <div className="PMLine19" ></div>
        <div className="PMLine20" ></div>
        <div className="PMLine21" ></div>
        <div className="PMLine22" ></div>
        <div className="PMLine23" ></div>
        <div className="PMLine24" ></div>
        <div className="PMLine25" ></div>
        <div className="PMLine26" ></div>
        <div className="PMLine27" ></div>
        <div className="PMLine28" ></div>
        <div className="PMLine29" ></div>
        <div className="PMLine30" ></div>
        <div className="PMLine31" ></div>
        <div className="PMLine32" ></div>
        <div className="PMLine33" ></div>
        <div className="PMLine34" ></div>
        <div className="PMLine35" ></div>
        <div className="PMRectangle5" />
        <div className="PMRectangle7" />
        <div className="PMLine36" ></div>
        <div className="PMLine37" ></div>
        <div className="PMLine38"></div>
        <div className="PMLine39" ></div>
        <div className="PMLine40" ></div>
        <div className="PMLine41" ></div>
        <div className="PMLine42" ></div>
        <div className="PMLine43" ></div>
        <div className="PMLine44" ></div>
        <div className="PMLine45" ></div>
        <div className="PMLine47" ></div>
        <div className="PMLine48" ></div>
        <div className="PMLine49" ></div>
        <div className="PMLine50" ></div>
        <div className="PMLine51" ></div>
        <div className="PMLine52" ></div>
        <div className="PMLine53" ></div>
        <div className="PMLine54" ></div>
        <div className="PMLine55" ></div>
        <div className="PMLine56" ></div>
        <div className="PMLine57" ></div>
        <div className="PMLine58" ></div>
        <div className="PMLine59" ></div>
        <div className="PMLine60" ></div>
        <div className="PMLine61" ></div>
        <div className="PMLine62" ></div>
        <div className="PMLine63" ></div>
        <div className="PMLine64" ></div>
        <div className="PMLine65" ></div>
        <div className="PMEllipse1" />
        <div className="PMEllipse2" />
        <div className="PMEllipse3" />
        <div className="PMEllipse4" />
        <div className="PMLine66" ></div>
        <div className="PMLine67" ></div>
        <div className="PMLine68" ></div>
        <div className="PMLine69" ></div>
        <div className="PMLine70" ></div>
        <div className="PMLine71" ></div>
        <div className="PMLine72" ></div>
        <div className="PMLine73" ></div>
        <div className="PMLine74" ></div>
        <div className="PMLine75" ></div>
        <div className="PMLine76" ></div>
        <div className="PMLine77" ></div>
        <div className="PMLine78" ></div>
        <div className="PMLine79" ></div>
        <div className="PMLine80" ></div>
        <div className="PMLine81"></div>
        <div className="PMLine82" ></div>
        <div className="PMLine83" ></div>
        <div className="PMLine84"></div>
        <div className="PMLine85"></div>
        <div className="PMLine86" ></div>
        <div className="PMLine87" ></div>
        <div className="PMLine88" ></div>
        <div className="PMLine89" ></div>
        <div className="PMLine90" ></div>
        <div className="PMLine91" ></div>
        <div className="PMLine92"></div>
        <div className="PMLine93" ></div>
        <div className="PMLine94" ></div>
        <div className="PMLine95" ></div>
        <div className="PMLine96"></div>
        <div className="PMEllipse5" />
        <div className="PMEllipse6" />
        <div className="PMEllipse7" />
        <div className="PMEllipse8" />
        <div className="PMEllipse9" />
        <div className="PMEllipse10" />
        <div className="PMLine97" ></div>
        <div className="PMLine98" ></div>
        <div className="PMLine99" ></div>
        <div className="PMLine100" ></div>
        <div className="PMLine101" ></div>
        <div className="PMLine102" ></div>
        <div className="PMLine103" ></div>
        <div className="PMLine104" ></div>
        <div className="PMLine105" ></div>
        <div className="PMLine106" ></div>
        <div className="PMLine107"  ></div>
        <div className="PMLine108" ></div>
        <div className="PMLine109" ></div>
        <div className="PMLine110" ></div>
        <div className="PMLine111" ></div>
        <div className="PMLine112" ></div>
        <div className="PMLine113" ></div>
        <div className="PMLine114" ></div>
        <div className="PMEllipse11" />
        <div className="PMEllipse12" />
        <div className="PMEllipse13" />
        <div className="PMEllipse14" />
        <div className="PMLine115" ></div>
        <div className="PMLine116" ></div>
        <div className="PMLine117" ></div>
        <div className="PMLine118" ></div>
        <div className="PMLine119" ></div>
        <div className="PMLine120" ></div>
        <div className="PMLine121" ></div>
        <div className="PMLine122" ></div>
        <div className="common-style Wnr">WNR</div>
        <div className="common-style Wcr">WCR</div>
        <div className="common-style Wrr">WRR</div>
        <div className="common-style Nwkpr">NWKPR</div>
        <div className="common-style Nwkpr_1">NWKPR</div>
        <div className="common-style Rwkr">RWKR</div>
        <div className="common-style Kwksr">KWKSR</div>
        <div className="common-style Nwkpr_2">NWKPR</div>
        <div className="common-style Nwkr">NWKR</div>
        <div className="common-style Wcr_1">WCR</div>
        <div className="common-style Nwkr_1">NWKR</div>
        <div className="common-style Wnr_1">WNR</div>
        <div className="common-style Wnpr">WNPR</div>
        <div className="common-style Atpr">ATPR</div>
        <div className="common-style Btpr">BTPR</div>
        <div className="common-style Wnpr_1">WNPR</div>
        <div className="common-style Wnpr_2">WNPR</div>
        <div className="PMRectangle8" />
        <div className="PMRectangle9" />
        <div className="Wrpr">WRPR</div>
        <div className="Wrpr_1">WRPR</div>
        <div className="Atpr_1">ATPR</div>
        <div className="Btpr_1">BTPR</div>
        <div className="Wrr_1">WRR</div>
        <div className="Rwkr_1">RWKR</div>
        <div className="Wnpr_3">WNPR</div>
        <div className="Wnpr_4">WNPR</div>
        <div className="PMRectangle10" />
        <div className="PMRectangle11" />
        <div className="common-style_1 Nwkr_1">NWKR</div>
        <div className="common-style_1 Rwkr_2">RWKR</div>
        <div className="common-style_1 Wrr_2">WRR</div>
        <div className="common-style_1 Wnr_2">WNR</div>
        <div className="common-style_1 Rwkr_3">RWKR</div>
        <div className="common-style_1 Nwkr_2">NWKR</div>
        <div className="common-style_1 Nwpr">NWPR</div>
        <div className="common-style_1 Wnpr_5">WNPR</div>
        <div className="common-style_1 Nwr">NWR</div>
        <div className="common-style_1 Rwpr">RWPR</div>
        <div className="common-style_1 Rwr">RWR</div>
        <div className="common-style_1 Wrpr_2">WRPR</div>
        <div className="common-style_1 NR">N/R</div>
        <div className="common-style_1 BNd">B ND</div>
        <div className="common-style_1 ANd">A ND</div>
        <div className="common-style_1 BNd_1">B ND</div>
        <div className="common-style_1 ANd_1">A ND</div>
        <div className="PMLine123" ></div>
        <div className="PMLine124" ></div>
        <div className="PMLine125" ></div>
        <div className="PMLine126" ></div>
        <div className="PMLine127" ></div>
        <div className="PMLine128" ></div>
        <div className="PMLine129" ></div>
        <div className="PMLine130" ></div>
        <div className="PMLine131" ></div>
        <div className="PMLine133" ></div>
        <div className="PMLine134" ></div>
        <div className="PMLine135" ></div>
        <div className="PMLine136" ></div>
        <div className="PMLine137" ></div>
        <div className="PMLine138" ></div>
        <div className="PMLine139" ></div>
        <div className="PMLine140" ></div>
        <div className="PMLine141" ></div>
        <div className="PMLine142" ></div>
        <div className="PMLine143" ></div>
        <div className="PMLine144" ></div>
        <div className="PMLine145" ></div>
        <div className="PMLine146" ></div>
        <div className="PMLine147" ></div>
        <div className="PMLine148" ></div>
        <div className="PMLine149" ></div>
        <div className="PMLine150" ></div>
        <div className="PMLine151" ></div>
        <div className="PMLine152" ></div>
        <div className="PMLine153" ></div>
        <div className="PMLine154" ></div>
        <div className="PMLine155" ></div>
        <div className="PMLine156" ></div>
        <div className="PMLine157" ></div>
        <div className="PMLine158" ></div>
        <div className="PMLine159" ></div>
        <div className="PMLine160" ></div>
        <div className="PMLine161" ></div>
        <div className="PMLine163" ></div>
        <div className="PMLine164" ></div>
        <div className="PMLine165" ></div>
        <div className="PMLine166" ></div>
        <div className="PMLine167" ></div>
        <div className="PMLine168" ></div>
        <div className="PMLine169" ></div>
        <div className="PMLine171" ></div>
        <div className="PMLine172" ></div>
        <div className="PMLine173" ></div>
        <div className="PMLine174" ></div>
        <div className="PMLine175" ></div>
        <div className="PMLine176" ></div>
        <div className="PMLine177" ></div>
        <div className="PMRectangle12" />
        <div className="Nwr_1">NWR</div>
        <div className="PMRectangle13" />
        <div className="PMRectangle14" />
        <div className="PMRectangle15" />
        <div className="PMRectangle16" />
        <div className="PMRectangle17" />
        <div className="PMRectangle18" />
        <div className="PMRectangle19" />
        <div className="PMRectangle20" />
        <div className="Nwpr_1">NWPR</div>
        <div className="Rwr_1">RWR</div>
        <div className="Rwpr_1">RWPR</div>
        <div className="Atpr_2">ATPR</div>
        <div className="Btpr_2">BTPR</div>
        <div className="Xr">XR</div>
        <div className="WcrA">WCR(A)</div>
        <div className="NR_1">N/R</div>
        <div className="PMRectangle21" />
        <div className="PMWcrB" >WCR(B)</div>
        <div className="PMLine178" ></div>
        <div className="PMLine179" ></div>
        <div className="PMLine180" ></div>
        <div className="PMLine181" ></div>
        <div className="PMLine182" ></div>
        <div className="PMLine183" ></div>
        <div className="PMLine184" ></div>
        <div className="PMLine185" ></div>
        <div className="PMLine186" ></div>
        <div className="PMLine187" ></div>
        <div className="PMLine188" ></div>
        <div className="PMLine189" ></div>
        <div className="PMLine190" ></div>
        <div className="PMLine191" ></div>
        <div className="PMLine192" ></div>
        <div className="PMLine193" ></div>
        <div className="PMLine194" ></div>
        <div className="PMLine195" ></div>
        <div className="PMLine196" ></div>
        <div className="PMLine197" ></div>
        <div className="PMLine198" ></div>
        <div className="PMLine199" ></div>
        <div className="PMLine200" ></div>
        <div className="PMLine201" ></div>
        <div className="PMLine202" ></div>
        <div className="PMLine203" ></div>
        <div className="PMLine204" ></div>
        <div className="PMLine205" ></div>
        <div className="PMLine206" ></div>
        <div className="PMLine207" ></div>
        <div className="PMLine208" ></div>
        <div className="PMLine209" ></div>
        <div className="PMLine210" ></div>
        <div className="PMLine211" ></div>
        <div className="PMLine212" ></div>
        <div className="PMLine213" ></div>
        <div className="PMLine214" ></div>
        <div className="PMLine215" ></div>
        <div className="PMLine216" ></div>
        <div className="PMLine217" ></div>
        <div className="NwkrVoltage">NWKR VOLTAGE</div>
        <div className="PMRectangle22" />
        <div className="PMRectangle23" />
        <div className="NwkrVoltage_1">NWKR VOLTAGE</div>
        <div className="NwkrVoltage_2">23.4</div>
        <div className="V111710">v11:17:10</div>
        <div className="V111710_1">v11:17:10</div>
        <div className="V111710_2">0.32</div>
        <div className="PMRectangle24" />
        <div className="PMLine218" ></div>
        <div className="PMLine219" ></div>
        <div className="PMLine220" ></div>
        <div className="PMLine221" ></div>
        <div className="PMLine222" ></div>
        <div className="PMLine223" ></div>
        <div className="Current">Current</div>
        <div className="Voltage">Voltage</div>
        <div className="PMNoteFieldCircuitAreShownInSignalCutti" >Note: Field Circuit are Shown in Signal Cutti</div>
        <div className="FrontContact">Front Contact</div>
        <div className="RelayUp">Relay UP</div>
        <div className="BackContact">Back Contact</div>
        <div className="RelayDown">Relay Down</div>
        <div className="E1BitsDown">E1 Bits Down</div>
        <div className="E1BitsUp">E1 Bits UP</div>
        <div className="PMLine224" ></div>
        <div className="PMLine225" ></div>
        <div className="PMLine226" ></div>
        <div className="PMLine227" ></div>
        <div className="PMLine228" ></div>
        <div className="PMLine229" ></div>
        <div className="PMRectangle25" />
        <div className="PMRectangle26" />
        <div className="PMPointMachine" >Point Machine</div>
        <div className="PMANormal" >A Normal</div>
        <div className="PMAReverse" >A Reverse</div>
        <div className="PMBNormal" >B Normal</div>
        <div className="PMBReverse" >B Reverse</div>
        <div className="PMValue PMValue_0">0</div>
        <div className="PMValue PMValue_1">0</div>
        <div className="PMValue PMValue_2">0</div>
        <div className="PMValue PMValue_3">0.00</div>
        <div className="PMValue PMValue_4">0.00</div>
        <div className="PMValue PMValue_5">0</div>
        <div className="PMValue PMValue_6">0</div>
        <div className="PMValue PMValue_7">0</div>
        <div className="PMValue_8">07:28:36</div>
        <div className="PMValue_9">07:28:37</div>
        <div className="PMValue_10">07:28:38</div>
        <div className="PMValue_11">07:28:39</div>
        <div className="PMValue_12">07:28:46</div>
        <div className="PMValue_13">07:28:47</div>
        <div className="PMValue_14">07:28:48</div>
        <div className="PMValue_15">07:28:49</div>
        <div className="PMLine230" ></div>
        <div className="PMLine231" ></div>
        <div className="PMLine232" ></div>
        <div className="PMLine233" ></div>
        <div className="PMLine234" ></div>
        <div className="PMLine235" ></div>
        <div className="PMLine236" ></div>
        <div className="PMLine237" ></div>
        <div className="PMLine238" ></div>
        <div className="PMEllipse15" />
        <div className="PMEllipse16" />
        <div className="PMEllipse17" />
        <div className="PMEllipse18" />
        <div className="PMEllipse19" />
        <div className="PMEllipse20" />
        <div className="PMEllipse21" />
        <div className="PMLine239" ></div>
        <div className="PMLine240" ></div>
        <div className="PMLine241" ></div>
        <div className="PMLine242" ></div>
        <div className="PMLine243" ></div>
        <div className="PMLine244" ></div>
        <div className="PMLine245" ></div>
        <div className="PMLine246" ></div>
        <div className="PMLine247" ></div>
        <div className="PMLine248" ></div>
        <div className="PMLine249" ></div>
        <div className="PMLine250" ></div>
        <div className="PMLine251" ></div>
        <div className="PMLine252" ></div>
        <div className="PMLine253" ></div>
        <div className="PMLine254" ></div>
        <div className="PMLine255" ></div>
        <div className="PMLine256" ></div>
        <div className="PMLine257" ></div>
        <div className="PMLine258" ></div>
        <div className="PMLine259" ></div>
        <div className="PMLine260" ></div>
        <div className="PMLine261" ></div>
        <div className="PMLine262" ></div>
        <div className="PMLine263" ></div>
        <div className="PMLine264" ></div>
        <div className="PMLine265" ></div>
        <div className="PMLine266" ></div>
        <div className="PMLine267" ></div>
        <div className="PMLine268" ></div>
        <div className="PMLine269" ></div>
        <div className="PMLine270" ></div>
        <div className="PMLine271" ></div>
      </div>
    </div>
  );
}

export default Dashboard;
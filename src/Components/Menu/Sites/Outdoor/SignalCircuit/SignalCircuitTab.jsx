import React, { useState, useEffect } from "react";
import {
  Layout, Row, Col, Card, Typography, Divider, Modal, Label,
  Input,
  Select,
  Cascader,
  Form,
  Checkbox,
  message,
  Tooltip as tp,
  Button,
  Tabs,
  Switch,
  DatePicker,
  TimePicker,
  Image,
  List,
  Popover,
  Skeleton, ConfigProvider, Table,
  Empty,
  Spin
} from "antd";
import Title from "antd/es/skeleton/Title";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../../../Authentication/ApiCall";
import authService from "../../../../Authentication/authService";
import moment from "moment/moment";
import { useSelector, useDispatch } from "react-redux";
import { signalcircuit_data, relay_data } from "../../../../../features/Notification";
import TabPane from "antd/es/tabs/TabPane";
import * as FileSaver from "file-saver";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import {
  PlayCircleOutlined,
  UserOutlined,
  DownOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LoadingOutlined,
  OrderedListOutlined,
  GroupOutlined,
  DownSquareOutlined,
  WarningOutlined,
  CloudDownloadOutlined,
  LineChartOutlined,
  InfoCircleOutlined,

} from "@ant-design/icons";
import ReactApexChart from 'react-apexcharts';
import ClipLoader from "react-spinners/ClipLoader";
import { ImArrowRight, ImArrowLeft, ImArrowUp, ImArrowDown } from "react-icons/im";
import "./TwoAspectSignalCircuitRGDG.css";
import "./TwoAspectSignalCircuitRGHG.css";
import "./ThreeAspectCircuit.css";
import "./CallOnRouteLeftSignalCircuit.css";
import "./CallOnRouteRightSignalCircuit.css";
import './ThreeAspectDistantPCircuit.css';
import './ShuntSignalCircuit.css';

const { Content } = Layout;
const { Meta } = Card;
const { Text } = Typography;
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;


function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}

function NormalLight({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="normaltraffic-light"
      style={{ backgroundColor }}
    />
  );
}

function DistantLight({ backgroundColor }) {
  return (
    <div className="distant">
      <span className="circle1" style={{ backgroundColor }}></span>
      <span className="circle2">
        <span
          style={{
            fontSize: "13px",
            position: "absolute",
            bottom: "1px",
            left: "2px",
          }}
        >
          C
        </span>
      </span>
    </div>
  );
}

function NormalDistantLight({ backgroundColor }) {
  return (
    <div className="distant">
      <span className="circleP">
        <span
          style={{
            fontSize: "13px",
            position: "absolute",
            bottom: "1px",
            left: "2px",
            fontWeight: "bold",
          }}
        >
          P
        </span>
      </span>
    </div>
  );
}

function ShuntLight({ backgroundColor }) {
  return (
    <div className="distant">
      <div className="shuntlight">
        <div className="dot1 top-left1"></div>
        <div className="dot1 bottom-right1"></div>
        <div className="dot1 bottom-left1"></div>
      </div>
    </div>
  );
}

const PlatformLight = ({ backgroundColor }) => {
  return (
    <div
      aria-hidden={true}
      className="traffic-light-platform"
      style={{ backgroundColor }}
    />
  );
};

const Octagon = ({ backgroundColor }) => {
  return (
    <>
      <div className="octagon">
        <div className="distantO"></div>
      </div>
      <div className="circle" style={{ backgroundColor }}></div>
    </>
  );
};

const Octagon1 = ({ backgroundColor }) => {
  return (
    <>
      <div className="octagon1">
        <div className="distantO"></div>
      </div>
      <div className="circle11" style={{ backgroundColor }}></div>
    </>
  );
};

function DistantLightO() {
  return <div className="distantL"></div>;
}

const Octagon13 = ({ backgroundColor }) => {
  return (
    <>
      <div className="octagon13">
        <div className="distantO"></div>
      </div>
      <div className="circle13" style={{ backgroundColor }}></div>
    </>
  );
};

function NormalDistantLightTwoAspect({ backgroundColor }) {
  return (
    <div className="distant_2">
      <span className="circleP_2">
        <span
          style={{
            fontSize: "13px",
            position: "absolute",
            bottom: "1px",
            left: "2px",
            fontWeight: "bold",
          }}
        >
          P
        </span>
      </span>
    </div>
  );
}

function SingleLightWithRoute({ backgroundColor }) {
  return (
    <div className="distant_3">
      <span className="circleP_3" style={{ backgroundColor }}>
      </span>
    </div>
  );
}

function SingleLightWithRouteNormal({ backgroundColor }) {
  return (
    <div className="distant_3">
      <span className="circleP_3" style={{ backgroundColor }}>
      </span>
    </div>
  );
}

function NormalDistantLightWithP({ backgroundColor }) {
  return (
    <div className="distant_P">
      <span className="circleP_P">
        <span
          style={{
            fontSize: "13px",
            position: "absolute",
            bottom: "1px",
            left: "2px",
            fontWeight: "bold",
          }}
        >
          P
        </span>
      </span>
    </div>
  );
}

function DistantLight1() {
  return <div className="distantL_yellow"></div>;
}


const alert_table_column = [
  {
    title: "Date",
    dataIndex: "createddate",
    key: "createddate",
    //responsive: ["md"],
    render: (_, record) => {
      return (
        <Text>
          {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      );
    },
  },
  {
    title: "Mode",
    dataIndex: "modeid",
    key: "modeid",
    // responsive: ["md"],
    render: (_, record) => {
      return (
        <Text>
          {record.modeid === 3 ? "Critical" : record.modeid === 2 ? "Major" : record.modeid === 1 ? "Minor" : ""}
        </Text>
      );
    },
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    //responsive: ["md"],
  },
];

const data_table_columns = [
  {
    title: "Date",
    dataIndex: "createddate",
    key: "createddate",
    //responsive: ["md"],
    sorter: (a, b) => a.createddate - b.createddate,
    sortDirections: ["descend", "ascend"],
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
    //responsive: ["md"],
    sorter: (a, b) => a.signal_aspect - b.signal_aspect,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Aspect Current(Iac)(A)",
    dataIndex: "aspect_current",
    key: "aspect_current",
    //responsive: ["md"],
    sorter: (a, b) => a.aspect_current - b.aspect_current,
    sortDirections: ["descend", "ascend"],
    render: (_, record) => {
      return (
        <Text>
          {record.aspect_current}
        </Text>
      );
    },

  },
  {
    title: "Aspect Voltage(Vac)",
    dataIndex: "aspect_voltage",
    key: "aspect_voltage",
    //responsive: ["md"],
    sorter: (a, b) => a.aspect_voltage - b.aspect_voltage,
    sortDirections: ["descend", "ascend"],
    render: (_, record) => {
      return (
        <Text>
          {record.aspect_voltage}
        </Text>
      );
    },
  },
];

const data_log_table_columns = [
  {
    title: "Date",
    dataIndex: "createddate",
    key: "createddate",
    //responsive: ["md"],
    sorter: (a, b) => a.createddate - b.createddate,
    sortDirections: ["descend", "ascend"],
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
    //responsive: ["md"],
    sorter: (a, b) => a.signal_aspect - b.signal_aspect,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Aspect Current(Iac)(A)",
    dataIndex: "aspect_current",
    key: "aspect_current",
    //responsive: ["md"],
    sorter: (a, b) => a.aspect_current - b.aspect_current,
    sortDirections: ["descend", "ascend"],
    render: (_, record) => {
      return (
        <Text>
          {record.aspect_current}
        </Text>
      );
    },

  },
  {
    title: "Aspect Voltage(Vac)",
    dataIndex: "aspect_voltage",
    key: "aspect_voltage",
    //responsive: ["md"],
    sorter: (a, b) => a.aspect_voltage - b.aspect_voltage,
    sortDirections: ["descend", "ascend"],
    render: (_, record) => {
      return (
        <Text>
          {record.aspect_voltage}
        </Text>
      );
    },
  },
];

const SignalCircuitTab = ({ layout = "vertical", values }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var station_id = values.station_id;
  var station_name = values.station_name;

  const navigate = useNavigate();
  const [GreenColor, setGreencolor] = useState("#0EFF00");
  const [RedColor, setRedcolor] = useState("#FF0000");
  const [YellowColor, setYellowcolor] = useState("#FFEA00");
  const [LightYellowColor, setLightYellowcolor] = useState("#FDFA72");
  const [greyColor, setgreyColor] = useState("#808080");
  const [WhiteColor, setWhiteColor] = useState("#f0f0f0");
  const [isAlertRealDataModalOpen, setisAlertRealDataModalOpen] = useState(false);
  const [SignalCircuitListName, setSignalCircuitListName] = useState([]);
  const [SignalCircuitList, setSignalCircuitList] = useState([]);
  const [SignalCircuitData, setSignalCircuitData] = useState([]);
  const [RealTimeSignalcircuitData, setRealTimeSignalcircuitData] = useState([]);
  const [RealTimeSignalcircuitAlert, setRealTimeSignalcircuitAlert] = useState([]);
  const [datastartDatepicker, setDatastartDatepicker] = useState();
  const [dataendDatepicker, setDataendDatepicker] = useState();
  const [signalcircuitid, setsignalcircuitid] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const [TabId, setTabId] = useState('1');
  const [loading, setloading] = useState(false);
  const [graphSingleDatepicker, setgraphSingleDatepicker] = useState(null);
  const [graphTimepicker, setgraphTimepicker] = useState([null, null]);
  const [SignalName, setSignalName] = useState("");
  const [form] = Form.useForm();
  const [refresh, setrefresh] = useState(0);
  const [DataPageTotal, setDataPageTotal] = useState(10);
  const [RealTimeDataPageTotal, setRealTimeDataPageTotal] = useState(10);
  const [RealTimeAlertPageTotal, setRealTimeAlertPageTotal] = useState(10);
  const [AlertPageTotal, setAlertPageTotal] = useState(10);
  const [DataPageNo, setDataPageNo] = useState(1);
  const [AlertPageNo, setAlertPageNo] = useState(1);
  const [RealTimeDataPageNo, setRealTimeDataPageNo] = useState(1);
  const [RealTimeAlertPageNo, setRealTimeAlertPageNo] = useState(1);
  const [alertstartDatepicker, setAlertstartDatepicker] = useState();
  const [alertendDatepicker, setAlertendDatepicker] = useState();
  const [graphstartDatepicker, setGraphstartDatepicker] = useState("");
  const [graphendDatepicker, setGraphendDatepicker] = useState();
  const [SignalCircuitAlert, setSignalCircuirAlert] = useState([]);
  const [SignalCircuitGraphData, setSignalCircuitGraphData] = useState([]);
  const [datareportloading, setdatareportloading] = useState(false);
  const [alertreportloading, setalertreportloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("2");
  const [Pageload, setPageload] = useState(false);
  const [AspectTypeId, setAspectTypeId] = useState(false);
  const [relayList, setrelayList] = useState([]);
  const [RealTimeSignalDashboardData, setRealTimeSignalDashboardData] = useState(null);
  const [SignalRelayDPR, setSignalRelayDPR] = useState(null);
  const [SignalRelayDECPR, setSignalRelayDECPR] = useState(null);
  const [SignalRelayRECPR, setSignalRelayRECPR] = useState(null);
  const [SignalRelayHPR, setSignalRelayHPR] = useState(null);
  const [SignalRelayHECPR, setSignalRelayHECPR] = useState(null);
  const [SignalRelayHHECPR, setSignalRelayHHECPR] = useState(null);
  const [SignalRelayHHPR, setSignalRelayHHPR] = useState(null);

  const handleAlertRealData = () => {
    setisAlertRealDataModalOpen(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setsignalcircuitid("")
    setRealTimeSignalcircuitData([])
    setRealTimeSignalcircuitAlert([])
    setrelayList([])
    setOpenModal(false);
  };

  const dispatch = useDispatch();

  const socket_data = useSelector(
    (state) => state.signalcircuit_data.signalcircuitdata
  );

  if (socket_data.data.length > 0) {
    //setSignalCircuitList(socket_data.data[0].signals);
    if (signalcircuitid !== "") {
      if (socket_data.data[0].data_logs.signalcircuitid === signalcircuitid) {
        var datalogstable = [];
        datalogstable.push(socket_data.data[0].data_logs);
        RealTimeSignalcircuitData.length >= 10 ? RealTimeSignalcircuitData.pop() : <></>
        datalogstable = datalogstable.concat(RealTimeSignalcircuitData);
        if (datalogstable.length > 10) {
          datalogstable = datalogstable.slice(0, 10);
        }
        setRealTimeSignalcircuitData(datalogstable);
        setRealTimeSignalDashboardData(socket_data.data[0].data_logs);
      }
    }
    if (signalcircuitid !== "" && socket_data.data[0].alerts.length > 0) {
      if (socket_data.data[0].alerts[0].signalcircuitid === signalcircuitid) {
        var alertlogtable = [];
        socket_data.data[0].alerts.forEach(item => alertlogtable.push(item))
        // alertlogtable.push(socket_data.data[0].alerts[0]);  
        RealTimeSignalcircuitAlert.length >= 10 ? RealTimeSignalcircuitAlert.pop() : <></>
        alertlogtable = alertlogtable.concat(RealTimeSignalcircuitAlert);
        setRealTimeSignalcircuitAlert(alertlogtable);
      }
    }
    var index = SignalCircuitList.findIndex(x => x.id === socket_data.data[0].data_logs.signalcircuitid)
    if (index != -1) {
      // SignalCircuitList[index].signalcircuitdataid = socket_data.data[0].data_logs.id
      // SignalCircuitList[index].signalname = socket_data.data[0].data_logs.signalname
      // SignalCircuitList[index].modeid = socket_data.data[0].alertmodeid
      // SignalCircuitList[index].greenvoltage = socket_data.data[0].data_logs.greenvoltage
      // SignalCircuitList[index].greencurrent = socket_data.data[0].data_logs.greencurrent
      // SignalCircuitList[index].redvoltage = socket_data.data[0].data_logs.redvoltage
      // SignalCircuitList[index].redcurrent = socket_data.data[0].data_logs.redcurrent
      // SignalCircuitList[index].yellowvoltage = socket_data.data[0].data_logs.yellowvoltage
      // SignalCircuitList[index].yellowcurrent = socket_data.data[0].data_logs.yellowcurrent
      // SignalCircuitList[index].lightyellowvoltage = socket_data.data[0].data_logs.lightyellowvoltage
      // SignalCircuitList[index].lightyellowcurrent = socket_data.data[0].data_logs.lightyellowcurrent
      // SignalCircuitList[index].whitevoltage = socket_data.data[0].data_logs.whitevoltage
      // SignalCircuitList[index].whitecurrent = socket_data.data[0].data_logs.whitecurrent
      // SignalCircuitList[index].signal_aspect = socket_data.data[0].data_logs.signal_aspect
      // SignalCircuitList[index].aspect_voltage = socket_data.data[0].data_logs.aspect_voltage
      // SignalCircuitList[index].aspect_current = socket_data.data[0].data_logs.aspect_current
      // SignalCircuitList[index].index_score = socket_data.data[0].data_logs.index_score
      // SignalCircuitList[index].gui = socket_data.data[0].data_logs.gui
      // SignalCircuitList[index].createddate = socket_data.data[0].data_logs.createddate

      const updatedList = SignalCircuitList.map(item => {
        if (item.id === socket_data.data[0].data_logs.signalcircuitid) {
          return {
            ...item,
            signalcircuitdataid: socket_data.data[0].data_logs.id,
            signalname: socket_data.data[0].data_logs.signalname,
            modeid: socket_data.data[0].alertmodeid,
            greenvoltage: socket_data.data[0].data_logs.greenvoltage,
            greencurrent: socket_data.data[0].data_logs.greencurrent,
            redvoltage: socket_data.data[0].data_logs.redvoltage,
            redcurrent: socket_data.data[0].data_logs.redcurrent,
            yellowvoltage: socket_data.data[0].data_logs.yellowvoltage,
            yellowcurrent: socket_data.data[0].data_logs.yellowcurrent,
            lightyellowvoltage: socket_data.data[0].data_logs.lightyellowvoltage,
            lightyellowcurrent: socket_data.data[0].data_logs.lightyellowcurrent,
            whitevoltage: socket_data.data[0].data_logs.whitevoltage,
            whitecurrent: socket_data.data[0].data_logs.whitecurrent,
            signal_aspect: socket_data.data[0].data_logs.signal_aspect,
            aspect_voltage: socket_data.data[0].data_logs.aspect_voltage,
            aspect_current: socket_data.data[0].data_logs.aspect_current,
            index_score: socket_data.data[0].data_logs.index_score,
            gui: socket_data.data[0].data_logs.gui,
            createddate: socket_data.data[0].data_logs.createddate
          };
        }
        return item;
      });

      updatedList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.signalname.localeCompare(b.signalname);
      });
      setSignalCircuitList(updatedList);
    }
    else {
      SignalCircuitList.push({
        id: socket_data.data[0].data_logs.signalcircuitid,
        signalcircuitdataid: socket_data.data[0].data_logs.id,
        signalname: socket_data.data[0].data_logs.signalname,
        modeid: socket_data.data[0].data_logs.alertmodeid,
        aspecttypeid: socket_data.data[0].data_logs.aspecttypeid,
        terminal: socket_data.data[0].data_logs.terminal,
        greenvoltage: socket_data.data[0].data_logs.greenvoltage,
        greencurrent: socket_data.data[0].data_logs.greencurrent,
        redvoltage: socket_data.data[0].data_logs.redvoltage,
        redcurrent: socket_data.data[0].data_logs.redcurrent,
        yellowvoltage: socket_data.data[0].data_logs.yellowvoltage,
        yellowcurrent: socket_data.data[0].data_logs.yellowcurrent,
        lightyellowvoltage: socket_data.data[0].data_logs.lightyellowvoltage,
        lightyellowcurrent: socket_data.data[0].data_logs.lightyellowcurrent,
        whitevoltage: socket_data.data[0].data_logs.whitevoltage,
        whitecurrent: socket_data.data[0].data_logs.whitecurrent,
        signal_aspect: socket_data.data[0].data_logs.signal_aspect,
        aspect_voltage: socket_data.data[0].data_logs.aspect_voltage,
        aspect_current: socket_data.data[0].data_logs.aspect_current,
        index_score: socket_data.data[0].data_logs.index_score,
        gui: socket_data.data[0].data_logs.gui,
        createddate: socket_data.data[0].data_logs.createddate,
        isdele: socket_data.data[0].data_logs.isdele,
      });
      SignalCircuitList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.signalname.localeCompare(b.signalname);
      });
    }
    if (socket_data.data[0].data_logs.signalcircuitid === signalcircuitid) {
      setSignalCircuitGraphData((prevData) => [...prevData, socket_data.data[0].data_logs]);
    }
    //setrefresh(refresh + 1);
    dispatch(signalcircuit_data({ data: [] }));
  }

  const socket_relay_data = useSelector(
    (state) => state?.relay_data?.relaydata
  );

  // socket data functions //
  if (socket_relay_data?.data.length > 0) {
    var dataLogList = JSON.parse(socket_relay_data.data[0].data_logs);

    var relaylist_map = new Map(relayList.map(item => [item.id, item]))
    dataLogList.forEach(obj => {      
      if (relaylist_map.has(obj.relayid)) {
        Object.assign(relaylist_map.get(obj.relayid), obj)           
      }
      else {
        relayList.push({
          id: obj.relayid,
          relayname: obj.relayname,
          relaydataid: null,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate,
          isdele: obj.isdele
        })
      }
      if (obj.relayname == SignalName + "DR") {
        setSignalRelayDPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      }     
      if (obj.relayname == SignalName + "DECPR") {
        setSignalRelayDECPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      }   
      if (obj.relayname == SignalName + "RECPR") {
        setSignalRelayRECPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      }   
      if (obj.relayname == SignalName + "HR") {
        setSignalRelayHPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      }   
      if (obj.relayname == SignalName + "HECPR") {
        setSignalRelayHECPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      }  
      if (obj.relayname == SignalName + "HHECPR") {
        setSignalRelayHHECPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      }  
      if (obj.relayname == SignalName + "HHR") {
        setSignalRelayHHPR({
          id: obj.relayid,
          relayname: obj.relayname,
          assertsid: obj.assertsid,
          value: obj.value,
          createddate: obj.createddate
        })
      } 
    });
    relayList.sort((a, b) => b.value - a.value).sort((a, b) => b.relayname - a.relayname)
    //dispatch(relay_data({ data: [] }));
  }

  useEffect(() => {
    setloading(true);
    setPageload(true);
    axiosClient
      .get("/signalcircuit/getstationsignalcircuit", {
        params: {
          stationid: station_id,
        },
      })
      .then((response) => {
        if (response.data.issuccess === true) {
          setSignalCircuitList(response.data.data);
          setloading(false);
          setPageload(false);
        }
      })
      .catch((err) => {
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
          setloading(false);
        } else {
          message.error(err.msg);
          setloading(false);
        }
        setPageload(false);
      });
  }, [refresh]);

  const HandleDatePicker = (start, end, page, size, msg) => {
    if (msg === "Data") {
      setloading(true);
      axiosClient
        .get(
          "/signalcircuit/getstationsignalcircuitdata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&signalcircuitid=" +
          signalcircuitid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setSignalCircuitData(response.data.data);
          } else {
            setloading(false);
            message.error(response.data.msg);
          }
        })
        .catch((err) => {
          //console.log("errr", err);
          if (err.status === 0) {
            message.error("Server error");
            setloading(false);
          } else {
            message.error(err.msg);
            setloading(false);
          }
        });
    } else {
      setloading(true);
      axiosClient
        .get(
          "/signalcircuit/getstationsignalcircuitalert?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&signalcircuitid=" +
          signalcircuitid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setAlertPageTotal(response.data.totaldatacount);
            setAlertPageNo(response.data.page);
            setloading(false);
            setSignalCircuirAlert(response.data.data);
          } else {
            setloading(false);
            message.error(response.data.msg);
          }
        })
        .catch((err) => {
          //console.log("errr", err);
          if (err.status === 0) {
            message.error("Server error");
            setloading(false);
          } else {
            message.error(err.msg);
            setloading(false);
          }
        });
    }
  };

  const ReportDownloadData = () => {
    var start = datastartDatepicker ? datastartDatepicker : "";
    var end = dataendDatepicker ? dataendDatepicker : "";
    setdatareportloading(true);
    axiosClient
      .get(
        "/signalcircuit/downloadsignalcircuitdatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid,
        { responseType: "blob" }
      )
      .then((r) => {
        // setReportData(r.data.data);
        ////console.log("res", r.data);
        if (r.status === 200) {
          var blob = new Blob([r.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          ////console.log("blb", blob);
          const showTime = moment().format('YYYY-MMM-DD_HH_mm_ss')
          FileSaver.saveAs(blob, "SignalCircuitDataReport_" + showTime + ".xlsx");
          setdatareportloading(false);
        }
        else {
          message.error("Data not found");
        }
      })
      .catch((err) => {
        setdatareportloading(false);
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Network Error");
        } else {
          return message.error(err.msg);
        }
        return message.error(err);
      });
  };

  const ReportDownloadAlert = () => {
    var start = alertstartDatepicker ? alertstartDatepicker : "";
    var end = alertendDatepicker ? alertendDatepicker : "";
    setalertreportloading(true);
    axiosClient
      .get(
        "/signalcircuit/downloadsignalcircuitalertreport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid,
        { responseType: "blob" }
      )
      .then((r) => {
        // setReportData(r.data.data);
        ////console.log("res", r.data);
        if (r.status === 200) {
          var blob = new Blob([r.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          ////console.log("blb", blob);
          const showTime = moment().format('YYYY-MMM-DD_HH_mm_ss')
          FileSaver.saveAs(
            blob,
            "SignalCircuitAlertReport_" + showTime + ".xlsx"
          );
          setalertreportloading(false);
        }
        else {
          message.error("Data not found");
        }
      })
      .catch((err) => {
        setalertreportloading(false);

        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Network Error");
        } else {
          return message.error(err.msg);
        }
        return message.error(err);
      });
  };

  const onFinishData = (value) => {
    setloading(false);
    let startDate =
      value.datadate === undefined ||
        value.datadate === null ||
        value.datadate === ""
        ? ""
        : value.datadate[0].format("YYYY-MM-DD");
    let endDate =
      value.datadate === undefined ||
        value.datadate === null ||
        value.datadate === ""
        ? ""
        : value.datadate[1].format("YYYY-MM-DD");
    // moment(values.datadate[1]).format("YYYY-MM-DD");

    // form.setFieldsValue({ date: ["startDate", endDate] });
    setDatastartDatepicker(startDate);
    setDataendDatepicker(endDate);

    HandleDatePicker(startDate, endDate, 1, 10, "Data");

    // HandleDownload(
    //   startDate,
    //   endDate
    // );
  };

  const onFinishAlert = (values) => {
    setloading(false);
    let startDate =
      values.alertdate === undefined ||
        values.alertdate === null ||
        values.alertdate === ""
        ? ""
        : values.alertdate[0].format("YYYY-MM-DD");
    let endDate =
      values.alertdate === undefined ||
        values.alertdate === null ||
        values.alertdate === ""
        ? ""
        : values.alertdate[1].format("YYYY-MM-DD");
    // moment(values.alertdate[1]).format("YYYY-MM-DD");

    // form.setFieldsValue({ date: ["startDate", endDate] });
    setAlertstartDatepicker(startDate);
    setAlertendDatepicker(endDate);

    HandleDatePicker(startDate, endDate, 1, 10, "Alert");

    // HandleDownload(
    //   startDate,
    //   endDate
    // );
  };

  const HanldeSingleDatePicker = (date) => {
    setgraphSingleDatepicker(date.format("YYYY-MM-DD"));
  };

  const HanldeTimePicker = (time) => {
    setgraphTimepicker(time);
  };

  const HandleTime = () => {
    const date = graphSingleDatepicker;
    const Fromtime = graphTimepicker[0].format("HH:mm");
    const Totime = graphTimepicker[1].format("HH:mm");

    axiosClient
      .get(
        "/signalcircuit/getstationsignalcircuitdatagraph?date=" +
        date +
        "&&from_time=" +
        Fromtime +
        "&&to_time=" +
        Totime +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          //console.log(response.data.data);
          // setloading(false);
          setSignalCircuitGraphData(response.data.data);
        } else {
          message.error(response.data.msg);
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
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
    setTabId(key);
    if (key === "2") {
      getCurrentData("");
    } else if (key === "3") {
      getCurrentAlert();
    } else if (key === "4") {
      setSignalCircuitGraphData([]);
    } else if (key === "5") {
      getSignalDataLogs();
    } else if (key === "6") {
      getsignalAlertLogs();
    } else if (key === "7") {
      getRelayList();
    } else if (key === "1") {
      getRelayList();
      getSignalDashboardData();
    }

  };

  function onclickCard(values) {
    // console.log("valuesSignal>>>.",values);
    setSignalName(values.signalname);
    setsignalcircuitid(values.id);
    setOpenModal(true);
    getCurrentData(values.id);
    setActiveTab("2");
    setAspectTypeId(values.aspecttypeid)
  }

  function getCurrentData(value) {
    var val = value !== "" ? value : signalcircuitid;
    axiosClient
      .get(
        "/signalcircuit/getstationsignalcircuitcurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        val
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setRealTimeSignalcircuitData(response.data.data);
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
  }

  function getCurrentAlert() {
    axiosClient
      .get(
        "/signalcircuit/getstationsignalcircuitcurrentalert?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeAlertPageTotal(response.data.totaldatacount);
          setRealTimeAlertPageNo(response.data.page);
          setRealTimeSignalcircuitAlert(response.data.data);
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
  }

  function getSignalDataLogs() {
    setloading(true);
    axiosClient
      .get(
        "/signalcircuit/getstationsignalcircuitdata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setSignalCircuitData(response.data.data);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
          setloading(false);
        } else {
          message.error(err.msg);
          setloading(false);
        }
      });
  }

  function getsignalAlertLogs() {
    setloading(true);
    axiosClient
      .get(
        "/signalcircuit/getstationsignalcircuitalert?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setAlertPageTotal(response.data.totaldatacount);
          setAlertPageNo(response.data.page);
          setloading(false);
          setSignalCircuirAlert(response.data.data);
        } else {
          setloading(false);
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
          setloading(false);
        } else {
          message.error(err.msg);
          setloading(false);
        }
      });
  }

  const chartOptions = {
    // Define your chart options here
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    series: [
      {
        name: 'DG (Vac)',
        data: SignalCircuitGraphData.map(data => data.greenvoltage),
        color: "#008000"
      },
      {
        name: 'DG (Iac)(A))',
        data: SignalCircuitGraphData.map(data => data.greencurrent),
        color: "#008000"
      },
      {
        name: 'HG (Vac)',
        data: SignalCircuitGraphData.map(data => data.yellowvoltage),
        color: "#FFDA03"
      },
      {
        name: 'HG (Iac)(A)',
        data: SignalCircuitGraphData.map(data => data.yellowcurrent),
        color: "#FFDA03"
      },
      {
        name: 'RG (Vac)',
        data: SignalCircuitGraphData.map(data => data.redvoltage),
        color: "#FF0000"
      },
      {
        name: 'RG (Iac)(A)',
        data: SignalCircuitGraphData.map(data => data.redcurrent),
        color: "#FF0000",
      }
    ],
    xaxis: {
      categories: SignalCircuitGraphData.map(data => data.time),
    },
  };

  const getRelayList = async () => {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationassertrelay?stationid=" +
        station_id +
        "&&assertsid=" + 3 +
        "&&assertid=" +
        signalcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setrelayList(response.data.data);
          setSignalRelayDPR(response.data.data.find(obj => obj.relayname == SignalName + "DR"))
          setSignalRelayDECPR(response.data.data.find(obj => obj.relayname == SignalName + "DECPR"))
          setSignalRelayRECPR(response.data.data.find(obj => obj.relayname == SignalName + "RECPR"))
          setSignalRelayHPR(response.data.data.find(obj => obj.relayname == SignalName + "HR"))
          setSignalRelayHECPR(response.data.data.find(obj => obj.relayname == SignalName + "HECPR"))
          setSignalRelayHHECPR(response.data.data.find(obj => obj.relayname == SignalName + "HHECPR"))
          setSignalRelayHHPR(response.data.data.find(obj => obj.relayname == SignalName + "HHR"))
          setloading(false);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
          setloading(false);
        } else {
          message.error(err.msg);
          setloading(false);
        }
      });
  };

  function getSignalDashboardData() {
    setPageload(true);
    axiosClient
      .get(
        "/signalcircuit/getstationsignalcircuitfinaldata?stationid=" +
        station_id +
        "&&signalcircuitid=" +
        signalcircuitid
      )
      .then((response) => {
        setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimeSignalDashboardData(response.data.data)         
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

  function SignalCircuitDashboard() {
    return (
      AspectTypeId == 1 ? (
        <>
          <div className="TwoAspectRGDGSignal_Group">
            <div className="TwoAspectRGDGSignal_Rectangle1" />
            <div className="TwoAspectRGDGSignal_Line1"></div>
            <div className="TwoAspectRGDGSignal_Rectangle2" />
            <div className="TwoAspectRGDGSignal_Rectangle3" />
            <div className="TwoAspectRGDGSignal_Recpr_1">RECPR</div>
            <div className="TwoAspectRGDGSignal_Line2"></div>
            <div className="TwoAspectRGDGSignal_Line3"></div>
            <div className="TwoAspectRGDGSignal_Line4"></div>
            <div className="TwoAspectRGDGSignal_Line5"></div>
            <div className="TwoAspectRGDGSignal_Line6"></div>
            <div className="TwoAspectRGDGSignal_Rectangle4" />
            <div className="TwoAspectRGDGSignal_Rectangle5" />
            <div className="TwoAspectRGDGSignal_Line7"></div>
            <div className="TwoAspectRGDGSignal_Line8"></div>
            <div className="TwoAspectRGDGSignal_Line9"></div>
            <div className="TwoAspectRGDGSignal_Line10"></div>
            <div className="TwoAspectRGDGSignal_Line13"></div>
            <div className="TwoAspectRGDGSignal_Line14"></div>
            <div className="TwoAspectRGDGSignal_Line15"></div>
            <div className="TwoAspectRGDGSignal_Line16"></div>
            <div className="TwoAspectRGDGSignal_Line17"></div>
            <div className="TwoAspectRGDGSignal_Rectangle6" />
            <div className="TwoAspectRGDGSignal_V444422_1"> XX V 44.44.22</div>
            <div className="TwoAspectRGDGSignal_EldSigTy">ELD SIG-TY</div>
            <div className="TwoAspectRGDGSignal_Line18"></div>
            <div className="TwoAspectRGDGSignal_Line19"></div>
            <div className="TwoAspectRGDGSignal_Line20"></div>
            <div className="TwoAspectRGDGSignal_Line21"></div>
            <div className="TwoAspectRGDGSignal_VDcExtTy">24V DC EXT-TY</div>
            <div className="TwoAspectRGDGSignal_Dr_1">DR</div>
            <div className="TwoAspectRGDGSignal_Dr_2">DR</div>
            {SignalRelayDPR?.value == 1 ? <div className="TwoAspectRGDGSignal_Rectangle7_G" /> : SignalRelayDPR?.value == 0 ? <div className="TwoAspectRGDGSignal_Rectangle7_R" /> : <div className="TwoAspectRGDGSignal_Rectangle7_Gr" />}          
            <div className="TwoAspectRGDGSignal_Dpr_1">DPR</div>
            <div className="TwoAspectRGDGSignal_2255_1">{moment(SignalRelayDPR?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_Hr">HR</div>
            <div className="TwoAspectRGDGSignal_Decpr_1">DECPR</div>
            <div className="TwoAspectRGDGSignal_2222_1">22.22.22</div>
            <div className="TwoAspectRGDGSignal_2222_2">22.22.22</div>
            <div className="TwoAspectRGDGSignal_Line22"></div>
            <div className="TwoAspectRGDGSignal_Line23"></div>
            <div className="TwoAspectRGDGSignal_Line24"></div>
            <div className="TwoAspectRGDGSignal_Line25"></div>
            <div className="TwoAspectRGDGSignal_Line26"></div>
            <div className="TwoAspectRGDGSignal_Line27"></div>
            <div className="TwoAspectRGDGSignal_Line28"></div>
            <div className="TwoAspectRGDGSignal_Line29"></div>
            <div className="TwoAspectRGDGSignal_Line30"></div>
            <div className="TwoAspectRGDGSignal_Rectangle8" />
            <div className="TwoAspectRGDGSignal_Dr_3">DR</div>
            <div className="TwoAspectRGDGSignal_Rectangle9" />
            <div className="TwoAspectRGDGSignal_2222_3">22.22.22</div>
            <div className="TwoAspectRGDGSignal_Line31"></div>
            <div className="TwoAspectRGDGSignal_Line32"></div>
            <div className="TwoAspectRGDGSignal_Line33"></div>
            <div className="TwoAspectRGDGSignal_Line34"></div>
            <div className="TwoAspectRGDGSignal_Line35"></div>
            <div className="TwoAspectRGDGSignal_Line36"></div>
            <div className="TwoAspectRGDGSignal_Line37"></div>
            <div className="TwoAspectRGDGSignal_Line38"></div>
            <div className="TwoAspectRGDGSignal_Line39"></div>
            <div className="TwoAspectRGDGSignal_Rectangle10" />
            <div className="TwoAspectRGDGSignal_Rectangle11" />
            <div className="TwoAspectRGDGSignal_Line40"></div>
            <div className="TwoAspectRGDGSignal_Line41"></div>
            <div className="TwoAspectRGDGSignal_Line42"></div>
            <div className="TwoAspectRGDGSignal_Line43"></div>
            <div className="TwoAspectRGDGSignal_Line44"></div>
            <div className="TwoAspectRGDGSignal_Line45"></div>
            {SignalRelayDECPR?.value == 1 ? <div className="TwoAspectRGDGSignal_Rectangle12_G" /> : SignalRelayDECPR?.value == 0 ? <div className="TwoAspectRGDGSignal_Rectangle12_R" /> : <div className="TwoAspectRGDGSignal_Rectangle12_Gr" />}          
            <div className="TwoAspectRGDGSignal_Decpr_2">DECPR</div>
            <div className="TwoAspectRGDGSignal_2255_2">{moment(SignalRelayDECPR?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_Rectangle13" />
            <div className="TwoAspectRGDGSignal_V444422_2"> XX V 44.44.22</div>
            <div className="TwoAspectRGDGSignal_VDcE">24V DC E</div>
            <div className="TwoAspectRGDGSignal_Decr_1">DECR</div>
            <div className="TwoAspectRGDGSignal_Decr_2">DECR</div>
            <div className="TwoAspectRGDGSignal_Line46"></div>
            <div className="TwoAspectRGDGSignal_Line47"></div>
            <div className="TwoAspectRGDGSignal_Line48"></div>
            <div className="TwoAspectRGDGSignal_Line49"></div>
            <div className="TwoAspectRGDGSignal_Line50"></div>
            <div className="TwoAspectRGDGSignal_Line51"></div>
            <div className="TwoAspectRGDGSignal_Line52"></div>
            {SignalRelayRECPR?.value == 1 ? <div className="TwoAspectRGDGSignal_Rectangle14_G" /> : SignalRelayRECPR?.value == 0 ? <div className="TwoAspectRGDGSignal_Rectangle14_R" /> : <div className="TwoAspectRGDGSignal_Rectangle14_Gr" />}          
            <div className="TwoAspectRGDGSignal_Recpr_2">RECPR</div>
            <div className="TwoAspectRGDGSignal_2255_3">{moment(SignalRelayRECPR?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_Recr_1">RECR</div>
            <div className="TwoAspectRGDGSignal_Recr_2">RECR</div>
            <div className="TwoAspectRGDGSignal_Line53"></div>
            <div className="TwoAspectRGDGSignal_Line54"></div>
            <div className="TwoAspectRGDGSignal_Line55"></div>
            <div className="TwoAspectRGDGSignal_Line56"></div>
            <div className="TwoAspectRGDGSignal_Line57"></div>
            <div className="TwoAspectRGDGSignal_Line58"></div>
            <div className="TwoAspectRGDGSignal_Rectangle15" />
            <div className="TwoAspectRGDGSignal_Line59"></div>
            <div className="TwoAspectRGDGSignal_Rectangle16" />
            <div className="TwoAspectRGDGSignal_Line60"></div>
            <div className="TwoAspectRGDGSignal_Line61"></div>
            <div className="TwoAspectRGDGSignal_Line62"></div>
            <div className="TwoAspectRGDGSignal_Line63"></div>
            <div className="TwoAspectRGDGSignal_Rectangle17" />
            <div className="TwoAspectRGDGSignal_Rectangle18" />
            <div className="TwoAspectRGDGSignal_Rectangle19" />
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 5) ? <div className="TwoAspectRGDGSignal_Rectangle20_G" /> : <div className="TwoAspectRGDGSignal_Rectangle20_Gr" />}
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5) ? <div className="TwoAspectRGDGSignal_Rectangle21_R" /> : <div className="TwoAspectRGDGSignal_Rectangle21_Gr" />}         
            <div className="TwoAspectRGDGSignal_Rectangle22" />
            <div className="TwoAspectRGDGSignal_V444422_3"> XX V 44.44.22</div>
            <div className="TwoAspectRGDGSignal_Line64"></div>
            <div className="TwoAspectRGDGSignal_Line65"></div>
            <div className="TwoAspectRGDGSignal_Line66"></div>
            <div className="TwoAspectRGDGSignal_Line67"></div>
            <div className="TwoAspectRGDGSignal_Line68"></div>
            <div className="TwoAspectRGDGSignal_Rectangle23" />
            <div className="TwoAspectRGDGSignal_Line69"></div>
            <div className="TwoAspectRGDGSignal_Line70"></div>
            <div className="TwoAspectRGDGSignal_Line71"></div>
            <div className="TwoAspectRGDGSignal_EldSigNll">ELD SIG-NLL</div>
            <div className="TwoAspectRGDGSignal_VAc">110V AC</div>
            <div className="TwoAspectRGDGSignal_Rectangle24" />
            <div className="TwoAspectRGDGSignal_Line72"></div>
            <div className="TwoAspectRGDGSignal_Line73"></div>
            <div className="TwoAspectRGDGSignal_Line74"></div>
            <div className="TwoAspectRGDGSignal_Line75"></div>
            <div className="TwoAspectRGDGSignal_Line76"></div>
            <div className="TwoAspectRGDGSignal_Line77"></div>
            <div className="TwoAspectRGDGSignal_Line78"></div>
            <div className="TwoAspectRGDGSignal_Dpr_2">DPR</div>
            <div className="TwoAspectRGDGSignal_Rectangle25" />
            <div className="TwoAspectRGDGSignal_Rectangle26" />
            <div className="TwoAspectRGDGSignal_Rectangle27" />
            <div className="TwoAspectRGDGSignal_Rectangle28" />
            <div className="TwoAspectRGDGSignal_Rectangle29" />
            <div className="TwoAspectRGDGSignal_Rectangle30" />
            <div className="TwoAspectRGDGSignal_Rectangle31" />
            <div className="TwoAspectRGDGSignal_Rectangle32" />
            <div className="TwoAspectRGDGSignal_Rectangle33" />
            <div className="TwoAspectRGDGSignal_Rectangle34" />
            <div className="TwoAspectRGDGSignal_Rectangle35" />
            <div className="TwoAspectRGDGSignal_Rectangle36" />
            <div className="TwoAspectRGDGSignal_Rectangle37" />
            <div className="TwoAspectRGDGSignal_Line79"></div>
            <div className="TwoAspectRGDGSignal_Line80"></div>
            <div className="TwoAspectRGDGSignal_Line81"></div>
            <div className="TwoAspectRGDGSignal_Dpr_3">DPR</div>
            <div className="TwoAspectRGDGSignal_48V105320">{RealTimeSignalDashboardData?.greenvoltage}V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_C_1">{RealTimeSignalDashboardData?.greencurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> 
            {/* <div className="TwoAspectRGDGSignal_0"> 0</div> */}
            {/* <div className="TwoAspectRGDGSignal_Ma105319_1">A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="TwoAspectRGDGSignal_Line84"></div>
            <div className="TwoAspectRGDGSignal_Line85"></div>
            {/* <div className="TwoAspectRGDGSignal_Ma105319_2">A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="TwoAspectRGDGSignal_C_2">{RealTimeSignalDashboardData?.redcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="TwoAspectRGDGSignal_00">128</div> */}
            <div className="TwoAspectRGDGSignal_V108302">{RealTimeSignalDashboardData?.redvoltage} V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_Line86"></div>
            <div className="TwoAspectRGDGSignal_Line87"></div>
            <div className="TwoAspectRGDGSignal_Line88"></div>
            <div className="TwoAspectRGDGSignal_Line89"></div>
            <div className="TwoAspectRGDGSignal_Line90"></div>
            <div className="TwoAspectRGDGSignal_Line91"></div>
            <div className="TwoAspectRGDGSignal_Line92"></div>
            <div className="TwoAspectRGDGSignal_Line93"></div>
            <div className="TwoAspectRGDGSignal_Line94"></div>
            <div className="TwoAspectRGDGSignal_Line95"></div>
            <div className="TwoAspectRGDGSignal_Line96"></div>
            <div className="TwoAspectRGDGSignal_Line97"></div>
            <div className="TwoAspectRGDGSignal_Line98"></div>
            <div className="TwoAspectRGDGSignal_Line99"></div>
            <div className="TwoAspectRGDGSignal_Line100"></div>
            <div className="TwoAspectRGDGSignal_Line101"></div>
            <div className="TwoAspectRGDGSignal_Rectangle38" />
            <div className="TwoAspectRGDGSignal_Rectangle39" />
            <div className="TwoAspectRGDGSignal_Line102"></div>
            <div className="TwoAspectRGDGSignal_Line103"></div>
            <div className="TwoAspectRGDGSignal_Line104"></div>
            <div className="TwoAspectRGDGSignal_Rectangle40" />
            <div className="TwoAspectRGDGSignal_Rectangle41" />
            <div className="TwoAspectRGDGSignal_Line105"></div>
            <div className="TwoAspectRGDGSignal_Line106"></div>
            <div className="TwoAspectRGDGSignal_Line107"></div>
            <div className="TwoAspectRGDGSignal_Line108"></div>
            <div className="TwoAspectRGDGSignal_Line109"></div>
            <div className="TwoAspectRGDGSignal_Line110"></div>
            <div className="TwoAspectRGDGSignal_Line111"></div>
            <div className="TwoAspectRGDGSignal_Line112"></div>
            <div className="TwoAspectRGDGSignal_Line113"></div>
            <div className="TwoAspectRGDGSignal_Line114"></div>
            <div className="TwoAspectRGDGSignal_Decr_3">DECR</div>
            <div className="TwoAspectRGDGSignal_Dpr_4">DPR</div>
            <div className="TwoAspectRGDGSignal_Dpr_5">DPR</div>
            <div className="TwoAspectRGDGSignal_Decr_4">DECR</div>
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 5) ? <div className="TwoAspectRGDGSignal_Rectangle42_G" /> : <div className="TwoAspectRGDGSignal_Rectangle42_R" />}          
            <div className="TwoAspectRGDGSignal_Decr_5">DECR</div>
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5) ? <div className="TwoAspectRGDGSignal_Rectangle43_G" /> : <div className="TwoAspectRGDGSignal_Rectangle43_R" />}         
            <div className="TwoAspectRGDGSignal_Recr_3">RECR</div>                       
            <div className="TwoAspectRGDGSignal_5319">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_5319">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGDGSignal_Rectangle44" />
            <div className="TwoAspectRGDGSignal_Line115"></div>
            <div className="TwoAspectRGDGSignal_Line116"></div>
            <div className="TwoAspectRGDGSignal_Line117"></div>
            <div className="TwoAspectRGDGSignal_Line118"></div>
            <div className="TwoAspectRGDGSignal_Line119"></div>
            <div className="TwoAspectRGDGSignal_Line120"></div>
            <div className="TwoAspectRGDGSignal_FrontContact">Front Contact</div>
            <div className="TwoAspectRGDGSignal_Line121"></div>
            <div className="TwoAspectRGDGSignal_Line122"></div>
            <div className="TwoAspectRGDGSignal_Line123"></div>
            <div className="TwoAspectRGDGSignal_EiBitsDown">EI BITS DOWN</div>
            <div className="TwoAspectRGDGSignal_BackContact">Back Contact</div>
            <div className="TwoAspectRGDGSignal_Rectangle45" />
            <div className="TwoAspectRGDGSignal_Rectangle46" />
            <div className="TwoAspectRGDGSignal_RelayUp">RELAY UP</div>
            <div className="TwoAspectRGDGSignal_Line124"></div>
            <div className="TwoAspectRGDGSignal_Line125"></div>
            <div className="TwoAspectRGDGSignal_Line126"></div>
            <div className="TwoAspectRGDGSignal_EiBitsUp">EI BITS UP</div>
            <div className="TwoAspectRGDGSignal_RelayDown">RELAY DOWN</div>
            <div className="TwoAspectRGDGSignal_EiBits">EI BITS</div>
            <div className="TwoAspectRGDGSignal_RelayRoom">RELAY ROOM</div>
            <div className="TwoAspectRGDGSignal_Line127"></div>
            <div className="TwoAspectRGDGSignal_Line129"></div>
            <div className="TwoAspectRGDGSignal_Line2129"></div>
            <div className="TwoAspectRGDGSignal_Line130"></div>
            <div className="TwoAspectRGDGSignal_Location25">LOCATION BOX</div>
            {/* <div className="TwoAspectRGDGSignal_S8">S8</div> */}
            <div className="TwoAspectRGDGSignal_Line131"></div>
            <div className="TwoAspectRGDGSignal_Line132"></div>
          </div>
        </>
      ) : AspectTypeId == 2 ? (
        <>
          <div className="TwoAspectRGHGSignal_Group">
            <div className="TwoAspectRGHGSignal_Rectangle1" />
            <div className="TwoAspectRGHGSignal_Line1"></div>
            <div className="TwoAspectRGHGSignal_Rectangle2" />
            <div className="TwoAspectRGHGSignal_Rectangle3" />
            <div className="TwoAspectRGHGSignal_Recpr_1">RECPR</div>
            <div className="TwoAspectRGHGSignal_Line2"></div>
            <div className="TwoAspectRGHGSignal_Line3"></div>
            <div className="TwoAspectRGHGSignal_Line4"></div>
            <div className="TwoAspectRGHGSignal_Line5"></div>
            <div className="TwoAspectRGHGSignal_Line6"></div>
            <div className="TwoAspectRGHGSignal_Rectangle4" />
            <div className="TwoAspectRGHGSignal_Rectangle5" />
            <div className="TwoAspectRGHGSignal_Line7"></div>
            <div className="TwoAspectRGHGSignal_Line8"></div>
            <div className="TwoAspectRGHGSignal_Line9"></div>
            <div className="TwoAspectRGHGSignal_Line10"></div>
            <div className="TwoAspectRGHGSignal_Line13"></div>
            <div className="TwoAspectRGHGSignal_Line14"></div>
            <div className="TwoAspectRGHGSignal_Line15"></div>
            <div className="TwoAspectRGHGSignal_Line16"></div>
            <div className="TwoAspectRGHGSignal_Line17"></div>
            <div className="TwoAspectRGHGSignal_Line17_1"></div>
            <div className="TwoAspectRGHGSignal_Rectangle6" />
            <div className="TwoAspectRGHGSignal_V444422_1">XX V 44.44.22</div>
            <div className="TwoAspectRGHGSignal_EldSigTy">ELD SIG-TY</div>
            <div className="TwoAspectRGHGSignal_Line18"></div>
            <div className="TwoAspectRGHGSignal_Line19"></div>
            <div className="TwoAspectRGHGSignal_Line20"></div>
            <div className="TwoAspectRGHGSignal_Line21"></div>
            <div className="TwoAspectRGHGSignal_VDcExtTy">24V DC EXT-TY</div>
            <div className="TwoAspectRGHGSignal_Dr_1">HR</div>
            <div className="TwoAspectRGHGSignal_Dr_2">HR</div>      
            {SignalRelayHPR?.value == 1 ? <div className="TwoAspectRGHGSignal_Rectangle7_G" /> : SignalRelayHPR?.value == 0 ? <div className="TwoAspectRGHGSignal_Rectangle7_R" /> : <div className="TwoAspectRGHGSignal_Rectangle7_Gr" />}          
            <div className="TwoAspectRGHGSignal_Dpr_1">HPR</div>
            <div className="TwoAspectRGHGSignal_2255_1">{moment(SignalRelayDPR?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_Hr">HR</div>
            <div className="TwoAspectRGHGSignal_Decpr_1">HECPR</div>
            <div className="TwoAspectRGHGSignal_2222_1">22.22.22</div>
            <div className="TwoAspectRGHGSignal_2222_2">22.22.22</div>
            <div className="TwoAspectRGHGSignal_Line22"></div>
            <div className="TwoAspectRGHGSignal_Line23"></div>
            <div className="TwoAspectRGHGSignal_Line24"></div>
            <div className="TwoAspectRGHGSignal_Line25"></div>
            <div className="TwoAspectRGHGSignal_Line26"></div>
            <div className="TwoAspectRGHGSignal_Line27"></div>
            <div className="TwoAspectRGHGSignal_Line28"></div>
            <div className="TwoAspectRGHGSignal_Line29"></div>
            <div className="TwoAspectRGHGSignal_Line30"></div>
            <div className="TwoAspectRGHGSignal_Rectangle8" />
            <div className="TwoAspectRGHGSignal_Dr_3">HR </div>
            <div className="TwoAspectRGHGSignal_Rectangle9" />
            <div className="TwoAspectRGHGSignal_2222_3">22.22.22</div>
            <div className="TwoAspectRGHGSignal_Line31"></div>
            <div className="TwoAspectRGHGSignal_Line32"></div>
            <div className="TwoAspectRGHGSignal_Line33"></div>
            <div className="TwoAspectRGHGSignal_Line34"></div>
            <div className="TwoAspectRGHGSignal_Line35"></div>
            <div className="TwoAspectRGHGSignal_Line36"></div>
            <div className="TwoAspectRGHGSignal_Line37"></div>
            <div className="TwoAspectRGHGSignal_Line38"></div>
            <div className="TwoAspectRGHGSignal_Line39"></div>
            <div className="TwoAspectRGHGSignal_Rectangle10" />
            <div className="TwoAspectRGHGSignal_Rectangle11" />
            <div className="TwoAspectRGHGSignal_Line40"></div>
            <div className="TwoAspectRGHGSignal_Line41"></div>
            <div className="TwoAspectRGHGSignal_Line42"></div>
            <div className="TwoAspectRGHGSignal_Line43"></div>
            <div className="TwoAspectRGHGSignal_Line44"></div>
            <div className="TwoAspectRGHGSignal_Line45"></div>         
            {SignalRelayHECPR?.value == 1 ? <div className="TwoAspectRGHGSignal_Rectangle12_G" /> : SignalRelayHECPR?.value == 0 ? <div className="TwoAspectRGHGSignal_Rectangle12_R" /> : <div className="TwoAspectRGHGSignal_Rectangle122_Gr" />}          
            <div className="TwoAspectRGHGSignal_Decpr_2">HECPR</div>
            <div className="TwoAspectRGHGSignal_2255_2">{moment(SignalRelayDECPR?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_Rectangle13" />
            <div className="TwoAspectRGHGSignal_V444422_2">XX V 44.44.22</div>
            <div className="TwoAspectRGHGSignal_VDcE">24V DC E</div>
            <div className="TwoAspectRGHGSignal_Decr_1">HECR</div>
            <div className="TwoAspectRGHGSignal_Decr_2">HECR</div>
            <div className="TwoAspectRGHGSignal_Line46"></div>
            <div className="TwoAspectRGHGSignal_Line47"></div>
            <div className="TwoAspectRGHGSignal_Line48"></div>
            <div className="TwoAspectRGHGSignal_Line49"></div>
            <div className="TwoAspectRGHGSignal_Line50"></div>
            <div className="TwoAspectRGHGSignal_Line51"></div>
            <div className="TwoAspectRGHGSignal_Line52"></div>
            {SignalRelayRECPR?.value == 1 ? <div className="TwoAspectRGHGSignal_Rectangle14_G" /> : SignalRelayRECPR?.value == 0 ? <div className="TwoAspectRGHGSignal_Rectangle14_R" /> : <div className="TwoAspectRGHGSignal_Rectangle14_Gr" />}          
            <div className="TwoAspectRGHGSignal_Recpr_2">RECPR</div>
            <div className="TwoAspectRGHGSignal_2255_3">{moment(SignalRelayRECPR?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_Recr_1">RECR</div>
            <div className="TwoAspectRGHGSignal_Recr_2">RECR</div>
            <div className="TwoAspectRGHGSignal_Line53"></div>
            <div className="TwoAspectRGHGSignal_Line54"></div>
            <div className="TwoAspectRGHGSignal_Line55"></div>
            <div className="TwoAspectRGHGSignal_Line55_Line"></div>
            <div className="TwoAspectRGHGSignal_Line56"></div>
            <div className="TwoAspectRGHGSignal_Line57"></div>
            <div className="TwoAspectRGHGSignal_Line58"></div>
            <div className="TwoAspectRGHGSignal_Rectangle15" />
            <div className="TwoAspectRGHGSignal_Line59"></div>
            <div className="TwoAspectRGHGSignal_Rectangle16" />
            <div className="TwoAspectRGHGSignal_Line60"></div>
            <div className="TwoAspectRGHGSignal_Line61"></div>
            <div className="TwoAspectRGHGSignal_Line62"></div>
            <div className="TwoAspectRGHGSignal_Line63"></div>
            <div className="TwoAspectRGHGSignal_Rectangle17" />
            <div className="TwoAspectRGHGSignal_Rectangle18" />
            <div className="TwoAspectRGHGSignal_Rectangle19" />
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 6) ? <div className="TwoAspectRGHGSignal_Rectangle20_Y" /> : <div className="TwoAspectRGHGSignal_Rectangle20_Gr" />}
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 6) ? <div className="TwoAspectRGHGSignal_Rectangle21_R" /> : <div className="TwoAspectRGHGSignal_Rectangle21_Gr" />}         
            <div className="TwoAspectRGHGSignal_Rectangle20" />
            <div className="TwoAspectRGHGSignal_Rectangle21" />
            <div className="TwoAspectRGHGSignal_Rectangle22" />
            <div className="TwoAspectRGHGSignal_V444422_3">XX V 44.44.22</div>
            <div className="TwoAspectRGHGSignal_Line64"></div>
            <div className="TwoAspectRGHGSignal_Line65"></div>
            <div className="TwoAspectRGHGSignal_Line66"></div>
            <div className="TwoAspectRGHGSignal_Line67"></div>
            <div className="TwoAspectRGHGSignal_Line68"></div>
            <div className="TwoAspectRGHGSignal_Rectangle23" />
            <div className="TwoAspectRGHGSignal_Line69"></div>
            <div className="TwoAspectRGHGSignal_Line70"></div>
            <div className="TwoAspectRGHGSignal_Line71"></div>
            <div className="TwoAspectRGHGSignal_EldSigNll">ELD SIG-NLL</div>
            <div className="TwoAspectRGHGSignal_VAc">110V AC</div>
            <div className="TwoAspectRGHGSignal_Rectangle24" />
            <div className="TwoAspectRGHGSignal_Line72"></div>
            <div className="TwoAspectRGHGSignal_Line73"></div>
            <div className="TwoAspectRGHGSignal_Line74"></div>
            <div className="TwoAspectRGHGSignal_Line75"></div>
            <div className="TwoAspectRGHGSignal_Line76"></div>
            <div className="TwoAspectRGHGSignal_Line77"></div>
            <div className="TwoAspectRGHGSignal_Line78"></div>
            <div className="TwoAspectRGHGSignal_Dpr_2">HPR</div>
            <div className="TwoAspectRGHGSignal_Rectangle25" />
            <div className="TwoAspectRGHGSignal_Rectangle26" />
            <div className="TwoAspectRGHGSignal_Rectangle27" />
            <div className="TwoAspectRGHGSignal_Rectangle28" />
            <div className="TwoAspectRGHGSignal_Rectangle29" />
            <div className="TwoAspectRGHGSignal_Rectangle30" />
            <div className="TwoAspectRGHGSignal_Rectangle31" />
            <div className="TwoAspectRGHGSignal_Rectangle32" />
            <div className="TwoAspectRGHGSignal_Rectangle33" />
            <div className="TwoAspectRGHGSignal_Rectangle34" />
            <div className="TwoAspectRGHGSignal_Rectangle35" />
            <div className="TwoAspectRGHGSignal_Rectangle36" />
            <div className="TwoAspectRGHGSignal_Rectangle37" />
            <div className="TwoAspectRGHGSignal_Line79"></div>
            <div className="TwoAspectRGHGSignal_Line80"></div>
            <div className="TwoAspectRGHGSignal_Line81"></div>
            <div className="TwoAspectRGHGSignal_Dpr_3">HPR</div>
            <div className="TwoAspectRGHGSignal_48V105320">{RealTimeSignalDashboardData?.yellowvoltage} V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_C_1">{RealTimeSignalDashboardData?.yellowcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="TwoAspectRGHGSignal_0">0</div>
            <div className="TwoAspectRGHGSignal_Ma105319_1">A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="TwoAspectRGHGSignal_Line84"></div>
            <div className="TwoAspectRGHGSignal_Line85"></div>
            {/* <div className="TwoAspectRGHGSignal_Ma105319_2">A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="TwoAspectRGHGSignal_C_2">{RealTimeSignalDashboardData?.redcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="TwoAspectRGHGSignal_00">128 </div> */}
            <div className="TwoAspectRGHGSignal_V108302">{RealTimeSignalDashboardData?.redvoltage} V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_Line86"></div>
            <div className="TwoAspectRGHGSignal_Line87"></div>
            <div className="TwoAspectRGHGSignal_Line88"></div>
            <div className="TwoAspectRGHGSignal_Line89"></div>
            <div className="TwoAspectRGHGSignal_Line90"></div>
            <div className="TwoAspectRGHGSignal_Line91"></div>
            <div className="TwoAspectRGHGSignal_Line92"></div>
            <div className="TwoAspectRGHGSignal_Line93"></div>
            <div className="TwoAspectRGHGSignal_Line94"></div>
            <div className="TwoAspectRGHGSignal_Line95"></div>
            <div className="TwoAspectRGHGSignal_Line96"></div>
            <div className="TwoAspectRGHGSignal_Line97"></div>
            <div className="TwoAspectRGHGSignal_Line98"></div>
            <div className="TwoAspectRGHGSignal_Line99"></div>
            <div className="TwoAspectRGHGSignal_Line100"></div>
            <div className="TwoAspectRGHGSignal_Line101"></div>
            <div className="TwoAspectRGHGSignal_Rectangle38" />
            <div className="TwoAspectRGHGSignal_Rectangle39" />
            <div className="TwoAspectRGHGSignal_Line102"></div>
            <div className="TwoAspectRGHGSignal_Line103"></div>
            <div className="TwoAspectRGHGSignal_Line104"></div>
            <div className="TwoAspectRGHGSignal_Rectangle40" />
            <div className="TwoAspectRGHGSignal_Rectangle41" />
            <div className="TwoAspectRGHGSignal_Line105"></div>
            <div className="TwoAspectRGHGSignal_Line106"></div>
            <div className="TwoAspectRGHGSignal_Line107"></div>
            <div className="TwoAspectRGHGSignal_Line108"></div>
            <div className="TwoAspectRGHGSignal_Line109"></div>
            <div className="TwoAspectRGHGSignal_Line110"></div>
            <div className="TwoAspectRGHGSignal_Line111"></div>
            <div className="TwoAspectRGHGSignal_Line112"></div>
            <div className="TwoAspectRGHGSignal_Line113"></div>
            <div className="TwoAspectRGHGSignal_Line114"></div>
            <div className="TwoAspectRGHGSignal_Decr_3">HECR</div>
            <div className="TwoAspectRGHGSignal_Dpr_4">HPR</div>
            <div className="TwoAspectRGHGSignal_Dpr_5">HR</div>
            <div className="TwoAspectRGHGSignal_Decr_4">HECR</div>
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 6) ? <div className="TwoAspectRGDGSignal_Rectangle42_G" /> : <div className="TwoAspectRGDGSignal_Rectangle42_R" />}          
            <div className="TwoAspectRGHGSignal_Decr_5">HECR</div>
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5) ? <div className="TwoAspectRGDGSignal_Rectangle43_G" /> : <div className="TwoAspectRGDGSignal_Rectangle43_R" />}          
            <div className="TwoAspectRGHGSignal_Recr_3">RECR</div>
            <div className="TwoAspectRGHGSignal_5319">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_5319">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="TwoAspectRGHGSignal_Rectangle44" />
            <div className="TwoAspectRGHGSignal_Line115"></div>
            <div className="TwoAspectRGHGSignal_Line116"></div>
            <div className="TwoAspectRGHGSignal_Line117"></div>
            <div className="TwoAspectRGHGSignal_Line118"></div>
            <div className="TwoAspectRGHGSignal_Line119"></div>
            <div className="TwoAspectRGHGSignal_Line120"></div>
            <div className="TwoAspectRGHGSignal_FrontContact">Front Contact</div>
            <div className="TwoAspectRGHGSignal_Line121"></div>
            <div className="TwoAspectRGHGSignal_Line122"></div>
            <div className="TwoAspectRGHGSignal_Line123"></div>
            <div className="TwoAspectRGHGSignal_EiBitsDown">EI BITS DOWN</div>
            <div className="TwoAspectRGHGSignal_BackContact">Back Contact</div>
            <div className="TwoAspectRGHGSignal_Rectangle45" />
            <div className="TwoAspectRGHGSignal_Rectangle46" />
            <div className="TwoAspectRGHGSignal_RelayUp">RELAY UP</div>
            <div className="TwoAspectRGHGSignal_Line124"></div>
            <div className="TwoAspectRGHGSignal_Line125"></div>
            <div className="TwoAspectRGHGSignal_Line126"></div>
            <div className="TwoAspectRGHGSignal_EiBitsUp">EI BITS UP</div>
            <div className="TwoAspectRGHGSignal_RelayDown">RELAY DOWN</div>
            <div className="TwoAspectRGHGSignal_EiBits">EI BITS</div>
            <div className="TwoAspectRGHGSignal_RelayRoom">RELAY ROOM</div>
            <div className="TwoAspectRGHGSignal_Line127"></div>
            <div className="TwoAspectRGHGSignal_Line129"></div>
            <div className="TwoAspectRGHGSignal_Line2129"></div>
            <div className="TwoAspectRGHGSignal_Line130"></div>
            <div className="TwoAspectRGHGSignal_Location25">LOCATION BOX</div>
            {/* <div className="TwoAspectRGHGSignal_S8">S8</div> */}
            <div className="TwoAspectRGHGSignal_Line131"></div>
            <div className="TwoAspectRGHGSignal_Line132"></div>
          </div>

        </>
      ) : AspectTypeId == 3 ? (
        <>
          <div className="threeSignal_Frame1">
            <div className="threeSignal_LocationNo01">LOCATION BOX</div>
            <div className="threeSignal_Rectangle1" />
            <div className="threeSignal_ElBits">EI BITS</div>
            <div className="threeSignal_Rectangle4" />
            <div className="threeSignal_5546_1">22.22.22</div>
            <div className="threeSignal_Dr_1">DR </div>
            <div className="threeSignal_Line1" ></div>
            <div className="threeSignal_Line2"></div>
            <div className="threeSignal_Line3"></div>
            <div className="threeSignal_Hhr_1">HR</div>
            <div className="threeSignal_4950_1">22.22.22</div>
            <div className="threeSignal_Rectangle5" />
            <div className="threeSignal_5547_1">22.22.22</div>
            <div className="threeSignal_ElBitsDownOwn">EI BITS Down </div>
            <div className="threeSignal_ElBitsUpOwn">EI BITS Up</div>
            <div className="threeSignal_Hecpr_1">HECPR</div>
            <div className="threeSignal_4948_1">22.22.22</div>
            <div className="threeSignal_Hhecpr_1">RECPR</div>
            <div className="threeSignal_Decpr_1">DECPR</div>
            <div className="threeSignal_5547_2">22.22.22</div>
            <div className="threeSignal_RelayRoom">RELAY ROOM</div>
            <div className="threeSignal_Line23"></div>
            <div className="threeSignal_Line24"></div>
            <div className="threeSignal_Line25"></div>
            <div className="threeSignal_Line26"></div>
            <div className="threeSignal_Line27"></div>
            <div className="threeSignal_Line28"></div>
            <div className="threeSignal_Line29"></div>
            <div className="threeSignal_Line30"></div>
            <div className="threeSignal_Line31"></div>
            <div className="threeSignal_Line32"></div>
            <div className="threeSignal_Line33"></div>
            <div className="threeSignal_Line34"></div>
            <div className="threeSignal_Line35"></div>
            <div className="threeSignal_Line36"></div>
            <div className="threeSignal_Line37"></div>
            <div className="threeSignal_Line38"></div>
            <div className="threeSignal_Line39"></div>
            <div className="threeSignal_Line40"></div>
            <div className="threeSignal_Line41"></div>
            <div className="threeSignal_Line42"></div>
            <div className="threeSignal_Line43"></div>
            <div className="threeSignal_Line44"></div>
            <div className="threeSignal_Line45"></div>
            <div className="threeSignal_Line46"></div>
            <div className="threeSignal_Line47"></div>
            <div className="threeSignal_Line48"></div>
            <div className="threeSignal_Line49"></div>
            <div className="threeSignal_Line50"></div>
            <div className="threeSignal_Line51"></div>
            <div className="threeSignal_Line52"></div>
            <div className="threeSignal_Line53"></div>
            <div className="threeSignal_Line54"></div>
            <div className="threeSignal_Line55"></div>
            <div className="threeSignal_Line56"></div>
            <div className="threeSignal_Line57"></div>
            <div className="threeSignal_Line58"></div>
            <div className="threeSignal_Line59"></div>
            <div className="threeSignal_Line60"></div>
            <div className="threeSignal_Line61"></div>
            <div className="threeSignal_Line62"></div>
            <div className="threeSignal_Line63"></div>
            <div className="threeSignal_Line64"></div>
            <div className="threeSignal_Line65"></div>
            <div className="threeSignal_Line66"></div>
            <div className="threeSignal_Line67"></div>
            <div className="threeSignal_Rectangle6" />
            <div className="threeSignal_Rectangle7" />
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignal_Ellipse1_G" /> : <div className="threeSignal_Ellipse1_Gr" />}
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignal_Ellipse2_Y" /> : <div className="threeSignal_Ellipse2_Gr" />}
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignal_Ellipse3_R" /> : <div className="threeSignal_Ellipse3_Gr" />}
            <div className="threeSignal_Line68"></div>
            <div className="threeSignal_Line69"></div>
            <div className="threeSignal_Line70"></div>
            <div className="threeSignal_Line71"></div>
            <div className="threeSignal_Line72"></div>
            <div className="threeSignal_Line73"></div>
            <div className="threeSignal_Ellipse4" />
            <div className="threeSignal_Ellipse6" />
            <div className="threeSignal_Ellipse7" />
            <div className="threeSignal_Line74"></div>
            <div className="threeSignal_Line75"></div>
            <div className="threeSignal_Line76"></div>
            <div className="threeSignal_Line77"></div>
            <div className="threeSignal_Line78"></div>
            <div className="threeSignal_Line79"></div>
            <div className="threeSignal_Line80"></div>
            <div className="threeSignal_Line81"></div>
            <div className="threeSignal_Line82"></div>
            <div className="threeSignal_Line83"></div>
            <div className="threeSignal_Line84"></div>
            <div className="threeSignal_Line85"></div>
            <div className="threeSignal_Line86"></div>
            <div className="threeSignal_Line87"></div>
            <div className="threeSignal_Line88"></div>
            <div className="threeSignal_Line89"></div>
            <div className="threeSignal_Line90"></div>
            <div className="threeSignal_Line91"></div>
            <div className="threeSignal_Line92"></div>
            <div className="threeSignal_Line93"></div>
            <div className="threeSignal_Line95"></div>
            <div className="threeSignal_Line97"></div>
            <div className="threeSignal_Line98"></div>
            <div className="threeSignal_Line99"></div>
            <div className="threeSignal_Line100"></div>
            <div className="threeSignal_Line101"></div>
            <div className="threeSignal_Line102"></div>
            <div className="threeSignal_Line103"></div>
            {/* <div className="threeSignal_S1d">S1D</div> */}
            <div className="threeSignal_VDcExtNil_1">24v DC EXT-NIL</div>
            <div className="threeSignal_Dr_2">HR</div>
            <div className="threeSignal_3V_1">XX V</div>
            {/* <div className="threeSignal_1024_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="threeSignal_EldSigNil_1">ELD SIG - NIL</div>
            <div className="threeSignal_Dr_3">HR</div>
            {SignalRelayDPR?.value == 1 ? <div className="threeSignal_Rectangle8_G" /> : SignalRelayDPR?.value == 0 ? <div className="threeSignal_Rectangle8_R" /> : <div className="threeSignal_Rectangle8_Gr" />}                      
            <div className="threeSignal_Dpr_1">DR</div>
            <div className="threeSignal_5546_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}  </div>
            <div className="threeSignal_Line104"></div>
            <div className="threeSignal_Line105"></div>
            <div className="threeSignal_Line106"></div>
            <div className="threeSignal_Line107"></div>
            <div className="threeSignal_Hhr_2">DR</div>
            <div className="threeSignal_Hhr_3">DR</div>
            <div className="threeSignal_Line108"></div>
            <div className="threeSignal_Line109"></div>
            <div className="threeSignal_Line110"></div>
            <div className="threeSignal_Line111"></div>
            {SignalRelayHPR?.value == 1 ? <div className="threeSignal_Rectangle9_G" /> : SignalRelayHPR?.value == 0 ? <div className="threeSignal_Rectangle9_R" /> : <div className="threeSignal_Rectangle9_Gr" />}                      
            <div className="threeSignal_Hhpr_1">HPR</div>
            <div className="threeSignal_4950_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </div>
            <div className="threeSignal_Ellipse22" />
            <div className="threeSignal_Ellipse23" />
            <div className="threeSignal_Ellipse24" />
            <div className="threeSignal_Ellipse25" />
            <div className="threeSignal_Line112"></div>
            <div className="threeSignal_Line113"></div>
            <div className="threeSignal_Line114"></div>
            <div className="threeSignal_Line115"></div>
            {SignalRelayDECPR?.value == 1 ? <div className="threeSignal_Rectangle10_G" /> : SignalRelayDECPR?.value == 0 ? <div className="threeSignal_Rectangle10_R" /> : <div className="threeSignal_Rectangle10_Gr" />}                      
            <div className="threeSignal_Decpr_2">DECPR</div>
            {SignalRelayHECPR?.value == 1 ? <div className="threeSignal_Rectangle11_G" /> : SignalRelayHECPR?.value == 0 ? <div className="threeSignal_Rectangle11_R" /> : <div className="threeSignal_Rectangle11_Gr" />}                      
            <div className="threeSignal_Hhecpr_2">HECPR</div>
            {SignalRelayRECPR?.value == 1 ? <div className="threeSignal_Rectangle12_G" /> : SignalRelayRECPR?.value == 0 ? <div className="threeSignal_Rectangle12_R" /> : <div className="threeSignal_Rectangle12_Gr" />}                      
            <div className="threeSignal_Hecpr_2">RECPR</div>
            <div className="threeSignal_Decpr_3">DECR</div>
            <div className="threeSignal_Decpr_3_1">DECR</div>
            <div className="threeSignal_Hhecpr_3">HECR</div>
            <div className="threeSignal_Hhecpr_4">HECR</div>
            <div className="threeSignal_Hecr_1">RECR</div>
            <div className="threeSignal_Hecr_2">RECR</div>
            <div className="threeSignal_VDcExtNil_2">24v DC EXT-NIL</div>
            <div className="threeSignal_3V_2">XX V </div>
            <div className="threeSignal_1024_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_5548_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </div>
            <div className="threeSignal_4949"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}   </div>     
            <div className="threeSignal_5548_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}   </div>         
            <div className="threeSignal_Ellipse26" />
            <div className="threeSignal_Ellipse27" />
            <div className="threeSignal_Ellipse28" />
            <div className="threeSignal_Ellipse29" />
            <div className="threeSignal_Ellipse30" />
            <div className="threeSignal_Ellipse31" />
            <div className="threeSignal_Line116"></div>
            <div className="threeSignal_Line117"></div>
            <div className="threeSignal_Line118"></div>
            <div className="threeSignal_Line119"></div>
            <div className="threeSignal_Line120"></div>
            <div className="threeSignal_Line121"></div>
            <div className="threeSignal_Line122"></div>
            <div className="threeSignal_Line123"></div>
            <div className="threeSignal_Line124"></div>
            <div className="threeSignal_Line125"></div>
            <div className="threeSignal_Line126"></div>
            <div className="threeSignal_Line127"></div>
            <div className="threeSignal_Line128"></div>
            <div className="threeSignal_Line129"></div>
            <div className="threeSignal_Line130"></div>
            <div className="threeSignal_Line131"></div>
            <div className="threeSignal_Line132"></div>
            <div className="threeSignal_Line133"></div>
            <div className="threeSignal_VAcToRelayRoom">110v AC TO Relay Room</div>
            <div className="threeSignal_Dpr_2">HPR</div>
            <div className="threeSignal_Decpr_4">HECR</div>
            <div className="threeSignal_Dpr_3">HPR</div>
            {/* <div  >118</div> */}
            <div className="threeSignal_V151024">XX v {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_EldSigNil_2">ELD SIG - NIL</div>
            <div className="threeSignal_Hhpr_2">DPR</div>
            <div className="threeSignal_Hhpr_3">DPR</div>
            <div className="threeSignal_34">{RealTimeSignalDashboardData?.greenvoltage} V</div>
            <div className="threeSignal_V134949">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="threeSignal_C_1">C 0</div> */}
            {/* <div>0</div> */}
            <div className="threeSignal_Ma_1">{RealTimeSignalDashboardData.redcurrent} A</div>
            <div className="threeSignal_4948_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}            </div>
            <div className="threeSignal_Decr_1">HECR</div>
            <div className="threeSignal_Dpr_4">HPR</div>
            <div className="threeSignal_Dpr_5">HPR</div>         
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignal_Rectangle13_G" /> : <div className="threeSignal_Rectangle13_R" />}
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignal_Rectangle14_G" /> : <div className="threeSignal_Rectangle14_R" />}
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignal_Rectangle15_G" /> : <div className="threeSignal_Rectangle15_R" />}
            <div className="threeSignal_Decr_2">HECR</div>
            <div className="threeSignal_Hecr_3">RECR</div>
            <div className="threeSignal_Hhecr">DECR</div>
            <div className="threeSignal_4948_3">{moment(SignalRelayDECPR?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_27">{RealTimeSignalDashboardData.yellowvoltage} V</div>
            <div className="threeSignal_V135548_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="threeSignal_C_2">C</div> */}
            <div className="threeSignal_0">{RealTimeSignalDashboardData?.yellowcurrent} A</div>
            <div className="threeSignal_00">{RealTimeSignalDashboardData?.redcurrent} A</div>
            {/* <div className="threeSignal_Ma_2">A</div> */}
            <div className="threeSignal_5546_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_5548_3">{moment(SignalRelayHECPR?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_118">{RealTimeSignalDashboardData?.redvoltage} V</div>
            <div className="threeSignal_V135548_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_5547_3">{moment(SignalRelayRECPR?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="threeSignal_C_3">C</div> */}
            {/* <div className="threeSignal_Ma_3">A</div> */}
            <div className="threeSignal_5547_4">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignal_Line134"></div>
            <div className="threeSignal_Line135"></div>
            <div className="threeSignal_Line136"></div>
            <div className="threeSignal_Line137"></div>
            <div className="threeSignal_Line138"></div>
            <div className="threeSignal_Line139"></div>
            <div className="threeSignal_Line140"></div>
            <div className="threeSignal_Line141"></div>
            <div className="threeSignal_Line142"></div>
            <div className="threeSignal_Line143"></div>
            <div className="threeSignal_Line144"></div>
            <div className="threeSignal_Line145"></div>
            <div className="threeSignal_Line146"></div>
            <div className="threeSignal_Line147"></div>
            <div className="threeSignal_Line148"></div>
            <div className="threeSignal_Line149"></div>
            <div className="threeSignal_Ellipse32" />
            <div className="threeSignal_Ellipse33" />
            <div className="threeSignal_Ellipse34" />
            <div className="threeSignal_Ellipse35" />
            <div className="threeSignal_Ellipse36" />
            <div className="threeSignal_Line150"></div>
            <div className="threeSignal_Line151"></div>
            <div className="threeSignal_Line152"></div>
            <div className="threeSignal_Line153"></div>
            <div className="threeSignal_Line154"></div>
            <div className="threeSignal_Line155"></div>
            <div className="threeSignal_Line156"></div>
            <div className="threeSignal_Ellipse37" />
            <div className="threeSignal_Ellipse38" />
            <div className="threeSignal_Rectangle16" />
            <div className="threeSignal_Rectangle17" />
            <div className="threeSignal_RelayUp">Relay UP</div>
            <div className="threeSignal_RelayDown">Relay Down</div>
            <div className="threeSignal_Line157"></div>
            <div className="threeSignal_Line158"></div>
            <div className="threeSignal_Line159"></div>
            <div className="threeSignal_Line160"></div>
            <div className="threeSignal_Line161"></div>
            <div className="threeSignal_Line162"></div>
            <div className="threeSignal_Line163"></div>
            <div className="threeSignal_Line164"></div>
            <div className="threeSignal_Line165"></div>
            <div className="threeSignal_Line166"></div>
            <div className="threeSignal_Line167"></div>
            <div className="threeSignal_Line168"></div>
            <div className="threeSignal_Line169"></div>
            <div className="threeSignal_Line170"></div>
            <div className="threeSignal_Line171"></div>
            <div className="threeSignal_Line172"></div>
            <div className="threeSignal_Line173"></div>
            <div className="threeSignal_Line174"></div>
            <div className="threeSignal_Ellipse39" />
            <div className="threeSignal_Ellipse40" />
            <div className="threeSignal_Ellipse41" />
            <div className="threeSignal_Ellipse42" />
            <div className="threeSignal_Ellipse43" />
            <div className="threeSignal_Ellipse44" />
            <div className="threeSignal_Ellipse48" />
            <div className="threeSignal_Ellipse49" />
            <div className="threeSignal_Ellipse50" />
            <div className="threeSignal_Ellipse51" />
            <div className="threeSignal_Ellipse52" />
            <div className="threeSignal_Ellipse53" />
            <div className="threeSignal_Ellipse57" />
            <div className="threeSignal_Ellipse58" />
            <div className="threeSignal_Ellipse59" />
          </div>
        </>
      ) : AspectTypeId == 14 ? (
        <>
          <div className="Route_Frame1">
            <div className="Route_Line37"></div>
            <div className="Route_Line38"></div>
            <div className="Route_Line39"></div>
            <div className="Route_ElBits_1">EI BITS </div>
            <div className="Route_Rectangle2" />
            <div className="Route_5546_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Dr_1">DR</div>
            <div className="Route_Line5"></div>
            <div className="Route_Line1"></div>
            <div className="Route_Line2"></div>
            <div className="Route_Line3"></div>
            <div className="Route_Line4"></div>
            <div className="Route_Line6"></div>
            <div className="Route_Hr_1">HR</div>
            <div className="Route_5546_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_2625_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_2554_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Bhr_1">BHR</div>
            <div className="Route_Ugr_1">UGR</div>
            <div className="Route_Line7"></div>
            <div className="Route_Line7_1"></div>
            <div className="Route_Line8"></div>
            <div className="Route_Line9"></div>
            <div className="Route_Line10"></div>
            <div className="Route_Line11"></div>
            <div className="Route_Line12"></div>
            <div className="Route_Line13"></div>
            <div className="Route_Line14"></div>
            <div className="Route_Line15"></div>
            <div className="Route_Rectangle3" />
            <div className="Route_5547_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Decpr_1">DECPR</div>
            <div className="Route_Line16"></div>
            <div className="Route_Line17"></div>
            <div className="Route_Line18"></div>
            <div className="Route_Line19"></div>
            <div className="Route_Line20"></div>
            <div className="Route_Line21"></div>
            <div className="Route_Hecpr_1">HECPR</div>
            <div className="Route_4947_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_5548">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_2626">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Uecpr">UECPR</div>
            <div className="Route_Recpr_1">RECPR</div>
            <div className="Route_Line22"></div>
            <div className="Route_Line23"></div>
            <div className="Route_Line24"></div>
            <div className="Route_Bhecpr">BHECPR</div>
            <div className="Route_Line31"></div>
            <div className="Route_Line32"></div>
            <div className="Route_Line33"></div>
            <div className="Route_Line34"></div>
            <div className="Route_Line35"></div>
            <div className="Route_Line36"></div>
            <div className="Route_Line25"></div>
            <div className="Route_Line26"></div>
            <div className="Route_Line27"></div>
            <div className="Route_2555">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Line40"></div>
            <div className="Route_Line41"></div>
            <div className="Route_Line42"></div>
            <div className="Route_RelayDown">RELAY DOWN</div>
            <div className="Route_RelayUp">RELAY UP</div>
            <div className="Route_RelayRoom_1">RELAY ROOM</div>
            <div className="Route_ElBits_2">EI BITS</div>
            <div className="Route_Rectangle16" />
            <div className="Route_Rectangle15" />
            <div className="Route_Dr_2">DR</div>
            <div className="Route_EldSigTy_1">ELD-SIG-TY</div>
            <div className="Route_V151024_1">XX V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle6" />
            <div className="Route_Dr_3">DR</div>
            <div className="Route_RelayRoom_2">Relay Room</div>
            <div className="Route_Line43"></div>
            <div className="Route_Line45"></div>
            <div className="Route_3">31.3</div>
            <div className="Route_Decr_1">DECR</div>
            <div className="Route_Ellipse1" />
            <div className="Route_5546_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Line46"></div>
            <div className="Route_Line47"></div>
            <div className="Route_Line48"></div>
            <div className="Route_Line49"></div>
            <div className="Route_Line50"></div>
            <div className="Route_Line51"></div>
            <div className="Route_Line52"></div>
            <div className="Route_Line53"></div>
            <div className="Route_Line54"></div>
            <div className="Route_Line55"></div>
            <div className="Route_Line56"></div>
            <div className="Route_Line57"></div>
            <div className="Route_Line58"></div>
            <div className="Route_Line59"></div>
            <div className="Route_Line60"></div>
            <div className="Route_Line61"></div>
            <div className="Route_Line62"></div>
            <div className="Route_Line63"></div>
            <div className="Route_5546_4">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle7" />
            <div className="Route_Hr_2">HR</div>
            <div className="Route_5546_5">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle8" />
            <div className="Route_Ugr_2">UGR</div>
            <div className="Route_2625_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle9" />
            <div className="Route_Bhr_2">BHR</div>
            <div className="Route_2554_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_VDcExtTy_1">24V DC EXT-TY</div>
            <div className="Route_Dr_4">DR</div>
            <div className="Route_Hr_3">HR</div>
            <div className="Route_Hr_4">HR</div>
            <div className="Route_Hpr_1">HPR</div>
            <div className="Route_Hpr_2">HPR</div>
            <div className="Route_Rectangle10" />
            <div className="Route_Hpr_3">DPR</div>
            <div className="Route_Line64"></div>
            <div className="Route_Line65"></div>
            <div className="Route_Ellipse2" />
            <div className="Route_Ellipse3" />
            <div className="Route_Ellipse4" />
            <div className="Route_Line66"></div>
            <div className="Route_Line67"></div>
            <div className="Route_Line68"></div>
            <div className="Route_Line69"></div>
            <div className="Route_Line70"></div>
            <div className="Route_Line71"></div>
            <div className="Route_4947_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle11" />
            <div className="Route_Hpr_4">HPR</div>
            <div className="Route_Line72"></div>
            <div className="Route_Line73"></div>
            <div className="Route_Line74"></div>
            <div className="Route_Line75"></div>
            <div className="Route_Line76"></div>
            <div className="Route_Line77"></div>
            <div className="Route_Line78"></div>
            <div className="Route_Line79"></div>
            <div className="Route_Line82"></div>
            <div className="Route_Ellipse5" />
            <div className="Route_Line83"></div>
            <div className="Route_Ellipse6" />
            <div className="Route_Line84"></div>
            <div className="Route_Line85"></div>
            <div className="Route_Line86"></div>
            <div className="Route_Line87"></div>
            <div className="Route_Line88"></div>
            <div className="Route_Line89"></div>
            <div className="Route_Line90"></div>
            <div className="Route_Line91"></div>
            <div className="Route_Line92"></div>
            <div className="Route_Line93"></div>
            <div className="Route_Line94"></div>
            <div className="Route_5546_6">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle12" />
            <div className="Route_Decpr_2">DECPR</div>
            <div className="Route_5546_7">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle13" />
            <div className="Route_Hecpr_2">HECPR</div>
            <div className="Route_5547_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle14" />
            <div className="Route_Recpr_2">RECPR</div>
            <div className="Route_Decr_2">DECR</div>
            <div className="Route_Hecr_1">HECR</div>
            <div className="Route_Hecr_2">HECR</div>
            <div className="Route_Recr_1">RECR</div>
            <div className="Route_Recr_2">RECR</div>
            <div className="Route_VDcExtTy_2">24V DC EXT-TY</div>
            <div className="Route_V151024_2">V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_3">31.3</div>
            <div className="Route_Line97"></div>
            <div className="Route_Line98"></div>
            <div className="Route_Line101"></div>
            <div className="Route_Line102"></div>
            <div className="Route_Ellipse7" />
            <div className="Route_Line103"></div>
            <div className="Route_Ellipse8" />
            <div className="Route_Line104"></div>
            <div className="Route_Ellipse9" />
            <div className="Route_Line105"></div>
            <div className="Route_Ellipse10" />
            <div className="Route_Line106"></div>
            <div className="Route_Line107"></div>
            <div className="Route_Line108"></div>
            <div className="Route_Line109"></div>
            <div className="Route_Line110"></div>
            <div className="Route_Line111"></div>
            <div className="Route_Line112"></div>
            <div className="Route_Line113"></div>
            <div className="Route_Line114"></div>
            <div className="Route_Line115"></div>
            <div className="Route_Line116"></div>
            <div className="Route_Line117"></div>
            <div className="Route_Line118"></div>
            <div className="Route_Ellipse11" />
            <div className="Route_Line119"></div>
            <div className="Route_Ellipse12" />
            <div className="Route_Line120"></div>
            <div className="Route_Line121"></div>
            <div className="Route_Line122"></div>
            <div className="Route_Line123"></div>
            <div className="Route_Line124"></div>
            <div className="Route_Line125"></div>
            <div className="Route_Line126"></div>
            <div className="Route_Line127"></div>
            <div className="Route_Line128"></div>
            <div className="Route_Line129"></div>
            <div className="Route_Line130"></div>
            <div className="Route_Line131"></div>
            <div className="Route_Line132"></div>
            <div className="Route_Line133"></div>
            <div className="Route_Line134"></div>
            <div className="Route_Line135"></div>
            <div className="Route_Line136"></div>
            <div className="Route_Dr_4">DR</div>
            <div className="Route_118" >118</div>
            <div className="Route_1024">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_EldSigTy_2">ELD-SIG-TY</div>
            <div className="Route_Dr_5">DR</div>
            <div className="Route_Ugpr">UGPR</div>
            <div className="Route_Ellipse13" />
            <div className="Route_Line137"></div>
            <div className="Route_Ellipse14" />
            <div className="Route_Line138"></div>
            <div className="Route_V192626">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_81">{RealTimeSignalDashboardData?.whitevoltage} V</div>
            <div className="Route_Ellipse15" />
            <div className="Route_Ellipse16" />
            <div className="Route_Ellipse21" />
            <div className="Route_Ellipse18" />
            <div className="Route_Ellipse19" />
            <div className="Route_Ellipse20" />
            <div className="Route_Ellipse22" />
            <div className="Route_C_1">{RealTimeSignalDashboardData.whitecurrent} A</div>
            <div className="Route_Ma135546_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_LocationNo2">Location BOX</div>
            <div className="Route_Dr_6">DR</div>
            <div className="Route_Rectangle17" />
            <div className="Route_Ellipse23" />
            <div className="Route_Rectangle18" />
            <div className="Route_Rectangle19" />
            <div className="Route_Rectangle20" />
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 9 || RealTimeSignalDashboardData.gui == 11) ? <div className="Route_0_G" /> : <div className="Route_0_Gr" />}
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 10 || RealTimeSignalDashboardData.gui == 11) ? <div className="Route_00_Y" /> : <div className="Route_00_Gr" />}
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 7 || RealTimeSignalDashboardData.gui == 11) ? <div className="Route_000_R" /> : <div className="Route_000_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.lightyellowcurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.lightyellowcurrent) <= parseFloat(0.6) ?  <div className="Route_Ellipse32_LY" /> : parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.lightyellowcurrent) < parseFloat(0.105) ?  <div className="Route_Ellipse32_LY" />  : parseFloat(RealTimeSignalDashboardData.lightyellowcurrent > parseFloat(0.6))   ?   <div className="Route_Ellipse32_LY" />   :  <div className="Route_Ellipse32_Gr" /> : <div className="Route_Ellipse32_Gr" />}

            {/* <div className="Route_Ellipse27" />
            <div className="Route_Ellipse28" /> */}

            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="Route_Ellipse29_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="Route_Ellipse29_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="Route_Ellipse29_W" />   :  <div className="Route_Ellipse29_Gr" /> : <div className="Route_Ellipse29_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="Route_Ellipse30_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="Route_Ellipse30_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="Route_Ellipse30_W" />   :  <div className="Route_Ellipse30_Gr" /> : <div className="Route_Ellipse30_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="Route_Ellipse31_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="Route_Ellipse31_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="Route_Ellipse31_W" />   :  <div className="Route_Ellipse31_Gr" /> : <div className="Route_Ellipse31_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="Route_Ellipse31_1_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="Route_Ellipse31_1_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="Route_Ellipse31_1_W" />   :  <div className="Route_Ellipse31_1_Gr" /> : <div className="Route_Ellipse31_1_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="Route_Ellipse32_1_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="Route_Ellipse32_1_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="Route_Ellipse32_1_W" />   :  <div className="Route_Ellipse32_1_Gr" /> : <div className="Route_Ellipse32_1_Gr" />}

            <div className="Route_Line139"></div>
            <div className="Route_Line140"></div>
            <div className="Route_Ellipse33" />
            <div className="Route_Ellipse34" />
            <div className="Route_Hpr_5">HPR</div>
            <div className="Route_Ellipse35" />
            <div className="Route_Ellipse36" />
            <div className="Route_Ellipse37" />
            <div className="Route_Ellipse38" />
            <div className="Route_Line141"></div>
            <div className="Route_Line142"></div>
            <div className="Route_Line143"></div>
            <div className="Route_Line144"></div>
            <div className="Route_Line145"></div>
            <div className="Route_Line146"></div>
            <div className="Route_Line147"></div>
            <div className="Route_Line148"></div>
            <div className="Route_Line149"></div>
            <div className="Route_Line150"></div>
            <div className="Route_Rectangle21" />
            <div className="Route_Uecr">UECR</div>
            <div className="Route_2625_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Hpr_6">HPR</div>
            <div className="Route_Dpr_1">DPR</div>
            <div className="Route_Dpr_2">DPR</div>
            <div className="Route_Decr_3">DECR</div>
            <div className="Route_V135547">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_98">{RealTimeSignalDashboardData?.greenvoltage} V</div>
            <div className="Route_C_2">{RealTimeSignalDashboardData?.greencurrent} A</div>
            <div className="Route_Ma135546_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Ellipse39" />
            <div className="Route_Line151"></div>
            <div className="Route_Ellipse40" />
            <div className="Route_Line152"></div>
            <div className="Route_Ellipse41" />
            <div className="Route_Line153"></div>
            <div className="Route_Ellipse42" />
            <div className="Route_Line154"></div>
            <div className="Route_Line155"></div>
            <div className="Route_Ellipse43" />
            <div className="Route_Ellipse44" />
            <div className="Route_Ellipse45" />
            <div className="Route_Line156"></div>
            <div className="Route_Line157"></div>
            <div className="Route_Ellipse46" />
            <div className="Route_Ellipse47" />
            <div className="Route_Ellipse48" />
            <div className="Route_Line158"></div>
            <div className="Route_C_3">{RealTimeSignalDashboardData?.yellowcurrent} A</div>
            <div className="Route_Ma135546_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle22" />
            <div className="Route_Decr_4">DECR</div>
            <div className="Route_5546_8">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_V135546_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_16">{RealTimeSignalDashboardData?.yellowvoltage} V</div>
            <div className="Route_Line159"></div>
            <div className="Route_Line160"></div>
            <div className="Route_Line162"></div>
            <div className="Route_Line163"></div>
            <div className="Route_Line164"></div>
            <div className="Route_Line165"></div>
            <div className="Route_Line166"></div>
            <div className="Route_Line167"></div>
            <div className="Route_Line168"></div>
            <div className="Route_Line171"></div>
            <div className="Route_Line174"></div>
            <div className="Route_Line175"></div>
            <div className="Route_Line176"></div>
            <div className="Route_Line177"></div>
            <div className="Route_Line178"></div>
            <div className="Route_Ellipse49" />
            <div className="Route_Ellipse50" />
            <div className="Route_Ellipse51" />
            <div className="Route_C_4">{RealTimeSignalDashboardData?.redcurrent} A</div>
            <div className="Route_Line179"></div>
            <div className="Route_Ellipse52" />
            <div className="Route_Ellipse53" />
            <div className="Route_Ellipse54" />
            <div className="Route_Ma135547">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Line180"></div>
            <div className="Route_Line181"></div>
            <div className="Route_Rectangle23" />
            <div className="Route_Hecr_3">HECR</div>
            <div className="Route_4946">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_V135546_2">{RealTimeSignalDashboardData?.redvoltage} V</div>
            <div className="Route_V135546_2_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Rectangle24" />
            <div className="Route_Recr_3">RECR</div>
            <div className="Route_5546_9">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Line182"></div>
            <div className="Route_Line183"></div>
            <div className="Route_Line184"></div>
            <div className="Route_Line185"></div>
            <div className="Route_Line186"></div>
            <div className="Route_Line187"></div>
            <div className="Route_Line188"></div>
            <div className="Route_Line189"></div>
            <div className="Route_Line190"></div>
            <div className="Route_Line191"></div>
            <div className="Route_Line192"></div>
            <div className="Route_Line193"></div>
            <div className="Route_Line194"></div>
            <div className="Route_Line195"></div>
            <div className="Route_Line196"></div>
            <div className="Route_Ellipse55" />
            <div className="Route_Ellipse56" />
            <div className="Route_Ellipse57" />
            <div className="Route_Line197"></div>
            <div className="Route_Ellipse58" />
            <div className="Route_Ellipse59" />
            <div className="Route_Ellipse60" />
            <div className="Route_Line199"></div>
            <div className="Route_Line200"></div>
            <div className="Route_Line201"></div>
            <div className="Route_Line202"></div>
            <div className="Route_C_5">{RealTimeSignalDashboardData?.lightyellowcurrent} A</div>
            <div className="Route_Ma075243">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Line203"></div>
            <div className="Route_Line204"></div>
            <div className="Route_Line205"></div>
            <div className="Route_Line206"></div>
            <div className="Route_Line207"></div>
            <div className="Route_Line208"></div>
            <div className="Route_Line209"></div>
            <div className="Route_Line210"></div>
            <div className="Route_V112555">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_51">{RealTimeSignalDashboardData?.lightyellowvoltage} V</div>
            <div className="Route_Rectangle25" />
            <div className="Route_CoHecr">CO HECR</div>
            <div className="Route_2554_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="Route_Ellipse61" />
            <div className="Route_Line211"></div>
            <div className="Route_Ellipse62" />
            <div className="Route_Line212"></div>
            <div className="Route_CoHpr_1">CO HPR</div>
            <div className="Route_CoHpr_2">CO HPR</div>
            <div className="Route_Decpr_3">DECPR</div>
            <div className="Route_Hecpr_3">HECPR</div>
            <div className="Route_Hpr_7">HPR</div>
            <div className="Route_Hpr_8">HPR</div>
            <div className="Route_Decr_5">DECR</div>
            <div className="Route_Decr_6">DECR</div>
            <div className="Route_Dpr_3">DPR</div>
            <div className="Route_Dpr_4">DPR</div>
            {/* <div className="Route_S1a">S1A</div> */}
            {/* <div className="Route_C1b">C1B</div> */}
            <div className="Route_Ellipse63" />
            <div className="Route_Ellipse64" />
            <div className="Route_Ellipse65" />
            <div className="Route_Ellipse66" />
            <div className="Route_Ellipse67" />
            <div className="Route_Ellipse68" />
            <div className="Route_Ellipse69" />
            <div className="Route_Ellipse70" />
            <div className="Route_Rectangle26" />
            <div className="Route_Line213"></div>
            <div className="Route_Line214"></div>
            <div className="Route_Line215"></div>
            <div className="Route_Line216"></div>
            <div className="Route_Line217"></div>
            <div className="Route_Rectangle27" />
            <div className="Route_Line218"></div>
            <div className="Route_Line219"></div>
            <div className="Route_Line220"></div>
            <div className="Route_Line221"></div>
            <div className="Route_Line222"></div>
          </div>
        </>
      ) : AspectTypeId == 13 ? (
        <>
          <div className="CallOnRouteFrame1">
            <div className="CallOnRouteRelayDown">RELAY DOWN</div>
            <div className="CallOnRouteRectangle1" />
            <div className="CallOnRouteEllipse1" />
            <div className="CallOnRouteRectangle2" />
            <div className="CallOnRouteRectangle3" />
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 9 || RealTimeSignalDashboardData.gui == 11) ? <div className="CallOnRouteEllipse2_G" /> : <div className="CallOnRouteEllipse2_Gr" />}
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 10 || RealTimeSignalDashboardData.gui == 11) ? <div className="CallOnRouteEllipse3_Y" /> : <div className="CallOnRouteEllipse3_Gr" />}
            {(RealTimeSignalDashboardData.gui == 1 || RealTimeSignalDashboardData.gui == 5 || RealTimeSignalDashboardData.gui == 6 || RealTimeSignalDashboardData.gui == 7 || RealTimeSignalDashboardData.gui == 11) ? <div className="CallOnRouteEllipse4_R" /> : <div className="CallOnRouteEllipse4_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.lightyellowcurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.lightyellowcurrent) <= parseFloat(0.6) ?  <div className="CallOnRouteEllipse5_LY" /> : parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.lightyellowvoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.lightyellowcurrent) < parseFloat(0.105) ?  <div className="CallOnRouteEllipse5_LY" />  : parseFloat(RealTimeSignalDashboardData.lightyellowcurrent > parseFloat(0.6))   ?   <div className="CallOnRouteEllipse5_LY" />   :  <div className="CallOnRouteEllipse5_Gr" /> : <div className="CallOnRouteEllipse5_Gr" />}
            {/* <div className="CallOnRouteEllipse6" /> */}
            {/* <div className="CallOnRouteEllipse7" /> */}
            <div className="CallOnRouteRectangle4" />           
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="CallOnRouteEllipse8_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="CallOnRouteEllipse8_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="CallOnRouteEllipse8_W" />   :  <div className="CallOnRouteEllipse8_Gr" /> : <div className="CallOnRouteEllipse8_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="CallOnRouteEllipse9_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="CallOnRouteEllipse9_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="CallOnRouteEllipse9_W" />   :  <div className="CallOnRouteEllipse9_Gr" /> : <div className="CallOnRouteEllipse9_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="CallOnRouteEllipse10_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="CallOnRouteEllipse10_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="CallOnRouteEllipse10_W" />   :  <div className="CallOnRouteEllipse10_Gr" /> : <div className="CallOnRouteEllipse10_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="CallOnRouteEllipse11_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="CallOnRouteEllipse11_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="CallOnRouteEllipse11_W" />   :  <div className="CallOnRouteEllipse11_Gr" /> : <div className="CallOnRouteEllipse11_Gr" />}
            {parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150) && parseFloat(RealTimeSignalDashboardData.whitecurrent) >= parseFloat(0.105) && parseFloat(RealTimeSignalDashboardData.whitecurrent) <= parseFloat(0.6) ?  <div className="CallOnRouteEllipse12_W" /> : parseFloat(RealTimeSignalDashboardData.whitevoltage) >= parseFloat(100) && parseFloat(RealTimeSignalDashboardData.whitevoltage) <= parseFloat(150)   ? parseFloat(RealTimeSignalDashboardData.whitecurrent) < parseFloat(0.105) ?  <div className="CallOnRouteEllipse12_W" />  : parseFloat(RealTimeSignalDashboardData.whitecurrent > parseFloat(0.6))   ?   <div className="CallOnRouteEllipse12_W" />   :  <div className="CallOnRouteEllipse11_Gr" /> : <div className="CallOnRouteEllipse12_Gr" />}
            <div className="CallOnRouteLine1" />
            <div className="CallOnRouteLine2" />
            <div className="CallOnRouteLine4" />
            <div className="CallOnRouteLine6" />
            <div className="CallOnRouteLine7" />
            <div className="CallOnRouteLine9" />
            <div className="CallOnRouteEllipse13" />
            <div className="CallOnRouteEllipse14" />
            <div className="CallOnRouteLine10" />
            <div className="CallOnRouteLine11" />
            <div className="CallOnRouteLine12" />
            <div className="CallOnRouteLine13" />
            <div className="CallOnRouteLine16" />
            <div className="CallOnRouteLine18" />
            <div className="CallOnRouteLine19" />
            <div className="CallOnRouteLine20" />
            <div className="CallOnRouteEllipse17" />
            <div className="CallOnRouteEllipse18" />
            <div className="CallOnRouteEllipse19" />
            <div className="CallOnRouteEllipse20" />
            <div className="CallOnRouteLine21" />
            <div className="CallOnRouteLine22" />
            <div className="CallOnRouteEllipse21" />
            <div className="CallOnRouteEllipse22" />
            <div className="CallOnRouteLine23" />
            <div className="CallOnRouteLine24" />
            <div className="CallOnRouteEllipse23" />
            <div className="CallOnRouteEllipse24" />
            <div className="CallOnRouteEllipse25" />
            <div className="CallOnRouteEllipse26" />
            <div className="CallOnRouteEllipse27" />
            <div className="CallOnRouteEllipse28" />
            <div className="CallOnRouteLine27" />
            <div className="CallOnRouteLine28" />
            <div className="CallOnRouteEllipse29" />
            <div className="CallOnRouteEllipse30" />
            <div className="CallOnRouteLine29" />
            <div className="CallOnRouteEllipse30" />
            <div className="CallOnRouteLine29" />
            <div className="CallOnRouteLine30" />
            <div className="CallOnRouteEllipse33" />
            <div className="CallOnRouteEllipse34" />
            <div className="CallOnRouteLine33" />
            <div className="CallOnRouteLine34" />
            <div className="CallOnRouteEllipse35" />
            <div className="CallOnRouteEllipse36" />
            <div className="CallOnRouteLine35" />
            <div className="CallOnRouteLine36"></div>
            <div className="CallOnRouteEllipse39" />
            <div className="CallOnRouteEllipse40" />
            <div className="CallOnRouteLine39"></div>
            <div className="CallOnRouteLine40"></div>
            <div className="CallOnRouteEllipse41" />
            <div className="CallOnRouteEllipse42"></div>
            <div className="CallOnRouteLine41"></div>
            <div className="CallOnRouteLine42"></div>
            <div className="CallOnRouteEllipse44"></div>
            <div className="CallOnRouteEllipse45"></div>
            <div className="CallOnRouteEllipse46"></div>
            <div className="CallOnRouteLine45"></div>
            <div className="CallOnRouteLine46"></div>
            <div className="CallOnRouteLine47"></div>
            <div className="CallOnRouteLine48"></div>
            <div className="CallOnRouteEllipse47"></div>
            <div className="CallOnRouteEllipse48"></div>
            <div className="CallOnRouteEllipse49"></div>
            <div className="CallOnRouteEllipse50"></div>
            <div className="CallOnRouteEllipse51"></div>
            <div className="CallOnRouteEllipse52"></div>
            <div className="CallOnRouteEllipse53"></div>
            <div className="CallOnRouteEllipse54"></div>
            <div className="CallOnRouteEllipse55"></div>
            <div className="CallOnRouteEllipse56"></div>
            <div className="CallOnRouteEllipse57"></div>
            <div className="CallOnRouteEllipse58"></div>
            <div className="CallOnRouteEllipse59"></div>
            <div className="CallOnRouteEllipse60"></div>
            <div className="CallOnRouteEllipse61"></div>
            <div className="CallOnRouteEllipse62"></div>
            <div className="CallOnRouteEllipse15"></div>
            <div className="CallOnRouteLine14"></div>
            <div className="CallOnRouteLine14_a"></div>
            <div className="CallOnRouteEllipse63"></div>
            <div className="CallOnRouteLine49"></div>
            <div className="CallOnRouteLine25"></div>
            <div className="CallOnRouteLine26"></div>
            <div className="CallOnRouteLine31"></div>
            <div className="CallOnRouteLine50"></div>
            <div className="CallOnRouteEllipse64"></div>
            <div className="CallOnRouteLine51"></div>
            <div className="CallOnRouteLine52"></div>
            <div className="CallOnRouteLine53"></div>
            <div className="CallOnRouteLine54"></div>
            <div className="CallOnRouteEllipse65"></div>
            <div className="CallOnRouteLine55"></div>
            <div className="CallOnRouteLine56"></div>
            <div className="CallOnRouteEllipse66"></div>
            <div className="CallOnRouteLine57"></div>
            <div className="CallOnRouteLine58"></div>
            <div className="CallOnRouteLine59"></div>
            <div className="CallOnRouteLine60"></div>
            <div className="CallOnRouteLine61"></div>
            <div className="CallOnRouteLine62"></div>
            <div className="CallOnRouteLine63"></div>
            <div className="CallOnRouteLine64"></div>
            <div className="CallOnRouteLine65"></div>
            <div className="CallOnRouteLine66"></div>
            <div className="CallOnRouteLine67"></div>
            <div className="CallOnRouteLine68"></div>
            <div className="CallOnRouteLine69"></div>
            <div className="CallOnRouteLine70"></div>
            <div className="CallOnRouteLine71"></div>
            <div className="CallOnRouteLine72"></div>
            <div className="CallOnRouteLine73"></div>
            <div className="CallOnRouteLine74"></div>
            <div className="CallOnRouteLine75"></div>
            <div className="CallOnRouteLine76"></div>
            <div className="CallOnRouteLine77"></div>
            <div className="CallOnRouteLine78"></div>
            <div className="CallOnRouteLine79"></div>
            <div className="CallOnRouteEllipse67" />
            <div className="CallOnRouteLine80"></div>
            <div className="CallOnRouteEllipse68" />
            <div className="CallOnRouteLine81"></div>
            <div className="CallOnRouteLine82"></div>
            <div className="CallOnRouteEllipse69" />
            <div className="CallOnRouteLine83"></div>
            <div className="CallOnRouteLine84"></div>
            <div className="CallOnRouteEllipse70" />
            <div className="CallOnRouteLine85"></div>
            <div className="CallOnRouteLine86"></div>
            <div className="CallOnRouteLine87"></div>
            <div className="CallOnRouteLine88"></div>
            <div className="CallOnRouteLine89"></div>
            <div className="CallOnRouteLine90"></div>
            <div className="CallOnRouteLine91"></div>
            <div className="CallOnRouteLine92"></div>
            <div className="CallOnRouteLine93"></div>
            <div className="CallOnRouteLine94"></div>
            <div className="CallOnRouteLine95"></div>
            <div className="CallOnRouteLine96"></div>
            <div className="CallOnRouteLine97"></div>
            <div className="CallOnRouteLine98"></div>
            <div className="CallOnRouteLine99"></div>
            <div className="CallOnRouteLine100"></div>
            <div className="CallOnRouteLine101"></div>
            <div className="CallOnRouteLine102"></div>
            <div className="CallOnRouteLine103"></div>
            <div className="CallOnRouteLine104"></div>
            <div className="CallOnRouteLine105"></div>
            <div className="CallOnRouteEllipse71" />
            <div className="CallOnRouteLine106"></div>
            <div className="CallOnRouteLine107"></div>
            <div className="CallOnRouteEllipse72" />
            <div className="CallOnRouteLine108"></div>
            <div className="CallOnRouteLine109"></div>
            <div className="CallOnRouteLine110"></div>
            <div className="CallOnRouteLine111"></div>
            <div className="CallOnRouteLine112"></div>
            <div className="CallOnRouteLine119"></div>
            <div className="CallOnRouteLine120"></div>
            <div className="CallOnRouteLine121"></div>
            <div className="CallOnRouteLine122"></div>
            <div className="CallOnRouteEllipse73" />
            <div className="CallOnRouteLine125"></div>
            <div className="CallOnRouteLine126"></div>
            <div className="CallOnRouteLine123"></div>
            <div className="CallOnRouteLine127"></div>
            <div className="CallOnRouteEllipse74" />
            <div className="CallOnRouteLine128"></div>
            <div className="CallOnRouteLine129"></div>
            <div className="CallOnRouteLine130"></div>
            <div className="CallOnRouteLine131"></div>
            <div className="CallOnRouteLine132"></div>
            <div className="CallOnRouteLine133"></div>
            <div className="CallOnRouteLine134"></div>
            <div className="CallOnRouteLine135"></div>
            <div className="CallOnRouteLine136"></div>
            <div className="CallOnRouteLine137"></div>
            <div className="CallOnRouteLine138"></div>
            <div className="CallOnRouteEllipse75" />
            <div className="CallOnRouteLine139"></div>
            <div className="CallOnRouteLine140"></div>
            <div className="CallOnRouteLine141"></div>
            <div className="CallOnRouteLine142"></div>
            <div className="CallOnRouteEllipse76" />
            <div className="CallOnRouteLine143"></div>
            <div className="CallOnRouteLine144"></div>
            <div className="CallOnRouteEllipse77" />
            <div className="CallOnRouteLine145"></div>
            <div className="CallOnRouteLine146"></div>
            <div className="CallOnRouteLine147"></div>
            <div className="CallOnRouteLine148"></div>
            <div className="CallOnRouteEllipse78" />
            <div className="CallOnRouteLine149"></div>
            <div className="CallOnRouteLine150"></div>
            <div className="CallOnRouteLine151"></div>
            <div className="CallOnRouteLine152"></div>
            <div className="CallOnRouteRectangle5" />
            <div className="CallOnRouteRectangle6" />
            <div className="CallOnRouteRectangle7" />
            <div className="CallOnRouteRectangle8" />
            <div className="CallOnRouteDr1">DR</div>
            <div className="CallOnRouteHr1">HR</div>
            <div className="CallOnRouteUgr">UGR</div>
            <div className="CallOnRouteBhr">BHR</div>
            <div className="CallOnRoute5546_11">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRoute5546_22">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRoute5546_33">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRoute5546_44">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRectangle9" />
            <div className="CallOnRouteDr135546">DR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteHr135546">HR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteUgr135546">UGR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteBhr135546">BHR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRectangle10" />
            <div className="CallOnRouteRelayUp">RELAY UP </div>
            <div className="CallOnRouteRectangle11" />
            <div className="CallOnRouteRectangle12" />
            <div className="CallOnRouteElBits1">EI BITS</div>
            <div className="CallOnRouteRelayRoom1">RELAY ROOM</div>
            <div className="CallOnRouteElBits">EI BITS</div>
            <div className="CallOnRouteRelayRoom">RELAY ROOM</div>
            <div className="CallOnRouteLocationNo2">LOCATION BOX</div>
            <div className="CallOnRouteVDcExtTy1">24v DC EXT-TY </div>
            <div className="CallOnRoute3v151024_1"> <span> XX V </span> <span> {" "} {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </span> </div>
            <div className="CallOnRouteRectangle13" />
            <div className="CallOnRouteLine153"></div>
            <div className="CallOnRouteLine154"></div>

            <div className="CallOnRouteLine156"></div>
            <div className="CallOnRouteDr_1">DR</div>
            <div className="CallOnRouteHr_1">HR</div>
            <div className="CallOnRouteDr_2">DR</div>
            <div className="CallOnRouteHr_2">HR</div>
            <div className="CallOnRouteHpr_1">HPR</div>
            <div className="CallOnRouteHpr_2">HPR</div>
            <div className="CallOnRouteRectangle14" />
            <div className="CallOnRouteHpr">HPR</div>
            <div className="CallOnRoute5546_a">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRectangle15" />
            <div className="CallOnRouteHpr">HPR</div>
            <div className="CallOnRoute5546_b">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRectangle19" />
            <div className="CallOnRouteDecpr">DECPR</div>
            <div className="CallOnRoute5546_DECPR">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRectangle20" />
            <div className="CallOnRouteHecpr_1">HECPR</div>
            <div className="CallOnRoute5546_HECPR">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRectangle21" />
            <div className="CallOnRouteRecpr">RECPR</div>
            <div className="CallOnRoute5546">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteDecr_1">DECR</div>
            <div className="CallOnRouteDecr_22">DECR</div>
            <div className="CallOnRouteHecr_1">HECR</div>
            <div className="CallOnRouteHecr_22">HECR</div>
            <div className="CallOnRouteRecr_1">RECR</div>
            <div className="CallOnRouteRecr_22">RECR</div>
            <div className="CallOnRouteVDcExtTy2">24v DC EXT-TY </div>
            <div className="CallOnRoute3v151024_2"><span>XX V</span><span> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>  </div>

          <div className="CallOnRouteDr_3">DR</div>
            <div className="CallOnRouteDr_4">DR</div>
            <div className="CallOnRouteUgpr">UGPR</div>
            <div className="CallOnRoute154405">
              <span>118</span>
              <span> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>
            </div>
            <div className="CallOnRoute81V183624">
              <span>{RealTimeSignalDashboardData?.whitevoltage} V </span>
              <span>{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>
            </div>
            <div className="CallOnRouteMa135546">{RealTimeSignalDashboardData?.whitecurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="CallOnRouteC">C</div>
            <div className="CallOnRouteO">o</div> */}

            <div className="CallOnRouteRectangle22" />
            <div className="CallOnRoute5546_DECR">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteUecr">UECR</div>
            <div className="CallOnRouteRectangle23" />
            <div className="CallOnRoute5546_UECR">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>

            <div className="CallOnRouteMa135546CO_1">
              <span>{RealTimeSignalDashboardData?.redcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </span>             
            </div>
            <div className="CallOnRouteMa135546CO_2">
              <span>{RealTimeSignalDashboardData?.lightyellowcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </span>            
            </div>
            <div className="CallOnRouteMa135546CO_3">
              <span>{RealTimeSignalDashboardData?.yellowcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </span>
            </div>

            <div className="CallOnRouteMa135546C128">
              <span>{RealTimeSignalDashboardData?.yellowcurrent} A {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </span>           
            </div>
            <div className="CallOnRouteV135547">
              <span>{RealTimeSignalDashboardData?.redvoltage} V</span>
              <span> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>
            </div>
            <div className="CallOnRoute98v135547_a">
              <span>{RealTimeSignalDashboardData?.greenvoltage} V </span>
              <span> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>
            </div>

            <div className="CallOnRoute98v135547_c">
              <span>{RealTimeSignalDashboardData?.yellowvoltage} V </span>
              <span>{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>
            </div>
            <div className="CallOnRouteRectangle24" />
            <div className="CallOnRoute5546">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>

            <div className="CallOnRouteRectangle25" />
            <div className="CallOnRoute5546">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>

            <div className="CallOnRouteRectangle26" />
            <div className="CallOnRoute5546">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteCoHecr">CO HECR</div>
            <div className="CallOnRouteHpr">HPR</div>
            <div className="CallOnRouteHpr_a">HPR</div>
            <div className="CallOnRouteDpr">DPR</div>
            <div className="CallOnRoute98v135547_2Last">
              <span className="CallOnRoute_0">{RealTimeSignalDashboardData?.lightyellowvoltage} V</span>
              <span> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</span>
            </div>

            <div className="CallOnRouteRectangle24"></div>
            <div className="CallOnRoute5546_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteHecr_2">HECR</div>
            <div className="CallOnRouteRectangle25"></div>
            <div className="CallOnRoute5546_4">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRecr_2">RECR</div>
            <div className="CallOnRouteRectangle26"></div>
            <div className="CallOnRoute5546_5">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteCoHecr">CO HECR</div>
            <div className="CallOnRouteHpr_3">HPR</div>
            <div className="CallOnRouteHpr_4">HPR</div>
            <div className="CallOnRouteDpr_2">DPR</div>
            <div className="CallOnRouteDpr_2a">DPR</div>
            <div className="CallOnRouteDpr_2b">DPR</div>
            <div className="CallOnRouteDecr_2">DECR</div>
            <div className="CallOnRouteDecr_2a">DECR</div>
            <div className="CallOnRouteDecr_2b">DECR</div>
            {/* <div className="CallOnRouteDecr_a">DECR</div> */}
            <div className="CallOnRouteCohpr_2">COHPR</div>
            <div className="CallOnRouteCohpr_3">COHPR</div>
            <div className="CallOnRouteHecpr">HECPR</div>
            <div className="CallOnRouteLine157"></div>
            <div className="CallOnRouteLine158"></div>
            <div className="CallOnRouteLine159"></div>

            <div className="CallOnRouteLine160"></div>
            <div className="CallOnRouteLine161"></div>
            <div className="CallOnRouteLine162"></div>
            <div className="CallOnRouteLine163"></div>
            <div className="CallOnRouteLine164"></div>
            <div className="CallOnRouteLine165"></div>
            <div className="CallOnRouteLine166"></div>
            <div className="CallOnRouteLine172"></div>
            <div className="CallOnRouteLine173"></div>
            <div className="CallOnRouteLine174"></div>
            <div className="CallOnRouteLine175"></div>
            <div className="CallOnRouteLine176"></div>
            <div className="CallOnRouteLine177"></div>
            <div className="CallOnRouteLine178"></div>
            <div className="CallOnRouteLine179"></div>
            <div className="CallOnRouteLine180"></div>
            <div className="CallOnRouteLine181"></div>
            <div className="CallOnRouteRectangle27" />
            <div className="CallOnRouteLine193"></div>
            <div className="CallOnRouteLine194"></div>
            <div className="CallOnRouteLine195"></div>
            <div className="CallOnRouteLine196"></div>
            <div className="CallOnRouteDecpr135546">DECPR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteHecpr135546">HECPR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteRecpr135546">RECPR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="CallOnRouteUecpr135546">UECPR {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="CallOnRouteUecpr135546_1"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="CallOnRouteLine197"></div>
            <div className="CallOnRouteLine198"></div>
            <div className="CallOnRouteLine199"></div>
            <div className="CallOnRouteLine221"></div>
            <div className="CallOnRouteLine222"></div>
            <div className="CallOnRouteLine223"></div>
            <div className="CallOnRouteLine224"></div>
            <div className="CallOnRouteLine225"></div>
            <div className="CallOnRouteLine226"></div>
            <div className="CallOnRouteLine227"></div>
            <div className="CallOnRouteLine228"></div>
            <div className="CallOnRouteLine229"></div>
            <div className="CallOnRouteLine230"></div>
            <div className="CallOnRouteLine231"></div>
            <div className="CallOnRouteLine232"></div>
            <div className="CallOnRouteLine233"></div>
            <div className="CallOnRouteLine234"></div>
            <div className="CallOnRouteLine235"></div>
            <div className="CallOnRouteLine236"></div>
            <div className="CallOnRouteLine237"></div>
            <div className="CallOnRouteLine238"></div>
            <div className="CallOnRouteLine239"></div>
            <div className="CallOnRouteLine240"></div>
            <div className="CallOnRouteLine241"></div>
            <div className="CallOnRouteLine242"></div>
            <div className="CallOnRouteLine243"></div>
            <div className="CallOnRouteLine244"></div>
            <div className="CallOnRouteLine245"></div>
            <div className="CallOnRouteLine246"></div>
            <div className="CallOnRouteLine247"></div>
            <div className="CallOnRouteLine248"></div>
            <div className="CallOnRouteLine249"></div>
            <div className="CallOnRouteLine250"></div>
            {/* <div className="S1A">S1A</div> */}
            {/* <div className="C1B">C1B</div> */}
          </div>
        </>
      ) : AspectTypeId == 5 ? (
        <>
          <div className="threeSignalDistantP_Frame1">
            <div className="threeSignalDistantP_LocationNo01">LOCATION BOX</div>
            <div className="threeSignalDistantP_Rectangle1" />
            <div className="threeSignalDistantP_ElBits">EI BITS</div>
            <div className="threeSignalDistantP_Rectangle4" />
            <div className="threeSignalDistantP_5546_1">22.22.22</div>
            <div className="threeSignalDistantP_Dr_1">DR </div>
            <div className="threeSignalDistantP_Line1" ></div>
            <div className="threeSignalDistantP_Line2"></div>
            <div className="threeSignalDistantP_Line3"></div>
            <div className="threeSignalDistantP_Hhr_1">HHR</div>
            <div className="threeSignalDistantP_4950_1">22.22.22</div>
            <div className="threeSignalDistantP_Rectangle5" />
            <div className="threeSignalDistantP_5547_1">22.22.22</div>
            <div className="threeSignalDistantP_ElBitsDownOwn">EI BITS Down </div>
            <div className="threeSignalDistantP_ElBitsUpOwn">EI BITS Up</div>
            <div className="threeSignalDistantP_Hecpr_1">HECPR</div>
            <div className="threeSignalDistantP_4948_1">22.22.22</div>
            <div className="threeSignalDistantP_Hhecpr_1">HHECPR</div>
            <div className="threeSignalDistantP_Decpr_1">DECPR</div>
            <div className="threeSignalDistantP_5547_2">22.22.22</div>
            <div className="threeSignalDistantP_RelayRoom">RELAY ROOM</div>
            <div className="threeSignalDistantP_Line23"></div>
            <div className="threeSignalDistantP_Line24"></div>
            <div className="threeSignalDistantP_Line25"></div>
            <div className="threeSignalDistantP_Line26"></div>
            <div className="threeSignalDistantP_Line27"></div>
            <div className="threeSignalDistantP_Line28"></div>
            <div className="threeSignalDistantP_Line29"></div>
            <div className="threeSignalDistantP_Line30"></div>
            <div className="threeSignalDistantP_Line31"></div>
            <div className="threeSignalDistantP_Line32"></div>
            <div className="threeSignalDistantP_Line33"></div>
            <div className="threeSignalDistantP_Line34"></div>
            <div className="threeSignalDistantP_Line35"></div>
            <div className="threeSignalDistantP_Line36"></div>
            <div className="threeSignalDistantP_Line37"></div>
            <div className="threeSignalDistantP_Line38"></div>
            <div className="threeSignalDistantP_Line39"></div>
            <div className="threeSignalDistantP_Line40"></div>
            <div className="threeSignalDistantP_Line41"></div>
            <div className="threeSignalDistantP_Line42"></div>
            <div className="threeSignalDistantP_Line43"></div>
            <div className="threeSignalDistantP_Line44"></div>
            <div className="threeSignalDistantP_Line45"></div>
            <div className="threeSignalDistantP_Line46"></div>
            <div className="threeSignalDistantP_Line47"></div>
            <div className="threeSignalDistantP_Line48"></div>
            <div className="threeSignalDistantP_Line49"></div>
            <div className="threeSignalDistantP_Line50"></div>
            <div className="threeSignalDistantP_Line51"></div>
            <div className="threeSignalDistantP_Line52"></div>
            <div className="threeSignalDistantP_Line53"></div>
            <div className="threeSignalDistantP_Line54"></div>
            <div className="threeSignalDistantP_Line55"></div>
            <div className="threeSignalDistantP_Line56"></div>
            <div className="threeSignalDistantP_Line57"></div>
            <div className="threeSignalDistantP_Line58"></div>
            <div className="threeSignalDistantP_Line59"></div>
            <div className="threeSignalDistantP_Line60"></div>
            <div className="threeSignalDistantP_Line61"></div>
            <div className="threeSignalDistantP_Line62"></div>
            <div className="threeSignalDistantP_Line63"></div>
            <div className="threeSignalDistantP_Line64"></div>
            <div className="threeSignalDistantP_Line65"></div>
            <div className="threeSignalDistantP_Line66"></div>
            <div className="threeSignalDistantP_Line67"></div>
            <div className="threeSignalDistantP_Rectangle6" />
            <div className="threeSignalDistantP_Rectangle7" />
            {(RealTimeSignalDashboardData.gui == 4 || RealTimeSignalDashboardData.gui == 9 || RealTimeSignalDashboardData.gui == 10 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignalDistantP_Ellipse1_LY" /> : <div className="threeSignalDistantP_Ellipse1_Gr" />}
            {(RealTimeSignalDashboardData.gui == 2 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 9 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignalDistantP_Ellipse2_G" /> : <div className="threeSignalDistantP_Ellipse2_Gr" />}
            {(RealTimeSignalDashboardData.gui == 3 || RealTimeSignalDashboardData.gui == 8 || RealTimeSignalDashboardData.gui == 10 || RealTimeSignalDashboardData.gui == 11) ? <div className="threeSignalDistantP_Ellipse3_Y" /> : <div className="threeSignalDistantP_Ellipse3_Gr" />}
            <div className="threeSignalDistantP_Ellipse1" />
            <div className="threeSignalDistantP_Ellipse2" />
            <div className="threeSignalDistantP_Ellipse3" />
            <div className="threeSignalDistantP_Line68"></div>
            <div className="threeSignalDistantP_Line69"></div>
            <div className="threeSignalDistantP_Line70"></div>
            <div className="threeSignalDistantP_Line71"></div>
            <div className="threeSignalDistantP_Line72"></div>
            <div className="threeSignalDistantP_Line73"></div>
            <div className="threeSignalDistantP_Ellipse4" />
            <div className="threeSignalDistantP_Ellipse6" />
            <div className="threeSignalDistantP_Ellipse7" />
            <div className="threeSignalDistantP_Line74"></div>
            <div className="threeSignalDistantP_Line75"></div>
            <div className="threeSignalDistantP_Line76"></div>
            <div className="threeSignalDistantP_Line77"></div>
            <div className="threeSignalDistantP_Line78"></div>
            <div className="threeSignalDistantP_Line79"></div>
            <div className="threeSignalDistantP_Line80"></div>
            <div className="threeSignalDistantP_Line81"></div>
            <div className="threeSignalDistantP_Line82"></div>
            <div className="threeSignalDistantP_Line83"></div>
            <div className="threeSignalDistantP_Line84"></div>
            <div className="threeSignalDistantP_Line85"></div>
            <div className="threeSignalDistantP_Line86"></div>
            <div className="threeSignalDistantP_Line87"></div>
            <div className="threeSignalDistantP_Line88"></div>
            <div className="threeSignalDistantP_Line89"></div>
            <div className="threeSignalDistantP_Line90"></div>
            <div className="threeSignalDistantP_Line91"></div>
            <div className="threeSignalDistantP_Line92"></div>
            <div className="threeSignalDistantP_Line93"></div>
            <div className="threeSignalDistantP_Line95"></div>
            <div className="threeSignalDistantP_Line97"></div>
            <div className="threeSignalDistantP_Line98"></div>
            <div className="threeSignalDistantP_Line99"></div>
            <div className="threeSignalDistantP_Line100"></div>
            <div className="threeSignalDistantP_Line101"></div>
            <div className="threeSignalDistantP_Line102"></div>
            <div className="threeSignalDistantP_Line103"></div>
            {/* <div className="threeSignalDistantP_S1d">S1D</div> */}
            <div className="threeSignalDistantP_VDcExtNil_1">24v DC EXT-NIL</div>
            <div className="threeSignalDistantP_Dr_2">DR</div>
            <div className="threeSignalDistantP_3V_1">XX V</div>
            {/* <div className="threeSignalDistantP_1024_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div> */}
            <div className="threeSignalDistantP_EldSigNil_1">ELD SIG - NIL</div>
            <div className="threeSignalDistantP_Dr_3">DR</div>
            {/* <div className="threeSignalDistantP_Rectangle8_R" /> */}
            {SignalRelayDPR?.value == 1 ? <div className="threeSignalDistantP_Rectangle8_G" /> : SignalRelayDPR?.value == 0 ? <div className="threeSignalDistantP_Rectangle8_R" /> : <div className="threeSignalDistantP_Rectangle8_Gr" />}                      
            <div className="threeSignalDistantP_Dpr_1">DPR</div>
            <div className="threeSignalDistantP_5546_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </div>
            <div className="threeSignalDistantP_Line104"></div>
            <div className="threeSignalDistantP_Line105"></div>
            <div className="threeSignalDistantP_Line106"></div>
            <div className="threeSignalDistantP_Line107"></div>
            <div className="threeSignalDistantP_Hhr_2">HHR</div>
            <div className="threeSignalDistantP_Hhr_3">HHR</div>
            <div className="threeSignalDistantP_Line108"></div>
            <div className="threeSignalDistantP_Line109"></div>
            <div className="threeSignalDistantP_Line110"></div>
            <div className="threeSignalDistantP_Line111"></div>
            {SignalRelayHHPR?.value == 1 ? <div className="threeSignalDistantP_Rectangle9_G" /> : SignalRelayHHPR?.value == 0 ? <div className="threeSignalDistantP_Rectangle9_R" /> : <div className="threeSignalDistantP_Rectangle9_Gr" />}                      
            <div className="threeSignalDistantP_Hhpr_1">HHPR</div>
            <div className="threeSignalDistantP_4950_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}  </div>
            <div className="threeSignalDistantP_Ellipse22" />
            <div className="threeSignalDistantP_Ellipse23" />
            <div className="threeSignalDistantP_Ellipse24" />
            <div className="threeSignalDistantP_Ellipse25" />
            <div className="threeSignalDistantP_Line112"></div>
            <div className="threeSignalDistantP_Line113"></div>
            <div className="threeSignalDistantP_Line114"></div>
            <div className="threeSignalDistantP_Line115"></div>
            {SignalRelayDECPR?.value == 1 ? <div className="threeSignalDistantP_Rectangle10_G" /> : SignalRelayDECPR?.value == 0 ? <div className="threeSignalDistantP_Rectangle10_R" /> : <div className="threeSignalDistantP_Rectangle10_Gr" />}                      
            <div className="threeSignalDistantP_Decpr_2">DECPR</div>
            <div className="threeSignalDistantP_Rectangle11" />
            {SignalRelayHHECPR?.value == 1 ? <div className="threeSignalDistantP_Rectangle11_G" /> : SignalRelayHHECPR?.value == 0 ? <div className="threeSignalDistantP_Rectangle11_R" /> : <div className="threeSignalDistantP_Rectangle11_Gr" />}                      
            <div className="threeSignalDistantP_Hhecpr_2">HHECPR</div>
            {SignalRelayHECPR?.value == 1 ? <div className="threeSignalDistantP_Rectangle12_G" /> : SignalRelayHECPR?.value == 0 ? <div className="threeSignalDistantP_Rectangle12_R" /> : <div className="threeSignalDistantP_Rectangle12_Gr" />}                      
            <div className="threeSignalDistantP_Hecpr_2">HECPR</div>
            <div className="threeSignalDistantP_Decpr_3">DECR</div>
            <div className="threeSignalDistantP_Hhecpr_3">HHECR</div>
            <div className="threeSignalDistantP_Hhecpr_4">HHECR</div>
            <div className="threeSignalDistantP_Hecr_1">HECR</div>
            <div className="threeSignalDistantP_Hecr_2">HECR</div>
            <div className="threeSignalDistantP_VDcExtNil_2">24v DC EXT-NIL</div>
            <div className="threeSignalDistantP_3V_2">XX V </div>
            <div className="threeSignalDistantP_1024_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_5548_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_4949"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")} </div>
            <div className="threeSignalDistantP_5548_2"> {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}  </div>
            <div className="threeSignalDistantP_Ellipse26" />
            <div className="threeSignalDistantP_Ellipse27" />
            <div className="threeSignalDistantP_Ellipse28" />
            <div className="threeSignalDistantP_Ellipse29" />
            <div className="threeSignalDistantP_Ellipse30" />
            <div className="threeSignalDistantP_Ellipse31" />
            <div className="threeSignalDistantP_Line116"></div>
            <div className="threeSignalDistantP_Line117"></div>
            <div className="threeSignalDistantP_Line118"></div>
            <div className="threeSignalDistantP_Line119"></div>
            <div className="threeSignalDistantP_Line120"></div>
            <div className="threeSignalDistantP_Line121"></div>
            <div className="threeSignalDistantP_Line122"></div>
            <div className="threeSignalDistantP_Line123"></div>
            <div className="threeSignalDistantP_Line124"></div>
            <div className="threeSignalDistantP_Line125"></div>
            <div className="threeSignalDistantP_Line126"></div>
            <div className="threeSignalDistantP_Line127"></div>
            <div className="threeSignalDistantP_Line128"></div>
            <div className="threeSignalDistantP_Line129"></div>
            <div className="threeSignalDistantP_Line130"></div>
            <div className="threeSignalDistantP_Line131"></div>
            <div className="threeSignalDistantP_Line132"></div>
            <div className="threeSignalDistantP_Line133"></div>
            <div className="threeSignalDistantP_VAcToRelayRoom">110v AC TO Relay Room</div>
            <div className="threeSignalDistantP_Dpr_2">DPR</div>
            <div className="threeSignalDistantP_Decpr_4">DECR</div>
            <div className="threeSignalDistantP_Dpr_3">DPR</div>
            {/* <div  >118</div> */}
            <div className="threeSignalDistantP_V151024">XX V {moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_EldSigNil_2">ELD SIG - NIL</div>
            <div className="threeSignalDistantP_Hhpr_2">HHPR</div>
            <div className="threeSignalDistantP_Hhpr_3">HHPR</div>
            <div className="threeSignalDistantP_34">{RealTimeSignalDashboardData?.lightyellowvoltage} V</div>
            <div className="threeSignalDistantP_V134949">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="threeSignalDistantP_C_1">C 0</div> */}
            {/* <div>0</div> */}
            <div className="threeSignalDistantP_Ma_1">{RealTimeSignalDashboardData?.lightyellowcurrent} A</div>
            <div className="threeSignalDistantP_4948_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}  </div>
            <div className="threeSignalDistantP_Decr_1">DECR</div>
            <div className="threeSignalDistantP_Dpr_4">DPR</div>
            <div className="threeSignalDistantP_Dpr_5">DPR</div>
            <div className="threeSignalDistantP_Rectangle13" />
            <div className="threeSignalDistantP_Rectangle14" />
            <div className="threeSignalDistantP_Decr_2">DECR</div>
            <div className="threeSignalDistantP_Rectangle15"></div>
            <div className="threeSignalDistantP_Hecr_3">HECR</div>
            <div className="threeSignalDistantP_Hhecr">HHECR</div>
            <div className="threeSignalDistantP_4948_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_27">{RealTimeSignalDashboardData?.greenvoltage} V</div>
            <div className="threeSignalDistantP_V135548_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="threeSignalDistantP_C_2">C</div>
            <div className="threeSignalDistantP_0">0</div>
            <div className="threeSignalDistantP_00">119</div> */}
            <div className="threeSignalDistantP_Ma_2">{RealTimeSignalDashboardData?.greencurrent} A</div>
            <div className="threeSignalDistantP_5546_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_5548_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_118">{RealTimeSignalDashboardData?.yellowvoltage} V</div>
            <div className="threeSignalDistantP_V135548_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_5547_3">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            {/* <div className="threeSignalDistantP_C_3">C</div> */}
            <div className="threeSignalDistantP_Ma_3">{RealTimeSignalDashboardData?.yellowcurrent} A</div>
            <div className="threeSignalDistantP_5547_4">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="threeSignalDistantP_Line134"></div>
            <div className="threeSignalDistantP_Line135"></div>
            <div className="threeSignalDistantP_Line136"></div>
            <div className="threeSignalDistantP_Line137"></div>
            <div className="threeSignalDistantP_Line138"></div>
            <div className="threeSignalDistantP_Line139"></div>
            <div className="threeSignalDistantP_Line140"></div>
            <div className="threeSignalDistantP_Line141"></div>
            <div className="threeSignalDistantP_Line142"></div>
            <div className="threeSignalDistantP_Line143"></div>
            <div className="threeSignalDistantP_Line144"></div>
            <div className="threeSignalDistantP_Line145"></div>
            <div className="threeSignalDistantP_Line146"></div>
            <div className="threeSignalDistantP_Line147"></div>
            <div className="threeSignalDistantP_Line148"></div>
            <div className="threeSignalDistantP_Line149"></div>
            <div className="threeSignalDistantP_Ellipse32" />
            <div className="threeSignalDistantP_Ellipse33" />
            <div className="threeSignalDistantP_Ellipse34" />
            <div className="threeSignalDistantP_Ellipse35" />
            <div className="threeSignalDistantP_Ellipse36" />
            <div className="threeSignalDistantP_Line150"></div>
            <div className="threeSignalDistantP_Line151"></div>
            <div className="threeSignalDistantP_Line152"></div>
            <div className="threeSignalDistantP_Line153"></div>
            <div className="threeSignalDistantP_Line154"></div>
            <div className="threeSignalDistantP_Line155"></div>
            <div className="threeSignalDistantP_Line156"></div>
            <div className="threeSignalDistantP_Ellipse37" />
            <div className="threeSignalDistantP_Ellipse38" />
            <div className="threeSignalDistantP_Rectangle16" />
            <div className="threeSignalDistantP_Rectangle17" />
            <div className="threeSignalDistantP_RelayUp">Relay UP</div>
            <div className="threeSignalDistantP_RelayDown">Relay Down</div>
            <div className="threeSignalDistantP_Line157"></div>
            <div className="threeSignalDistantP_Line158"></div>
            <div className="threeSignalDistantP_Line159"></div>
            <div className="threeSignalDistantP_Line160"></div>
            <div className="threeSignalDistantP_Line161"></div>
            <div className="threeSignalDistantP_Line162"></div>
            <div className="threeSignalDistantP_Line163"></div>
            <div className="threeSignalDistantP_Line164"></div>
            <div className="threeSignalDistantP_Line165"></div>
            <div className="threeSignalDistantP_Line166"></div>
            <div className="threeSignalDistantP_Line167"></div>
            <div className="threeSignalDistantP_Line168"></div>
            <div className="threeSignalDistantP_Line169"></div>
            <div className="threeSignalDistantP_Line170"></div>
            <div className="threeSignalDistantP_Line171"></div>
            <div className="threeSignalDistantP_Line172"></div>
            <div className="threeSignalDistantP_Line173"></div>
            <div className="threeSignalDistantP_Line174"></div>
            <div className="threeSignalDistantP_Ellipse39" />
            <div className="threeSignalDistantP_Ellipse40" />
            <div className="threeSignalDistantP_Ellipse41" />
            <div className="threeSignalDistantP_Ellipse42" />
            <div className="threeSignalDistantP_Ellipse43" />
            <div className="threeSignalDistantP_Ellipse44" />
            <div className="threeSignalDistantP_Ellipse48" />
            <div className="threeSignalDistantP_Ellipse49" />
            <div className="threeSignalDistantP_Ellipse50" />
            <div className="threeSignalDistantP_Ellipse51" />
            <div className="threeSignalDistantP_Ellipse52" />
            <div className="threeSignalDistantP_Ellipse53" />
            <div className="threeSignalDistantP_Ellipse57" />
            <div className="threeSignalDistantP_Ellipse58" />
            <div className="threeSignalDistantP_Ellipse59" />
          </div>
        </>
      ) : signalcircuitid === 0 ? (
        <>
          <div className="ShuntSignal_Frame1">
            <div className="ShuntSignal_Line1"></div>
            <div className="ShuntSignal_Line2"></div>
            <div className="ShuntSignal_Line3"></div>
            <div className="ShuntSignal_Line4"></div>
            <div className="ShuntSignal_Line5"></div>
            <div className="ShuntSignal_Line6"></div>
            <div className="ShuntSignal_Line7"></div>
            <div className="ShuntSignal_Line9"></div>
            <div className="ShuntSignal_Line10"></div>
            <div className="ShuntSignal_Line11"></div>
            <div className="ShuntSignal_Line12"></div>
            <div className="ShuntSignal_Line13"></div>
            <div className="ShuntSignal_Ellipse4" />
            <div className="ShuntSignal_Ellipse5" />
            <div className="ShuntSignal_Ellipse6" />
            <div className="ShuntSignal_Ellipse7" />
            <div className="ShuntSignal_Line14"></div>
            <div className="ShuntSignal_Line15"></div>
            <div className="ShuntSignal_Line16"></div>
            <div className="ShuntSignal_Line17"></div>
            <div className="ShuntSignal_Line18"></div>
            <div className="ShuntSignal_Line19"></div>
            <div className="ShuntSignal_Line20"></div>
            <div className="ShuntSignal_Ellipse8" />
            <div className="ShuntSignal_Ellipse17" />
            <div className="ShuntSignal_Ellipse9" />
            <div className="ShuntSignal_Ellipse12" />
            <div className="ShuntSignal_Ellipse10" />
            <div className="ShuntSignal_Ellipse11" />
            <div className="ShuntSignal_Ellipse13" />
            <div className="ShuntSignal_Ellipse14" />
            <div className="ShuntSignal_Line21"></div>
            <div className="ShuntSignal_Line22"></div>
            <div className="ShuntSignal_Line23"></div>
            <div className="ShuntSignal_Line24"></div>
            <div className="ShuntSignal_Line25"></div>
            <div className="ShuntSignal_Line26"></div>
            <div className="ShuntSignal_Ellipse15" />
            <div className="ShuntSignal_Ellipse16" />
            <div className="ShuntSignal_Line27"></div>
            <div className="ShuntSignal_Line28"></div>
            <div className="ShuntSignal_Line29"></div>
            <div className="ShuntSignal_Line30"></div>
            <div className="ShuntSignal_Line31"></div>
            <div className="ShuntSignal_Line32"></div>
            <div className="ShuntSignal_Ellipse18" />
            <div className="ShuntSignal_Ellipse19" />
            <div className="ShuntSignal_Line33"></div>
            <div className="ShuntSignal_Line34"></div>
            <div className="ShuntSignal_Line35"></div>
            <div className="ShuntSignal_Line36"></div>
            <div className="ShuntSignal_Line37"></div>
            <div className="ShuntSignal_Ellipse20" />
            <div className="ShuntSignal_Ellipse21" />
            <div className="ShuntSignal_Ellipse22" />
            <div className="ShuntSignal_Line38"></div>
            <div className="ShuntSignal_Line39"></div>
            <div className="ShuntSignal_Line40"></div>
            <div className="ShuntSignal_Line41"></div>
            <div className="ShuntSignal_Line42"></div>
            <div className="ShuntSignal_Line43"></div>
            <div className="ShuntSignal_Line44"></div>
            <div className="ShuntSignal_Ellipse23" />
            <div className="ShuntSignal_Ellipse24" />
            <div className="ShuntSignal_Ellipse25" />
            <div className="ShuntSignal_Line45"></div>
            <div className="ShuntSignal_Line46"></div>
            <div className="ShuntSignal_Line47"></div>
            <div className="ShuntSignal_Line48"></div>
            <div className="ShuntSignal_Ellipse26" />
            <div className="ShuntSignal_Line49"></div>
            <div className="ShuntSignal_Line50"></div>
            <div className="ShuntSignal_Line51"></div>
            <div className="ShuntSignal_Line53"></div>
            <div className="ShuntSignal_Ellipse27" />
            <div className="ShuntSignal_Line54"></div>
            <div className="ShuntSignal_Line55"></div>
            <div className="ShuntSignal_Line56"></div>
            <div className="ShuntSignal_Ellipse28" />
            <div className="ShuntSignal_Line57"></div>
            <div className="ShuntSignal_Line58"></div>
            <div className="ShuntSignal_Line59"></div>
            <div className="ShuntSignal_Line60"></div>
            <div className="ShuntSignal_Line61"></div>
            <div className="ShuntSignal_Line62"></div>
            <div className="ShuntSignal_Line63"></div>
            <div className="ShuntSignal_Line64"></div>
            <div className="ShuntSignal_Line65"></div>
            <div className="ShuntSignal_Line66"></div>
            <div className="ShuntSignal_Line68"></div>
            <div className="ShuntSignal_Ellipse29" />
            <div className="ShuntSignal_Line69"></div>
            <div className="ShuntSignal_Line70"></div>
            <div className="ShuntSignal_Ellipse30" />
            <div className="ShuntSignal_Ellipse31" />
            <div className="ShuntSignal_Ellipse32" />
            <div className="ShuntSignal_Ellipse33" />
            <div className="ShuntSignal_Ellipse34" />
            <div className="ShuntSignal_Line71"></div>
            <div className="ShuntSignal_VAc">110 V AC</div>
            <div className="ShuntSignal_Rectangle1" />
            <div className="ShuntSignal_Hecr">HECR</div>
            <div className="ShuntSignal_Rectangle2" />
            <div className="ShuntSignal_04V">2.04 v </div>
            <div className="ShuntSignal_0149">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="ShuntSignal_Rectangle3" />
            <div className="ShuntSignal_00V">0</div>
            <div className="ShuntSignal_Ma_1">mA</div>
            <div className="ShuntSignal_0148">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="ShuntSignal_Hpr_1">HPR</div>
            <div className="ShuntSignal_Hpr_2">HPR</div>
            <div className="ShuntSignal_Hpr_3">HPR</div>
            <div className="ShuntSignal_Hpr_4">HPR</div>
            <div className="ShuntSignal_Hpr_5">HPR</div>
            <div className="ShuntSignal_Hpr_6">HPR</div>
            <div className="ShuntSignal_Rectangle4" />
            <div className="ShuntSignal_Recr">RECR</div>
            <div className="ShuntSignal_Hpr_7">HPR</div>
            <div className="ShuntSignal_Hpr_8">HPR</div>
            <div className="ShuntSignal_Hpr_9">HPR</div>
            <div className="ShuntSignal_Rectangle5" />
            <div className="ShuntSignal_V_1">112 V</div>
            <div className="ShuntSignal_3239">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="ShuntSignal_Rectangle6" />
            <div className="ShuntSignal_4">51.4</div>
            <div className="ShuntSignal_Ma_2">mA</div>
            <div className="ShuntSignal_4856_1">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="ShuntSignal_Rectangle7" />
            <div className="ShuntSignal_V_2">112 v</div>
            <div className="ShuntSignal_556">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="ShuntSignal_Rectangle8" />
            <div className="ShuntSignal_1">51.1</div>
            <div className="ShuntSignal_Ma_3">mA</div>
            <div className="ShuntSignal_4856_2">{moment(RealTimeSignalDashboardData?.createddate).format("HH:mm:ss")}</div>
            <div className="ShuntSignal_Line72"></div>
            <div className="ShuntSignal_Line73"></div>
            <div className="ShuntSignal_Line74"></div>
            <div className="ShuntSignal_Line75"></div>
            <div className="ShuntSignal_Line76"></div>
            <div className="ShuntSignal_Line77"></div>
            <div className="ShuntSignal_Line78"></div>
            <div className="ShuntSignal_Line79"></div>
            <div className="ShuntSignal_Rectangle9" />
            <div className="ShuntSignal_Sh9">SH9</div>
            <div className="ShuntSignal_Hpr_10">HPR</div>
            <div className="ShuntSignal_Rectangle10"></div>
            <div className="ShuntSignal_Ellipse35"></div>
            <div className="ShuntSignal_Ellipse36" />
            <div className="ShuntSignal_Ellipse37" />
          </div>
        </>
      ) :
      (
        <h2>Circuit Not Available for this Device...</h2>
      )
    );
  }


  return (
    <Layout style={{ height: "80vh" }}>
      <Content style={{ padding: "1.5%" }}>
        <Row>
          <Col span={24}>
            <Row gutter={[8, 32]}>
              {SignalCircuitList && SignalCircuitList.length > 0 ? (
                SignalCircuitList.map((item, id) => (
                  <>
                    <Col
                      xs={{ span: 22, offset: 2 }}
                      sm={{ span: 24, offset: 0 }}
                      md={{ span: 10, offset: 0 }}
                      lg={{ span: 10, offset: 0 }}
                      xl={{ span: 4, offset: 0 }}
                    >
                      <Card
                        key={item.id}
                        id="signalCard"
                        onClick={() => { onclickCard(item) }}
                        style={{ height: "295px", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                      >
                        {item.aspecttypeid == 1 ?
                          // Two Aspect Color Light Signal(RG,DG)                         
                          <div className="wrapper">
                            <div
                              aria-live="polite"
                              className={[
                                "traffic-light-container",
                                layout === "vertical" &&
                                "traffic-light-container--vertical",
                              ]
                                .filter((cls) => !!cls)
                                .join(" ")}
                              style={{ top: "10px" }}>
                              {item.gui === 2 ||
                                item.gui === 5 ? (
                                <Light backgroundColor={GreenColor} />
                              ) : (
                                <Light backgroundColor={undefined} />
                              )}

                              {item.gui === 1 ||
                                item.gui === 5 ? (
                                <Light backgroundColor={RedColor} />
                              ) : (
                                <Light backgroundColor={undefined} />
                              )}
                              <div className="signalPostTwoAspect"></div>
                            </div>

                          </div>
                          : item.aspecttypeid == 2 ?
                            // Two Aspect Color Light Signal(RG,HG)
                            <div className="wrapper">
                              <div
                                aria-live="polite"
                                className={[
                                  "traffic-light-container",
                                  layout === "vertical" &&
                                  "traffic-light-container--vertical",
                                ]
                                  .filter((cls) => !!cls)
                                  .join(" ")}
                                style={{ top: "20px" }}>
                                {item.gui === 3 ||
                                  item.gui === 6 ? (
                                  <Light backgroundColor={YellowColor} />
                                ) : (
                                  <Light backgroundColor={undefined} />
                                )}

                                {item.gui === 1 ||
                                  item.gui === 6 ? (
                                  <Light backgroundColor={RedColor} />
                                ) : (
                                  <Light backgroundColor={undefined} />
                                )}
                                <div className="signalPostTwoAspect"></div>
                              </div>
                            </div>
                            : item.aspecttypeid == 3 ?
                              //Three Aspect Color Light Stop Signal(RG,HG,DG)
                              <>
                                <div className="wrapper">
                                  <div
                                    aria-live="polite"
                                    className={[
                                      "traffic-light-container",
                                      layout === "vertical" &&
                                      "traffic-light-container--vertical",
                                    ]
                                      .filter((cls) => !!cls)
                                      .join(" ")}>

                                    {item.gui === 2 ||
                                      item.gui === 5 ||
                                      item.gui === 8 ||
                                      item.gui === 11 ? (
                                      <Light backgroundColor={GreenColor} />
                                    ) : (
                                      <Light backgroundColor={undefined} />
                                    )}

                                    {item.gui === 3 ||
                                      item.gui === 6 ||
                                      item.gui === 8 ||
                                      item.gui === 11 ? (
                                      <Light backgroundColor={YellowColor} />
                                    ) : (
                                      <Light backgroundColor={undefined} />
                                    )}

                                    {item.gui === 1 ||
                                      item.gui === 5 ||
                                      item.gui === 6 ||
                                      item.gui === 11 ? (
                                      <Light backgroundColor={RedColor} />
                                    ) : (
                                      <Light backgroundColor={undefined} />
                                    )}
                                    <div className="signalPostThreeAspect"></div>
                                  </div>
                                </div>
                              </>
                              : item.aspecttypeid == 5 ?
                                //Color Light Distant Signal(HG,DG,HHG)
                                <>
                                  <div className="wrapper">
                                    <div
                                      aria-live="polite"
                                      className={[
                                        "traffic-light-container",
                                        layout === "vertical" &&
                                        "traffic-light-container--vertical",
                                      ]
                                        .filter((cls) => !!cls)
                                        .join(" ")}>

                                      {item.gui === 4 ||
                                        item.gui === 9 ||
                                        item.gui === 10 ||
                                        item.gui === 11 ? (
                                        <Light backgroundColor={LightYellowColor} />
                                      ) : (
                                        <Light backgroundColor={undefined} />
                                      )}

                                      {item.gui === 2 ||
                                        item.gui === 8 ||
                                        item.gui === 9 ||
                                        item.gui === 11 ? (
                                        <Light backgroundColor={GreenColor} />
                                      ) : (
                                        <Light backgroundColor={undefined} />
                                      )}

                                      {item.gui === 3 ||
                                        item.gui === 8 ||
                                        item.gui === 10 ||
                                        item.gui === 11 ? (
                                        <Light backgroundColor={YellowColor} />
                                      ) : (
                                        <Light backgroundColor={undefined} />
                                      )}
                                      <NormalDistantLight />
                                    </div>
                                  </div>
                                </>
                                : item.aspecttypeid == 13 ?
                                  //Calling On Root Signal–Left(RG,HG,DG,WG,HHG)   
                                  <>
                                    <div className="callOnRouteSignal">
                                      <div className="wrapper">
                                        <div
                                          className={[
                                            "traffic-light-container-platform11",
                                            layout === "vertical" &&
                                            "traffic-light-container-platform--vertical11",
                                          ]
                                            .filter((cls) => !!cls)
                                            .join(" ")}>

                                          {
                                            parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                              ? <PlatformLight backgroundColor={WhiteColor} />
                                              : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                  ? <PlatformLight backgroundColor={WhiteColor} />
                                                  : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                          }

                                          {
                                            parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                              ? <PlatformLight backgroundColor={WhiteColor} />
                                              : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                  ? <PlatformLight backgroundColor={WhiteColor} />
                                                  : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                          }

                                          {
                                            parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                              ? <PlatformLight backgroundColor={WhiteColor} />
                                              : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                  ? <PlatformLight backgroundColor={WhiteColor} />
                                                  : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                          }

                                          {
                                            parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                              ? <PlatformLight backgroundColor={WhiteColor} />
                                              : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                  ? <PlatformLight backgroundColor={WhiteColor} />
                                                  : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                          }

                                          {
                                            parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                              ? <PlatformLight backgroundColor={WhiteColor} />
                                              : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                  ? <PlatformLight backgroundColor={WhiteColor} />
                                                  : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                          }


                                        </div>
                                        {/* route center light */}
                                        <Octagon1 backgroundColor={null} />
                                        <div
                                          style={{ top: "-95px" }}
                                          aria-live="polite"
                                          className={[
                                            "traffic-light-container",
                                            layout === "vertical" &&
                                            "traffic-light-container--vertical",
                                          ]
                                            .filter((cls) => !!cls)
                                            .join(" ")}>

                                          {item.gui === 2 ||
                                            item.gui === 5 ||
                                            item.gui === 8 ||
                                            item.gui === 9 ||
                                            item.gui === 11 ? (
                                            <Light backgroundColor={GreenColor} />
                                          ) : (
                                            <Light backgroundColor={undefined} />
                                          )}

                                          {item.gui === 3 ||
                                            item.gui === 6 ||
                                            item.gui === 8 ||
                                            item.gui === 10 ||
                                            item.gui === 11 ? (
                                            <Light backgroundColor={YellowColor} />
                                          ) : (
                                            <Light backgroundColor={undefined} />
                                          )}


                                          {item.gui === 1 ||
                                            item.gui === 5 ||
                                            item.gui === 6 ||
                                            item.gui === 7 ||
                                            item.gui === 11 ? (
                                            <Light backgroundColor={RedColor} />
                                          ) : (
                                            <Light backgroundColor={undefined} />
                                          )}

                                          {/* <DistantLightO /> */}
                                          <NormalDistantLightWithP />
                                          {/* light yellow */}
                                          {/* <SingleLightWithRoute backgroundColor={LightYellowColor} />   */}
                                          {/* grey without light yellow */}
                                          {
                                            parseFloat(item.lightyellowvoltage) >= parseFloat(100) && parseFloat(item.lightyellowvoltage) <= parseFloat(150) && parseFloat(item.lightyellowcurrent) >= parseFloat(0.105) && parseFloat(item.lightyellowcurrent) <= parseFloat(0.6)
                                              ? <SingleLightWithRouteNormal backgroundColor={YellowColor} />
                                              : parseFloat(item.lightyellowvoltage) >= parseFloat(100) && parseFloat(item.lightyellowvoltage) <= parseFloat(150)
                                                ? parseFloat(item.lightyellowcurrent) < parseFloat(0.105)
                                                  ? <SingleLightWithRouteNormal backgroundColor={YellowColor} />
                                                  : parseFloat(item.lightyellowcurrent > parseFloat(0.6))
                                                    ? <SingleLightWithRouteNormal backgroundColor={YellowColor} />
                                                    : <SingleLightWithRouteNormal backgroundColor={greyColor} /> : <SingleLightWithRouteNormal backgroundColor={greyColor} />
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                  : item.aspecttypeid == 14 ?
                                    //Calling On Root Signal–Left(RG,HG,DG,WG,HHG)   
                                    <>
                                      <div className="callOnRouteSignal">
                                        <div className="wrapper">
                                          <div
                                            className={[
                                              "traffic-light-container-platform12",
                                              layout === "vertical" &&
                                              "traffic-light-container-platform--vertical11",
                                            ]
                                              .filter((cls) => !!cls)
                                              .join(" ")}>
                                            {
                                              parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                                ? <PlatformLight backgroundColor={WhiteColor} />
                                                : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                  ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                      ? <PlatformLight backgroundColor={WhiteColor} />
                                                      : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                            }

                                            {
                                              parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                                ? <PlatformLight backgroundColor={WhiteColor} />
                                                : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                  ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                      ? <PlatformLight backgroundColor={WhiteColor} />
                                                      : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                            }

                                            {
                                              parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                                ? <PlatformLight backgroundColor={WhiteColor} />
                                                : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                  ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                      ? <PlatformLight backgroundColor={WhiteColor} />
                                                      : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                            }

                                            {
                                              parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                                ? <PlatformLight backgroundColor={WhiteColor} />
                                                : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                  ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                      ? <PlatformLight backgroundColor={WhiteColor} />
                                                      : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                            }

                                            {
                                              parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150) && parseFloat(item.whitecurrent) >= parseFloat(0.105) && parseFloat(item.whitecurrent) <= parseFloat(0.6)
                                                ? <PlatformLight backgroundColor={WhiteColor} />
                                                : parseFloat(item.whitevoltage) >= parseFloat(100) && parseFloat(item.whitevoltage) <= parseFloat(150)
                                                  ? parseFloat(item.whitecurrent) < parseFloat(0.105)
                                                    ? <PlatformLight backgroundColor={WhiteColor} />
                                                    : parseFloat(item.whitecurrent > parseFloat(0.6))
                                                      ? <PlatformLight backgroundColor={WhiteColor} />
                                                      : <PlatformLight backgroundColor={greyColor} /> : <PlatformLight backgroundColor={greyColor} />
                                            }
                                          </div>
                                          {/* route center light */}
                                          <Octagon1 backgroundColor={null} />
                                          <div
                                            style={{ top: "-95px" }}
                                            aria-live="polite"
                                            className={[
                                              "traffic-light-container",
                                              layout === "vertical" &&
                                              "traffic-light-container--vertical",
                                            ]
                                              .filter((cls) => !!cls)
                                              .join(" ")}>

                                            {item.gui === 2 ||
                                              item.gui === 5 ||
                                              item.gui === 8 ||
                                              item.gui === 9 ||
                                              item.gui === 11 ? (
                                              <Light backgroundColor={GreenColor} />
                                            ) : (
                                              <Light backgroundColor={undefined} />
                                            )}

                                            {item.gui === 3 ||
                                              item.gui === 6 ||
                                              item.gui === 8 ||
                                              item.gui === 10 ||
                                              item.gui === 11 ? (
                                              <Light backgroundColor={YellowColor} />
                                            ) : (
                                              <Light backgroundColor={undefined} />
                                            )}


                                            {item.gui === 1 ||
                                              item.gui === 5 ||
                                              item.gui === 6 ||
                                              item.gui === 7 ||
                                              item.gui === 11 ? (
                                              <Light backgroundColor={RedColor} />
                                            ) : (
                                              <Light backgroundColor={undefined} />
                                            )}

                                            {/* <DistantLightO /> */}
                                            <NormalDistantLightWithP />
                                            {/* light yellow */}
                                            {/* <SingleLightWithRoute backgroundColor={LightYellowColor} />   */}
                                            {/* grey without light yellow */}
                                            {
                                              parseFloat(item.lightyellowvoltage) >= parseFloat(100) && parseFloat(item.lightyellowvoltage) <= parseFloat(150) && parseFloat(item.lightyellowcurrent) >= parseFloat(0.105) && parseFloat(item.lightyellowcurrent) <= parseFloat(0.6)
                                                ? <SingleLightWithRouteNormal backgroundColor={YellowColor} />
                                                : parseFloat(item.lightyellowvoltage) >= parseFloat(100) && parseFloat(item.lightyellowvoltage) <= parseFloat(150)
                                                  ? parseFloat(item.lightyellowcurrent) < parseFloat(0.105)
                                                    ? <SingleLightWithRouteNormal backgroundColor={YellowColor} />
                                                    : parseFloat(item.lightyellowcurrent > parseFloat(0.6))
                                                      ? <SingleLightWithRouteNormal backgroundColor={YellowColor} />
                                                      : <SingleLightWithRouteNormal backgroundColor={greyColor} /> : <SingleLightWithRouteNormal backgroundColor={greyColor} />
                                            }


                                          </div>
                                        </div>
                                      </div>
                                    </>
                                    : item.aspecttypeid == 23 ?
                                      <>
                                        {/* Junction Route Indicator Left */}
                                        <div className="callOnRouteSignal">
                                          <div className="wrapper">
                                            <div
                                              className={[
                                                "traffic-light-container-platform12",
                                                layout === "vertical" &&
                                                "traffic-light-container-platform--vertical11",
                                              ]
                                                .filter((cls) => !!cls)
                                                .join(" ")}>
                                              <PlatformLight backgroundColor={WhiteColor} />
                                              <PlatformLight backgroundColor={WhiteColor} />
                                              <PlatformLight backgroundColor={WhiteColor} />
                                              <PlatformLight backgroundColor={WhiteColor} />
                                              <PlatformLight backgroundColor={WhiteColor} />
                                            </div>
                                            {/* route center light */}
                                            <Octagon1 backgroundColor={null} />
                                            <div
                                              style={{ top: "-95px" }}
                                              aria-live="polite"
                                              className={[
                                                "traffic-light-container",
                                                layout === "vertical" &&
                                                "traffic-light-container--vertical",
                                              ]
                                                .filter((cls) => !!cls)
                                                .join(" ")}>
                                              <Light backgroundColor={GreenColor} />
                                              <Light backgroundColor={undefined} />
                                              <Light backgroundColor={undefined} />
                                              <DistantLight1 />
                                              {/* light yellow */}
                                              <SingleLightWithRoute backgroundColor={LightYellowColor} />
                                              {/* grey without light yellow */}
                                              {/* <SingleLightWithRouteNormal backgroundColor={greyColor}/> */}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                      : item.aspecttypeid == 24 ?
                                        <>
                                          {/*  2 aspect route with P*/}
                                          <div className="wrapper">
                                            <div
                                              aria-live="polite"
                                              className={[
                                                "traffic-light-container",
                                                layout === "vertical" &&
                                                "traffic-light-container--vertical",
                                              ]
                                                .filter((cls) => !!cls)
                                                .join(" ")}
                                              style={{ top: "-13px" }}>
                                              <Light backgroundColor={GreenColor} />
                                              <Light backgroundColor={RedColor} />
                                              <NormalDistantLightTwoAspect />
                                            </div>
                                          </div>
                                        </>
                                        : item.aspecttypeid == 25 ?
                                          <>
                                            {/* 4 aspects: */}
                                            <div className="wrapper">
                                              <div
                                                aria-live="polite"
                                                className={[
                                                  "traffic-light-container",
                                                  layout === "vertical" &&
                                                  "traffic-light-container--vertical",
                                                ]
                                                  .filter((cls) => !!cls)
                                                  .join(" ")}
                                                style={{ top: "20px" }}>
                                                {item.gui === 3 ||
                                                  item.gui === 6 ||
                                                  item.gui === 8 ||
                                                  item.gui === 10 ||
                                                  item.gui === 11 ? (
                                                  <>
                                                    <Light backgroundColor={YellowColor} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                ) : (
                                                  <>
                                                    <Light backgroundColor={undefined} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                )}

                                                {item.gui === 2 ||
                                                  item.gui === 5 ||
                                                  item.gui === 8 ||
                                                  item.gui === 9 ||
                                                  item.gui === 11 ? (
                                                  <>
                                                    <Light backgroundColor={GreenColor} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                ) : (
                                                  <>
                                                    {" "}
                                                    <Light backgroundColor={undefined} />{" "}
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                )}

                                                {item.gui === 4 ||
                                                  item.gui === 7 ||
                                                  item.gui === 9 ||
                                                  item.gui === 10 ||
                                                  item.gui === 11 ? (
                                                  <>
                                                    <Light backgroundColor={LightYellowColor} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                ) : (
                                                  <>
                                                    <Light backgroundColor={undefined} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                )}

                                                {item.gui === 1 ||
                                                  item.gui === 5 ||
                                                  item.gui === 6 ||
                                                  item.gui === 7 ||
                                                  item.gui === 11 ? (
                                                  <>
                                                    <Light backgroundColor={RedColor} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                ) : (
                                                  <>
                                                    <Light backgroundColor={undefined} />
                                                    {/* <DistantLightO /> */}
                                                  </>
                                                )}
                                                <div className="signalPostFourAspect"></div>
                                              </div>
                                            </div>
                                          </>
                                          : <>
                                            {/*  3 aspect route with P*/}
                                            <div className="wrapper">
                                              <div
                                                aria-live="polite"
                                                className={[
                                                  "traffic-light-container",
                                                  layout === "vertical" &&
                                                  "traffic-light-container--vertical",
                                                ]
                                                  .filter((cls) => !!cls)
                                                  .join(" ")}>
                                                <Light backgroundColor={GreenColor} />
                                                <Light backgroundColor={YellowColor} />
                                                <Light backgroundColor={RedColor} />
                                                <NormalDistantLight backgroundColor={RedColor} />
                                              </div>
                                            </div>
                                          </>
                        }
                        <div>
                          <Row>
                            <Col
                              span={12}
                              style={{
                                textAlign: "center",
                                // padding: "5%",
                                fontSize: "14px",
                                color: "black",
                              }}
                            >
                              {" "}
                              C: {item.aspect_current} A
                            </Col>
                            <Col
                              span={11}
                              style={{
                                textAlign: "center",
                                // padding: "5%",
                                fontSize: "14px",
                                color: "black",
                              }}
                            >
                              V: {item.aspect_voltage} V
                            </Col>
                          </Row>
                        </div>
                        <div className="AssertAlert">
                          <div className={item.modeid === 3 ? "redColor" : item.modeid === 2 ? "orangeColor" : item.modeid === 1 ? "yellowColor" : "AssertAlert"}>
                            <Row>
                              <Col
                                span={8}
                                style={{ textAlign: "start", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                                {item.signalname}
                              </Col>
                              <Col
                                span={16}
                                style={{ textAlign: "end", fontSize: "14px", fontWeight: "800" }}>
                                {" "}
                                {moment(item.createddate).format("HH:mm:ss")}
                                <Col style={{ textAlign: "end", fontSize: "14px", fontWeight: "800" }}>
                                  {moment(item.createddate).format("YYYY-MM-DD")}
                                </Col>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </>
                ))
              ) :
                (
                  <div className="noDataDiv">
                    {/* <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 64,
                            marginTop: "10%"
                          }}
                          spin
                        />
                      }
                    /> */}
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )
              }
            </Row>
          </Col>
        </Row>

        <div>
          {OpenModal ?
            <Modal
              title={'Signal Circuit- ' + SignalName + ' @' + station_name}
              onOk={handleOk}
              onCancel={handleCancel}
              open={OpenModal}
              width={1400}
              footer={null}
            // closeIcon={false}
            >
              <div>
                <Row>
                  <Col xs={8} sm={6} md={4} lg={4} xl={4} onClick={() => handleTabClick("2")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "2" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "2" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Live Data
                    </button>
                  </Col>
                  <Col xs={8} sm={6} md={3} lg={3} xl={3} onClick={() => handleTabClick("3")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "3" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "3" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Live Alerts
                    </button>
                  </Col>
                  <Col xs={8} sm={6} md={4} lg={4} xl={4} onClick={() => handleTabClick("4")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "4" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "4" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Live Graph
                    </button>
                  </Col>
                  <Col xs={8} sm={6} md={3} lg={3} xl={3} onClick={() => handleTabClick("5")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "5" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "5" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Data Logs
                    </button>
                  </Col>
                  <Col xs={8} sm={6} md={4} lg={4} xl={4} onClick={() => handleTabClick("6")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "6" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "6" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Alert Logs
                    </button>
                  </Col>
                  <Col xs={8} sm={6} md={3} lg={3} xl={3} onClick={() => handleTabClick("7")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "7" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "7" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Relay Status
                    </button>
                  </Col>
                  <Col xs={8} sm={6} md={3} lg={3} xl={3} onClick={() => handleTabClick("1")} style={{
                    textAlign: "center",
                    border: "1px solid grey",
                    padding: "10px",
                    backgroundColor: activeTab === "1" ? "#23234D" : "white",
                  }}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "12px",
                        color: activeTab === "1" ? "white" : "black",
                      }}
                      className="tab-button"
                    >
                      Dashboard
                    </button>
                  </Col>
                </Row>
              </div>
              <div>
                <Row style={{ paddingBlock: "2%" }}>
                  <Col span={24}>
                    <div className="contentWrapper">
                      {activeTab === "2" && (
                        <div className="content active">
                          <ConfigProvider>
                            <Table
                              id="AssertTable"
                              className="Reports-table"
                              size="small"
                              scroll={{ x: "max-content" }}
                              rowKey={(record) => record.id}
                              loading={loading}
                              columns={data_table_columns}
                              dataSource={RealTimeSignalcircuitData}
                            />
                          </ConfigProvider>
                        </div>
                      )}
                      {activeTab === "3" && (
                        <div className="content active">
                          <ConfigProvider>
                            <Table
                              id="AssertTable"
                              className="Reports-table"
                              size="small"
                              scroll={{ x: "max-content" }}
                              rowKey={(record) => record.id}
                              loading={loading}
                              columns={alert_table_column}
                              dataSource={RealTimeSignalcircuitAlert}

                            />
                          </ConfigProvider>
                        </div>
                      )}
                      {activeTab === "4" && (
                        <div className="content active">
                          <div>
                            <ReactApexChart
                              options={chartOptions}
                              series={chartOptions.series}
                              //xaxis={chartOptions.xaxis}
                              type="line"
                              height={350}
                            />
                          </div>
                        </div>
                      )}
                      {activeTab === "5" && (
                        <div className="content active">
                          <Row className="downloadBtn">
                            <Col
                              xxl={{ span: 32, offset: 0 }}
                              xs={{ span: 32, offset: 0 }}
                              sm={{ span: 32, offset: 0 }}
                              lg={{ span: 32, offset: 0 }}
                              xl={{ span: 32, offset: 0 }}
                              style={{
                                marginBottom: "1em",
                                width: "100%",
                              }}
                            >
                              <Form
                                form={form}
                                name="addimage"
                                layout="inline"
                                onFinish={onFinishData}
                              >
                                <Form.Item
                                  name="datadate"
                                  className="dateFilter"
                                >
                                  <RangePicker
                                    // allowClear
                                    defaultValue={[
                                      dayjs(
                                        moment()
                                          .startOf("month")
                                          .format("YYYY-MM-DD"),
                                        dateFormat
                                      ),
                                      dayjs(
                                        moment().format(
                                          "YYYY-MM-DD"
                                        ),
                                        dateFormat
                                      ),
                                    ]}
                                    value={[datastartDatepicker, dataendDatepicker]}
                                    placeholder={[
                                      "Select start Date ",
                                      "End Date",
                                    ]}
                                    ranges={{
                                      Today: [
                                        moment(),
                                        moment(),
                                      ],
                                      Yesterday: [
                                        moment().subtract(
                                          1,
                                          "days"
                                        ),
                                        moment().subtract(
                                          1,
                                          "days"
                                        ),
                                      ],

                                      "This week": [
                                        moment().startOf(
                                          "week"
                                        ),
                                        moment(),
                                      ],
                                      "This Month": [
                                        moment().startOf(
                                          "month"
                                        ),
                                        moment(),
                                      ],
                                    }}
                                    format={"YYYY-MM-DD ddd"}
                                    disabledDate={(current) => {
                                      return (
                                        current &&
                                        current >
                                        moment().endOf("day")
                                      );
                                    }}
                                    onChange={(values) => { }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                  }}
                                  className="btnSubmit"
                                >
                                  <Button
                                    style={{
                                      backgroundColor:
                                        "#3e3a75",
                                      border: "none",
                                    }}
                                    type="primary"
                                    // block
                                    htmlType="submit"
                                  >
                                    Submit
                                  </Button>
                                </Form.Item>
                                <Form.Item className="btnSubmit">
                                  {SignalCircuitData.length > 0 ? <>
                                    <tp title="Dowload Data Logs">
                                      <Button
                                        //style={{background:"#23234D" }}
                                        loading={
                                          datareportloading
                                        }
                                        onClick={
                                          ReportDownloadData
                                        }
                                      >
                                        <CloudDownloadOutlined style={{ fontSize: '20px', color: '#23234D' }} />
                                      </Button>
                                    </tp>
                                  </> : null}
                                </Form.Item>
                              </Form>
                            </Col>
                          </Row>
                          <ConfigProvider>
                            <Table
                              id="AssertTable"
                              className="Reports-table"
                              size="small"
                              scroll={{ x: "max-content" }}
                              rowKey={(record) => record.id}
                              loading={datareportloading}
                              columns={data_log_table_columns}
                              dataSource={SignalCircuitData}
                              pagination={{
                                //pageSize: 10,
                                current: DataPageNo,
                                total: DataPageTotal,
                                showSizeChanger: false,
                                onChange: (page) => {
                                  HandleDatePicker(
                                    datastartDatepicker
                                      ? datastartDatepicker
                                      : "",
                                    dataendDatepicker
                                      ? dataendDatepicker
                                      : "",
                                    page,
                                    10,
                                    "Data"
                                  );
                                },
                              }}
                            />
                          </ConfigProvider>
                        </div>
                      )}
                      {activeTab === "6" && (
                        <div className="content active">
                          <Row className="downloadBtn">
                            <Col
                              xxl={{ span: 32, offset: 0 }}
                              xs={{ span: 32, offset: 0 }}
                              sm={{ span: 32, offset: 0 }}
                              lg={{ span: 32, offset: 0 }}
                              xl={{ span: 32, offset: 0 }}
                              style={{
                                marginBottom: "1em",
                                width: "100%",
                              }}
                            >
                              <Form
                                form={form}
                                name="addimage"
                                layout="inline"
                                onFinish={onFinishAlert}
                              >
                                <Form.Item
                                  name="alertdate"
                                  className="dateFilter"
                                >
                                  <RangePicker
                                    // allowClear
                                    defaultValue={[
                                      dayjs(
                                        moment()
                                          .startOf("month")
                                          .format("YYYY-MM-DD"),
                                        dateFormat
                                      ),
                                      dayjs(
                                        moment().format(
                                          "YYYY-MM-DD"
                                        ),
                                        dateFormat
                                      ),
                                    ]}
                                    value={[alertstartDatepicker, alertendDatepicker]}
                                    placeholder={[
                                      "Select start Date ",
                                      "End Date",
                                    ]}
                                    ranges={{
                                      Today: [
                                        moment(),
                                        moment(),
                                      ],
                                      Yesterday: [
                                        moment().subtract(
                                          1,
                                          "days"
                                        ),
                                        moment().subtract(
                                          1,
                                          "days"
                                        ),
                                      ],

                                      "This week": [
                                        moment().startOf(
                                          "week"
                                        ),
                                        moment(),
                                      ],
                                      "This Month": [
                                        moment().startOf(
                                          "month"
                                        ),
                                        moment(),
                                      ],
                                    }}
                                    format={"YYYY-MM-DD ddd"}
                                    disabledDate={(current) => {
                                      return (
                                        current &&
                                        current >
                                        moment().endOf("day")
                                      );
                                    }}
                                    onChange={(values) => { }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                  }}
                                  className="btnSubmit"
                                >
                                  <Button
                                    style={{
                                      backgroundColor:
                                        "#3e3a75",
                                      border: "none",
                                    }}
                                    type="primary"
                                    // block
                                    htmlType="submit"
                                  >
                                    Submit
                                  </Button>
                                </Form.Item>
                                <Form.Item className="btnSubmit">
                                  {SignalCircuitAlert.length > 0 ? <>
                                    <tp title="Dowload Alert Logs">
                                      <Button
                                        // style={{background:"#23234D" }}
                                        loading={
                                          alertreportloading
                                        }
                                        onClick={
                                          ReportDownloadAlert
                                        }
                                      >
                                        <CloudDownloadOutlined style={{ fontSize: '20px', color: '#23234D' }} />
                                      </Button>
                                    </tp> </> : null}
                                </Form.Item>
                              </Form>
                            </Col>
                          </Row>
                          <ConfigProvider>
                            <Table
                              id="AssertTable"
                              className="Reports-table"
                              size="small"
                              scroll={{ x: "max-content" }}
                              rowKey={(record) => record.id}
                              //loading={loading}
                              columns={alert_table_column}
                              dataSource={SignalCircuitAlert}
                              pagination={{
                                //pageSize: 10,
                                current: AlertPageNo,
                                total: AlertPageTotal,
                                showSizeChanger: false,
                                onChange: (page) => {
                                  HandleDatePicker(
                                    alertstartDatepicker
                                      ? alertstartDatepicker
                                      : "",
                                    alertendDatepicker
                                      ? alertendDatepicker
                                      : "",
                                    page,
                                    10,
                                    "Alert"
                                  );
                                },
                              }}
                            />
                          </ConfigProvider>
                        </div>
                      )}
                      {activeTab === "7" && (
                        <div className="content active">
                          <Row style={{ margin: "10px", padding: "10px" }}>
                            <Col span={24}>
                              <Row gutter={[8, 32]} style={{ marginRight: "35px" }}>
                                {relayList.toString() && relayList.length > 0 ? (
                                  relayList.filter((data) => data.assertsid === 3).map((item, id) => (
                                    <Col
                                      xs={{ span: 22, offset: 2 }}
                                      sm={{ span: 24, offset: 0 }}
                                      md={{ span: 10, offset: 0 }}
                                      lg={{ span: 10, offset: 0 }}
                                      xl={{ span: 2, offset: 2 }}
                                      id="relayCol"
                                    >
                                      <Row justify="center" align="middle">
                                        <Card
                                          // style={{ 
                                          //   // width: "35%",
                                          //    boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }} 
                                          className="relayCard"
                                          id="relayCardList"
                                          onClick={() => { onclickCard(item) }}>
                                          {item.value == "1" ?
                                            (
                                              <>
                                                <Row justify="center" align="middle" className="padding" style={{ backgroundColor: "rgba(0, 255, 28, 0.66)" }}>
                                                  <Col>
                                                    <Row className="padding">
                                                      <span>
                                                        <ImArrowUp className="arrow-icon" style={item.modeid === 1 ? { color: "white" } : { color: "#303331" }} />
                                                      </span>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                                <div className="AssertAlertUP" style={{ backgroundColor: "rgba(0, 255, 28, 0.66)" }}>
                                                  <div>
                                                    <Row className="text-center">
                                                      <Col
                                                        span={24}
                                                        style={{ color: "black", textAlign: "center", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                                                        {item.relayname}
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <Row justify="center" align="middle" className="padding" >
                                                  <Col>
                                                    <Row className="padding">
                                                      <span>
                                                        <ImArrowDown className="arrow-icon" style={item.modeid === 1 ? { color: "#ff0000" } : { color: "#303331" }} />
                                                      </span>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                                <div className="AssertAlert" >
                                                  <div>
                                                    <Row className="text-center">
                                                      <Col
                                                        span={24}
                                                        style={{ textAlign: "center", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                                                        {item.relayname}
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </div>
                                              </>
                                            )
                                          }
                                        </Card>
                                      </Row>
                                    </Col>
                                  ))
                                ) : (
                                  <div className="noDataDiv">
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                  </div>
                                )
                                }
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      )}
                      {activeTab === "1" && (
                        <div className="content active">
                          <div
                            style={{
                              height: "60vh",
                              fontSize: "40px",
                              textAlign: "center",
                              color: "#23234D",
                            }}>
                            {RealTimeSignalDashboardData != null ? SignalCircuitDashboard() : <></>}      
                          </div>
                        </div>
                      )}


                    </div>
                  </Col>
                </Row>
              </div>


            </Modal> : <></>
          }
        </div>
        <>
          {/* loader modal */}
          <Modal
            className="LoadinModal"
            open={Pageload}
            style={{ background: "none", textAlign: "center" }}
            footer={false}
            closable={false}
            centered
          >
            <ClipLoader
              color="#23234d"
              loading={Pageload}
              cssOverride={{
                display: "block",
                margin: "0 auto",

                borderWidth: "5px",
                marginBottom: "10px",
              }}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
              title="Loading..."
            />
            <Text style={{ color: "white", fontSize: "1.2em" }}>Loading ...</Text>
          </Modal>
        </>
      </Content>
    </Layout>
  );
};

export default SignalCircuitTab;

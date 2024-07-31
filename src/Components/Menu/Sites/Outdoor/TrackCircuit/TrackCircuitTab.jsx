import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card, Row, Col, Layout, Typography, Spin, message, Empty, Modal, Tabs, ConfigProvider, Table, Tag, Form, DatePicker,
  TimePicker, Button, Tooltip as tp
} from "antd";
import {
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CloudDownloadOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { FaCircle, FaObjectGroup } from "react-icons/fa6";
import moment from "moment/moment";
import axiosClient from "../../../../Authentication/ApiCall";
import TabPane from "antd/es/tabs/TabPane";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip
} from "recharts";
import dayjs from "dayjs";
import * as FileSaver from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { trackcircuit_data, relay_data } from "../../../../../features/Notification";
import DashboardTrack from "./DashboardTrackCircuit";
import {
  Grid,
  Paper,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ImArrowRight, ImArrowLeft, ImArrowUp, ImArrowDown } from "react-icons/im";
import "./DashboardTrackCircuit.css";
import ReactApexChart from 'react-apexcharts';
import ClipLoader from "react-spinners/ClipLoader";
const { Content } = Layout;
const { Link, Title, Text } = Typography;
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;

const TrackCircuitTab = (values) => {
  document.title = "RDPMS";
  const dispatch = useDispatch();
  const location = useLocation();;
  const queryParams = new URLSearchParams(location.search);
  var station_id = values.values.station_id;
  var station_name = values.values.station_name;

  const [TrackCircuitList, setTrackCircuitList] = useState([]);
  const [TrackCircuitData, setTrackCircuitData] = useState([]);
  const [trackcircuitid, settrackcircuitid] = useState("");
  const [RealTimeTrackCircuitData, setRealTimeTrackCircuitData] = useState([]);
  const [RealTimeTrackCircuitAlert, setRealTimeTrackCircuitAlert] = useState([]);
  const [TrackName, setTrackName] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const [TabId, setTabId] = useState('1');
  const [loading, setloading] = useState(false);
  const [RealTimeDataPageTotal, setRealTimeDataPageTotal] = useState(10);
  const [RealTimeAlertPageTotal, setRealTimeAlertPageTotal] = useState(10);
  const [RealTimeDataPageNo, setRealTimeDataPageNo] = useState(1);
  const [RealTimeAlertPageNo, setRealTimeAlertPageNo] = useState(1);
  const [datastartDatepicker, setDatastartDatepicker] = useState();
  const [alertstartDatepicker, setAlertstartDatepicker] = useState();
  const [dataendDatepicker, setDataendDatepicker] = useState();
  const [alertendDatepicker, setAlertendDatepicker] = useState();
  const [DataPageTotal, setDataPageTotal] = useState(10);
  const [AlertPageTotal, setAlertPageTotal] = useState(10);
  const [DataPageNo, setDataPageNo] = useState(1);
  const [AlertPageNo, setAlertPageNo] = useState(1);
  const [TrackCircuitAlert, setTrackCircuitAlert] = useState([]);
  const [TrackCircuitGraphData, setTrackCircuitGraphData] = useState([]);
  const [datareportloading, setdatareportloading] = useState(false);
  const [alertreportloading, setalertreportloading] = useState(false);
  const [graphSingleDatepicker, setgraphSingleDatepicker] = useState(null);
  const [graphTimepicker, setgraphTimepicker] = useState([null, null]);
  const [activeTab, setActiveTab] = useState("2");
  const [form] = Form.useForm();
  const [Pageload, setPageload] = useState(false);
  const [relayList, setrelayList] = useState([]);
  const [RealTimeTrackDashboardData, setRealTimeTrackDashboardData] = useState(null);
  const [TrackRelayPR, setTrackRelayPR] = useState(null);

  const socket_data = useSelector(
    (state) => state.trackcircuit_data.trackcircuitdata
  );

  if (socket_data.data.length > 0) {
    // setTrackCircuitList(socket_data.data[0].tracks)
    if (trackcircuitid !== "") {
      if (socket_data.data[0].data_logs.trackcircuitid === trackcircuitid) {
        var datalogstable = [];
        datalogstable.push(socket_data.data[0].data_logs);
        RealTimeTrackCircuitData.length >= 10 ? RealTimeTrackCircuitData.pop() : <></>
        datalogstable = datalogstable.concat(RealTimeTrackCircuitData);
        if (datalogstable.length > 10) {
          datalogstable = datalogstable.slice(0, 10);
        }
        setRealTimeTrackCircuitData(datalogstable);
        setRealTimeTrackDashboardData(socket_data.data[0].data_logs)        
      }
    }
    if (trackcircuitid !== "" && socket_data.data[0].alerts.length > 0) {
      if (socket_data.data[0].alerts[0].trackcircuitid === trackcircuitid) {
        var alertlogtable = [];
        socket_data.data[0].alerts.forEach(item => alertlogtable.push(item))
        //alertlogtable.push(socket_data.data[0].alerts[0]);
        RealTimeTrackCircuitAlert.length >= 10 ? RealTimeTrackCircuitAlert.pop() : <></>
        alertlogtable = alertlogtable.concat(RealTimeTrackCircuitAlert);
        setRealTimeTrackCircuitAlert(alertlogtable);
      }
    }
    var index = TrackCircuitList.findIndex(x => x.id === socket_data.data[0].data_logs.trackcircuitid)
    if (index != -1) {
      // TrackCircuitList[index].trackcircuitdataid = socket_data.data[0].data_logs.id
      // TrackCircuitList[index].trackname = socket_data.data[0].data_logs.trackname
      // TrackCircuitList[index].feed_count = socket_data.data[0].data_logs.feed_count
      // TrackCircuitList[index].feed_current = socket_data.data[0].data_logs.feed_current
      // TrackCircuitList[index].feed_voltage = socket_data.data[0].data_logs.feed_voltage
      // TrackCircuitList[index].choke_voltage = socket_data.data[0].data_logs.choke_voltage
      // TrackCircuitList[index].battery_charger_dc_current = socket_data.data[0].data_logs.battery_charger_dc_current
      // TrackCircuitList[index].battery_charger_dc_voltage = socket_data.data[0].data_logs.battery_charger_dc_voltage
      // TrackCircuitList[index].battery_charger_ac_current = socket_data.data[0].data_logs.battery_charger_ac_current
      // TrackCircuitList[index].battery_charger_ac_voltage = socket_data.data[0].data_logs.battery_charger_ac_voltage
      // TrackCircuitList[index].relay_count = socket_data.data[0].data_logs.relay_count
      // TrackCircuitList[index].relay_current = socket_data.data[0].data_logs.relay_current
      // TrackCircuitList[index].relay_voltage = socket_data.data[0].data_logs.relay_voltage
      // TrackCircuitList[index].trv = socket_data.data[0].data_logs.trv
      // TrackCircuitList[index].index_score = socket_data.data[0].data_logs.index_score
      // TrackCircuitList[index].leakage_current = socket_data.data[0].data_logs.leakage_current
      // TrackCircuitList[index].health = socket_data.data[0].data_logs.health
      // TrackCircuitList[index].track_OC = socket_data.data[0].data_logs.track_OC
      // TrackCircuitList[index].modeid = socket_data.data[0].alertmodeid
      // TrackCircuitList[index].createddate = socket_data.data[0].data_logs.createddate

      const updatedList = TrackCircuitList.map(item => {
        if (item.id === socket_data.data[0].data_logs.trackcircuitid) {
          return {
            ...item,
            trackcircuitdataid: socket_data.data[0].data_logs.id,
            trackname: socket_data.data[0].data_logs.trackname,
            feed_count: socket_data.data[0].data_logs.feed_count,
            feed_current: socket_data.data[0].data_logs.feed_current,
            feed_voltage: socket_data.data[0].data_logs.feed_voltage,
            choke_voltage: socket_data.data[0].data_logs.choke_voltage,
            battery_charger_dc_current: socket_data.data[0].data_logs.battery_charger_dc_current,
            battery_charger_dc_voltage: socket_data.data[0].data_logs.battery_charger_dc_voltage,
            battery_charger_ac_current: socket_data.data[0].data_logs.battery_charger_ac_current,
            battery_charger_ac_voltage: socket_data.data[0].data_logs.battery_charger_ac_voltage,
            relay_count: socket_data.data[0].data_logs.relay_count,
            relay_current: socket_data.data[0].data_logs.relay_current,
            relay_voltage: socket_data.data[0].data_logs.relay_voltage,
            trv: socket_data.data[0].data_logs.trv,
            index_score: socket_data.data[0].data_logs.index_score,
            leakage_current: socket_data.data[0].data_logs.leakage_current,
            health: socket_data.data[0].data_logs.health,
            track_OC: socket_data.data[0].data_logs.track_OC,
            modeid: socket_data.data[0].alertmodeid,
            createddate: socket_data.data[0].data_logs.createddate,
          };
        }
        return item;
      });

      updatedList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.trackname.localeCompare(b.trackname);
      });

      setTrackCircuitList(updatedList);

    }
    else {
      TrackCircuitList.push({
        id: socket_data.data[0].data_logs.trackcircuitid,
        trackcircuitdataid: socket_data.data[0].data_logs.id,
        trackname: socket_data.data[0].data_logs.trackname,
        feed_count: socket_data.data[0].data_logs.feed_count,
        feed_current: socket_data.data[0].data_logs.feed_current,
        feed_voltage: socket_data.data[0].data_logs.feed_voltage,
        choke_voltage: socket_data.data[0].data_logs.choke_voltage,
        battery_charger_dc_current: socket_data.data[0].data_logs.battery_charger_dc_current,
        battery_charger_dc_voltage: socket_data.data[0].data_logs.battery_charger_dc_voltage,
        battery_charger_ac_current: socket_data.data[0].data_logs.battery_charger_ac_current,
        battery_charger_ac_voltage: socket_data.data[0].data_logs.battery_charger_ac_voltage,
        relay_count: socket_data.data[0].data_logs.relay_count,
        relay_current: socket_data.data[0].data_logs.relay_current,
        relay_voltage: socket_data.data[0].data_logs.relay_voltage,
        trv: socket_data.data[0].data_logs.trv,
        index_score: socket_data.data[0].data_logs.index_score,
        leakage_current: socket_data.data[0].data_logs.leakage_current,
        health: socket_data.data[0].data_logs.health,
        track_OC: socket_data.data[0].data_logs.track_OC,
        modeid: socket_data.data[0].alertmodeid,
        createddate: socket_data.data[0].data_logs.createddate,
        isdele: socket_data.data[0].data_logs.isdele,
      });
      TrackCircuitList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.trackname.localeCompare(b.trackname);
      });
    }
    if (socket_data.data[0].data_logs.trackcircuitid === trackcircuitid) {
      setTrackCircuitGraphData((prevData) => [...prevData, socket_data.data[0].data_logs]);
    }
    //setrefresh(refresh + 1);
    dispatch(trackcircuit_data({ data: [] }));
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
          createddate : obj.createddate,
          isdele: obj.isdele
        })
      }
      if (obj.relayname == TrackName + "PR") {
        setTrackRelayPR({
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
    setPageload(true);
    axiosClient
      .get("/trackcircuit/getstationtrackcircuit", {
        params: {
          stationid: station_id,
        },
      })
      .then((response) => {
        if (response.data.issuccess === true) {
          setTrackCircuitList(response.data.data);
          setPageload(false);
        }
      })
      .catch((err) => {
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
        setPageload(false);
      });     
  }, []);


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
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.feed_current}
          </Text>
        )
      },
    },
    {
      title: "TR(Idc)(A)",
      dataIndex: "relay_current",
      key: "relay_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.relay_current}
          </Text>
        )
      },
    },
    {
      title: "TF(Vdc)",
      dataIndex: "feed_voltage",
      key: "feed_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.feed_voltage}
          </Text>
        )
      },
    },
    {
      title: "TR(Vdc)",
      dataIndex: "relay_voltage",
      key: "relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.relay_voltage}
          </Text>
        )
      },
    },
    {
      title: "TF Choke(Vdc)",
      dataIndex: "choke_voltage",
      key: "choke_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.choke_voltage}
          </Text>
        )
      },
    },
    {
      title: "Charger(Vdc)",
      dataIndex: "battery_charger_dc_voltage",
      key: "battery_charger_dc_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_dc_voltage}
          </Text>
        )
      },
    },
    {
      title: "Charger(Idc)(A)",
      dataIndex: "battery_charger_dc_current",
      key: "battery_charger_dc_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_dc_current}
          </Text>
        )
      },
    },
    {
      title: "Charger I/P(Vac)",
      dataIndex: "battery_charger_ac_voltage",
      key: "battery_charger_ac_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_ac_voltage}
          </Text>
        )
      },
    },
    {
      title: "Charger I/P(Iac)(A)",
      dataIndex: "battery_charger_ac_current",
      key: "battery_charger_ac_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_ac_current}
          </Text>
        )
      },
    },
    {
      title: "TRV(Vdc)",
      dataIndex: "trv",
      key: "trv",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.trv}
          </Text>
        )
      },
    },
    {
      title: "Leakage Current(ma)",
      dataIndex: "leakage_current",
      key: "leakage_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.leakage_current}
          </Text>
        )
      },
    },
    {
      title: "Track O/C",
      dataIndex: "track_OC",
      key: "track_OC",
      //responsive: ["md"],
    },
  ];

  const data_log_table_columns = [
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
      title: "TF(Idc)(A)",
      dataIndex: "feed_current",
      key: "feed_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.feed_current}
          </Text>
        )
      },
    },
    {
      title: "TR(Idc)(A)",
      dataIndex: "relay_current",
      key: "relay_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.relay_current}
          </Text>
        )
      },
    },
    {
      title: "TF(Vdc)",
      dataIndex: "feed_voltage",
      key: "feed_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.feed_voltage}
          </Text>
        )
      },
    },
    {
      title: "TR(Vdc)",
      dataIndex: "relay_voltage",
      key: "relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.relay_voltage}
          </Text>
        )
      },
    },
    {
      title: "TF Choke(Vdc)",
      dataIndex: "choke_voltage",
      key: "choke_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.choke_voltage}
          </Text>
        )
      },
    },
    {
      title: "Charger(Vdc)",
      dataIndex: "battery_charger_dc_voltage",
      key: "battery_charger_dc_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_dc_voltage}
          </Text>
        )
      },
    },
    {
      title: "Charger(Idc)(A)",
      dataIndex: "battery_charger_dc_current",
      key: "battery_charger_dc_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_dc_current}
          </Text>
        )
      },
    },
    {
      title: "Charger I/P(Vac)",
      dataIndex: "battery_charger_ac_voltage",
      key: "battery_charger_ac_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_ac_voltage}
          </Text>
        )
      },
    },
    {
      title: "Charger I/P(Iac)(A)",
      dataIndex: "battery_charger_ac_current",
      key: "battery_charger_ac_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.battery_charger_ac_current}
          </Text>
        )
      },
    },
    {
      title: "TRV(Vdc)",
      dataIndex: "trv",
      key: "trv",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.trv}
          </Text>
        )
      },
    },
    {
      title: "Leakage Current(ma)",
      dataIndex: "leakage_current",
      key: "leakage_current",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.leakage_current}
          </Text>
        )
      },
    },
    {
      title: "Track O/C",
      dataIndex: "track_OC",
      key: "track_OC",
      //responsive: ["md"],
    },
  ];

  function onclickCard(values) {
    setRealTimeTrackCircuitData([])
    setTrackName(values.trackname);
    settrackcircuitid(values.id);
    setOpenModal(true);
    getCurrentData(values.id);
    setActiveTab("2");
  }

  function handleOk() {
    setOpenModal(false);
  }

  function handleCancel() {
    settrackcircuitid("")
    setRealTimeTrackCircuitData([])
    setRealTimeTrackCircuitAlert([])
    setrelayList([])
    setOpenModal(false);
  }

  const handleTabClick = (key) => {
    setActiveTab(key);
    setTabId(key);
    if (key === "2") {
      getCurrentData("");
    } else if (key === "3") {
      getCurrentAlert();
    } else if (key === "4") {
      setTrackCircuitGraphData([]);
    } else if (key === "5") {
      getTrackDataLogs();
    } else if (key === "6") {
      getTrackAlertLogs();
    } else if (key === "7") {
      getRelayList();
    } else if (key === "1") {
      getRelayList();
      getTrackDashboardData()
    }
  };

  function HandleDatePicker(start, end, page, size, msg) {
    if (msg === "Data") {
      setloading(true);
      axiosClient
        .get(
          "/trackcircuit/getstationtrackcircuitdata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&trackcircuitid=" +
          trackcircuitid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setTrackCircuitData(response.data.data);
          } else {
            message.error(response.data.msg);
            setloading(false);
          }
        })
        .catch((err) => {
          //console.log("errr", err); fe ber
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
          "/trackcircuit/getstationtrackcircuitalert?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&trackcircuitid=" +
          trackcircuitid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setAlertPageTotal(response.data.totaldatacount);
            setAlertPageNo(response.data.page);
            setloading(false);
            setTrackCircuitAlert(response.data.data);
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

  function onFinishData(values) {
    setloading(false);
    let startDate =
      values.datadate === undefined ||
        values.datadate === null ||
        values.datadate === ""
        ? ""
        : values.datadate[0].format("YYYY-MM-DD");
    let endDate =
      values.datadate === undefined ||
        values.datadate === null ||
        values.datadate === ""
        ? ""
        : values.datadate[1].format("YYYY-MM-DD");
    setDatastartDatepicker(startDate);
    setDataendDatepicker(endDate);
    HandleDatePicker(startDate, endDate, 1, 10, "Data");
  };

  function onFinishAlert(values) {
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
    setAlertstartDatepicker(startDate);
    setAlertendDatepicker(endDate);
    HandleDatePicker(startDate, endDate, 1, 10, "Alert");
  };

  function ReportDownloadData() {
    var start = datastartDatepicker ? datastartDatepicker : "";
    var end = dataendDatepicker ? dataendDatepicker : "";
    setdatareportloading(true);
    axiosClient
      .get(
        "/trackcircuit/downloadtrackcircuitdatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid,
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
          FileSaver.saveAs(blob, "TrackCircuitDataReport_" + showTime + ".xlsx");
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

  function ReportDownloadAlert() {
    var start = alertstartDatepicker ? alertstartDatepicker : "";
    var end = alertendDatepicker ? alertendDatepicker : "";
    setalertreportloading(true);
    axiosClient
      .get(
        "/trackcircuit/downloadtrackcircuitalertreport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid,
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
          FileSaver.saveAs(blob, "TrackCircuitAlertReport_" + showTime + ".xlsx");
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

  function HanldeSingleDatePicker(date) {
    setgraphSingleDatepicker(date.format("YYYY-MM-DD"));
  };

  function HanldeTimePicker(time) {
    setgraphTimepicker(time);
  };

  function HandleTime() {
    const date = graphSingleDatepicker;
    const Fromtime = graphTimepicker[0].format("HH:mm");
    const Totime = graphTimepicker[1].format("HH:mm");

    axiosClient
      .get(
        "/trackcircuit/getstationtrackcircuitdatagraph?date=" +
        date +
        "&&from_time=" +
        Fromtime +
        "&&to_time=" +
        Totime +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          //console.log(response.data.data);
          // setloading(false);
          setTrackCircuitGraphData(response.data.data);
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

  function getCurrentData(value) {
    var val = value !== "" ? value : trackcircuitid;
    axiosClient
      .get(
        "/trackcircuit/getstationtrackcircuitcurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        val
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setRealTimeTrackCircuitData(response.data.data);
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
        "/trackcircuit/getstationtrackcircuitcurrentalert?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeAlertPageTotal(response.data.totaldatacount);
          setRealTimeAlertPageNo(response.data.page);
          setRealTimeTrackCircuitAlert(response.data.data);
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

  function getTrackDataLogs() {
    setloading(true)
    axiosClient
      .get(
        "/trackcircuit/getstationtrackcircuitdata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setTrackCircuitData(response.data.data);
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

  function getTrackAlertLogs() {
    setloading(true)
    axiosClient
      .get(
        "/trackcircuit/getstationtrackcircuitalert?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setAlertPageTotal(response.data.totaldatacount);
          setAlertPageNo(response.data.page);
          setloading(false);
          setTrackCircuitAlert(response.data.data);
        } else {
          message.error(response.data.msg);
          setloading(false);
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
        name: 'TF(Idc)(A)',
        data: TrackCircuitGraphData.map(data => data.feed_current),
        color: "#ff7b00"
      },
      {
        name: 'TR(Idc)(A)',
        data: TrackCircuitGraphData.map(data => data.relay_current),
        color: "#0466c8"
      },
      {
        name: 'TF(Vdc)',
        data: TrackCircuitGraphData.map(data => data.feed_voltage),
        color: "#2ec4b6"
      },
      {
        name: 'TR(Vdc)',
        data: TrackCircuitGraphData.map(data => data.relay_voltage),
        color: "#ce4257"
      },
      {
        name: 'TF Choke(Vdc)',
        data: TrackCircuitGraphData.map(data => data.choke_voltage),
        color: "#4c6a47"
      },
      {
        name: 'Charger(Vdc)',
        data: TrackCircuitGraphData.map(data => data.battery_charger_dc_voltage),
        color: "#bf3eff"
      },
      {
        name: 'Charger(Idc) (A)',
        data: TrackCircuitGraphData.map(data => data.battery_charger_dc_current),
        color: "#511104"
      },
      {
        name: 'Charger I/P(Vac)',
        data: TrackCircuitGraphData.map(data => data.battery_charger_ac_voltage),
        color: "#f50000"
      },
      {
        name: 'Charger I/P(Iac) (A)',
        data: TrackCircuitGraphData.map(data => data.battery_charger_ac_current),
        color: "#bf00a3"
      },
      {
        name: 'TRV(Vdc)',
        data: TrackCircuitGraphData.map(data => data.battery_charger_ac_current),
        color: "#244f8b"
      }
    ],
    xaxis: {
      categories: TrackCircuitGraphData.map(data => data.time),
    },
  };

  const getRelayList = async () => {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationassertrelay?stationid=" +
        station_id +
        "&&assertsid=" + 2 +
        "&&assertid=" +
        trackcircuitid
      )
      .then((response) => {
        if (response.data.issuccess === true) {         
          setrelayList(response.data.data);  
          setTrackRelayPR(response.data.data.find(obj => obj.relayname == TrackName + "PR"))         
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

  function getTrackDashboardData() {
    setPageload(true);
    axiosClient
      .get(
        "/trackcircuit/getstationtrackcircuitfinaldata?stationid=" +
        station_id +
        "&&trackcircuitid=" +
        trackcircuitid
      )
      .then((response) => {
        setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimeTrackDashboardData(response.data.data)                      
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

  function TrackCircuitDashboard() {
    return (
      <>
      <div className="DashBoardTrackCircuit_Group">
        <div className="DashBoardTrackCircuit_2"></div>
        <div className="DashBoardTrackCircuit_3"></div>
        <div className="DashBoardTrackCircuit_4"></div>
        <div className="DashBoardTrackCircuit_5"></div>
        <div className="DashBoardTrackCircuit_6"></div>
        <div className="DashBoardTrackCircuit_7"></div>
        <div className="DashBoardTrackCircuit_8"></div>
        <div className="DashBoardTrackCircuit_9"></div>
        {/* <div className="DashBoardTrackCircuit_10_G"></div> */}
        {TrackRelayPR?.value == 1 ? <div className="DashBoardTrackCircuit_10_G"></div> : TrackRelayPR?.value == 0 ? <div className="DashBoardTrackCircuit_10_R"></div> : <div className="DashBoardTrackCircuit_10_Gr"></div>}  
        <div className="DashBoardTrackCircuit_11"></div>
        <div className="DashBoardTrackCircuit_12"></div>
        <div className="DashBoardTrackCircuit_13"></div>
        <div className="DashBoardTrackCircuit_14"></div>
        <div className="DashBoardTrackCircuit_15"></div>
        <div className="DashBoardTrackCircuit_16"></div>
        <div className="DashBoardTrackCircuit_17"></div>
        {/* <div className="DashBoardTrackCircuit_18">DCTC-C1T</div> */}
        <div className="DashBoardTrackCircuit_19"></div>
        <div className="DashBoardTrackCircuit_20"></div>
        <div className="DashBoardTrackCircuit_21"></div>
        <div className="DashBoardTrackCircuit_22"></div>
        <div className="DashBoardTrackCircuit_23"></div>
        <div className="DashBoardTrackCircuit_24"></div>
        <div className="DashBoardTrackCircuit_25"></div>
        <div className="DashBoardTrackCircuit_26"></div>
        <div className="DashBoardTrackCircuit_27"></div>
        <div className="DashBoardTrackCircuit_28" />
        <div className="DashBoardTrackCircuit_29">35.8</div>
        <div className="DashBoardTrackCircuit_30">35.8</div>
        <div className="DashBoardTrackCircuit_31">24.2</div>
        <div className="DashBoardTrackCircuit_32">24.2</div>
        <div className="DashBoardTrackCircuit_33">24.2</div>
        <div className="DashBoardTrackCircuit_34">24.2</div>
        <div className="DashBoardTrackCircuit_35">24.2</div>
        <div className="DashBoardTrackCircuit_36">24.2</div>
        <div className="DashBoardTrackCircuit_37">24.2</div>
        <div className="DashBoardTrackCircuit_38">24.2</div>
        <img className="DashBoardTrackCircuit_Img_0" src="/ground.png"/>
        <div className="DashBoardTrackCircuit_39" />
        <div className="DashBoardTrackCircuit_399" />
        <div className="DashBoardTrackCircuit_40" />
        <div className="DashBoardTrackCircuit_41">TFC</div>
        <div className="DashBoardTrackCircuit_42"></div>
        <div className="DashBoardTrackCircuit_43"></div>
        <div className="DashBoardTrackCircuit_44"></div>
        <div className="DashBoardTrackCircuit_45"></div>
        <div className="DashBoardTrackCircuit_46"></div>
        <div className="DashBoardTrackCircuit_47" />
        <div className="DashBoardTrackCircuit_48">35.8</div>
        <div className="DashBoardTrackCircuit_49">35.8</div>
        <div className="DashBoardTrackCircuit_50">35.8</div>
        <div className="DashBoardTrackCircuit_51">35.8</div>
        <div className="DashBoardTrackCircuit_52">35.8</div>
        <div className="DashBoardTrackCircuit_53" />
        <div className="DashBoardTrackCircuit_54" />
        <div className="DashBoardTrackCircuit_55" />
        <div className="DashBoardTrackCircuit_56" />
        <div className="DashBoardTrackCircuit_57" />
        <div className="DashBoardTrackCircuit_58" />
        <div className="DashBoardTrackCircuit_59" />
        <div className="DashBoardTrackCircuit_60" />
        <div className="DashBoardTrackCircuit_61" />
        <div className="DashBoardTrackCircuit_62" />
        <div className="DashBoardTrackCircuit_63" />
        <div className="DashBoardTrackCircuit_64" />
        <div className="DashBoardTrackCircuit_65" />
        <div className="DashBoardTrackCircuit_66" />
        <div className="DashBoardTrackCircuit_67" />
        <div className="DashBoardTrackCircuit_68" />
        <div className="DashBoardTrackCircuit_69" />
        <div className="DashBoardTrackCircuit_70" />
        <div className="DashBoardTrackCircuit_71" />
        <div className="DashBoardTrackCircuit_72" />
        <div className="DashBoardTrackCircuit_73" />
        <div className="DashBoardTrackCircuit_74" />
        <div className="DashBoardTrackCircuit_75" />
        <div className="DashBoardTrackCircuit_76" />
        <div className="DashBoardTrackCircuit_77" />
        <div className="DashBoardTrackCircuit_78" />
        <div className="DashBoardTrackCircuit_79" />
        <div className="DashBoardTrackCircuit_80" />
        <div className="DashBoardTrackCircuit_81" />
        <div className="DashBoardTrackCircuit_82" />
        <div className="DashBoardTrackCircuit_83" />
        <div className="DashBoardTrackCircuit_84" />
        <div className="DashBoardTrackCircuit_85" />
        {/* <div className="DashBoardTrackCircuit_86">Test</div> */}
        <div className="DashBoardTrackCircuit_86">{TrackRelayPR?.relayname}</div>
        <div className="DashBoardTrackCircuit_87">24V DC Busbar</div>
        <div className="DashBoardTrackCircuit_88">Location Box</div>
        <div className="DashBoardTrackCircuit_89" />
        <div className="DashBoardTrackCircuit_90" />
        <div className="DashBoardTrackCircuit_91" />
        <div className="DashBoardTrackCircuit_92" />
        <div className="DashBoardTrackCircuit_93" />
        <div className="DashBoardTrackCircuit_93_1" />
        <div className="DashBoardTrackCircuit_94">Location Box</div>
        <div className="DashBoardTrackCircuit_95">{RealTimeTrackDashboardData?.relay_voltage}</div>
        <div className="DashBoardTrackCircuit_96">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_97">TR(Vdc)</div>
        <div className="DashBoardTrackCircuit_98" />
        <div className="DashBoardTrackCircuit_99" />
        <div className="DashBoardTrackCircuit_101" />
        <div className="DashBoardTrackCircuit_102" />
        <div className="DashBoardTrackCircuit_103" />
        <div className="DashBoardTrackCircuit_104" />
        <div className="DashBoardTrackCircuit_105" />
        <div className="DashBoardTrackCircuit_106" />
        <div className="DashBoardTrackCircuit_107" />
        <div className="DashBoardTrackCircuit_108" />
        <div className="DashBoardTrackCircuit_109" />
        <div className="DashBoardTrackCircuit_110" />
        <div className="DashBoardTrackCircuit_111" />
        <div className="DashBoardTrackCircuit_112" />
        <div className="DashBoardTrackCircuit_113" />
        <div className="DashBoardTrackCircuit_114" />
        <div className="DashBoardTrackCircuit_115" />
        <div className="DashBoardTrackCircuit_116" />
        <div className="DashBoardTrackCircuit_117" />
        <div className="DashBoardTrackCircuit_118" />
        <div className="DashBoardTrackCircuit_119" />
        <div className="DashBoardTrackCircuit_120" />
        <div className="DashBoardTrackCircuit_121" />
        <div className="DashBoardTrackCircuit_122" />
        <div className="DashBoardTrackCircuit_123" />
        <div className="DashBoardTrackCircuit_124" />
        <div className="DashBoardTrackCircuit_125" />
        <div className="DashBoardTrackCircuit_126" />
        <div className="DashBoardTrackCircuit_127" />
        <div className="DashBoardTrackCircuit_128" />
        <div className="DashBoardTrackCircuit_129" />
        <div className="DashBoardTrackCircuit_130" />
        <div className="DashBoardTrackCircuit_131" />
        <div className="DashBoardTrackCircuit_132" />
        <div className="DashBoardTrackCircuit_133" />
        <div className="DashBoardTrackCircuit_134" />
        <div className="DashBoardTrackCircuit_135" />
        <div className="DashBoardTrackCircuit_136"></div>
        <div className="DashBoardTrackCircuit_137" />
        <div className="DashBoardTrackCircuit_138" />
        <div className="DashBoardTrackCircuit_139" />
        <div className="DashBoardTrackCircuit_140" />
        <div className="DashBoardTrackCircuit_141" />
        <div className="DashBoardTrackCircuit_142" />
        <div className="DashBoardTrackCircuit_143" />
        <div className="DashBoardTrackCircuit_144"></div>
        <div className="DashBoardTrackCircuit_145">110v AC-Busbar</div>
        <div className="DashBoardTrackCircuit_146">105</div>
        <div className="DashBoardTrackCircuit_147">v</div>
        <div className="DashBoardTrackCircuit_148">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_149" />
        <div className="DashBoardTrackCircuit_150">{RealTimeTrackDashboardData?.battery_charger_ac_current}</div>
        <div className="DashBoardTrackCircuit_151">v</div>
        <div className="DashBoardTrackCircuit_152">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_152_1">{RealTimeTrackDashboardData?.battery_charger_ac_voltage}</div>
        <div className="DashBoardTrackCircuit_152_2">A</div>
        <div className="DashBoardTrackCircuit_152_3">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_153" />
        <div className="DashBoardTrackCircuit_154">105</div>
        <div className="DashBoardTrackCircuit_155">v</div>
        <div className="DashBoardTrackCircuit_156">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_157" />
        <div className="DashBoardTrackCircuit_159">{RealTimeTrackDashboardData?.relay_current}</div>
        <div className="DashBoardTrackCircuit_160">A</div>
        <div className="DashBoardTrackCircuit_161">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_162" />
        <div className="DashBoardTrackCircuit_163">105</div>
        <div className="DashBoardTrackCircuit_164">v</div>
        <div className="DashBoardTrackCircuit_165">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_166" />
        <div className="DashBoardTrackCircuit_167">32.2</div>
        <div className="DashBoardTrackCircuit_168">v</div>
        <div className="DashBoardTrackCircuit_169">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_170" />
        <div className="DashBoardTrackCircuit_171">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_172">xx</div>
        <div className="DashBoardTrackCircuit_173">v</div>
        <div className="DashBoardTrackCircuit_174" />
        <div className="DashBoardTrackCircuit_175">XX</div>
        <div className="DashBoardTrackCircuit_176">v</div>
        <div className="DashBoardTrackCircuit_177">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_178">TR(Idc)(A)</div>
        <div className="DashBoardTrackCircuit_179">Voltage</div>
        <div className="DashBoardTrackCircuit_180" />
        <div className="DashBoardTrackCircuit_181">v</div>
        <div className="DashBoardTrackCircuit_182">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_183" />
        <div className="DashBoardTrackCircuit_184">v</div>
        <div className="DashBoardTrackCircuit_185">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_186">TRV(Vdc)</div>
        <div className="DashBoardTrackCircuit_187">{RealTimeTrackDashboardData?.trv}</div>
        <div className="DashBoardTrackCircuit_866">C1TPR</div>
        <div className="DashBoardTrackCircuit_10Green" />
        <div className="DashBoardTrackCircuit_188">TO Relay Room</div>
        <div className="DashBoardTrackCircuit_189">240 Meters</div>
        <div className="DashBoardTrackCircuit_190_1">TF(Vdc)</div>
        <div className="DashBoardTrackCircuit_190">{RealTimeTrackDashboardData?.feed_voltage}</div>
        <div className="DashBoardTrackCircuit_191">v</div>
        <div className="DashBoardTrackCircuit_192">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_193" />
        <div className="DashBoardTrackCircuit_190_2">TF(Idc)(A)</div>
        <div className="DashBoardTrackCircuit_194">{RealTimeTrackDashboardData?.feed_current}</div>
        <div className="DashBoardTrackCircuit_195">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_196">A</div>
        <div className="DashBoardTrackCircuit_197"></div>
        <div className="DashBoardTrackCircuit_198"></div>
        <div className="DashBoardTrackCircuit_199"></div>
        <div className="DashBoardTrackCircuit_200">Charger(Idc)(A) </div>
        <div className="DashBoardTrackCircuit_201">{RealTimeTrackDashboardData?.battery_charger_dc_current}</div>
        <div className="DashBoardTrackCircuit_202">A</div>
        <div className="DashBoardTrackCircuit_203">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_204">{RealTimeTrackDashboardData?.battery_charger_dc_voltage}</div>
        <div className="DashBoardTrackCircuit_205">v</div>
        <div className="DashBoardTrackCircuit_206">{moment(RealTimeTrackDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="DashBoardTrackCircuit_207">Charger(Vdc)</div>
        <div className="DashBoardTrackCircuit_208">Charger(Vac)</div>
        <div  className="DashBoardTrackCircuit_208_1">Charger(Iac)(A)</div>
        <div className="DashBoardTrackCircuit_209">IPS ROOM</div>
        <div className="DashBoardTrackCircuit_210">IPS ROOM</div>
        <img className="DashBoardTrackCircuit_Img_1" src="/choke.png"/>
        <img className="DashBoardTrackCircuit_Img_2" src="/choke.png"/>
        <img className="DashBoardTrackCircuit_Img_3" src="/register.png"/>
        <div className="DashBoardTrackCircuit_211"></div>
        <img className="DashBoardTrackCircuit_Img_4" src="/battery.png"/>
        <div className="DashBoardTrackCircuit_212">Choke</div>
        <div className="DashBoardTrackCircuit_213">Choke</div>
        <div className="DashBoardTrackCircuit_214" />
        <div className="DashBoardTrackCircuit_215"></div>
        <div className="DashBoardTrackCircuit_216" />
        <img className="DashBoardTrackCircuit_Img_5" src="/ground.png"/>
        <div className="DashBoardTrackCircuit_217"></div>
        <div className="DashBoardTrackCircuit_218">24v DC EXT-IV</div>
        <div className="DashBoardTrackCircuit_219">24v DC EXT-IV</div>
        <div className="DashBoardTrackCircuit_220"></div>
        <div className="DashBoardTrackCircuit_221"></div>
        <div className="DashBoardTrackCircuit_222"></div>
        <div className="DashBoardTrackCircuit_223"></div>
        <div className="DashBoardTrackCircuit_224"></div>
        <div className="DashBoardTrackCircuit_225"></div>
        <div className="DashBoardTrackCircuit_226"></div>
        <div className="DashBoardTrackCircuit_227"></div>
        <div className="DashBoardTrackCircuit_228"></div>
        <div className="DashBoardTrackCircuit_229"></div>
        <div className="DashBoardTrackCircuit_230"></div>
        <div className="DashBoardTrackCircuit_231"></div>
        <div className="DashBoardTrackCircuit_232">v</div>
      </div>
    </>)
  }


  return (
    <Layout style={{ height: "80vh" }}>
      <Content style={{ minHeight: "80vh", padding: "1.5%" }}>
        <Row gutter={[10, 20]}>
          {TrackCircuitList && TrackCircuitList.length > 0 ? (
            TrackCircuitList.map((item, id) => (
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 6, offset: 0 }}>
                <Card key={item.id} id="trackCard" onClick={() => { onclickCard(item) }} style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item md={4} xs={4}>
                        <FormGroup>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              TF(Idc)(A)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.feed_current}
                          </Typography>
                        </FormGroup>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              TR(Idc)(A)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.relay_current}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              TF(Vdc)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.feed_voltage}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              TR(Vdc)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.relay_voltage}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              TF Choke(Vdc)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.choke_voltage}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              Charger(Vdc)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.battery_charger_dc_voltage}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              Charger(Idc)(A)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.battery_charger_dc_current}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              Charger I/P(Vac)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.battery_charger_ac_voltage}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              Charger I/P(Iac)(A)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.battery_charger_ac_current}
                          </Typography>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              TRV(Vdc)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.trv}
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              Leakage(ma)
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.leakage_current}
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item md={4} xs={4} className={item.track_OC === "O" ? "trackOC" : ""}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              Track O/C
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.track_OC}
                          </Typography>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <div className="AssertAlert">
                    <div className={item.modeid === 3 ? "redColor" : item.modeid === 2 ? "orangeColor" : item.modeid === 1 ? "yellowColor" : "AssertAlert"}>
                      <Row>
                        <Col
                          span={8}
                          style={{ textAlign: "start", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                          {item.trackname}
                        </Col>
                        <Col
                          span={16}
                          style={{ textAlign: "end", fontSize: "16px", fontWeight: "800" }}>
                          {" "}
                          {moment(item.createddate).format("HH:mm:ss")}
                          <Col style={{ textAlign: "end", fontSize: "16px", fontWeight: "800" }}>
                            {moment(item.createddate).format("YYYY-MM-DD")}
                          </Col>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
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
          )}
        </Row>
        <div>
          {OpenModal ?
            <Modal
              title={'Track Circuit- ' + TrackName + ' @' + station_name}
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
                              dataSource={RealTimeTrackCircuitData}
                              columns={data_table_columns}
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
                              dataSource={RealTimeTrackCircuitAlert}
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
                                    htmlType="submit"
                                  >
                                    Submit
                                  </Button>
                                </Form.Item>
                                <Form.Item className="btnSubmit">
                                  {TrackCircuitData.length > 0 ? <>
                                    <tp title="Dowload Data Logs">
                                      <Button
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
                              dataSource={TrackCircuitData}
                              pagination={{
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
                                    htmlType="submit"
                                  >
                                    Submit
                                  </Button>
                                </Form.Item>
                                <Form.Item className="btnSubmit">
                                  {TrackCircuitAlert.length > 0 ? <>
                                    <tp title="Dowload Alert Logs">
                                      <Button
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
                              columns={alert_table_column}
                              dataSource={TrackCircuitAlert}
                              pagination={{
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
                                {relayList.length > 0 ? (
                                  relayList.filter((data) => data.assertsid === 2).map((item, id) => (
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
                        <div className="content active" style={{ backgroundColor: "white" }}>  
                            {RealTimeTrackDashboardData != null ? TrackCircuitDashboard() : <></>}                              
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
}
export default TrackCircuitTab;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card, Row, Col, Layout, Typography, message, Empty, Modal, Tabs, ConfigProvider, Table, Tag, Form, DatePicker,
  TimePicker, Button, Tooltip as tp
} from "antd";
import {
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CloudDownloadOutlined
} from "@ant-design/icons";
import { FaCircle } from "react-icons/fa6";
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
import { lcgate_data, relay_data } from "../../../../../features/Notification";
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
import ReactApexChart from 'react-apexcharts';
import ClipLoader from "react-spinners/ClipLoader";
const { Content } = Layout;
const { Link, Title, Text } = Typography;
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;


const LCGate = (values) => {
  document.title = "RDPMS";
  const dispatch = useDispatch();
  const location = useLocation();;
  const queryParams = new URLSearchParams(location.search);
  var station_id = values.values.station_id;
  var station_name = values.values.station_name;


  // for axle counter states //
  const [LCGateList, setLCGateList] = useState([]);
  const [LCGateData, setLCGateData] = useState([]);
  const [lcgateid, setlcgateid] = useState("");
  const [RealTimeLCGateData, setRealTimeLCGateData] = useState([]);
  const [RealTimeLCGateAlert, setRealTimeLCGateAlert] = useState([]);
  const [LCGateAlert, setLCGateAlert] = useState([]);
  const [LCGateGraphData, setLCGateGraphData] = useState([]);
  const [LCGateName, setLCGateName] = useState("");

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
  const [datareportloading, setdatareportloading] = useState(false);
  const [alertreportloading, setalertreportloading] = useState(false);
  const [graphSingleDatepicker, setgraphSingleDatepicker] = useState(null);
  const [graphTimepicker, setgraphTimepicker] = useState([null, null]);
  const [activeTab, setActiveTab] = useState("2");
  const [form] = Form.useForm();
  const [Pageload, setPageload] = useState(false);
  const [relayList, setrelayList] = useState([]);

  const handleTabClick = (key) => {
    setActiveTab(key);
    setTabId(key);
    if (key === "2") {
      getCurrentData("");
    } else if (key === "3") {
      getCurrentAlert();
    } else if (key === "4") {
      setLCGateGraphData([]);
    } else if (key === "5") {
      getLcgateDataLogs();
    } else if (key === "6") {
      getLcgateAlertLogs();
    } else if (key === "7") {
      getRelayList();
    }

  };
  const socket_data = useSelector(
    (state) => state.lcgate_data.lcgatedata
  );

  if (socket_data.data.length > 0) {
    if (lcgateid !== "") {
      if (socket_data.data[0].data_logs.lcgateid === lcgateid) {
        var datalogstable = [];
        datalogstable.push(socket_data.data[0].data_logs);
        RealTimeLCGateData.length >= 10 ? RealTimeLCGateData.pop() : <></>
        datalogstable = datalogstable.concat(RealTimeLCGateData);
        if (datalogstable.length > 10) {
          datalogstable = datalogstable.slice(0, 10);
        }
        setRealTimeLCGateData(datalogstable);
      };
    }
    if (lcgateid !== "" && socket_data.data[0].alerts.length > 0) {
      if (socket_data.data[0].alerts[0].lcgateid === lcgateid) {
        var alertlogtable = [];
        socket_data.data[0].alerts.forEach(item => alertlogtable.push(item))
        //alertlogtable.push(socket_data.data[0].alerts[0]);
        RealTimeLCGateAlert.length >= 10 ? RealTimeLCGateAlert.pop() : <></>
        alertlogtable = alertlogtable.concat(RealTimeLCGateAlert);
        setRealTimeLCGateAlert(alertlogtable);
      }
    }
    var index = LCGateList.findIndex(x => x.id === socket_data.data[0].data_logs.lcgateid)
    if (index != -1) {
      // LCGateList[index].lcgateid = socket_data.data[0].data_logs.id
      // LCGateList[index].lcgatename = socket_data.data[0].data_logs.lcgatename
      // LCGateList[index].announciator_relay_voltage = socket_data.data[0].data_logs.announciator_relay_voltage
      // LCGateList[index].proving_relay_voltage = socket_data.data[0].data_logs.proving_relay_voltage
      // LCGateList[index].createddate = socket_data.data[0].data_logs.createddate

      const updatedList = LCGateList.map(item => {
        if (item.lcgateid === socket_data.data[0].data_logs.id) {
          return {
            ...item,
            lcgateid: socket_data.data[0].data_logs.id,
            lcgatename: socket_data.data[0].data_logs.lcgatename,
            announciator_relay_voltage: socket_data.data[0].data_logs.announciator_relay_voltage,
            proving_relay_voltage: socket_data.data[0].data_logs.proving_relay_voltage,
            createddate: socket_data.data[0].data_logs.createddate,
          };
        }
        return item;
      });

      updatedList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.lcgatename.localeCompare(b.lcgatename);
      });

      // Assuming you have a setter function like setLCGateList to update state
      setLCGateList(updatedList);

    }
    else {
      LCGateList.push({
        id: socket_data.data[0].data_logs.lcgateid,
        lcgatedataid: socket_data.data[0].data_logs.id,
        lcgatename: socket_data.data[0].data_logs.lcgatename,
        announciator_relay_voltage: socket_data.data[0].data_logs.announciator_relay_voltage,
        proving_relay_voltage: socket_data.data[0].data_logs.proving_relay_voltage,
        modeid: socket_data.data[0].alertmodeid,
        createddate: socket_data.data[0].data_logs.createddate,
        isdele: socket_data.data[0].data_logs.isdele,
      });
      LCGateList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.lcgatename.localeCompare(b.lcgatename);
      });
    }
    if (socket_data.data[0].data_logs.lcgateid === lcgateid) {
      setLCGateGraphData((prevData) => [...prevData, socket_data.data[0].data_logs]);
    }
    //setrefresh(refresh + 1);
    dispatch(lcgate_data({ data: [] }));
  }

  const socket_relay_data = useSelector(
    (state) => state?.relay_data?.relaydata
  );

   // socket data functions //
  if (socket_relay_data?.data.length > 0) {
    var dataLogList = JSON.parse(socket_relay_data.data[0].data_logs);

    var relaylist_map = new Map(relayList.map(item => [item.id,item]))
    dataLogList.forEach(obj => {
      if(relaylist_map.has(obj.relayid)) {
        Object.assign(relaylist_map.get(obj.relayid),obj)
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
    });      
    relayList.sort((a,b) => b.value - a.value).sort((a,b) => b.relayname - a.relayname)
    //dispatch(relay_data({ data: [] }));
  }

  useEffect(() => {
    setPageload(true);
    axiosClient
      .get("/lcgate/getstationlcgate", {
        params: {
          stationid: station_id,
        },
      })
      .then((response) => {
        if (response.data.issuccess === true) {
          setLCGateList(response.data.data);
          setPageload(false);
        }
      })
      .catch((err) => {
        setPageload(false);
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
          setPageload(false);
        } else {
          message.error(err.msg);
          setPageload(false);
        }
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
      title: "ARV",
      dataIndex: "announciator_relay_voltage",
      key: "announciator_relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.announciator_relay_voltage}
          </Text>
        )
      },
    },
    {
      title: "PRV",
      dataIndex: "proving_relay_voltage",
      key: "proving_relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.proving_relay_voltage}
          </Text>
        )
      },
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
      title: "ARV",
      dataIndex: "announciator_relay_voltage",
      key: "announciator_relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.announciator_relay_voltage}
          </Text>
        )
      },
    },
    {
      title: "PRV",
      dataIndex: "proving_relay_voltage",
      key: "proving_relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.proving_relay_voltage}
          </Text>
        )
      },
    },
  ];

  function onclickCard(values) {
    setActiveTab("2");
    setLCGateName(values.lcgatename);
    setlcgateid(values.id);
    setOpenModal(true);
    getCurrentData(values.id);
  }

  function handleOk() {
    setOpenModal(false);
  }

  function handleCancel() {
    setlcgateid("");
    setRealTimeLCGateData([])
    setRealTimeLCGateAlert([])
    setrelayList([])
    setOpenModal(false);
  }

  function onTabClicked(key) {
    setTabId(key);
    if (key === "2") {
      getCurrentData("");
    } else if (key === "3") {
      getCurrentAlert();
    } else if (key === "4") {
      setLCGateGraphData([]);
    } else if (key === "5") {
      getLcgateDataLogs();
    } else if (key === "6") {
      getLcgateAlertLogs();
    }
  };

  function HandleDatePicker(start, end, page, size, msg) {
    if (msg === "Data") {
      setloading(true);
      axiosClient
        .get(
          "/lcgate/getstationlcgatedata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&lcgateid=" +
          lcgateid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setLCGateData(response.data.data);
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
          "/lcgate/getstationlcgatealert?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&lcgateid=" +
          lcgateid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setAlertPageTotal(response.data.totaldatacount);
            setAlertPageNo(response.data.page);
            setloading(false);
            setLCGateAlert(response.data.data);
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
        "/lcgate/downloadlcgatedatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        lcgateid,
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
          FileSaver.saveAs(blob, "LCGateDataReport_" + showTime + ".xlsx");
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
        "/lcgate/downloadlcgatealertreport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        lcgateid,
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
          FileSaver.saveAs(blob, "LCGateAlertReport_" + showTime + ".xlsx");
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
        "/lcgate/getstationlcgatedatagraph?date=" +
        date +
        "&&from_time=" +
        Fromtime +
        "&&to_time=" +
        Totime +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        lcgateid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          //console.log(response.data.data);
          // setloading(false);
          setLCGateGraphData(response.data.data);
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
    var val = value !== "" ? value : lcgateid;
    axiosClient
      .get(
        "/lcgate/getstationlcgatecurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        val
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setRealTimeLCGateData(response.data.data);
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
        "/lcgate/getstationlcgatecurrentalert?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        lcgateid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeAlertPageTotal(response.data.totaldatacount);
          setRealTimeAlertPageNo(response.data.page);
          setRealTimeLCGateAlert(response.data.data);
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

  function getLcgateDataLogs() {
    setloading(true)
    axiosClient
      .get(
        "/lcgate/getstationlcgatedata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        lcgateid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setLCGateData(response.data.data);
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

  function getLcgateAlertLogs() {
    setloading(true)
    axiosClient
      .get(
        "/lcgate/getstationlcgatealert?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&lcgateid=" +
        lcgateid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setAlertPageTotal(response.data.totaldatacount);
          setAlertPageNo(response.data.page);
          setloading(false);
          setLCGateAlert(response.data.data);
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
        name: 'ARV',
        data: LCGateGraphData.map(data => data.announciator_relay_voltage),
        color: "#ff7b00"
      },
      {
        name: 'PRV',
        data: LCGateGraphData.map(data => data.proving_relay_voltage),
        color: "#0466c8"
      },
    ],
    xaxis: {
      categories: LCGateGraphData.map(data => data.time),
    },
  };

  const getRelayList = async () => {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationassertrelay?stationid=" +
          station_id +
          "&&assertsid=" + 5 +
          "&&assertid=" +
          lcgateid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setrelayList(response.data.data);
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
  
  return (
    <Layout style={{ height: "90vh" }}>
      <Content style={{ minHeight: "80vh", padding: "1.5%" }}>
        <Row gutter={[10, 20]}>
          {LCGateList && LCGateList.length > 0 ? (
            LCGateList.map((item, id) => (
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                <Card style={{ width: "75%", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }} key={item.id} id="lcgateCard" onClick={() => { onclickCard(item) }}>
                <Grid item md={12} xs={12}>
                    <Grid container spacing={8}>
                      <Grid item md={16} xs={16}>
                        <FormGroup>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              ARV
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.announciator_relay_voltage}
                          </Typography>
                        </FormGroup>
                      </Grid>

                      <Grid item md={16} xs={16}>
                        <FormControl>
                          <FormLabel>
                            {" "}
                            <Typography className="typographyText" variant="caption" gutterBottom>
                              PRV
                            </Typography>
                          </FormLabel>
                          <Typography variant="subtitle2" gutterBottom>
                            {item.proving_relay_voltage}
                          </Typography>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <div className="AssertAlert">
                    <div className={item.modeid === 3 ? "redColor" : item.modeid === 2 ? "yellowColor" : item.modeid === 1 ? "orangeColor" : "AssertAlert"}>
                      <Row>
                        <Col
                          span={8}
                          style={{ textAlign: "start", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                          {item.lcgatename}
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
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </Row>
        <div>
          {OpenModal ?
            <Modal
              title={'LC Gate- ' + LCGateName + ' @' + station_name}
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
                        <p className="content active">
                          <ConfigProvider>
                            <Table
                              id="AssertTable"
                              className="Reports-table"
                              size="small"
                              scroll={{ x: "max-content" }}
                              rowKey={(record) => record.id}
                              loading={loading}
                              columns={data_table_columns}
                              dataSource={RealTimeLCGateData}
                            />
                          </ConfigProvider>
                        </p>
                      )}
                      {activeTab === "3" && (
                        <p className="content active">
                          <ConfigProvider>
                            <Table
                              id="AssertTable"
                              className="Reports-table"
                              size="small"
                              scroll={{ x: "max-content" }}
                              rowKey={(record) => record.id}
                              loading={loading}
                              columns={alert_table_column}
                              dataSource={RealTimeLCGateAlert}
                            />
                          </ConfigProvider>
                        </p>
                      )}
                      {activeTab === "4" && (
                        <p className="content active">
                          <div>
                            <ReactApexChart
                              options={chartOptions}
                              series={chartOptions.series}
                              // xaxis={chartOptions.xaxis}
                              type="line"
                              height={350}
                            />
                          </div>
                        </p>
                      )}
                      {activeTab === "5" && (
                        <p className="content active">
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
                                  {LCGateData.length > 0 ? <>
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
                                      {/* <h1 onClick={
                                        ReportDownloadData
                                      }>
                                        Download
                                      </h1> */}
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
                              loading={loading}
                              columns={data_log_table_columns}
                              dataSource={LCGateData}
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
                        </p>
                      )}
                      {activeTab === "6" && (
                        <p className="content active">
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
                                  {LCGateAlert.length > 0 ? <>
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
                              dataSource={LCGateAlert}
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
                        </p>
                      )}
                      {activeTab === "7" && (
                        <div className="content active">
                          <Row style={{ margin: "10px", padding: "10px" }}>
                            <Col span={24}>
                              <Row gutter={[8, 32]} style={{ marginRight: "35px" }}>
                                { relayList.length > 0 ? (
                                  relayList.filter((data) => data.assertsid === 5).map((item, id) => (
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
                        <p className="content active">
                          <div style={{ height: "60vh", fontSize: "40px", textAlign: "center", color: "#23234D" }}>Installation in Progress...!</div>
                        </p>
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

export default LCGate;

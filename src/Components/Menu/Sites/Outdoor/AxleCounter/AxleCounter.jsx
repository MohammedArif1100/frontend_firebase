import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Layout,
  Typography,
  message,
  Empty,
  Modal,
  Tabs,
  ConfigProvider,
  Table,
  Tag,
  Form,
  DatePicker,
  TimePicker,
  Button,
  Tooltip as tp,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CloudDownloadOutlined,
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
import { axlecounter_data, relay_data } from "../../../../../features/Notification";
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
import ReactApexChart from "react-apexcharts";
import ClipLoader from "react-spinners/ClipLoader";
import "./DashboardAxleCounter.css";
const { Content } = Layout;
const { Link, Title, Text } = Typography;
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;
const AxleCounter = (values) => {
  document.title = "RDPMS";
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var station_id = values.values.station_id;
  var station_name = values.values.station_name;
  // for axle counter states //
  const [AxleCounterList, setAxleCounterList] = useState([]);
  const [AxleCounterData, setAxleCounterData] = useState([]);
  const [axlecounterid, setaxlecounterid] = useState("");
  const [RealTimeAxleCounterData, setRealTimeAxleCounterData] = useState([]);
  const [RealTimeAxleCounterAlert, setRealTimeAxleCounterAlert] = useState([]);
  const [AxleCounterAlert, setAxleCounterAlert] = useState([]);
  const [AxleCounterGraphData, setAxleCounterGraphData] = useState([]);
  const [AxleCounterName, setAxleCounterName] = useState("");

  const [OpenModal, setOpenModal] = useState(false);
  const [TabId, setTabId] = useState("1");
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
  const [RealTimeAxleDashboardData, setRealTimeAxleDashboardData] = useState(null);

  const handleTabClick = (key) => {
    setActiveTab(key);
    setTabId(key);
    if (key === "2") {
      getCurrentData("");
    } else if (key === "3") {
      getCurrentAlert();
    } else if (key === "4") {
      setAxleCounterGraphData([]);
    } else if (key === "5") {
      getAxleDataLogs();
    } else if (key === "6") {
      getAxleAlertLogs();
    } else if (key === "7") {
      getRelayList();
    } else if (key === "7") {
      getRelayList();
    } else if (key === "1") {
      getRelayList();
      getAxleDashboardData();
    }
  };

  const socket_data = useSelector(
    (state) => state.axlecounter_data.axlecounterdata
  );

  if (socket_data.data.length > 0) {
    if (axlecounterid !== "") {
      if (socket_data.data[0].data_logs.axlecounterid === axlecounterid) {
        var datalogstable = [];
        datalogstable.push(socket_data.data[0].data_logs);
        RealTimeAxleCounterData.length >= 10 ? RealTimeAxleCounterData.pop() : <></>
        datalogstable = datalogstable.concat(RealTimeAxleCounterData);
        if (datalogstable.length > 10) {
          datalogstable = datalogstable.slice(0, 10);
        }
        setRealTimeAxleCounterData(datalogstable);
       setRealTimeAxleDashboardData(socket_data.data[0].data_logs);
      }
    }
    if (axlecounterid !== "" && socket_data.data[0].alerts.length > 0) {
      if (socket_data.data[0].alerts[0].axlecounterid === axlecounterid) {
        var alertlogtable = [];
        socket_data.data[0].alerts.forEach(item => alertlogtable.push(item))
        //alertlogtable.push(socket_data.data[0].alerts[0]);
        RealTimeAxleCounterAlert.length >= 10 ? RealTimeAxleCounterAlert.pop() : <></>
        alertlogtable = alertlogtable.concat(RealTimeAxleCounterAlert);
        RealTimeAxleCounterAlert(alertlogtable);
      }
    }
    var index = AxleCounterList.findIndex(x => x.id === socket_data.data[0].data_logs.axlecounterid)
    if (index != -1) {
      // AxleCounterList[index].axlecounterid = socket_data.data[0].data_logs.id
      // AxleCounterList[index].axlecountername = socket_data.data[0].data_logs.axlecountername
      // AxleCounterList[index].dc_converter_voltage_1 = socket_data.data[0].data_logs.dc_converter_voltage_1
      // AxleCounterList[index].dc_converter_voltage_1 = socket_data.data[0].data_logs.dc_converter_voltage_2
      // AxleCounterList[index].preparatory_relay_voltage_1 = socket_data.data[0].data_logs.preparatory_relay_voltage_1
      // AxleCounterList[index].preparatory_relay_voltage_2 = socket_data.data[0].data_logs.preparatory_relay_voltage_2
      // AxleCounterList[index].vital_relay_voltage_1 = socket_data.data[0].data_logs.vital_relay_voltage_1
      // AxleCounterList[index].vital_relay_voltage_2 = socket_data.data[0].data_logs.vital_relay_voltage_2
      // AxleCounterList[index].reset_relay_voltage = socket_data.data[0].data_logs.reset_relay_voltage
      // AxleCounterList[index].modeid = socket_data.data[0].alertmodeid
      // AxleCounterList[index].createddate = socket_data.data[0].data_logs.createddate

      const updatedList = AxleCounterList.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            axlecounterid: socket_data.data[0].data_logs.id,
            axlecountername: socket_data.data[0].data_logs.axlecountername,
            dc_converter_voltage_1: socket_data.data[0].data_logs.dc_converter_voltage_1,
            dc_converter_voltage_2: socket_data.data[0].data_logs.dc_converter_voltage_2,
            preparatory_relay_voltage_1: socket_data.data[0].data_logs.preparatory_relay_voltage_1,
            preparatory_relay_voltage_2: socket_data.data[0].data_logs.preparatory_relay_voltage_2,
            vital_relay_voltage_1: socket_data.data[0].data_logs.vital_relay_voltage_1,
            vital_relay_voltage_2: socket_data.data[0].data_logs.vital_relay_voltage_2,
            reset_relay_voltage: socket_data.data[0].data_logs.reset_relay_voltage,
            modeid: socket_data.data[0].alertmodeid,
            createddate: socket_data.data[0].data_logs.createddate
          };
        }
        return item;
      });

      updatedList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.axlecountername.localeCompare(b.axlecountername);
      });

      setAxleCounterList(updatedList);

    }
    else {
      AxleCounterList.push({
        id: socket_data.data[0].data_logs.axlecounterid,
        axlecounterdataid: socket_data.data[0].data_logs.id,
        axlecountername: socket_data.data[0].data_logs.axlecountername,
        dc_converter_voltage_1: socket_data.data[0].data_logs.dc_converter_voltage_1,
        dc_converter_voltage_2: socket_data.data[0].data_logs.dc_converter_voltage_2,
        preparatory_relay_voltage_1: socket_data.data[0].data_logs.preparatory_relay_voltage_1,
        preparatory_relay_voltage_2: socket_data.data[0].data_logs.preparatory_relay_voltage_2,
        vital_relay_voltage_1: socket_data.data[0].data_logs.vital_relay_voltage_1,
        vital_relay_voltage_2: socket_data.data[0].data_logs.vital_relay_voltage_2,
        reset_relay_voltage: socket_data.data[0].data_logs.reset_relay_voltage,
        modeid: socket_data.data[0].alertmodeid,
        createddate: socket_data.data[0].data_logs.createddate,
        isdele: socket_data.data[0].data_logs.isdele,
      });
      AxleCounterList.sort((a, b) => {
        return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
        // || a.axlecountername.localeCompare(b.axlecountername);
      });
    }
    if (socket_data.data[0].data_logs.axlecounterid === axlecounterid) {
      setAxleCounterGraphData((prevData) => [...prevData, socket_data.data[0].data_logs]);
    }
    //setrefresh(refresh + 1);
    dispatch(axlecounter_data({ data: [] }));
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
      .get("/axlecounter/getstationaxlecounter", {
        params: {
          stationid: station_id,
        },
      })
      .then((response) => {
        if (response.data.issuccess === true) {
          setAxleCounterList(response.data.data);
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
      title: "DCV1",
      dataIndex: "dc_converter_voltage_1",
      key: "dc_converter_voltage_1",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.dc_converter_voltage_1}
          </Text>
        )
      },
    },
    {
      title: "DCV2",
      dataIndex: "dc_converter_voltage_2",
      key: "dc_converter_voltage_2",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.dc_converter_voltage_2}
          </Text>
        )
      },
    },
    {
      title: "PRV1",
      dataIndex: "preparatory_relay_voltage_1",
      key: "preparatory_relay_voltage_1",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.preparatory_relay_voltage_1}
          </Text>
        )
      },
    },
    {
      title: "PRV2",
      dataIndex: "preparatory_relay_voltage_2",
      key: "preparatory_relay_voltage_2",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.preparatory_relay_voltage_2}
          </Text>
        )
      },
    },
    {
      title: "VRV1",
      dataIndex: "vital_relay_voltage_1",
      key: "vital_relay_voltage_1",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.vital_relay_voltage_1}
          </Text>
        )
      },
    },
    {
      title: "VRV2",
      dataIndex: "vital_relay_voltage_2",
      key: "vital_relay_voltage_2",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.vital_relay_voltage_2}
          </Text>
        )
      },
    },
    {
      title: "Reset",
      dataIndex: "reset_relay_voltage",
      key: "reset_relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.reset_relay_voltage}
          </Text>
        )
      },
    }
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
      title: "DCV1",
      dataIndex: "dc_converter_voltage_1",
      key: "dc_converter_voltage_1",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.dc_converter_voltage_1}
          </Text>
        )
      },
    },
    {
      title: "DCV2",
      dataIndex: "dc_converter_voltage_2",
      key: "dc_converter_voltage_2",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.dc_converter_voltage_2}
          </Text>
        )
      },
    },
    {
      title: "PRV1",
      dataIndex: "preparatory_relay_voltage_1",
      key: "preparatory_relay_voltage_1",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.preparatory_relay_voltage_1}
          </Text>
        )
      },
    },
    {
      title: "PRV2",
      dataIndex: "preparatory_relay_voltage_2",
      key: "preparatory_relay_voltage_2",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.preparatory_relay_voltage_2}
          </Text>
        )
      },
    },
    {
      title: "VRV1",
      dataIndex: "vital_relay_voltage_1",
      key: "vital_relay_voltage_1",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.vital_relay_voltage_1}
          </Text>
        )
      },
    },
    {
      title: "VRV2",
      dataIndex: "vital_relay_voltage_2",
      key: "vital_relay_voltage_2",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.vital_relay_voltage_2}
          </Text>
        )
      },
    },
    {
      title: "Reset",
      dataIndex: "reset_relay_voltage",
      key: "reset_relay_voltage",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.reset_relay_voltage}
          </Text>
        )
      },
    }
  ];

  function onclickCard(values) {
    setActiveTab("2");
    setAxleCounterName(values.axlecountername);
    setaxlecounterid(values.id);
    setOpenModal(true);
    getCurrentData(values.id);
  }

  function handleOk() {
    setOpenModal(false);
  }

  function handleCancel() {
    setaxlecounterid("");
    setRealTimeAxleCounterData([])
    setRealTimeAxleCounterAlert([])
    setrelayList([])
    setOpenModal(false);
  }

  function HandleDatePicker(start, end, page, size, msg) {
    if (msg === "Data") {
      setloading(true);
      axiosClient
        .get(
          "/axlecounter/getstationaxlecounterdata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&axlecounterid=" +
          axlecounterid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setAxleCounterData(response.data.data);
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
          "/axlecounter/getstationaxlecounteralert?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&axlecounterid=" +
          axlecounterid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setAlertPageTotal(response.data.totaldatacount);
            setAlertPageNo(response.data.page);
            setloading(false);
            setAxleCounterAlert(response.data.data);
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
  }

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
  }

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
        "/axlecounter/downloadaxlecounterdatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid,
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
          FileSaver.saveAs(blob, "AxleCounterDataReport_" + showTime + ".xlsx");
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
  }

  function ReportDownloadAlert() {
    var start = alertstartDatepicker ? alertstartDatepicker : "";
    var end = alertendDatepicker ? alertendDatepicker : "";
    setalertreportloading(true);
    axiosClient
      .get(
        "/axlecounter/downloadaxlecounteralertreport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid,
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
          FileSaver.saveAs(blob, "AxleCounterAlertReport_" + showTime + ".xlsx");
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
  }

  function HanldeSingleDatePicker(date) {
    setgraphSingleDatepicker(date.format("YYYY-MM-DD"));
  }

  function HanldeTimePicker(time) {
    setgraphTimepicker(time);
  }

  function HandleTime() {
    const date = graphSingleDatepicker;
    const Fromtime = graphTimepicker[0].format("HH:mm");
    const Totime = graphTimepicker[1].format("HH:mm");

    axiosClient
      .get(
        "/axlecounter/getstationaxlecounterdatagraph?date=" +
        date +
        "&&from_time=" +
        Fromtime +
        "&&to_time=" +
        Totime +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          //console.log(response.data.data);
          // setloading(false);
          setAxleCounterGraphData(response.data.data);
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
    var val = value !== "" ? value : axlecounterid;
    axiosClient
      .get(
        "/axlecounter/getstationaxlecountercurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        val
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setRealTimeAxleCounterData(response.data.data);
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
        "/axlecounter/getstationaxlecountercurrentalert?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeAlertPageTotal(response.data.totaldatacount);
          setRealTimeAlertPageNo(response.data.page);
          setRealTimeAxleCounterAlert(response.data.data);
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

  function getAxleDataLogs() {
    setloading(true);
    axiosClient
      .get(
        "/axlecounter/getstationaxlecounterdata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setAxleCounterData(response.data.data);
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

  function getAxleAlertLogs() {
    setloading(true);
    axiosClient
      .get(
        "/axlecounter/getstationaxlecounteralert?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setAlertPageTotal(response.data.totaldatacount);
          setAlertPageNo(response.data.page);
          setloading(false);
          setAxleCounterAlert(response.data.data);
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
      type: "line",
      zoom: {
        enabled: false
      }
    },
    series: [
      {
        name: "	DCV1",
        data: AxleCounterGraphData.map((data) => data.dc_converter_voltage_1),
        color: "#ff7b00",
      },
      {
        name: "	DCV2",
        data: AxleCounterGraphData.map((data) => data.dc_converter_voltage_2),
        color: "#0466c8",
      },
      {
        name: "PRV1",
        data: AxleCounterGraphData.map((data) => data.preparatory_relay_voltage_1),
        color: "#2ec4b6",
      },
      {
        name: "PRV2",
        data: AxleCounterGraphData.map((data) => data.preparatory_relay_voltage_2),
        color: "#ce4257",
      },
      {
        name: "VRV1",
        data: AxleCounterGraphData.map((data) => data.vital_relay_voltage_1),
        color: "#4c6a47",
      },
      {
        name: "VRV2",
        data: AxleCounterGraphData.map((data) => data.vital_relay_voltage_2
        ),
        color: "#bf3eff",
      },
      {
        name: "Reset",
        data: AxleCounterGraphData.map((data) => data.reset_relay_voltage
        ),
        color: "#bf3eff",
      }
    ],
    xaxis: {
      categories: AxleCounterGraphData.map((data) => data.time),
    },
  };

  const getRelayList = async () => {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationassertrelay?stationid=" +
          station_id +
          "&&assertsid=" + 4 +
          "&&assertid=" +
          axlecounterid
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

  function getAxleDashboardData() {
    setPageload(true);
    axiosClient
      .get(
        "/axlecounter/getstationaxlecounterfinaldata?stationid=" +
        station_id +
        "&&axlecounterid=" +
        axlecounterid
      )
      .then((response) => {
        setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimeAxleDashboardData(response.data.data)               
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

  function AxleCounterDashboard() {
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
    )
  }

  return (
    <>
      <Layout style={{ height: "90vh" }}>
        <Content style={{ minHeight: "80vh", padding: "1.5%" }}>
          <Row gutter={[10, 20]}>
            {AxleCounterList && AxleCounterList.length > 0 ? (
              AxleCounterList.map((item, id) => (
                <Col
                  xs={{ span: 22, offset: 2 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 10, offset: 0 }}
                  lg={{ span: 10, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}>
                  <Card
                    key={item.id}
                    id="trackCard"
                    onClick={() => {
                      onclickCard(item);
                    }}
                    hoverable
                    style={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 1)",
                      maxWidth: "80%"
                    }}>
                    <Grid item md={12} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item md={2} xs={2}>
                          <FormGroup>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                DCV1
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.dc_converter_voltage_1}
                            </Typography>
                          </FormGroup>
                        </Grid>

                        <Grid item md={2} xs={2}>
                          <FormControl>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                DCV2
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.dc_converter_voltage_2}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item md={2} xs={2}>
                          <FormControl>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                PRV1
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.preparatory_relay_voltage_1}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item md={2} xs={2}>
                          <FormControl>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                PRV2
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.preparatory_relay_voltage_2}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item md={4} xs={4}>
                          <FormControl>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                VRV1
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.vital_relay_voltage_1}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item md={4} xs={4}>
                          <FormControl>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                VRV2
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.vital_relay_voltage_2}
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item md={4} xs={4}>
                          <FormControl>
                            <FormLabel>
                              {" "}
                              <Typography className="typographyText" variant="caption" gutterBottom>
                                Reset
                              </Typography>
                            </FormLabel>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.reset_relay_voltage}
                            </Typography>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <div className="AssertAlert">
                      {/* <div className={item.modeid === 3 ? "redColor" : item.modeid === 2 ? "yellowColor" : item.modeid === 1 ? "orangeColor" : "AssertAlert"}> */}
                      <div>
                        <Row>
                          <Col
                            span={8}
                            style={{ textAlign: "start", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                            {item.axlecountername}
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
                title={'Axle Counter- ' + AxleCounterName + ' @' + station_name}
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
                                dataSource={RealTimeAxleCounterData}
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
                                dataSource={RealTimeAxleCounterAlert}
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
                                    {AxleCounterData.length > 0 ? <>
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
                                dataSource={AxleCounterData}
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
                                    {AxleCounterAlert.length > 0 ? <>
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
                                dataSource={AxleCounterAlert}
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
                                    relayList.filter((data) => data.assertsid === 4).map((item, id) => (
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
                             {RealTimeAxleDashboardData != null ? AxleCounterDashboard() : <></>}    
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Modal> : <></>
            }
          </div>
        </Content>
      </Layout>


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
  )
}

export default AxleCounter;
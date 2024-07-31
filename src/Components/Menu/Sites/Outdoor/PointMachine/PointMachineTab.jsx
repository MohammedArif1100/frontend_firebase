import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card, Row, Spin, Col, Layout, Typography, Divider, message, Empty, Modal, Tabs, ConfigProvider, Table, Tag, Form, DatePicker,
  TimePicker, Button, Tooltip as tp,
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
import { ImArrowRight, ImArrowLeft, ImArrowUp, ImArrowDown } from "react-icons/im";
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
  Tooltip,
} from "recharts";
import dayjs from "dayjs";
import * as FileSaver from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { pointmachine_data, relay_data } from "../../../../../features/Notification";
import { red } from "@material-ui/core/colors";
import ReactApexChart from 'react-apexcharts';
import ClipLoader from "react-spinners/ClipLoader";
import "./DashboardPointMachine.css";
const { Content } = Layout;
const { Link, Title, Text } = Typography;
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;


const PointMachineTab = (values) => {
  // console.log("PointMachineTabsssssssssssss", values);
  const [PointMachineList, setPointMachineList] = useState([]);
  const [OpenModal, setOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [TabId, setTabId] = useState('1');
  const [PointMachineName, setPointMachineName] = useState();
  const [PointMachineId, setPointMachineId] = useState();
  const [RealTimeDataPageNo, setRealTimeDataPageNo] = useState(1);
  const [RealTimeDataPageTotal, setRealTimeDataPageTotal] = useState(10);
  const [RealTimeAlertPageTotal, setRealTimeAlertPageTotal] = useState(10);
  const [RealTimeAlertPageNo, setRealTimeAlertPageNo] = useState(1);
  const [RealTimePointMachineData, setRealTimePointMachineData] = useState([]);
  const [RealTimePointMachineAlert, setRealTimePointMachineAlert] = useState([]);
  const [form] = Form.useForm();
  const [datastartDatepicker, setDatastartDatepicker] = useState("");
  const [dataendDatepicker, setDataendDatepicker] = useState("");
  const [alertstartDatepicker, setAlertstartDatepicker] = useState("");
  const [alertendDatepicker, setAlertendDatepicker] = useState("");
  const [PointMachineData, setPointMachineData] = useState([]);
  const [DataPageTotal, setDataPageTotal] = useState(10);
  const [AlertPageTotal, setAlertPageTotal] = useState(10);
  const [DataPageNo, setDataPageNo] = useState(1);
  const [AlertPageNo, setAlertPageNo] = useState(1);
  const [PointMachineAlert, setPointMachineAlert] = useState([]);
  const [datareportloading, setdatareportloading] = useState(false);
  const [alertreportloading, setalertreportloading] = useState(false);
  const [graphSingleDatepicker, setgraphSingleDatepicker] = useState(null);
  const [graphTimepicker, setgraphTimepicker] = useState([null, null]);
  const [PointMachineGraphData, setPointMachineGraphData] = useState([]);
  const [activeTab, setActiveTab] = useState("2");
  const [relayList, setrelayList] = useState([]);
  const [RealTimePointDashboardData, setRealTimePointDashboardData] = useState(null);

  const [dataLogColums, setdataLogColums] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [ChartValues, setChartValues] = useState();
  const [Pageload, setPageload] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var station_id = values.values.station_id;
  var station_name = values.values.station_name
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const a_data_table_columns = [
    {
      title: "Date",
      dataIndex: "createddate",
      key: "createddate",
      align: "center",
      // responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        );
      },
    },
    {
      title: "A Indication",
      dataIndex: "a_direction",
      key: "a_direction",
      align: "center",
      // responsive: ["md"],
      render: (text) => {
        let style = {
          backgroundColor: "blue",
          color: "white",
          width: "120px",
          marginLeft: "20px",
          textAlign: "center",
        }; // Modify the style object here
        const additionalText = `${text}`;
        return additionalText == 'Normal' ? <Tag color={"green"}>{additionalText}</Tag> : additionalText == 'Reverse' ? <Tag color={"blue"}>{additionalText}</Tag> : <Tag color={"red"}>{additionalText}</Tag>;
      },
    },
    {
      title: "A Current Max/Avg(A)",
      dataIndex: "a_current_max",
      key: "a_current_max",
      align: "center",
      // responsive: ["md"],
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
      align: "center",
      // responsive: ["md"],
    },
    {
      title: "A Indication (Vdc)", //A DC (v)
      dataIndex: "a_indication_voltage",
      key: "a_indication_voltage",
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "A Operation Time(s)",
      dataIndex: "a_time",
      key: "a_time",
      align: "center",
      // responsive: ["md"],
    }
  ];

  const b_data_table_columns = [
    {
      title: "Date",
      dataIndex: "createddate",
      key: "createddate",
      align: "center",
      // responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {moment(record.createddate).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        );
      },
    },
    {
      title: "B Indication",
      dataIndex: "b_direction",
      key: "b_direction",
      align: "center",
      // responsive: ["md"],
      render: (text) => {
        let style = {
          backgroundColor: "blue",
          color: "white",
          width: "120px",
          marginLeft: "20px",
          textAlign: "center",
        };
        const additionalText = `${text}`;
        return additionalText == 'Normal' ? <Tag color={"green"}>{additionalText}</Tag> : additionalText == 'Reverse' ? <Tag color={"blue"}>{additionalText}</Tag> : <Tag color={"red"}>{additionalText}</Tag>;
      },
    },
    {
      title: "B Current Max/Avg(A)",
      dataIndex: "b_current_max",
      key: "b_current_max",
      align: "center",
      // responsive: ["md"],
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
      align: "center",
      // responsive: ["md"],
    },
    {
      title: "B Operation Time(s)",
      dataIndex: "b_time",
      key: "b_time",
      align: "center",
      // responsive: ["md"],
    },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
    setTabId(key);
    if (key === "2") {
      getCurrentData("");
    } else if (key === "3") {
      getCurrentAlert();
    } else if (key === "4") {
      setPointMachineGraphData([]);
      setChartOptions({ chart: {}, series: [], xaxis: {} });
    } else if (key === "5") {
      getPointDataLogs();
    } else if (key === "6") {
      getPointAlertLogs();
    } else if (key === "7") {
      getRelayList();
    } else if (key === "1") {
      getRelayList();
      getPointDashboardData();
    }

  };

  function onclickCard(values) {
    setPointMachineName(values.pointmachinename);
    setPointMachineId(values.id);
    setOpenModal(true);
    getCurrentData(values.id);
    setActiveTab("2");
  };

  const handleOk = () => {
    setOpenModal(false);
  }
  const handleCancel = () => {
    setPointMachineId("")
    setRealTimePointMachineData([])
    setRealTimePointMachineAlert([])
    setrelayList([])
    setOpenModal(false);
  }

  const socket_data = useSelector(
    (state) => state.pointmachine_data.pointmachinedata
  );

  if (socket_data.data.length > 0) {
    if (PointMachineId !== "" && socket_data.data[0].data_logs.log == 1) {
      if (socket_data.data[0].data_logs.pointmachineid === PointMachineId) {
        var datalogstable = [];
        datalogstable.push(socket_data.data[0].data_logs);
        RealTimePointMachineData.length >= 10 ? RealTimePointMachineData.pop() : <></>
        datalogstable = datalogstable.concat(RealTimePointMachineData);
        if (datalogstable.length > 10) {
          datalogstable = datalogstable.slice(0, 10);
        }
        setRealTimePointMachineData(datalogstable);
        setRealTimePointDashboardData(socket_data.data[0].data_logs);
      }
    }
    if (PointMachineId !== "" && socket_data.data[0].alerts.length > 0) {
      if (socket_data.data[0].alerts[0].pointmachineid === PointMachineId) {
        var alertlogtable = [];
        socket_data.data[0].alerts.forEach(item => alertlogtable.push(item))
        // alertlogtable.push(socket_data.data[0].alerts[0]);
        RealTimePointMachineAlert.length >= 10 ? RealTimePointMachineAlert.pop() : <></>
        alertlogtable = alertlogtable.concat(RealTimePointMachineAlert);
        setRealTimePointMachineAlert(alertlogtable);
      }
    }
    if (socket_data.data[0].data_logs.log == 1) {
      var index = PointMachineList.findIndex(x => x.id === socket_data.data[0].data_logs.pointmachineid)
      if (index != -1) {
        // PointMachineList[index].pointmachinedataid = socket_data.data[0].data_logs.id
        // PointMachineList[index].direction = socket_data.data[0].data_logs.direction
        // PointMachineList[index].a_direction = socket_data.data[0].data_logs.a_direction
        // PointMachineList[index].b_direction = socket_data.data[0].data_logs.b_direction
        // PointMachineList[index].modeid = socket_data.data[0].alertmodeid
        // PointMachineList[index].createddate = socket_data.data[0].data_logs.createddate

        const updatedList = PointMachineList.map(item => {
          if (item.pointmachinedataid === socket_data.data[0].data_logs.id) {
            return {
              ...item,
              direction: socket_data.data[0].data_logs.direction,
              a_direction: socket_data.data[0].data_logs.a_direction,
              b_direction: socket_data.data[0].data_logs.b_direction,
              modeid: socket_data.data[0].alertmodeid,
              createddate: socket_data.data[0].data_logs.createddate,
            };
          }
          return item;
        });

        updatedList.sort((a, b) => {
          return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
          // || a.pointmachinename.localeCompare(b.pointmachinename);
        });

        setPointMachineList(updatedList);

      }
      else {
        PointMachineList.push({
          id: socket_data.data[0].data_logs.pointmachineid,
          pointmachinedataid: socket_data.data[0].data_logs.id,
          pointmachinename: socket_data.data[0].data_logs.pointmachinename,
          direction: socket_data.data[0].data_logs.direction,
          pointcyclecount: socket_data.data[0].data_logs.pointcyclecount,
          a_direction: socket_data.data[0].data_logs.a_direction,
          b_direction: socket_data.data[0].data_logs.b_direction,
          modeid: socket_data.data[0].alertmodeid,
          createddate: socket_data.data[0].data_logs.createddate,
          isdele: socket_data.data[0].data_logs.isdele,
        });

        PointMachineList.sort((a, b) => {
          return (b.modeid === null ? -1 : b.modeid) - (a.modeid === null ? -1 : a.modeid)
          // || a.pointmachinename.localeCompare(b.pointmachinename);
        });
      }

      // dispatch(pointmachine_data({ data: [] }))
      // if (activeTab == 4) {
      if (socket_data.data[0].data_logs.pointmachineid === PointMachineId) {
        setPointMachineGraphData((prevData) => [...prevData, socket_data.data[0].data_logs]);

        // setPointMachineGraphData((prevData) => {
        //   const newData = [...prevData, socket_data.data[0].data_logs];
        //   console.log("newData", newData);
        //   return newData;
        // });
        // console.log("graphData", PointMachineGraphData);
        // console.log("realtimedata", RealTimePointMachineData);
        if (RealTimePointMachineData.length > 0 && PointMachineGraphData.length > 0) {
          getrealtimedataColumns();
          setIsReady(true);
        }
        // console.log("socket_data.data[0].data_logs", socket_data.data[0].data_logs);
      }
      // }
    }
    //setrefresh(refresh + 1);
    dispatch(pointmachine_data({ data: [] }));
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
    });
    relayList.sort((a, b) => b.value - a.value).sort((a, b) => b.relayname - a.relayname)
    //dispatch(relay_data({ data: [] }));
  }

  useEffect(() => {
    setloading(true);
    setPageload(true);
    axiosClient
      .get("/pointmachine/getstationpointmachine", {
        params: {
          stationid: station_id,
        },
      })
      .then((response) => {
        setloading(false);
        setPageload(false);
        if (response.data.issuccess === true) {
          setPointMachineList(response.data.data);
        }
      })
      .catch((err) => {
        setloading(false);
        setPageload(false);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  }, []);


  // for live graph data
  var [chartOptions, setChartOptions] = useState({ chart: {}, series: [], xaxis: {} });
  useEffect(() => {
    const getRealTimeDataColumns = () => {
      if (RealTimePointMachineData.length > 0) {
        const aDirection = RealTimePointMachineData[0].a_direction;
        const bDirection = RealTimePointMachineData[0].b_direction;

        let updatedChartOptions = {};

        if (bDirection === "") {
          updatedChartOptions = {
            chart: {
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            series: [
              {
                name: "A Indication Vdc",
                data: PointMachineGraphData.map(
                  (data) => data.a_indication_voltage
                ),
                color: "#8884d8",
              },
              {
                name: "A Vdc",
                data: PointMachineGraphData.map((data) => data.a_voltage),
                color: "#2ec4b6",
              },
              {
                name: "A Current Max (A)",
                data: PointMachineGraphData.map((data) => data.a_current_max),
                color: "#ff7b00",
              },
              {
                name: "A Current Avg (A)",
                data: PointMachineGraphData.map((data) => data.a_current_avg),
                color: "#0466c8",
              },
              {
                name: "A Operation Time (S)",
                data: PointMachineGraphData.map((data) => data.a_time),
                color: "#FF0000",
              },
            ],
            xaxis: {
              categories: PointMachineGraphData.map(data => data.time),
            },
          };
        } else if (aDirection === "") {
          updatedChartOptions = {
            chart: {
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            series: [
              {
                name: "B Indication Vdc",
                data: PointMachineGraphData.map(
                  (data) => data.b_indication_voltage
                ),
                color: "#d2691e",
              },
              {
                name: "B Vdc",
                data: PointMachineGraphData.map((data) => data.b_voltage),
                color: "#b5d7fd",
              },
              {
                name: "B Current Max (A)",
                data: PointMachineGraphData.map((data) => data.b_current_max),
                color: "#50a88b",
              },
              {
                name: "B Current Avg (A)",
                data: PointMachineGraphData.map((data) => data.b_current_avg),
                color: "#db6380",
              },
              {
                name: "B Operation Time (S)",
                data: PointMachineGraphData.map((data) => data.b_time),
                color: "#178e92",
              },
            ],
            xaxis: {
              categories: PointMachineGraphData.map(data => data.time),
            },
          };
        } else {
          updatedChartOptions = {
            chart: {
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            series: [
              {
                name: "A Indication Vdc",
                data: PointMachineGraphData.map(
                  (data) => data.a_indication_voltage
                ),
                color: "#8884d8",
              },
              {
                name: "A Vdc",
                data: PointMachineGraphData.map((data) => data.a_voltage),
                color: "#2ec4b6",
              },
              {
                name: "A Current Max (A)",
                data: PointMachineGraphData.map((data) => data.a_current_max),
                color: "#ff7b00",
              },
              {
                name: "A Current Avg (A)",
                data: PointMachineGraphData.map((data) => data.a_current_avg),
                color: "#0466c8",
              },
              {
                name: "A Operation Time (S)",
                data: PointMachineGraphData.map((data) => data.a_time),
                color: "#FF0000",
              },
              {
                name: "B Indication Vdc",
                data: PointMachineGraphData.map(
                  (data) => data.b_indication_voltage
                ),
                color: "#d2691e",
              },
              {
                name: "B Vdc",
                data: PointMachineGraphData.map((data) => data.b_voltage),
                color: "#b5d7fd",
              },
              {
                name: "B Current Max (A)",
                data: PointMachineGraphData.map((data) => data.b_current_max),
                color: "#50a88b",
              },
              {
                name: "B Current Avg (A)",
                data: PointMachineGraphData.map((data) => data.b_current_avg),
                color: "#db6380",
              },
              {
                name: "B Operation Time (S)",
                data: PointMachineGraphData.map((data) => data.b_time),
                color: "#178e92",
              },
            ],
            xaxis: {
              categories: PointMachineGraphData.map(data => data.time),
            },
          };
        }

        setChartOptions(updatedChartOptions);

      }
    };

    getRealTimeDataColumns();
    // console.log("Chart options ", chartOptions);
  }, [RealTimePointMachineData]);


  // var chartOptions = { chart: {}, series: [], xaxis: {} };
  function getrealtimedataColumns() {
    if (RealTimePointMachineData.length > 0) {
      var aDirection = RealTimePointMachineData[0].a_direction;
      var bDirection = RealTimePointMachineData[0].b_direction;

      if (bDirection == "") {
        chartOptions = {
          chart: {
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          series: [
            {
              name: "A Indication Vdc",
              data: PointMachineGraphData.map(
                (data) => data.a_indication_voltage
              ),
              color: "#8884d8",
            },
            {
              name: "A Vdc",
              data: PointMachineGraphData.map((data) => data.a_voltage),
              color: "#2ec4b6",
            },
            {
              name: "A Current Max (A)",
              data: PointMachineGraphData.map((data) => data.a_current_max),
              color: "#ff7b00",
            },
            {
              name: "A Current Avg (A)",
              data: PointMachineGraphData.map((data) => data.a_current_avg),
              color: "#0466c8",
            },
            {
              name: "A Operation Time (S)",
              data: PointMachineGraphData.map((data) => data.a_time),
              color: "#FF0000",
            },
          ],
          xaxis: {
            categories: PointMachineGraphData.map((data) => data.time),
          },
        };
        // console.log("Updated chartOptions:", chartOptions);

        return a_data_table_columns;
      } else if (aDirection == "") {
        chartOptions = {
          chart: {
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          series: [
            {
              name: "B Indication Vdc",
              data: PointMachineGraphData.map(
                (data) => data.b_indication_voltage
              ),
              color: "#d2691e",
            },
            {
              name: "B Vdc",
              data: PointMachineGraphData.map((data) => data.b_voltage),
              color: "#b5d7fd",
            },
            {
              name: "B Current Max (A)",
              data: PointMachineGraphData.map((data) => data.b_current_max),
              color: "#50a88b",
            },
            {
              name: "B Current Avg (A)",
              data: PointMachineGraphData.map((data) => data.b_current_avg),
              color: "#db6380",
            },
            {
              name: "B Operation Time (S)",
              data: PointMachineGraphData.map((data) => data.b_time),
              color: "#178e92",
            },
          ],
          xaxis: {
            categories: PointMachineGraphData.map((data) => data.time),
          },
        };
        // console.log("Updated chartOptions:", chartOptions);
        return b_data_table_columns;
      } else {
        chartOptions = {
          chart: {
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          series: [
            {
              name: "A Indication Vdc",
              data: PointMachineGraphData.map(
                (data) => data.a_indication_voltage
              ),
              color: "#8884d8",
            },
            {
              name: "A Vdc",
              data: PointMachineGraphData.map((data) => data.a_voltage),
              color: "#2ec4b6",
            },
            {
              name: "A Current Max (A)",
              data: PointMachineGraphData.map((data) => data.a_current_max),
              color: "#ff7b00",
            },
            {
              name: "A Current Avg (A)",
              data: PointMachineGraphData.map((data) => data.a_current_avg),
              color: "#0466c8",
            },
            {
              name: "A Operation Time (S)",
              data: PointMachineGraphData.map((data) => data.a_time),
              color: "#FF0000",
            },
            {
              name: "B Indication Vdc",
              data: PointMachineGraphData.map(
                (data) => data.b_indication_voltage
              ),
              color: "#d2691e",
            },
            {
              name: "B Vdc",
              data: PointMachineGraphData.map((data) => data.b_voltage),
              color: "#b5d7fd",
            },
            {
              name: "B Current Max (A)",
              data: PointMachineGraphData.map((data) => data.b_current_max),
              color: "#50a88b",
            },
            {
              name: "B Current Avg (A)",
              data: PointMachineGraphData.map((data) => data.b_current_avg),
              color: "#db6380",
            },
            {
              name: "B Operation Time (S)",
              data: PointMachineGraphData.map((data) => data.b_time),
              color: "#178e92",
            },
          ],
          xaxis: {
            categories: PointMachineGraphData.map((data) => data.b_time),
          },
        };
        // console.log("Updated chartOptions:", chartOptions);
        // console.log(
        //   "Mapped X-axis Data:",
        //   PointMachineGraphData.map((data) => data.time)
        // );
        return data_log_table_columns;
      }
    }

  }

  function getdatalogsColumns() {
    if (PointMachineData.length > 0) {
      var aDirection = PointMachineData[0].a_direction;
      var bDirection = PointMachineData[0].b_direction;
      if (bDirection == "") {
        return a_data_table_columns;
      } else if (aDirection == "") {
        return b_data_table_columns;
      } else {
        return data_log_table_columns;
      }
    }
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

  var data_log_table_columns = [];
  // if(dataLogColums){
  data_log_table_columns = [
    {
      title: "Date",
      dataIndex: "createddate",
      key: "createddate",
      align: "center",
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
      title: "A Indication",
      dataIndex: "a_direction",
      key: "a_direction",
      align: "center",
      //responsive: ["md"],
      render: (text) => {
        let style = {
          backgroundColor: "blue",
          color: "white",
          width: "120px",
          marginLeft: "20px",
          textAlign: "center",
        }; // Modify the style object here
        const additionalText = `${text}`;
        return additionalText == 'Normal' ? <Tag color={"green"}>{additionalText}</Tag> : additionalText == 'Reverse' ? <Tag color={"blue"}>{additionalText}</Tag> : <Tag color={"red"}>{additionalText}</Tag>;
      },
    },
    {
      title: "A Current Max/Avg(A)",
      dataIndex: "a_current_max",
      key: "a_current_max",
      align: "center",
      //responsive: ["md"],
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
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "A Indication (Vdc)", //A DC (v)
      dataIndex: "a_indication_voltage",
      key: "a_indication_voltage",
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "A Operation Time(s)",// title: "A Time (ms)",
      dataIndex: "a_time",
      key: "a_time",
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "A Vibration X|Y|Z(m/s²)",
      dataIndex: "a_vibration_x",
      key: "a_vibration_x",
      align: "center",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.a_vibration_x} | {record.a_vibration_y} |{" "}
            {record.a_vibration_z}
          </Text>
        );
      },
    },
    {
      title: "B Indication",
      dataIndex: "b_direction",
      key: "b_direction",
      align: "center",
      //responsive: ["md"],
      render: (text) => {
        let style = {
          backgroundColor: "blue",
          color: "white",
          width: "120px",
          marginLeft: "20px",
          textAlign: "center",
        };
        const additionalText = `${text}`;
        return additionalText == 'Normal' ? <Tag color={"green"}>{additionalText}</Tag> : additionalText == 'Reverse' ? <Tag color={"blue"}>{additionalText}</Tag> : <Tag color={"red"}>{additionalText}</Tag>;
      },
    },
    {
      title: "B Current Max/Avg(A)",
      dataIndex: "b_current_max",
      key: "b_current_max",
      align: "center",
      //responsive: ["md"],
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
      dataIndex: "a_voltage",
      key: "a_voltage",
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "B Indication (Vdc)",
      dataIndex: "b_indication_voltage",
      key: "b_indication_voltage",
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "B Operation Time(s)",
      dataIndex: "b_time",
      key: "b_time",
      align: "center",
      //responsive: ["md"],
    },
    {
      title: "B Vibration X|Y|Z(m/s²)",
      dataIndex: "b_vibration_x",
      key: "b_vibration_x",
      align: "center",
      //responsive: ["md"],
      render: (_, record) => {
        return (
          <Text>
            {record.a_vibration_x} | {record.a_vibration_y} |{" "}
            {record.a_vibration_z}
          </Text>
        );
      },
    },
  ];
  // }


  const tabStyles = (key) => ({
    textAlign: "center",
    border: "1px solid grey",
    padding: "10px",
    backgroundColor: activeTab === key ? "#0E45B6" : "white",
  });

  function getCurrentData(value) {
    var val = value !== "" ? value : PointMachineId;
    setloading(true);
    // setPageload(true);
    axiosClient
      .get(
        "/pointmachine/getstationpointmachinecurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&pointmachineid=" +
        val
      )
      .then((response) => {
        setloading(false);
        // setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setRealTimePointMachineData(response.data.data);
        }
      })
      .catch((err) => {
        setloading(false);
        // setPageload(false);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  }

  function getCurrentAlert() {
    setloading(true);
    // setPageload(true);
    axiosClient
      .get(
        "/pointmachine/getstationpointmachinecurrentalert?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&pointmachineid=" +
        PointMachineId
      )
      .then((response) => {
        setloading(false);
        // setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimeAlertPageTotal(response.data.totaldatacount);
          setRealTimeAlertPageNo(response.data.page);
          setRealTimePointMachineAlert(response.data.data);
        }
      })
      .catch((err) => {
        setloading(false);
        // setPageload(false);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  }

  function getPointDataLogs() {
    setloading(true);
    // setPageload(true);
    axiosClient
      .get(
        "/pointmachine/getstationpointmachinedata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&pointmachineid=" +
        PointMachineId
      )
      .then((response) => {
        // setPageload(false);
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setPointMachineData(response.data.data);
        } else {
          message.error(response.data.msg);
          // setPageload(false);
        }
      })
      .catch((err) => {
        setloading(false);
        // setPageload(false);
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  }

  function getPointAlertLogs() {
    setloading(true);
    // setPageload(true);
    axiosClient
      .get(
        "/pointmachine/getstationpointmachinealert?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&pointmachineid=" +
        PointMachineId
      )
      .then((response) => {
        // setPageload(false);
        if (response.data.issuccess === true) {
          setAlertPageTotal(response.data.totaldatacount);
          setAlertPageNo(response.data.page);
          setloading(false);
          setPointMachineAlert(response.data.data);
        } else {
          message.error(response.data.msg);
          // setPageload(false);
        }
      })
      .catch((err) => {
        setloading(false);
        // setPageload(false);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
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
  };

  function HandleDatePicker(start, end, page, size, msg) {
    if (msg === "Data") {
      setloading(true);
      // setPageload(true);
      axiosClient
        .get(
          "/pointmachine/getstationpointmachinedata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&pointmachineid=" +
          PointMachineId
        )
        .then((response) => {
          // setPageload(false);
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setPointMachineData(response.data.data);
          } else {
            message.error(response.data.msg);
            // setPageload(false);
          }
        })
        .catch((err) => {
          //console.log("errr", err);
          // setPageload(false);
          if (err.status === 0) {
            message.error("Server error");
          } else {
            message.error(err.msg);
          }
        });
    } else {
      setloading(true);
      // setPageload(true);
      axiosClient
        .get(
          "/pointmachine/getstationpointmachinealert?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&pointmachineid=" +
          PointMachineId
        )
        .then((response) => {
          // setPageload(false);
          if (response.data.issuccess === true) {
            setAlertPageTotal(response.data.totaldatacount);
            setAlertPageNo(response.data.page);
            setloading(false);
            setPointMachineAlert(response.data.data);
          } else {
            setloading(false);
            // setPageload(false);
            message.error(response.data.msg);
          }
        })
        .catch((err) => {
          //console.log("errr", err);
          // setPageload(false);
          setloading(false);
          if (err.status === 0) {
            message.error("Server error");
          } else {
            message.error(err.msg);
          }
        });
    }
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
    // setPageload(true);
    axiosClient
      .get(
        "/pointmachine/downloadpointmachinedatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&pointmachineid=" +
        PointMachineId,
        { responseType: "blob" }
      )
      .then((r) => {
        // setReportData(r.data.data);
        //console.log("res exxxxxx", r);
        if (r.status === 200) {
          var blob = new Blob([r.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const showTime = moment().format('YYYY-MMM-DD_HH_mm_ss')
          FileSaver.saveAs(blob, "PointMachineDateReport_" + showTime + ".xlsx");
          setdatareportloading(false);
          // setPageload(false);
        }
        else {
          // setPageload(false);
          message.error("Data not found");
        }
      })
      .catch((err) => {
        setdatareportloading(false);
        // setPageload(false);
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
    // setPageload(true);
    axiosClient
      .get(
        "/pointmachine/downloadpointmachinealertreport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&pointmachineid=" +
        PointMachineId,
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
          FileSaver.saveAs(blob, "PointMachineAlertReport_" + showTime + ".xlsx");
          setalertreportloading(false);
          // setPageload(false);
        }
        else {
          // setPageload(false);
          message.error("Data not found");
        }
      })
      .catch((err) => {
        setalertreportloading(false);
        // setPageload(false);
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
    if (date !== null) {
      setgraphSingleDatepicker(date.format("YYYY-MM-DD"));
    } else {
      message.info("Please select the date");
    }
  };

  function HanldeTimePicker(time) {
    setgraphTimepicker(time);
  };

  function HandleTime() {
    if (graphTimepicker.length > 0 && graphTimepicker[0] != null && graphTimepicker[1] != null) {
      const date = graphSingleDatepicker;
      const Fromtime = graphTimepicker[0].format("HH:mm");
      const Totime = graphTimepicker[1].format("HH:mm");

      axiosClient
        .get(
          "/pointmachine/getstationpointmachinedatagraph?date=" +
          date +
          "&&from_time=" +
          Fromtime +
          "&&to_time=" +
          Totime +
          "&&stationid=" +
          station_id +
          "&&pointmachineid=" +
          PointMachineId
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            //console.log(response.data.data);
            // setloading(false);
            setPointMachineGraphData(response.data.data);
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
    } else {
      message.info("Please Select the date and time for graph view data")
    }
  };

  const getRelayList = async () => {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationassertrelay?stationid=" +
        station_id +
        "&&assertsid=" + 1 +
        "&&assertid=" +
        PointMachineId
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

  function getPointDashboardData() {
    setPageload(true);
    axiosClient
      .get(
        "/pointmachine/getstationpointmachinefinaldata?stationid=" +
        station_id +
        "&&pointmachineid=" +
        PointMachineId
      )
      .then((response) => {
        setPageload(false);
        if (response.data.issuccess === true) {
          setRealTimePointDashboardData(response.data.data)                 
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

  function PointMachineDashboard(){
    return (
      <div className="PMparent-div">
      <div className="PMFrame1" >
        <div className="PMRectangle1" />
        <div className="PMRectangle2" ></div>
        <div className="PMRectangle3" />
        <div className="PMRectangle4" />
        <div className="PMEiBits" >EI BITS</div>
        <div className="PMRelayRoomDlBits">RELAY ROOM(DL BITS)</div>
        {/* <div className="PMPoint50" >POINT-50</div> */}
        <div className="PMLocationBox7" >LOCATION BOX</div>
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
        <div className="NwkrVoltage_2">xx</div>
        <div className="V111710">v {moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="V111710_1">v {moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="V111710_2">xx</div>
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
        <div className="PMValue PMValue_0">{RealTimePointDashboardData.a_direction == "Normal" ? RealTimePointDashboardData?.a_current_avg : 0}</div>
        <div className="PMValue PMValue_1">{RealTimePointDashboardData.a_direction == "Reverse" ? RealTimePointDashboardData?.a_current_avg : 0}</div>
        <div className="PMValue PMValue_2">{RealTimePointDashboardData.b_direction == "Normal" ? RealTimePointDashboardData?.b_current_avg : 0}</div>
        <div className="PMValue PMValue_3">{RealTimePointDashboardData.a_direction == "Normal" ? RealTimePointDashboardData?.a_voltage : 0}</div>
        <div className="PMValue PMValue_4">{RealTimePointDashboardData?.a_direction == "Reverse" ? RealTimePointDashboardData?.a_voltage : 0}</div>
        <div className="PMValue PMValue_5">{RealTimePointDashboardData?.b_direction == "Reverse" ? RealTimePointDashboardData?.b_current_avg : 0}</div>
        <div className="PMValue PMValue_6">{RealTimePointDashboardData?.b_direction == "Reverse" ? RealTimePointDashboardData?.b_voltage : 0}</div>
        <div className="PMValue PMValue_7">{RealTimePointDashboardData?.b_direction == "Normal" ? RealTimePointDashboardData?.b_voltage : 0}</div>
        <div className="PMValue_8">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_9">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_10">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_11">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_12">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_13">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_14">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
        <div className="PMValue_15">{moment(RealTimePointDashboardData?.createddate).format("HH:mm:ss")}</div>
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


  return (
    <Layout style={{ height: "80vh" }}>
      <Content style={{ minHeight: "80vh", padding: "1%" }}>
        <Row style={{ margin: "10px" }}>
          <Col span={24}>
            <Row gutter={[8, 32]} >
              {PointMachineList && PointMachineList.length > 0 ? (
                PointMachineList.map((item, id) => (
                  <Col
                    xs={{ span: 22, offset: 2 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 10, offset: 0 }}
                    lg={{ span: 10, offset: 0 }}
                    xl={{ span: 4, offset: 0 }}

                  >

                    <Card key={item.id}
                      style={{ width: "100%", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }} id="pointCard" onClick={() => { onclickCard(item) }}>
                      <Row justify="center" align="middle" className="padding">
                        <Col>
                          <Row style={{ justifyContent: "center" }}>
                            <span className="badge" style={{ padding: "3px" }}>
                              C
                            </span>
                          </Row>
                          <Row className="padding">
                            <span>
                              <ImArrowUp
                                className="arrow-icon"
                                style={item.a_direction === 'No Direction' ? { color: "#66FF00" } : { color: "#303331" }}
                              />
                            </span>
                          </Row>
                        </Col>
                      </Row>
                      <Row justify="space-around" className="padding">
                        <Col>
                          {" "}
                          <span className="badge" style={{ padding: "3px" }}>
                            N
                          </span>
                        </Col>
                        <Col className="padding">
                          <ImArrowLeft
                            className="arrow-icon"
                            style={item.a_direction === 'Normal' ? { color: "#66FF00" } : { color: "#303331" }}
                          />
                        </Col>

                        <Col>
                          <Row justify="center" align="middle" style={{ padding: "3px" }}>
                            <FaCircle
                              className="circle-icon"
                              style={{ fontSize: "16px", color: "black", margin: "5px" }}
                            />
                          </Row>
                        </Col>
                        <Col className="padding">
                          <ImArrowRight
                            className="arrow-icon"
                            style={item.a_direction === 'Reverse' ? { color: "#66FF00" } : { color: "#303331" }}
                          />
                        </Col>
                        <Col>
                          {" "}
                          <span className="badge" style={{ padding: "3px" }}>
                            R
                          </span>
                        </Col>
                      </Row>
                      <div className="AssertAlert">
                        <div className={item.modeid === 3 ? "redColor" : item.modeid === 2 ? "orangeColor" : item.modeid === 1 ? "yellowColor" : "AssertAlert"}>
                          <Row>
                            <Col
                              span={8}
                              style={{ textAlign: "start", fontSize: "18px", padding: "10px", fontWeight: "900" }}>
                              {item.pointmachinename}
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

              )
              }
            </Row>
          </Col>
        </Row>
        <div>
          {OpenModal ?
            <Modal
              title={'Point Machine- ' + PointMachineName + ' @' + station_name}
              onOk={handleOk}
              onCancel={handleCancel}
              open={OpenModal}
              width={1400}
              footer={null}
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
                              loading={datareportloading}
                              columns={getrealtimedataColumns()}
                              dataSource={RealTimePointMachineData}
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
                              dataSource={RealTimePointMachineAlert}
                            />
                          </ConfigProvider>
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
                                  {PointMachineData.length > 0 ? <>
                                    <tp title="Dowload Data Logs">
                                      <Button
                                        loading={
                                          loading
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
                              loading={loading}
                              columns={getdatalogsColumns()}
                              dataSource={PointMachineData}
                              pagination={{
                                pageSize: 10,
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
                                  {PointMachineAlert.length > 0 ? <>
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
                              dataSource={PointMachineAlert}
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
                                  relayList.filter((data) => data.assertsid === 1).map((item, id) => (
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
                          {/* <DashboardPoint PointMachineId={PointMachineId} socketData={RealTimePointMachineDashboardData} /> */}
                          {RealTimePointDashboardData != null ? PointMachineDashboard() : <></>}      
                        </div>
                      )}
                      {activeTab === "4" && (
                        <div className="content active">
                          <div>
                            {/* <Table
                              id="graphTable"
                              columns={getrealtimedataColumns()}
                              // dataSource={RealTimePointMachineData}
                               /> */}
                            <ReactApexChart
                              options={chartOptions}
                              series={chartOptions.series}
                              type="line"
                              height={350}
                              width="100%"
                              key={Math.random()}
                            />
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
export default PointMachineTab;



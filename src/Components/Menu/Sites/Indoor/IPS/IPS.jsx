import "./IPS.css";
import "./IPS_New.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, Row, Col, Card, message, Modal, Typography, Tooltip, Table, ConfigProvider, Form, DatePicker, Button, Empty } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { size } from "lodash";
import { ips_data } from "../../../../../features/Notification";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../../../Authentication/ApiCall";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import { InfoCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import * as FileSaver from "file-saver";
import dayjs from "dayjs";
const { Option } = Select;
const { Text } = Typography;
const IPS = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const station_id = queryParams.get('station_id');
  const station_name = queryParams.get('station_name');

  const [RealTimeIPSData, setRealTimeIPSData] = useState([]);
  const [RealTimeIPSAlert, setRealTimeIPSAlert] = useState([]);
  const [IPSData, setIPSData] = useState([]);
  const [IPSAlert, setIPSAlert] = useState([]);
  const [Pageload, setPageload] = useState(false);
  const [IpsId, setIpsId] = useState();
  const [IPSName, setIPSName] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [datastartDatepicker, setDatastartDatepicker] = useState();
  const [dataendDatepicker, setDataendDatepicker] = useState();
  const [DataPageTotal, setDataPageTotal] = useState(10);
  const [DataPageNo, setDataPageNo] = useState(1);
  const [datareportloading, setdatareportloading] = useState(false);
  const [alertreportloading, setalertreportloading] = useState(false);
  const [NoDataFound, setNoDataFound] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [RealTimeDataPageTotal, setRealTimeDataPageTotal] = useState(10);
  const [RealTimeAlertPageTotal, setRealTimeAlertPageTotal] = useState(10);
  const [RealTimeDataPageNo, setRealTimeDataPageNo] = useState(1);
  const [RealTimeAlertPageNo, setRealTimeAlertPageNo] = useState(1);
  const [alertstartDatepicker, setAlertstartDatepicker] = useState();
  const [alertendDatepicker, setAlertendDatepicker] = useState();
  const [AlertPageTotal, setAlertPageTotal] = useState(10);
  const [AlertPageNo, setAlertPageNo] = useState(1);
  const [form] = Form.useForm();

  const dateFormat = "YYYY-MM-DD";
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const socket_data = useSelector(
    (state) => state?.ips_data?.ipsdata
  );

  if (socket_data?.data.length > 0) {
    var index = RealTimeIPSData.findIndex(x => x.ipsid === socket_data.data[0].data_logs.IpsId)
    if (index != -1) {
      RealTimeIPSData[index].ips_terminal = socket_data.data[0].data_logs.ips_terminal
      RealTimeIPSData[index].track_voltage_cbf = socket_data.data[0].data_logs.track_voltage_cbf
      RealTimeIPSData[index].track_voltage_mtp = socket_data.data[0].data_logs.track_voltage_mtp
      RealTimeIPSData[index].signal_voltage_cbf = socket_data.data[0].data_logs.signal_voltage_cbf
      RealTimeIPSData[index].signal_voltage_mtp = socket_data.data[0].data_logs.signal_voltage_mtp
      RealTimeIPSData[index].b110_vdc = socket_data.data[0].data_logs.b110_vdc
      RealTimeIPSData[index].ext_relay_voltage_cbf = socket_data.data[0].data_logs.ext_relay_voltage_cbf
      RealTimeIPSData[index].ext_relay_voltage_mtp = socket_data.data[0].data_logs.ext_relay_voltage_mtp
      RealTimeIPSData[index].block_voltage_cbf = socket_data.data[0].data_logs.block_voltage_cbf
      RealTimeIPSData[index].block_voltage_mtp = socket_data.data[0].data_logs.block_voltage_mtp
      RealTimeIPSData[index].block_line_bat_voltage_cbf = socket_data.data[0].data_logs.block_line_bat_voltage_cbf
      RealTimeIPSData[index].block_line_bat_voltage_mtp = socket_data.data[0].data_logs.block_line_bat_voltage_mtp
      RealTimeIPSData[index].axle_counter_voltage_cbf = socket_data.data[0].data_logs.axle_counter_voltage_cbf
      RealTimeIPSData[index].axle_counter_voltage_mtp = socket_data.data[0].data_logs.axle_counter_voltage_mtp
      RealTimeIPSData[index].lvr_vdc = socket_data.data[0].data_logs.lvr_vdc
      RealTimeIPSData[index].axle_counter_voltage_cbf_1 = socket_data.data[0].data_logs.axle_counter_voltage_cbf_1
      RealTimeIPSData[index].track_current_cbf = socket_data.data[0].data_logs.track_current_cbf
      RealTimeIPSData[index].track_current_mtp = socket_data.data[0].data_logs.track_current_mtp
      RealTimeIPSData[index].signal_current_cbf = socket_data.data[0].data_logs.signal_current_cbf
      RealTimeIPSData[index].signal_current_mtp = socket_data.data[0].data_logs.signal_current_mtp
      RealTimeIPSData[index].b110_idc = socket_data.data[0].data_logs.b110_idc
      RealTimeIPSData[index].ext_relay_current_cbf = socket_data.data[0].data_logs.ext_relay_current_cbf
      RealTimeIPSData[index].ext_relay_current_mtp = socket_data.data[0].data_logs.ext_relay_current_mtp
      RealTimeIPSData[index].block_current_cbf = socket_data.data[0].data_logs.block_current_cbf
      RealTimeIPSData[index].block_current_mtp = socket_data.data[0].data_logs.block_current_mtp
      RealTimeIPSData[index].block_line_bat_current_cbf = socket_data.data[0].data_logs.block_line_bat_current_cbf
      RealTimeIPSData[index].block_line_bat_current_mtp = socket_data.data[0].data_logs.block_line_bat_current_mtp
      RealTimeIPSData[index].axle_counter_current_cbf = socket_data.data[0].data_logs.axle_counter_current_cbf
      RealTimeIPSData[index].lvr_idc = socket_data.data[0].data_logs.lvr_idc
      RealTimeIPSData[index].axle_counter_current_cbf_1 = socket_data.data[0].data_logs.axle_counter_current_cbf_1
      RealTimeIPSData[index].internal_relay_signal_voltage_cbf_oc = socket_data.data[0].data_logs.internal_relay_signal_voltage_cbf_oc
      RealTimeIPSData[index].internal_relay_signal_voltage_cbf_ic = socket_data.data[0].data_logs.internal_relay_signal_voltage_cbf_ic
      RealTimeIPSData[index].internal_relay_signal_voltage_mtp_oc = socket_data.data[0].data_logs.internal_relay_signal_voltage_mtp_oc
      RealTimeIPSData[index].internal_relay_signal_voltage_mtp_ic = socket_data.data[0].data_logs.internal_relay_signal_voltage_mtp_ic
      RealTimeIPSData[index].point_machine_voltage_ic = socket_data.data[0].data_logs.point_machine_voltage_ic
      RealTimeIPSData[index].point_machine_voltage_cbf_oc = socket_data.data[0].data_logs.point_machine_voltage_cbf_oc
      RealTimeIPSData[index].point_machine_voltage_mtp_oc = socket_data.data[0].data_logs.point_machine_voltage_mtp_oc
      RealTimeIPSData[index].internal_relay_signal_current_cbf_oc = socket_data.data[0].data_logs.internal_relay_signal_current_cbf_oc
      RealTimeIPSData[index].internal_relay_signal_current_cbf_ic = socket_data.data[0].data_logs.internal_relay_signal_current_cbf_ic
      RealTimeIPSData[index].internal_relay_signal_current_mtp_ic = socket_data.data[0].data_logs.internal_relay_signal_current_mtp_ic
      RealTimeIPSData[index].internal_relay_signal_current_mtp_oc = socket_data.data[0].data_logs.internal_relay_signal_current_mtp_oc
      RealTimeIPSData[index].point_machine_current_ic = socket_data.data[0].data_logs.point_machine_current_ic
      RealTimeIPSData[index].point_machine_current_cbf_oc = socket_data.data[0].data_logs.point_machine_current_cbf_oc
      RealTimeIPSData[index].point_machine_current_mtp_oc = socket_data.data[0].data_logs.point_machine_current_mtp_oc
      RealTimeIPSData[index].local_main_power_voltage_ic = socket_data.data[0].data_logs.local_main_power_voltage_ic
      RealTimeIPSData[index].local_main_power_voltage_oc = socket_data.data[0].data_logs.local_main_power_voltage_oc
      RealTimeIPSData[index].load_current_ic = socket_data.data[0].data_logs.load_current_ic
      RealTimeIPSData[index].load_current_oc = socket_data.data[0].data_logs.load_current_oc
      RealTimeIPSData[index].createddate = socket_data.data[0].data_logs.createddate
    }
    else {
      RealTimeIPSData.push({
        id: socket_data.data[0].data_logs.ipsid,
        ips_terminal: socket_data.data[0].data_logs.ips_terminal,
        track_voltage_cbf: socket_data.data[0].data_logs.track_voltage_cbf,
        track_voltage_mtp: socket_data.data[0].data_logs.track_voltage_mtp,
        signal_voltage_cbf: socket_data.data[0].data_logs.signal_voltage_cbf,
        signal_voltage_mtp: socket_data.data[0].data_logs.signal_voltage_mtp,
        b110_vdc: socket_data.data[0].data_logs.b110_vdc,
        ext_relay_voltage_cbf: socket_data.data[0].data_logs.ext_relay_voltage_cbf,
        ext_relay_voltage_mtp: socket_data.data[0].data_logs.ext_relay_voltage_mtp,
        block_voltage_cbf: socket_data.data[0].data_logs.block_voltage_cbf,
        block_voltage_mtp: socket_data.data[0].data_logs.block_voltage_mtp,
        block_line_bat_voltage_cbf: socket_data.data[0].data_logs.block_line_bat_voltage_cbf,
        block_line_bat_voltage_mtp: socket_data.data[0].data_logs.block_line_bat_voltage_mtp,
        axle_counter_voltage_cbf: socket_data.data[0].data_logs.axle_counter_voltage_cbf,
        axle_counter_voltage_mtp: socket_data.data[0].data_logs.axle_counter_voltage_mtp,
        lvr_vdc: socket_data.data[0].data_logs.lvr_vdc,
        axle_counter_voltage_cbf_1: socket_data.data[0].data_logs.axle_counter_voltage_cbf_1,
        track_current_cbf: socket_data.data[0].data_logs.track_current_cbf,
        track_current_mtp: socket_data.data[0].data_logs.track_current_mtp,
        signal_current_cbf: socket_data.data[0].data_logs.signal_current_cbf,
        signal_current_mtp: socket_data.data[0].data_logs.signal_current_mtp,
        b110_idc: socket_data.data[0].data_logs.b110_idc,
        ext_relay_current_cbf: socket_data.data[0].data_logs.ext_relay_current_cbf,
        ext_relay_current_mtp: socket_data.data[0].data_logs.ext_relay_current_mtp,
        block_current_cbf: socket_data.data[0].data_logs.block_current_cbf,
        block_current_mtp: socket_data.data[0].data_logs.block_current_mtp,
        block_line_bat_current_cbf: socket_data.data[0].data_logs.block_line_bat_current_cbf,
        block_line_bat_current_mtp: socket_data.data[0].data_logs.block_line_bat_current_mtp,
        axle_counter_current_cbf: socket_data.data[0].data_logs.axle_counter_current_cbf,
        axle_counter_current_mtp: socket_data.data[0].data_logs.axle_counter_current_mtp,
        lvr_idc: socket_data.data[0].data_logs.lvr_idc,
        axle_counter_current_cbf_1: socket_data.data[0].data_logs.axle_counter_current_cbf_1,
        internal_relay_signal_voltage_cbf_oc: socket_data.data[0].data_logs.internal_relay_signal_voltage_cbf_oc,
        internal_relay_signal_voltage_cbf_ic: socket_data.data[0].data_logs.internal_relay_signal_voltage_cbf_ic,
        internal_relay_signal_voltage_mtp_oc: socket_data.data[0].data_logs.internal_relay_signal_voltage_mtp_oc,
        internal_relay_signal_voltage_mtp_ic: socket_data.data[0].data_logs.internal_relay_signal_voltage_mtp_ic,
        point_machine_voltage_ic: socket_data.data[0].data_logs.point_machine_voltage_ic,
        point_machine_voltage_cbf_oc: socket_data.data[0].data_logs.point_machine_voltage_cbf_oc,
        point_machine_voltage_mtp_oc: socket_data.data[0].data_logs.point_machine_voltage_mtp_oc,
        internal_relay_signal_current_cbf_oc: socket_data.data[0].data_logs.internal_relay_signal_current_cbf_oc,
        internal_relay_signal_current_cbf_ic: socket_data.data[0].data_logs.internal_relay_signal_current_cbf_ic,
        internal_relay_signal_current_mtp_ic: socket_data.data[0].data_logs.internal_relay_signal_current_mtp_ic,
        internal_relay_signal_current_mtp_oc: socket_data.data[0].data_logs.internal_relay_signal_current_mtp_oc,
        point_machine_current_ic: socket_data.data[0].data_logs.point_machine_current_ic,
        point_machine_current_cbf_oc: socket_data.data[0].data_logs.point_machine_current_cbf_oc,
        point_machine_current_mtp_oc: socket_data.data[0].data_logs.point_machine_current_mtp_oc,
        local_main_power_voltage_ic: socket_data.data[0].data_logs.local_main_power_voltage_ic,
        local_main_power_voltage_oc: socket_data.data[0].data_logs.local_main_power_voltage_oc,
        load_current_ic: socket_data.data[0].data_logs.load_current_ic,
        load_current_oc: socket_data.data[0].data_logs.load_current_oc,
        createddate: socket_data.data[0].data_logs.createddate,
        isdele: socket_data.data[0].data_logs.isdele
      })
    }
    dispatch(ips_data({ data: [] }));
  }

  function getIpsData() {
    setPageload(true);
    axiosClient
      .get("/ips/getstationips?stationid=" + station_id)
      .then((response) => {
        if (response.data.issuccess === true) {
          if (response.data.data.length > 0) {
            setRealTimeIPSData(response.data.data);
            setIpsId(response.data.data[0].ipsid)
            setIPSName(response.data.data[0].ipsname)
          }
          else {
            message.success("No data found");
            setNoDataFound(true);
          }
          setPageload(false);
        } else {
          message.error("Something went wrong");
          setPageload(false);
        }
      })
      .catch((err) => {
        setPageload(false);
        if (err.status === 0) {
          message.error("Server Error !!!");
        } else {
          message.error(err.msg);
        }
      });
  }

  useEffect(() => {
    getIpsData();
  }, [])


  const handleTabClick = (key) => {
    setActiveTab(key);
    if (key === "1") {
      getCurrentData();
    } else if (key === "2") {
      getCurrentAlert();
    } else if (key === "3") {
      getIPSDataLogs();
    } else if (key === "4") {
      getIPSAlerLogs();
    }

  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

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
      title: "Track(V) CBF",
      dataIndex: "track_voltage_cbf",
      key: "track_voltage_cbf",
    },
    {
      title: "Track(V) MTP",
      dataIndex: "track_voltage_mtp",
      key: "track_voltage_mtp",
    },
    {
      title: "Signal(V) CBF",
      dataIndex: "signal_voltage_cbf",
      key: "signal_voltage_cbf",
    },
    {
      title: "Signal(V) MTP",
      dataIndex: "signal_voltage_mtp",
      key: "signal_voltage_mtp",
    },
    {
      title: "B110(Vdc)",
      dataIndex: "b110_vdc",
      key: "b110_vdc",
    },
    {
      title: "EXT Relay(V) CBF",
      dataIndex: "ext_relay_voltage_cbf",
      key: "ext_relay_voltage_cbf",
    },
    {
      title: "EXT Relay(V) MTP",
      dataIndex: "ext_relay_voltage_mtp",
      key: "ext_relay_voltage_mtp",
    },
    {
      title: "Block(V) CBF",
      dataIndex: "block_voltage_cbf",
      key: "block_voltage_cbf",
    },
    {
      title: "Block(V) MTP",
      dataIndex: "block_voltage_mtp",
      key: "block_voltage_mtp",
    },
    {
      title: "BLB(V) CBF",
      dataIndex: "block_line_bat_voltage_cbf",
      key: "block_line_bat_voltage_cbf",
    },
    {
      title: "BLB(V) MTP",
      dataIndex: "block_line_bat_voltage_mtp",
      key: "block_line_bat_voltage_mtp",
    },
    {
      title: "AxleCounter(V) CBF",
      dataIndex: "axle_counter_voltage_cbf",
      key: "axle_counter_voltage_cbf",
    },
    {
      title: "AxleCounter(V) MTP",
      dataIndex: "axle_counter_voltage_mtp",
      key: "axle_counter_voltage_mtp",
    },
    {
      title: "LVR (VDC)",
      dataIndex: "lvr_vdc",
      key: "lvr_vdc",
    },
    {
      title: "AxleCounter(V) CBF 1",
      dataIndex: "axle_counter_voltage_cbf_1",
      key: "axle_counter_voltage_cbf_1",
    },
    {
      title: "Track(I) CBF",
      dataIndex: "track_current_cbf",
      key: "track_current_cbf",
    },
    {
      title: "Track(I) MTP",
      dataIndex: "track_current_mtp",
      key: "track_current_mtp",
    },
    {
      title: "Signal(I) CBF",
      dataIndex: "signal_current_cbf",
      key: "signal_current_cbf",
    },
    {
      title: "Signal(I) MTP",
      dataIndex: "signal_current_mtp",
      key: "signal_current_mtp",
    },
    {
      title: "B110(Idc)",
      dataIndex: "b110_idc",
      key: "b110_idc",
    },
    {
      title: "EXT Relay(I) CBF",
      dataIndex: "ext_relay_current_cbf",
      key: "ext_relay_current_cbf",
    },
    {
      title: "EXT Relay(I) MTP",
      dataIndex: "ext_relay_current_mtp",
      key: "ext_relay_current_mtp",
    },
    {
      title: "Block(I) CBF",
      dataIndex: "block_current_cbf",
      key: "block_current_cbf",
    },
    {
      title: "Block(I) MTP",
      dataIndex: "block_current_mtp",
      key: "block_current_mtp",
    },
    {
      title: "BLB(I) CBF",
      dataIndex: "block_line_bat_current_cbf",
      key: "block_line_bat_current_cbf",
    },
    {
      title: "BLB(I) MTP",
      dataIndex: "block_line_bat_current_mtp",
      key: "block_line_bat_current_mtp",
    },
    {
      title: "AxleCounter(I) CBF",
      dataIndex: "axle_counter_current_cbf",
      key: "axle_counter_current_cbf",
    },
    {
      title: "AxleCounter(I) MTP",
      dataIndex: "axle_counter_current_mtp",
      key: "axle_counter_current_mtp",
    },
    {
      title: "AxleCounter(I) CBF 1",
      dataIndex: "axle_counter_current_cbf_1",
      key: "axle_counter_current_cbf_1",
    },
    {
      title: "IRS(V) CBF OC",
      dataIndex: "internal_relay_signal_voltage_cbf_oc",
      key: "internal_relay_signal_voltage_cbf_oc",
    },
    {
      title: "IRS(V) CBF IC",
      dataIndex: "internal_relay_signal_voltage_cbf_ic",
      key: "internal_relay_signal_voltage_cbf_ic",
    },
    {
      title: "IRS(V) MTP OC",
      dataIndex: "internal_relay_signal_voltage_mtp_oc",
      key: "internal_relay_signal_voltage_mtp_oc",
    },
    {
      title: "IRS(V) MTP IC",
      dataIndex: "internal_relay_signal_voltage_mtp_ic",
      key: "internal_relay_signal_voltage_mtp_ic",
    },
    {
      title: "Point(V) IC",
      dataIndex: "point_machine_voltage_ic",
      key: "point_machine_voltage_ic",
    },
    {
      title: "Point(V) CBF IC",
      dataIndex: "point_machine_voltage_cbf_oc",
      key: "point_machine_voltage_cbf_oc",
    },
    {
      title: "Point(V) MTP OC",
      dataIndex: "point_machine_voltage_mtp_oc",
      key: "point_machine_voltage_mtp_oc",
    },
    {
      title: "IRS(I) CBF OC",
      dataIndex: "internal_relay_signal_current_cbf_oc",
      key: "internal_relay_signal_current_cbf_oc",
    },
    {
      title: "IRS(I) CBF IC",
      dataIndex: "internal_relay_signal_current_cbf_ic",
      key: "internal_relay_signal_current_cbf_ic",
    },
    {
      title: "IRS(I) MTP IC",
      dataIndex: "internal_relay_signal_current_mtp_ic",
      key: "internal_relay_signal_current_mtp_ic",
    },
    {
      title: "IRS(I) MTP OC",
      dataIndex: "internal_relay_signal_current_mtp_oc",
      key: "internal_relay_signal_current_mtp_oc",
    },
    {
      title: "Pointmachine(I) IC",
      dataIndex: "point_machine_current_ic",
      key: "point_machine_current_ic",
    },
    {
      title: "Pointmachine(I) CBF OC",
      dataIndex: "point_machine_current_cbf_oc",
      key: "point_machine_current_cbf_oc",
    },
    {
      title: "Pointmachine(I) MTP OC",
      dataIndex: "point_machine_current_mtp_oc",
      key: "point_machine_current_mtp_oc",
    },
    {
      title: "LMP(V) IC",
      dataIndex: "local_main_power_voltage_ic",
      key: "local_main_power_voltage_ic",
    },
    {
      title: "LMP(V) OC",
      dataIndex: "local_main_power_voltage_oc",
      key: "local_main_power_voltage_oc",
    },
    {
      title: "Load(I) IC",
      dataIndex: "load_current_ic",
      key: "load_current_ic",
    },
    {
      title: "Load(I) OC",
      dataIndex: "load_current_oc",
      key: "load_current_oc",
    },


  ];

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

  const onClickopenModal = () => {
    setOpenModal(true);
    setActiveTab("1");
    getCurrentData()
  }

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
    setDatastartDatepicker(startDate);
    setDataendDatepicker(endDate);

    HandleDatePicker(startDate, endDate, 1, 10, "Data");
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

    setAlertstartDatepicker(startDate);
    setAlertendDatepicker(endDate);

    HandleDatePicker(startDate, endDate, 1, 10, "Alert");
  };

  const HandleDatePicker = (start, end, page, size, msg) => {
    if (msg === "Data") {
      setloading(true);
      axiosClient
        .get(
          "/ips/getstationipsdata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&ipsid=" +
          IpsId
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setIPSData(response.data.data);
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
    else {
      setloading(true);
      axiosClient
        .get(
          "/ips/getstationipsalert?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&ipsid=" +
          IpsId
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setAlertPageTotal(response.data.totaldatacount);
            setAlertPageNo(response.data.page);
            setloading(false);
            setIPSAlert(response.data.data);
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
        })
    }
  };

  const ReportDownloadData = () => {
    var start = datastartDatepicker ? datastartDatepicker : "";
    var end = dataendDatepicker ? dataendDatepicker : "";
    setdatareportloading(true);
    axiosClient
      .get(
        "/ips/downloadipsdatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&ipsid=" +
        IpsId,
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
          FileSaver.saveAs(blob, "IPSDateReport" + showTime + ".xlsx");
          setdatareportloading(false);
        }
        else {
          message.error("Data not found");
          setdatareportloading(false);
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
        "/ips/downloadbipsalertreport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&ipsif=" +
        IpsId,
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
            "IPSAlertReport_" + showTime + ".xlsx"
          );
          setalertreportloading(false);
        }
        else {
          setdatareportloading(false);
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

  function getCurrentData() {
    axiosClient
      .get(
        "/ips/getstationipscurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&ipsid=" +
        IpsId
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setRealTimeIPSData(response.data.data);
        } else {
          message.success("No data found");
          setNoDataFound(true);
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
        "/ips/getstationipscurrentalert?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&ipsid=" +
        IpsId
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeAlertPageTotal(response.data.totaldatacount);
          setRealTimeAlertPageNo(response.data.page);
          setRealTimeIPSAlert(response.data.data);
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

  function getIPSDataLogs() {
    setloading(true);
    axiosClient
      .get(
        "/ips/getstationipsdata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&ipsid=" +
        IpsId
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setIPSData(response.data.data);
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

  function getIPSAlerLogs() {
    setloading(true);
    axiosClient
      .get(
        "/ips/getstationipsalert?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&ipsid=" +
        IpsId
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setAlertPageTotal(response.data.totaldatacount);
          setAlertPageNo(response.data.page);
          setloading(false);
          setIPSAlert(response.data.data);
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

  return (
    <>
      {RealTimeIPSData.length > 0 ? (
        <div>
          {/* above div className="ipsDiv" is not required now, in future we can use*/}
          <Row className="dateTimeDiv " gutter={[16, 16]}>
            <Col
              xs={24}
              md={{ span: 12, offset: 8 }}
              style={{ textAlign: "end", marginBottom: "60px", marginRight: "10px" }}>
              <Tooltip title="View Logs"> <span onClick={onClickopenModal}> <InfoCircleOutlined /> </span></Tooltip>
              {RealTimeIPSData.length > 0 ? <span>Last updated time : {moment(RealTimeIPSData[0].createddate).format("YYYY-MM-DD HH:mm:ss")}</span> : <></>}
            </Col>
          </Row>

          {/* Old Design */}
          <>
            <div className="IPSFrame1">
              <div className="IPSGroup1">
                <div className="IPSRectangle1"></div>
                <div className="IPSLine1"></div>
                <div className="IPSLine2"></div>
                <div className="IPSLine3"></div>
                <div className="IPSAcu">ACU</div>
                <div className="IPSRectangle2"></div>
                <div className="IPSRectangle3"></div>
                <div className="IPSRectangle4"></div>
                <div className="IPSRectangle5"></div>
                <div className="IPS132832a">
                  <span>296</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPS132832b">
                  <span>218</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPS132832c">
                  <span>242</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSLine4"></div>
                <div className="IPSRectangle6"></div>
                <div className="IPSRectangle7"></div>
                <div className="IPSRectangle8"></div>
                <div className="IPSRectangle9"></div>
                <div className="IPSRectangle10"></div>
                <div className="IPSBattery">Battery</div>
                <div className="IPSFrbc">FRBC</div>
                <div className="IPSAcdp">ACDP</div>
                <div className="IPSDcdp">DCDP</div>
                <div className="IPSPowerDistributionPanel">
                  Power Distribution Panel
                </div>
                <div className="IPSLine5"></div>
                <div className="IPSLine6"></div>
                <div className="IPSLine7"></div>
                <div className="IPSLine8"></div>
                <div className="IPSLine9"></div>
                <div className="IPSLine10"></div>
                <div className="IPSLine11"></div>
                <div className="IPSLine12"></div>
                <div className="IPSLine13"></div>
                <div className="IPSLine14"></div>
                <div className="IPSLine16"></div>

                <div className="IPSRectangle11"></div>
                <div className="IPSChargingCurrent129130646">
                  <span>Charging Current</span>
                  <span style={{ color: "#F63939", fontWeight: "800" }}>1.29</span>
                  <span>13:06:46</span>
                </div>
                <div className="IPSDischargingCurrent206130646">
                  <span>Discharging Current</span>
                  <span style={{ color: "#F81010", fontWeight: "800" }}>2.06</span>

                  <span>13:06:46</span>
                </div>
                <div className="IPSRectangle12"></div>
                <div className="IPSVAc">230v AC</div>
                <div className="IPSEllipse11"></div>

                <div className="IPSLine26"></div>
                <div className="IPSInv1">Inv-1</div>
                <div className="IPSEllipse12"></div>
                <div className="IPSLine26"></div>
                <div className="IPSInv1">Inv-1</div>
                <div className="IPSEllipse12"></div>
                <div className="IPSLine27"></div>
                <div className="IPSInv2">Inv-2</div>
                <div className="IPSEllipse13"></div>
                <div className="IPSLine28"></div>
                <div className="IPSInv3">Inv-3</div>
                <div className="IPSEllipse14"></div>
                <div className="IPSLine29"></div>
                <div className="IPSInv4">Inv-4</div>
                <div className="IPSEllipse15"></div>
                <div className="IPSDcDcConv">DC-DC conv</div>
                <div className="IPSEllipse16"></div>
                <div className="IPSLine30"></div>
                <div className="IPSSmps">SMPS</div>
                <div className="IPSEllipse17"></div>
                <div className="IPSLine31"></div>
                <div className="IPSCallST">Call S&T</div>
                <div className="IPSEllipse18"></div>
                <div className="IPSLine32"></div>
                <div className="IPSDod">50% DOD</div>
                <div className="IPSEllipse19"></div>
                <div className="IPSLine33"></div>

                <div className="IPSMains">Mains</div>
                <div className="IPSEllipse20"></div>
                <div className="IPSLine34"></div>
                <div className="IPSRectangle13"></div>

                <div className="IPSPoint124132832">
                  <span>POINT</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>124</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle14"></div>
                <div className="IPSE11124132832">
                  <span>E1-1</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>124</span>
                  <span>13:28:32</span>
                </div>

                <div
                  className="IPSRectangle15"
                  style={{ left: 268.61, top: 342.05 }}></div>
                <div
                  className="IPSE12124132832"
                  style={{ left: 275.03, top: 345.63 }}>
                  <span>E1-2</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>124</span>
                  <span>13:28:32</span>
                </div>
                <div
                  className="IPSRectangle16"
                  style={{ left: 442.11, top: 342.05 }}></div>
                <div
                  className="IPSVhf137132832"
                  style={{ left: 448.53, top: 345.63 }}>
                  <span>VHF</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>
                    13.7
                  </span>
                  <span>13:28:32</span>
                </div>

                <div className="IPSRectangle17"></div>
                <div className="IPSCtrlPhone162132832">
                  <span>CTRL PHONE</span>
                  <span style={{ color: "#F81010" }}>16.2</span>
                  <span></span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSLine35"></div>
                <div className="IPSLine36"></div>

                <div className="IPSLine37"></div>
                <div className="IPSLine38"></div>
                <div className="IPSLine39"></div>
                <div className="IPSLine40"></div>

                <div className="IPSLine41"></div>
                <div className="IPSLine42"></div>
                <div className="IPSLine43"></div>
                <div className="IPSLine44"></div>
                <div className="IPSLine45"></div>
                <div className="IPSLine46"></div>
                <div className="IPSLine47"></div>
                <div className="IPSLine48"></div>

                <div className="IPSRectangle18"></div>
                <div className="IPSBlkLineTy461132832">
                  <span>BLK LINE-TY</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>
                    46.1
                  </span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle19"></div>
                <div className="IPSBlkLineNull439132832">
                  <span>BLK LINE-NULL</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>
                    43.9
                  </span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSLine49"></div>
                <div className="IPSLine50"></div>
                <div className="IPSLine51"></div>

                <div className="IPSRectangle20"></div>
                <div className="IPSSigNill141132832">
                  <span>SIG-NILL</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>141</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle21"></div>
                <div className="IPSSigTy117132832">
                  <span>SIG-TY</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>117</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle22"></div>
                <div className="IPSTrkNill106132832">
                  <span>TRK-NILL</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>106</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle23"></div>
                <div className="IPSTrkTy107132832">
                  <span>TRK-TY</span>
                  <span style={{ color: "rgba(7.65, 92.61, 36.54, 0.91)" }}>107</span>
                  <span>13:28:32</span>
                </div>

                <div className="IPSLine52"></div>
                <div className="IPSLine53"></div>
                <div className="IPSLine54"></div>
                <div className="IPSLine55"></div>
                <div className="IPSLine56"></div>
                <div className="IPSLine57"></div>
                <div className="IPSLine58"></div>
                <div className="IPSLine59"></div>

                <div className="IPSLine60"></div>
                <div className="IPSRectangle24"></div>
                <div className="IPSRectangle25"></div>
                <div className="IPSRectangle26"></div>
                <div className="IPSRectangle27"></div>
                <div className="IPSLine61"></div>
                <div className="IPSLine62"></div>

                <div className="IPSLine63"></div>
                <div className="IPSLine64"></div>
                <div className="IPSEld">ELD</div>
                <div className="IPSEld">ELD</div>
                <div className="IPSEld">ELD</div>
                <div className="IPSEld">ELD</div>
                <div className="IPSLine65"></div>
                <div className="IPSRectangle28"></div>
                <div className="IPSLine66"></div>
                <div className="IPSEldTy">ELD-TY</div>

                <div className="IPSRectangle29"></div>
                <div className="IPSDlSupply253132832">
                  <span>DL SUPPLY</span>
                  <span>25.3</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle30"></div>
                <div className="IPSInternal132832">
                  INTERNAL <br /> 13:28:32
                </div>
                <div className="IPSRectangle31"></div>

                <div className="IPSExtNill320132832">
                  <span>EXT-NILL</span>
                  <span>32.0</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle32"></div>
                <div className="IPSExtTy315132832">
                  <span>EXT-TY</span>
                  <span>31.5</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle33"></div>
                <div className="IPSBlkNill269132832">
                  <span>BLK-NILL</span>
                  <span>26.9</span>
                  <span>13:28:32</span>
                </div>

                <div className="IPSRectangle34"></div>
                <div className="IPSBlkTy258132832">
                  <span>BLK-TY</span>
                  <span>25.8</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle35"></div>
                <div className="IPSBpacUpNill297132832">
                  <span>BPAC-UP-NILL</span>
                  <span>29.7</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle36"></div>
                <div className="IPSBpacDnNill301132832">
                  <span>BPAC-DN-NILL</span>
                  <span>30.1</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle37"></div>

                <div className="IPSBpacUpTy301132832">
                  <span>BPAC-UP-TY</span>
                  <span>30.1</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSRectangle38"></div>
                <div className="IPSBpacDnTy0132832">
                  <span>BPAC-DN-TY</span>
                  <span style={{ color: "#F81010" }}>0</span>
                  <span>13:28:32</span>
                </div>
                <div className="IPSLine67"></div>
                <div className="IPSLine68"></div>
                <div className="IPSLine69"></div>
                <div className="IPSLine70"></div>

                <div className="IPSLine71"></div>
                <div className="IPSLine72"></div>
                <div className="IPSLine73"></div>
                <div className="IPSLine74"></div>
                <div className="IPSLine75"></div>
                <div className="IPSLine76"></div>
                <div className="IPSRectangle39"></div>
                <div className="IPSRectangle40"></div>

                <div className="IPSRectangle41"></div>
                <div className="IPSRectangle42"></div>
                <div className="IPSLine77"></div>
                <div className="IPSLine78"></div>
                <div className="IPSLine79"></div>
                <div className="IPSLine80"></div>

                <div className="IPSElda">ELD</div>
                <div className="IPSEldb">ELD</div>
                <div className="IPSEldc">ELD</div>
                <div className="IPSEldd">ELD</div>
                <div className="IPSRectangle43"></div>
                <div className="IPSRectangle44"></div>
                <div className="IPSLine81"></div>
                <div className="IPSLine82"></div>

                <div className="IPSElde">ELD</div>
                <div className="IPSEldf">ELD</div>
                <div className="IPSVDca">24v DC</div>
                <div className="IPSVDcb">110v DC</div>
                <div className="IPSVDcc">12v DC</div>
                <div className="IPSVDcd">40v DC</div>
                <div className="IPSVAce">110v AC</div>
                <div className="IPSLoadCurrent183024934">
                  <span>Load Current</span>
                  <span>18.3</span>
                  <span>02:49:34</span>
                </div>
                <div className="IPSVolta">Volt</div>
                <div className="IPSVoltb">Volt</div>
                <div className="IPSVoltc">Volt</div>
              </div>
            </div>
          </>
          {/* Old Design */}


          {/* New Design */}
          <>
            <div className="IPSLine4Group1">
              <div className="IPSLine4Line1"></div>
              <div className="IPSLine4Avr_1">AVR</div>
              {/* <div className="IPSLine4110v500va_1">230/110V,500VA</div> */}
              <div className="IPSLine4Transformer">Transformer</div>


              <div className="arrow">
                <div className="arrow-shaft"></div>
                <div className="arrow-head"></div>
              </div>
              <div className="IPSLine4TrackCircuitUp">Track Circuit UP</div>
              <div className="IPSLine4Rectangle58" />
              <div className="IPSLine4Rectangle1">230/110V,500VA</div>
              <div className="IPSLine4Rectangle2" />
              <div className="IPSLine4Line2"></div>
              <div className="IPSLine4Line3"></div>
              <div className="IPSLine4Line4"></div>
              <div className="IPSLine4Rectangle3" />
              <div className="IPSLine4Rectangle4" />
              <div className="IPSLine4Kva">1 KVA</div>
              <div className="IPSLine4Line5"></div>
              <div className="IPSLine4Line6"></div>
              <div className="IPSLine4Rectangle5" />
              <div className="IPSLine40Kva">2.0 KVA</div>
              <div className="IPSLine4Line7"></div>
              <div className="IPSLine4Rectangle6" />
              <div className="IPSLine4Rectangle7" />
              <div className="IPSLine4Rectangle8" />
              <div className="IPSLine4Rectangle9" />
              <div className="IPSLine4Line8"></div>
              <div className="IPSLine4Line9"></div>
              <div className="IPSLine4Line10"></div>
              <div className="IPSLine4Line11"></div>
              <div className="IPSLine4Line12"></div>
              <div className="IPSLine4Rectangle10" />
              <div className="IPSLine4Rectangle11" />
              <div className="IPSLine4Line13"></div>
              <div className="IPSLine4Line14"></div>
              <div className="IPSLine4Line15"></div>
              <div className="IPSLine4Line16"></div>
              <div className="IPSLine4Line17"></div>
              <div className="IPSLine4Line18"></div>
              <div className="IPSLine4Line19"></div>
              <div className="IPSLine4Rectangle12" />
              <div className="IPSLine4Rectangle13" />
              <div className="IPSLine4Rectangle14" />
              <div className="IPSLine4Rectangle15" />
              <div className="IPSLine4Line20"></div>
              <div className="IPSLine4Line21"></div>
              <div className="IPSLine4Line22"></div>
              <div className="IPSLine4Line23"></div>
              <div className="IPSLine4Line24"></div>
              <div className="IPSLine4Line25"></div>
              <div className="IPSLine4Line26"></div>
              <div className="IPSLine4Line27"></div>
              <div className="IPSLine4Line28"></div>
              <div className="IPSLine4Line29"></div>
              <div className="IPSLine4Line30"></div>
              <div className="IPSLine4Line31"></div>
              <div className="IPSLine4Ellipse1" />
              <div className="IPSLine4Rectangle16" />
              <div className="IPSLine4Line32"></div>
              <div className="IPSLine4Line33"></div>
              <div className="IPSLine4Ellipse2" />
              <div className="IPSLine4Ellipse3" />
              <div className="IPSLine4Rectangle17" />
              <div className="IPSLine4Rectangle18" />
              <div className="IPSLine4LpdSpdBox">LPD & SPD BOX</div>
              <div className="IPSLine4Rectangle19" />
              <div className="IPSLine4Line34"></div>
              <div className="IPSLine4Line36"></div>
              <div className="IPSLine4Ellipse4" />
              <div className="IPSLine4Rectangle20" />
              <div className="IPSLine4StatusMonitoringPanel">
                STATUS MONITORING PANEL
              </div>
              <div className="IPSLine4AcInput">AC Input</div>
              <div className="IPSLine4Vac_1">230 VAC</div>
              <div className="IPSLine4Avr_2">AVR</div>
              <div className="IPSLine4Inverter">Inverter</div>
              <div className="IPSLine45Kva_1">1.5 KVA</div>
              <div className="IPSLine45Kva_2">1.5 KVA</div>
              <div className="IPSLine4ColdStdBy_1">COLD STD BY</div>
              <div className="IPSLine4Vdc">110VDC</div>
              <div className="IPSLine4VAc_2">230V AC</div>
              <div className="IPSLine4110v500va_2">230/110V,500VA</div>
              <div className="IPSLine4110v500va_3">230/110V,500VA</div>
              <div className="IPSLine4110v500va_4">230/110V,500VA</div>
              <div className="IPSLine4110v500va_5">230/110V,500VA</div>
              <div className="IPSLine4110v500va_6">230/110V,500VA</div>

              <div className="arrow_2">
                <div className="arrow-shaft_2"></div>
                <div className="arrow-head_2"></div>
              </div>

              <div className="arrow_3">
                <div className="arrow-shaft_3"></div>
                <div className="arrow-head_3"></div>
              </div>

              <div className="arrow_4">
                <div className="arrow-shaft_4"></div>
                <div className="arrow-head_4"></div>
              </div>

              <div className="arrow_5">
                <div className="arrow-shaft_5"></div>
                <div className="arrow-head_5"></div>
              </div>

              <div className="arrow_6">
                <div className="arrow-shaft_6"></div>
                <div className="arrow-head_6"></div>
              </div>
              <div className="IPSLine4TrackCircuitDn">Track Circuit DN</div>
              <div className="IPSLine4_101">1</div>
              <div className="IPSLine4_102">2</div>
              <div className="IPSLine4_103">1</div>
              <div className="IPSLine4_104">2</div>
              <div className="IPSLine4SignalsUp">Signals UP</div>
              <div className="IPSLine4SignalsDn">Signals DN</div>
              <div className="IPSLine4Frbc">FRBC</div>
              <div className="IPSLine4V20a_1">110V,20A</div>
              <div className="IPSLine4V20a_2">110V,20A</div>
              <div className="IPSLine4V20a_3">110V,20A</div>
              <div className="IPSLine4V20a_4">110V,20A</div>
              <div className="IPSLine4ColdStdBy_2">COLD STD BY</div>
              <div className="IPSLine4V300AhLmlaBatteryBox">
                110V/300 AH LMLA Battery Box
              </div>
              <div className="IPSLine4Line61"></div>
              <div className="IPSLine4Line62"></div>
              <div className="IPSLine4Line63"></div>
              <div className="IPSLine4Line64"></div>
              <div className="IPSLine4Line65"></div>
              <div className="IPSLine4Line66"></div>
              <div className="IPSLine4Line67"></div>
              <div className="IPSLine4Line68"></div>
              <div className="IPSLine4Line69"></div>
              <div className="IPSLine4Line77"></div>
              <div className="IPSLine4Line78"></div>
              <div className="IPSLine4Line79"></div>
              <div className="IPSLine4Line80"></div>
              <div className="IPSLine4Line81"></div>
              <div className="IPSLine4Line81_2"></div>
              <div className="IPSLine4Line82"></div>
              <div className="IPSLine4Line83"></div>
              <div className="IPSLine4Line84"></div>
              <div className="IPSLine4Line85"></div>
              <div className="IPSLine4Line86"></div>
              <div className="IPSLine4Line87"></div>
              <div className="IPSLine4Line88"></div>
              <div className="IPSLine4Line89"></div>
              <div className="IPSLine4Line90"></div>
              <div className="IPSLine4Fuse20a">Fuse 20A</div>
              <div className="IPSLine4Line91"></div>
              <div className="IPSLine4Rectangle59" />
              <div className="IPSLine4Line96"></div>
              <div className="IPSLine4Rectangle60" />
              <div className="IPSLine4Rectangle61" />
              <div className="IPSLine4Rectangle62" />
              <div className="IPSLine4Rectangle63" />
              <div className="IPSLine4Rectangle64" />
              <div className="IPSLine432v5a_1">24-32V, 5A</div>
              <div className="IPSLine4ColdStdBy_3">COLD STD BY</div>
              <div className="IPSLine4Line97"></div>
              <div className="IPSLine4Line98"></div>
              <div className="IPSLine4Line99"></div>
              <div className="IPSLine432v5a_2">24-32V, 5A</div>
              <div className="IPSLine432v5a_3">24-32V, 5A</div>
              <div className="IPSLine432v5a_4">24-32V, 5A</div>

              <div className="arrow_13">
                <div className="arrow-shaft_13"></div>
                <div className="arrow-head_13"></div>
              </div>
              <div className="IPSLine4Rectangle65" />
              <div className="IPSLine4Rectangle66" />
              <div className="IPSLine4Rectangle67" />
              <div className="IPSLine4Rectangle68" />
              <div className="IPSLine432v5a_5">24-32V, 5A</div>
              <div className="IPSLine4Line100"></div>
              <div className="IPSLine4Line101"></div>
              <div className="IPSLine4Line102"></div>
              <div className="IPSLine432v5a_6">24-32V, 5A</div>
              <div className="IPSLine432v5a_7">24-32V, 5A</div>
              <div className="IPSLine432v5a_8">24-32V, 5A</div>

              <div className="arrow_14">
                <div className="arrow-shaft_14"></div>
                <div className="arrow-head_14"></div>
              </div>
              <div className="IPSLine4Rectangle69" />
              <div className="IPSLine4Rectangle70" />
              <div className="IPSLine4Rectangle71" />
              <div className="IPSLine432v5a_9">24-32V, 5A</div>
              <div className="IPSLine4Line103"></div>
              <div className="IPSLine4Line104"></div>
              <div className="IPSLine4Line105"></div>
              <div className="IPSLine432v5a_10">24-32V, 5A</div>
              <div className="IPSLine432v5a_11">24-32V, 5A</div>

              <div className="arrow_15">
                <div className="arrow-shaft_15"></div>
                <div className="arrow-head_15"></div>
              </div>
              <div className="IPSLine4Rectangle72" />
              <div className="IPSLine4Rectangle73" />
              <div className="IPSLine4Rectangle74" />
              <div className="IPSLine432v5a_12">24-32V, 5A</div>
              <div className="IPSLine4Line106"></div>
              <div className="IPSLine4Line107"></div>
              <div className="IPSLine4Line108"></div>
              <div className="IPSLine4Line108_2"></div>
              <div className="IPSLine432v5a_13">24-32V, 5A</div>
              <div className="IPSLine432v5a_14">24-32V, 5A</div>

              <div className="arrow_16">
                <div className="arrow-shaft_16"></div>
                <div className="arrow-head_16"></div>
              </div>
              <div className="IPSLine4Rectangle75" />
              <div className="IPSLine4ColdStdBy_4">COLD STD BY</div>
              <div className="IPSLine4Rectangle76" />
              <div className="IPSLine4Rectangle77" />
              <div className="IPSLine4Line109"></div>
              <div className="IPSLine4Line110"></div>
              <div className="IPSLine4Line111"></div>

              <div className="arrow_17">
                <div className="arrow-shaft_17"></div>
                <div className="arrow-head_17"></div>
              </div>
              <div className="IPSLine4Rectangle78" />
              <div className="IPSLine4Rectangle79" />
              <div className="IPSLine4Line112"></div>
              <div className="IPSLine4Line113"></div>
              <div className="IPSLine4Line114"></div>

              <div className="arrow_18">
                <div className="arrow-shaft_18"></div>
                <div className="arrow-head_18"></div>
              </div>
              <div className="IPSLine4Rectangle80" />
              <div className="IPSLine4Rectangle81" />
              <div className="IPSLine426v1a_1">12-26V, 1A</div>
              <div className="IPSLine4Line115"></div>
              <div className="IPSLine4Line116"></div>
              <div className="IPSLine4Line117"></div>

              <div className="arrow_19">
                <div className="arrow-shaft_19"></div>
                <div className="arrow-head_19"></div>
              </div>
              <div className="IPSLine4Line118"></div>
              <div className="IPSLine4Line119"></div>
              <div className="IPSLine4Line120"></div>
              <div className="IPSLine4Line121"></div>
              <div className="IPSLine4Line122"></div>
              <div className="IPSLine4Line123"></div>
              <div className="IPSLine4Line124"></div>
              <div className="IPSLine4Line125"></div>
              <div className="IPSLine4Line126"></div>
              <div className="IPSLine4Ellipse13" />
              <div className="IPSLine4Ellipse14" />
              <div className="IPSLine4Ellipse15" />
              <div className="IPSLine4Line127"></div>
              <div className="IPSLine4Line128"></div>
              <div className="IPSLine4Line129"></div>
              <div className="IPSLine4Ellipse16" />
              <div className="IPSLine4Ellipse17" />
              <div className="IPSLine4Ellipse18" />
              <div className="IPSLine4Ellipse19" />
              <div className="IPSLine4DcDcConverters_1">DC -DC Converters</div>
              <div className="IPSLine426v1a_2">12-26V, 1A</div>
              <div className="IPSLine426v1a_3">12-26V, 1A</div>
              <div className="IPSLine426v1a_4">12-26V, 1A</div>
              <div className="IPSLine426v1a_5">12-26V, 1A</div>
              <div className="IPSLine426v1a_6">12-26V, 1A</div>
              <div className="IPSLine4Ellipse20" />
              <div className="IPSLine4RelayInternal1">Relay Internal-1</div>
              <div className="IPSLine4RelayInternal2">Relay Internal-2</div>
              <div className="IPSLine4RelayExternal1">Relay External-1</div>
              <div className="IPSLine4RelayExternal2">Relay EXternal-2</div>
              <div className="IPSLine4PanelIndication">Panel Indication</div>
              <div className="IPSLine4BlockLocal">Block Local</div>
              <div className="IPSLine4HktMagneto">HKT & Magneto</div>
              <div className="IPSLine4Rectangle83" />
              <div className="IPSLine4Rectangle84" />
              <div className="IPSLine4Rectangle85" />

              <div className="arrow_7">
                <div className="arrow-shaft_7"></div>
                <div className="arrow-head_7"></div>
              </div>
              <div className="IPSLine4Rectangle86" />
              <div className="IPSLine4Rectangle87" />

              <div className="arrow_8">
                <div className="arrow-shaft_8"></div>
                <div className="arrow-head_8"></div>
              </div>
              <div className="IPSLine4Rectangle88" />
              <div className="IPSLine4Rectangle89" />

              <div className="arrow_9">
                <div className="arrow-shaft_9"></div>
                <div className="arrow-head_9"></div>
              </div>
              <div className="IPSLine4Rectangle90" />
              <div className="IPSLine4Rectangle91" />

              <div className="arrow_10">
                <div className="arrow-shaft_10"></div>
                <div className="arrow-head_10"></div>
              </div>
              <div className="IPSLine4Rectangle92" />
              <div className="IPSLine4Rectangle93" />

              <div className="arrow_11">
                <div className="arrow-shaft_11"></div>
                <div className="arrow-head_11"></div>
              </div>
              <div className="IPSLine4Rectangle94" />
              <div className="IPSLine4Rectangle95" />

              <div className="arrow_12">
                <div className="arrow-shaft_12"></div>
                <div className="arrow-head_12"></div>
              </div>
              <div className="IPSLine4Rectangle96" />
              <div className="IPSLine4ColdStdBy_5">COLD STD BY</div>
              <div className="IPSLine4DcDcConverters_2">DC -DC Converters</div>
              <div className="IPSLine4150v1a_1">100-150V,1A</div>
              <div className="IPSLine4150v1a_2">100-150V,1A</div>
              <div className="IPSLine4150v1a_3">100-150V,1A</div>
              <div className="IPSLine4150v1a_4">100-150V,1A</div>
              <div className="IPSLine46v01a_1">3-6v,0.1A</div>
              <div className="IPSLine46v01a_2">3-6v,0.1A</div>
              <div className="IPSLine46v01a_3">3-6v,0.1A</div>
              <div className="IPSLine46v01a_4">3-6v,0.1A</div>
              <div className="IPSLine412v5a_1">2-12V,5A</div>
              <div className="IPSLine412v5a_2">2-12V,5A</div>
              <div className="IPSLine432v5a_15">24-32V,5A</div>
              <div className="IPSLine432v5a_16">24-32V,5A</div>
              <div className="IPSLine4BlockLineUp">Block Line UP</div>
              <div className="IPSLine4BlockLineDn">Block Line DN</div>
              <div className="IPSLine4BlockTeleUp">Block Tele UP</div>
              <div className="IPSLine4BlockTeleDn">Block Tele DN</div>
              <div className="IPSLine4ForSpareCells">For Spare Cells</div>
              <div className="IPSLine4ForDataLogger">For Data Logger</div>
              <div className="IPSLine4Line130"></div>
              <div className="IPSLine4Line131"></div>
              <div className="IPSLine4Line132"></div>
              <div className="IPSLine4Line133"></div>
              <div className="IPSLine4Line134"></div>
              <div className="IPSLine4Line135"></div>
              <div className="IPSLine4Line136"></div>
              <div className="IPSLine4Line137"></div>
              <div className="IPSLine4Line138"></div>
              <div className="IPSLine4Line139"></div>
              <div className="IPSLine4Line140"></div>
              <div className="IPSLine4Line141"></div>
              <div className="IPSLine4Line142"></div>
              <div className="IPSLine4Line143"></div>
            </div>
          </>
          {/* New Design */}
        </div>
      ) :
        (<>
          {/* for loading  */}

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
          </Modal> </>)
      }

      <div>
        {OpenModal ?
          <Modal
            title={'IPS - ' + IPSName + '@' + station_name}
            onOk={handleOk}
            onCancel={handleCancel}
            open={OpenModal}
            width={1400}
            footer={null}
          // closeIcon={false}
          >
            <div>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => handleTabClick("1")} style={{
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
                    Live Data
                  </button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => handleTabClick("2")} style={{
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
                    Live Alerts
                  </button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => handleTabClick("3")} style={{
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
                    Data Logs
                  </button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => handleTabClick("4")} style={{
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
                    Alert Logs
                  </button>
                </Col>
              </Row>
            </div>
            <div>
              <Row style={{ paddingBlock: "2%" }}>
                <Col span={24}>
                  <div className="contentWrapper">
                    {activeTab === "1" && (
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
                            dataSource={RealTimeIPSData}
                          />
                        </ConfigProvider>
                      </div>
                    )}
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
                            columns={alert_table_column}
                            dataSource={RealTimeIPSAlert}

                          />
                        </ConfigProvider>
                      </div>
                    )}
                    {activeTab === "3" && (
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
                                {IPSData.length > 0 ? <>
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
                            loading={loading}
                            columns={data_table_columns}
                            dataSource={IPSData}
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
                    {activeTab === "4" && (
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
                                {IPSAlert.length > 0 ? <>
                                  <tp title="Dowload Data Logs">
                                    <Button
                                      //style={{background:"#23234D" }}
                                      loading={
                                        alertreportloading
                                      }
                                      onClick={
                                        ReportDownloadAlert
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
                            columns={alert_table_column}
                            dataSource={IPSAlert}
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

                  </div>
                </Col>
              </Row>
            </div>


          </Modal> : <></>
        }
      </div>

      {NoDataFound ? <div className="noDataDiv">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div> : <></>}
    </>
  );
};
export default IPS;


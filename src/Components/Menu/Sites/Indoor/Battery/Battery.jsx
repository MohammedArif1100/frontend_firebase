import "./Battery.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, Row, Col, Card, message, Modal, Typography, Empty, Tooltip, Table, ConfigProvider, Form, DatePicker, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { size } from "lodash";
import { battery_data } from "../../../../../features/Notification";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../../../Authentication/ApiCall";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import { InfoCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import * as FileSaver from "file-saver";

const { Option } = Select;
const { Text } = Typography;

const Battery = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const station_id = queryParams.get('station_id');
    const station_name = queryParams.get('station_name');

    const [TypeList, setTypeList] = useState([
        { id: 1, type: "EI" },
        { id: 2, type: "IPS" },
    ]);
    const [isAlertRealDataModalOpen, setisAlertRealDataModalOpen] = useState(false);
    const [TypeName, setTypeName] = useState();
    const [BatteryId, setBatteryId] = useState("");
    const [BatteryList, setBatteryList] = useState([]);
    const [BatteryData, setBatteryData] = useState([]);
    const [NoDataFound, setNoDataFound] = useState(true);
    const [RealTimeBatteryData, setRealTimeBatteryData] = useState([]);
    const [RealTimeBatteryAlert, setRealTimeBatteryAlert] = useState([]);
    const [datastartDatepicker, setDatastartDatepicker] = useState();
    const [dataendDatepicker, setDataendDatepicker] = useState();
    const [OpenModal, setOpenModal] = useState(false);
    const [loading, setloading] = useState(false);
    const [BatteryName, setBatteryName] = useState("");
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
    const [BatteryAlert, setBatteryAlert] = useState([]);
    const [datareportloading, setdatareportloading] = useState(false);
    const [alertreportloading, setalertreportloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [Pageload, setPageload] = useState(false);
    const [BankVoltage, setBankVoltage] = useState(1);
    const [ChargingCurrent, setChargingCurrent] = useState(1);
    const [DischargingCurrent, setDischargingCurrent] = useState(1);
    const [SpareBankVoltage, setSpareBankVoltage] = useState(1);
    const [SpareChargingCurrent, setSpareChargingCurrent] = useState(1);
    const [SpareDischargingCurrent, setSpareDischargingCurrent] = useState(1);
    const [form] = Form.useForm();
    const [CellTypeList, setCellTypeList] = useState([
        { id: 1, type: "Battery Cells" },
        { id: 2, type: "Spare Cells" },
    ]);
    const [SelectedBatteryValue, setSelectedBatteryValue] = useState(null);
    const [SelectedCellValue, setSelectedCellValue] = useState(null);

    const dateFormat = "YYYY-MM-DD";
    const { RangePicker } = DatePicker;

    const dispatch = useDispatch();

    const onChange = (id) => {
        if (id == 1) {
            setTypeName("EI")
            getBatteryData("EI")
            setNoDataFound(false);
            setSelectedBatteryValue(1);
        } else if (id == 2) {
            setTypeName("IPS")
            getBatteryData("IPS")
            setNoDataFound(false);
            setSelectedBatteryValue(2);
        } else {
            setNoDataFound(true);
            setBatteryList([]);
            setSelectedBatteryValue(null);
            setSelectedCellValue(null);
        }
    };

    const socket_data = useSelector(
        (state) => state?.battery_data?.batterydata
    );


    if (socket_data?.data.length > 0) {
        var index = BatteryList.findIndex(x => x.batteryid === socket_data.data[0].data_logs.batteryid)
        if (index != -1) {
            BatteryList[index].batterydataid = socket_data.data[0].data_logs.id
            BatteryList[index].battery_cells = socket_data.data[0].data_logs.battery_cells
            BatteryList[index].spare_cells = socket_data.data[0].data_logs.spare_cells
            BatteryList[index].bank_voltage = socket_data.data[0].data_logs.bank_voltage
            BatteryList[index].charging_current = socket_data.data[0].data_logs.charging_current
            BatteryList[index].discharging_current = socket_data.data[0].data_logs.discharging_current
            BatteryList[index].spare_bank_voltage = socket_data.data[0].data_logs.spare_bank_voltage
            BatteryList[index].spare_charging_current = socket_data.data[0].data_logs.spare_charging_current
            BatteryList[index].spare_discharging_current = socket_data.data[0].data_logs.spare_discharging_current
            BatteryList[index].createddate = socket_data.data[0].data_logs.createddate
            BatteryList[index].isdele = socket_data.data[0].data_logs.isdele
        }
        else {
            BatteryList.push({
                batteryid: socket_data.data[0].data_logs.batteryid,
                batterydataid: socket_data.data[0].data_logs.id,
                battery_cells: socket_data.data[0].data_logs.battery_cells,
                spare_cells: socket_data.data[0].data_logs.spare_cells,
                bank_voltage: socket_data.data[0].data_logs.bank_voltage,
                charging_current: socket_data.data[0].data_logs.charging_current,
                discharging_current: socket_data.data[0].data_logs.discharging_current,
                spare_bank_voltage: socket_data.data[0].data_logs.spare_bank_voltage,
                spare_charging_current: socket_data.data[0].data_logs.spare_charging_current,
                spare_discharging_current: socket_data.data[0].data_logs.spare_discharging_current,
                createddate: socket_data.data[0].data_logs.createddate,
                isdele: socket_data.data[0].data_logs.isdele
            })
        }
        dispatch(battery_data({ data: [] }));
    }

    function getBatteryData(type) {
        setPageload(true);
        axiosClient
            .get("/battery/getstationbattery?stationid=" + station_id + '&&type=' + type)
            .then((response) => {
                if (response.data.issuccess === true) {
                    if (response.data.data.length > 0) {
                        let modifiedBatteryData = { ...response.data.data[0] };
                        for (let item in modifiedBatteryData.battery_cells) {
                            modifiedBatteryData.battery_cells[item] = parseFloat(modifiedBatteryData.battery_cells[item]).toFixed(3);
                        }
                        setBatteryId(modifiedBatteryData.batteryid)
                        setBankVoltage(modifiedBatteryData.bank_voltage)
                        setChargingCurrent(modifiedBatteryData.charging_current)
                        setDischargingCurrent(modifiedBatteryData.discharging_current)
                        setSpareBankVoltage(modifiedBatteryData.spare_bank_voltage)
                        setSpareChargingCurrent(modifiedBatteryData.spare_charging_current)
                        setSpareDischargingCurrent(modifiedBatteryData.spare_discharging_current)
                        setBatteryList([modifiedBatteryData])
                        setBatteryName(modifiedBatteryData.batteryname)
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

    const handleTabClick = (key) => {
        setActiveTab(key);
        if (key === "1") {
            getCurrentData("");
        } else if (key === "2") {
            getCurrentAlert();
        } else if (key === "3") {
            getBatteryDataLogs();
        } else if (key === "4") {
            getBatteryAlerLogs();
        }
    };

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        setRealTimeBatteryData([])
        setRealTimeBatteryAlert([])
        setOpenModal(false);
    };

    const data_table_columns = [
        {
            title: "Date",
            dataIndex: "createddate",
            key: "createddate",
            width: "5%",
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
            title: "Charging Current (A)",
            dataIndex: "charging_current",
            key: "charging_current",
            width: "3%",
        },
        {
            title: "Discharging Current (A)",
            dataIndex: "discharging_current",
            key: "discharging_current",
            width: "3%",
        },
        {
            title: "Bank Voltage (V)",
            dataIndex: "bank_voltage",
            key: "bank_voltage",
            width: "3%",
        },
        {
            title: "Battery Cells",
            dataIndex: "battery_cells",
            key: "battery_cells",
            width: "65%",
            render: (text, record) => {
                const batteryCells = Object.values(record.battery_cells).join(', ');
                return <div>{batteryCells}</div>;
            },
        },
        {
            title: "Spare Charging Current (A)",
            dataIndex: "spare_charging_current",
            key: "spare_charging_current",
            width: "3%",
        },
        {
            title: "Spare Discharging Current (A)",
            dataIndex: "discharging_current",
            key: "spare_discharging_current",
            width: "3%",
        },
        {
            title: "Spare Bank Voltage (V)",
            dataIndex: "spare_bank_voltage",
            key: "spare_bank_voltage",
            width: "3%",
        },
        {
            title: "Spare Cells",
            dataIndex: "spare_cells",
            key: "spare_cells",
            width: "6%",
            render: (text, record) => {
                const spareCells = Object.values(record.spare_cells).join(', ');
                return <div>{spareCells}</div>;
            },
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
        if (BatteryId != "") {
            getCurrentData(BatteryId);
            setActiveTab("1");
            setOpenModal(true);
        }
        else {
            message.info("Kindly select the battery type")
        }
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


    const HandleDatePicker = (start, end, page, size, msg) => {
        if (msg === "Data") {
            setloading(true);
            axiosClient
                .get(
                    "/battery/getstationbatterydata?start_date=" +
                    start +
                    "&&end_date=" +
                    end +
                    "&&page=" +
                    page +
                    "&&size=" +
                    size +
                    "&&stationid=" +
                    station_id +
                    "&&batteryid=" +
                    BatteryId
                )
                .then((response) => {
                    if (response.data.issuccess === true) {
                        setDataPageTotal(response.data.totaldatacount);
                        setDataPageNo(response.data.page);
                        setloading(false);
                        setBatteryData(response.data.data);
                    } else {
                        setloading(false);
                        message.error(response.data.msg);
                    }
                })
                .catch((err) => {
                    //console.log("errr", err);
                    setloading(false);
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
                    "/battery/getstationbatteryalert?start_date=" +
                    start +
                    "&&end_date=" +
                    end +
                    "&&page=" +
                    page +
                    "&&size=" +
                    size +
                    "&&stationid=" +
                    station_id +
                    "&&batteryid=" +
                    BatteryId
                )
                .then((response) => {
                    if (response.data.issuccess === true) {
                        setAlertPageTotal(response.data.totaldatacount);
                        setAlertPageNo(response.data.page);
                        setloading(false);
                        setBatteryAlert(response.data.data);
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
                })
        }
    };


    const ReportDownloadData = () => {
        var start = datastartDatepicker ? datastartDatepicker : "";
        var end = dataendDatepicker ? dataendDatepicker : "";
        setdatareportloading(true);
        axiosClient
            .get(
                "/battery/downloadbatterydatareport?start_date=" +
                start +
                "&&end_date=" +
                end +
                "&&stationid=" +
                station_id +
                "&&batteryid=" +
                BatteryId,
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
                    FileSaver.saveAs(blob, "BatteryDataReport" + showTime + ".xlsx");
                    setdatareportloading(false);
                }
                else {
                    setdatareportloading(false);
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
                "/battery/downloadbatteryalertreport?start_date=" +
                start +
                "&&end_date=" +
                end +
                "&&stationid=" +
                station_id +
                "&&batteryid=" +
                BatteryId,
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
                        "BatteryAlertReport_" + showTime + ".xlsx"
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

    function getCurrentData(value) {
        var val = value !== "" ? value : BatteryId;
        axiosClient
            .get(
                "/battery/getstationbatterycurrentdata?page=" +
                "1" +
                "&&size=" +
                "10" +
                "&&stationid=" +
                station_id +
                "&&batteryid=" +
                val
            )
            .then((response) => {
                if (response.data.issuccess === true) {
                    setRealTimeDataPageTotal(response.data.totaldatacount);
                    setRealTimeDataPageNo(response.data.page);
                    setRealTimeBatteryData(response.data.data);
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
                "/battery/getstationbatterycurrentalert?page=" +
                "1" +
                "&&size=" +
                "10" +
                "&&stationid=" +
                station_id +
                "&&batteryid=" +
                BatteryId
            )
            .then((response) => {
                if (response.data.issuccess === true) {
                    setRealTimeAlertPageTotal(response.data.totaldatacount);
                    setRealTimeAlertPageNo(response.data.page);
                    setRealTimeBatteryAlert(response.data.data);
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

    function getBatteryDataLogs() {
        setloading(true);
        axiosClient
            .get(
                "/battery/getstationbatterydata?start_date=" +
                "" +
                "&&end_date=" +
                "" +
                "&&page=" +
                "1" +
                "&&size=" +
                "10" +
                "&&stationid=" +
                station_id +
                "&&batteryid=" +
                BatteryId
            )
            .then((response) => {
                if (response.data.issuccess === true) {
                    setDataPageTotal(response.data.totaldatacount);
                    setDataPageNo(response.data.page);
                    setloading(false);
                    setBatteryData(response.data.data);
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

    function getBatteryAlerLogs() {
        setloading(true);
        axiosClient
            .get(
                "/battery/getstationbatteryalert?start_date=" +
                "" +
                "&&end_date=" +
                "" +
                "&&page=" +
                "1" +
                "&&size=" +
                "10" +
                "&&stationid=" +
                station_id +
                "&&batteryid=" +
                BatteryId
            )
            .then((response) => {
                if (response.data.issuccess === true) {
                    setAlertPageTotal(response.data.totaldatacount);
                    setAlertPageNo(response.data.page);
                    setloading(false);
                    setBatteryAlert(response.data.data);
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

    const onChangeCellType = (id) => {
        if (id == 1) {
            setSelectedCellValue(1);
            setNoDataFound(false);
        } else if (id == 2) {
            setSelectedCellValue(2);
            setNoDataFound(false);
        } else {
            setNoDataFound(true);
            setRealTimeBatteryData([]);
            setSelectedCellValue(null);
            setSelectedBatteryValue(null);
        }
    };

    useEffect(() => {
        setSelectedBatteryValue(1);
        setSelectedCellValue(1);
        getBatteryData("EI");
    }, [])
    return (
        <>
            <div style={{ paddingInline: "2%" }}>

                {/* Rotating 90 degree with select and datetime one by one */}
                <Row className="dateTimeDiv " gutter={[16, 16]}>
                    <Col xs={24} md={8} style={{ textAlign: "start" }}>
                        <div style={{ display: "flex", gap: "0" }}>
                            <div style={{ flex: 1 }}>                        <div style={{ fontSize: "18px", paddingBottom: "13px" }}>
                                Please Select Battery Type:
                            </div>
                                <Select
                                    value={SelectedBatteryValue}
                                    allowClear
                                    placeholder="Select Battery Type"
                                    onChange={onChange}
                                    style={{ width: "100%" }}
                                // style={{ width: "20%" }} 
                                >
                                    {TypeList.map((option) => (
                                        <Option key={option.type} value={option.id}>
                                            {option.type}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div style={{ flex: 1, marginLeft: "10px" }}>
                                <div style={{ fontSize: "18px", paddingBottom: "13px" }}>
                                    Please Select Cell Type:
                                </div>
                                <Select
                                    value={SelectedCellValue}
                                    allowClear
                                    placeholder="Select Cell Type"
                                    onChange={onChangeCellType}
                                    style={{ width: "100%" }}>
                                    {CellTypeList.map((option) => (
                                        <Option key={option.type} value={option.id}>
                                            {option.type}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col
                        xs={24}
                        md={{ span: 12, offset: 4 }}
                        style={{ textAlign: "end", marginBottom: "60px" }}>
                        <Tooltip title="View Logs"> <span onClick={onClickopenModal}> <InfoCircleOutlined /> </span></Tooltip>
                        {BatteryList.length > 0 ? <span>Last updated time : {moment(BatteryList[0].createddate).format("YYYY-MM-DD HH:mm:ss")}</span> : <></>}
                    </Col>
                </Row>

                {/* one below the other  */}
                {/* <Row className="dateTimeDiv" justify="space-between">
                    <Col
                        span={12}
                        xs={24}
                        style={{ textAlign: "start", paddingBottom: "16px" }}>
                        <div style={{ fontSize: "18px", paddingBottom: "13px" }}>
                            Please Select Battery Type:
                        </div>
                        <Select
                            allowClear
                            placeholder="Select the option"
                            onChange={onChange}
                            style={{ minWidth: "20%" }}>
                            {TypeList.map((option) => (
                                <Option key={option.type} value={option.id}>
                                    {option.type}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={12} xs={24} style={{ textAlign: "end" }}>
                        {BatteryList.length > 0 ? <span>Last updated time : {moment(BatteryList[0].createddate).format("YYYY-MM-DD HH:mm:ss")}</span> : <></>}                        
                    </Col>
                </Row> */}

                {/* beside each other  */}
                {/* <Row className="dateTimeDiv" justify="space-between">
                    <Col span={12} style={{ textAlign: "start" }}>
                        <div style={{ fontSize: "18px", paddingBottom: "13px" }}>
                            Please Select Battery Type:
                        </div>
                        <Select
                            allowClear
                            placeholder="Select the option"
                            onChange={onChange}
                            style={{ minWidth: "40%" }}>
                            {TypeList.map((option) => (
                                <Option key={option.type} value={option.id}>
                                    {option.type}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={12} style={{ textAlign: "end" }}>
                        {BatteryList.length > 0 ? <span>Last updated time : {moment(BatteryList[0].createddate).format("YYYY-MM-DD HH:mm:ss")}</span> : <></>}                        
                    </Col>
                </Row> */}

                {/* rotate 90degree  */}
                {/* <Row className="dateTimeDiv " justify="space-between">
                    <Col
                        span={12}
                        xs={24}
                        className="rotatableCol"
                        style={{ textAlign: "start", paddingBottom: "16px" }}>
                        <div style={{ fontSize: "18px", paddingBottom: "13px" }}>
                            Please Select Battery Type:
                        </div>
                        <Select
                            allowClear
                            placeholder="Select the option"
                            onChange={onChange}
                            style={{ minWidth: "20%" }}>
                            {TypeList.map((option) => (
                                <Option key={option.type} value={option.id}>
                                    {option.type}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col
                        span={12}
                        xs={24}
                        className="rotatableCol"
                        style={{ textAlign: "end" }}>
                        {BatteryList.length > 0 ? <span>Last updated time : {moment(BatteryList[0].createddate).format("YYYY-MM-DD HH:mm:ss")}</span> : <></>}                        
                    </Col>
                </Row> */}

                <Row>
                    {/* above Row className="cardRow" is not required now, in future we can use*/}
                    {BatteryList.length > 0 && SelectedCellValue == 1 ? (
                        <div className="Battery_1">
                            <div className="Battery_2"></div>
                            <div className="Battery_3" />
                            <div className="Battery_4" />
                            <div className="Battery_5" />
                            <div className="Battery_6" />
                            <div className="Battery_7" />
                            <div className="Battery_8" />
                            <div className="Battery_9" />
                            <div className="Battery_10" />
                            <div className="Battery_11" />
                            <div className="Battery_12" />
                            <div className="Battery_13" />
                            <div className="Battery_14"></div>
                            <div className="Battery_15" />
                            <div className="Battery_16" />
                            <div className="Battery_17" />
                            <div className="Battery_18" />
                            <div className="Battery_19" />
                            <div className="Battery_20" />
                            <div className="Battery_21" />
                            <div className="Battery_22" />
                            <div className="Battery_23" />
                            <div className="Battery_24" />
                            <div className="Battery_25" />
                            <div className="Battery_26"></div>
                            <div className="Battery_27" />
                            <div className="Battery_28" />
                            <div className="Battery_29" />
                            <div className="Battery_30" />
                            <div className="Battery_31" />
                            <div className="Battery_32" />
                            <div className="Battery_33" />
                            <div className="Battery_34" />
                            <div className="Battery_35" />
                            <div className="Battery_36" />
                            <div className="Battery_37" />
                            <div className="Battery_38"></div>
                            <div className="Battery_38_1"></div>
                            <div className="Battery_39" />
                            <div className="Battery_40" />
                            <div className="Battery_41" />
                            <div className="Battery_42" />
                            <div className="Battery_43" />
                            <div className="Battery_44" />
                            <div className="Battery_45" />
                            <div className="Battery_46" />
                            <div className="Battery_47" />
                            <div className="Battery_48" />
                            <div className="Battery_49" />
                            <div className="Battery_50" />
                            <div className="Battery_51" />
                            <div className="Battery_52" />
                            <div className="Battery_53" />
                            <div className="Battery_54" />
                            <div className="Battery_55" />
                            <div className="Battery_56" />
                            <div className="Battery_57" />
                            <div className="Battery_58" />
                            <div className="Battery_60" />
                            <div className="Battery_61" />
                            <div className="Battery_62"></div>
                            <div className="Battery_63"></div>
                            <div className="Battery_64"></div>
                            <div className="Battery_65"></div>
                            <div className="Battery_66" />
                            <div className="Battery_67">Charger</div>
                            <div className="Battery_68">To Load</div>
                            <div className="Battery_69">Cell Voltage</div>
                            <div className="Battery_70"></div>
                            <div className="Battery_71"></div>
                            <div className="Battery_72"></div>
                            <div className="Battery_73"></div>
                            <div className="Battery_74">Bank Voltage</div>
                            <div className="Battery_75">Charging Current</div>
                            <div className="Battery_76">Discharge Current</div>
                            <div className="Battery_77">
                                {BatteryList[0].battery_cells[1]} V
                            </div>
                            <div className="Battery_78">
                                {BatteryList[0].battery_cells[2]} V
                            </div>
                            <div className="Battery_79">
                                {BatteryList[0].battery_cells[3]} V
                            </div>
                            <div className="Battery_80">
                                {BatteryList[0].battery_cells[4]} V
                            </div>
                            <div className="Battery_81">
                                {BatteryList[0].battery_cells[5]} V
                            </div>
                            <div className="Battery82">
                                {BatteryList[0].battery_cells[6]} V
                            </div>
                            <div className="Battery83">
                                {BatteryList[0].battery_cells[7]} V
                            </div>
                            <div className="Battery84">
                                {BatteryList[0].battery_cells[8]} V
                            </div>
                            <div className="Battery85">
                                {BatteryList[0].battery_cells[9]}  V
                            </div>
                            <div className="Battery86">
                                {BatteryList[0].battery_cells[10]} V
                            </div>
                            <div className="Battery87">
                                {BatteryList[0].battery_cells[11]} V
                            </div>
                            <div className="Battery88">
                                {BatteryList[0].battery_cells[12]} V
                            </div>
                            <div className="Battery89">
                                {BatteryList[0].battery_cells[13]} V
                            </div>
                            <div className="Battery90">
                                {BatteryList[0].battery_cells[14]} V
                            </div>
                            <div className="Battery91">
                                {BatteryList[0].battery_cells[15]} V
                            </div>
                            <div className="Battery92">
                                {BatteryList[0].battery_cells[16]} V
                            </div>
                            <div className="Battery93">
                                {BatteryList[0].battery_cells[17]} V
                            </div>
                            <div className="Battery94">
                                {BatteryList[0].battery_cells[18]} V
                            </div>
                            <div className="Battery95">
                                {BatteryList[0].battery_cells[19]} V
                            </div>
                            <div className="Battery96">
                                {BatteryList[0].battery_cells[20]} V
                            </div>
                            <div className="Battery97">
                                {BatteryList[0].battery_cells[21]} V
                            </div>
                            <div className="Battery98">
                                {BatteryList[0].battery_cells[22]} V
                            </div>
                            <div className="Battery99">
                                {BatteryList[0].battery_cells[23]} V
                            </div>
                            <div className="Battery100">
                                {BatteryList[0].battery_cells[24]} V
                            </div>
                            <div className="Battery101">
                                {BatteryList[0].battery_cells[25]} V
                            </div>
                            <div className="Battery102">
                                {BatteryList[0].battery_cells[26]} V
                            </div>
                            <div className="Battery103">
                                {BatteryList[0].battery_cells[27]} V
                            </div>
                            <div className="Battery104">
                                {BatteryList[0].battery_cells[28]} V
                            </div>
                            <div className="Battery105">
                                {BatteryList[0].battery_cells[29]} V
                            </div>
                            <div className="Battery106">
                                {BatteryList[0].battery_cells[30]} V
                            </div>
                            <div className="Battery107">
                                {BatteryList[0].battery_cells[31]} V
                            </div>
                            <div className="Battery108">
                                {BatteryList[0].battery_cells[32]} V
                            </div>
                            <div className="Battery109">
                                {BatteryList[0].battery_cells[33]} V
                            </div>
                            <div className="Battery110">
                                {BatteryList[0].battery_cells[34]} V
                            </div>
                            <div className="Battery111">
                                {BatteryList[0].battery_cells[35]} V
                            </div>
                            <div className="Battery112">
                                {BatteryList[0].battery_cells[36]} V
                            </div>
                            <div className="Battery113">
                                {BatteryList[0].battery_cells[37]} V
                            </div>
                            <div className="Battery114">
                                {BatteryList[0].battery_cells[38]} V
                            </div>
                            <div className="Battery115">
                                {BatteryList[0].battery_cells[39]} V
                            </div>
                            <div className="Battery116">
                                {BatteryList[0].battery_cells[40]} V
                            </div>
                            <div className="Battery117">
                                {BatteryList[0].battery_cells[41]} V
                            </div>
                            <div className="Battery118">
                                {BatteryList[0].battery_cells[42]} V
                            </div>
                            <div className="Battery119">
                                {BatteryList[0].battery_cells[43]} V
                            </div>
                            <div className="Battery120">
                                {BatteryList[0].battery_cells[44]} V
                            </div>
                            <div className="Battery121">
                                {BatteryList[0].battery_cells[45]} V
                            </div>
                            <div className="Battery122">
                                {BatteryList[0].battery_cells[46]} V
                            </div>
                            <div className="Battery123">
                                {BatteryList[0].battery_cells[47]} V
                            </div>
                            <div className="Battery124">
                                {BatteryList[0].battery_cells[48]} V
                            </div>
                            <div className="Battery125">
                                {BatteryList[0].battery_cells[49]} V
                            </div>
                            <div className="Battery126">
                                {BatteryList[0].battery_cells[50]} V
                            </div>
                            <div className="Battery127">
                                {BatteryList[0].battery_cells[51]} V
                            </div>
                            <div className="Battery128">
                                {BatteryList[0].battery_cells[52]} V
                            </div>
                            <div className="Battery129">
                                {BatteryList[0].battery_cells[53]} V
                            </div>
                            <div className="Battery130">
                                {BatteryList[0].battery_cells[54]} V
                            </div>
                            <div className="Battery131">
                                {BatteryList[0].battery_cells[55]} V
                            </div>
                            <div className="Battery132"></div>
                            <div className="Battery133"></div>
                            <div className="Battery134"></div>
                            <div className="Battery135"></div>
                            <div className="Battery136"></div>
                            {/* <div className="Battery137">
                                {BatteryList[0].battery_cells[1]} V
                            </div>
                            <div className="Battery138">
                                {BatteryList[0].battery_cells[2]} V
                            </div>
                            <div className="Battery139">
                                {BatteryList[0].battery_cells[3]} V
                            </div>
                            <div className="Battery140">
                                {BatteryList[0].battery_cells[4]} V
                            </div>
                            <div className="Battery141">
                                {BatteryList[0].battery_cells[5]} V
                            </div>
                            <div className="Battery142">
                                {BatteryList[0].battery_cells[6]} V
                            </div>
                            <div className="Battery143">
                                {BatteryList[0].battery_cells[7]} V
                            </div>
                            <div className="Battery144">
                                {BatteryList[0].battery_cells[8]} V
                            </div>
                            <div className="Battery145">
                                {BatteryList[0].battery_cells[9]} V
                            </div>
                            <div className="Battery146">
                                {BatteryList[0].battery_cells[10]} V
                            </div>
                            <div className="Battery147">
                                {BatteryList[0].battery_cells[11]} V
                            </div>
                            <div className="Battery148">
                                {BatteryList[0].battery_cells[12]} V
                            </div>
                            <div className="Battery149">
                                {BatteryList[0].battery_cells[13]} V
                            </div>
                            <div className="Battery150">
                                {BatteryList[0].battery_cells[14]} V
                            </div>
                            <div className="Battery151">
                                {BatteryList[0].battery_cells[15]} V
                            </div>
                            <div className="Battery152">
                                {BatteryList[0].battery_cells[16]} V
                            </div>
                            <div className="Battery153">
                                {BatteryList[0].battery_cells[17]} V
                            </div>
                            <div className="Batter154">
                                {BatteryList[0].battery_cells[18]} V
                            </div>
                            <div className="Battery155">
                                {BatteryList[0].battery_cells[19]} V
                            </div>
                            <div className="Battery156">
                                {BatteryList[0].battery_cells[20]} V
                            </div>
                            <div className="Battery157">
                                {BatteryList[0].battery_cells[21]} V
                            </div>
                            <div className="Battery158">
                                {BatteryList[0].battery_cells[22]} V
                            </div>
                            <div className="Battery159">
                                {BatteryList[0].battery_cells[23]} V
                            </div>
                            <div className="Battery160">
                                {BatteryList[0].battery_cells[24]} V
                            </div>
                            <div className="Battery161">
                                {BatteryList[0].battery_cells[25]} V
                            </div>
                            <div className="Battery162">
                                {BatteryList[0].battery_cells[26]} V
                            </div>
                            <div className="Battery163">
                                {BatteryList[0].battery_cells[27]} V
                            </div>
                            <div className="Battery164">
                                {BatteryList[0].battery_cells[28]} V
                            </div>
                            <div className="Battery165">
                                {BatteryList[0].battery_cells[29]} V
                            </div>
                            <div className="Battery166">
                                {BatteryList[0].battery_cells[30]} V
                            </div>
                            <div className="Battery167">
                                {BatteryList[0].battery_cells[31]} V
                            </div>
                            <div className="Battery168">
                                {BatteryList[0].battery_cells[32]} V
                            </div>
                            <div className="Battery169">
                                {BatteryList[0].battery_cells[3]} V
                            </div>
                            <div className="Battery170">
                                {BatteryList[0].battery_cells[34]} V
                            </div>
                            <div className="Battery171">
                                {BatteryList[0].battery_cells[35]} V
                            </div>
                            <div className="Battery172">
                                {BatteryList[0].battery_cells[36]} V
                            </div>
                            <div className="Battery173">
                                {BatteryList[0].battery_cells[37]} V
                            </div>
                            <div className="Battery174">
                                {BatteryList[0].battery_cells[38]} V
                            </div>
                            <div className="Battery175">
                                {BatteryList[0].battery_cells[39]} V
                            </div>
                            <div className="Battery176">
                                {BatteryList[0].battery_cells[40]} V
                            </div>
                            <div className="Battery177">
                                {BatteryList[0].battery_cells[41]} V
                            </div>
                            <div className="Battery178">
                                {BatteryList[0].battery_cells[42]} V
                            </div>
                            <div className="Battery179">
                                {BatteryList[0].battery_cells[43]} V
                            </div>
                            <div className="Battery180">
                                {BatteryList[0].battery_cells[44]} V
                            </div>
                            <div className="Battery181">
                                {BatteryList[0].battery_cells[45]} V
                            </div>
                            <div className="Battery182">
                                {BatteryList[0].battery_cells[46]} V
                            </div>
                            <div className="Battery183">
                                {BatteryList[0].battery_cells[47]} V
                            </div>
                            <div className="Battery184">
                                {BatteryList[0].battery_cells[48]} V
                            </div>
                            <div className="Battery185">
                                {BatteryList[0].battery_cells[49]} V
                            </div>
                            <div className="Battery186">
                                {BatteryList[0].battery_cells[50]} V
                            </div>
                            <div className="Battery187">
                                {BatteryList[0].battery_cells[51]} V
                            </div>
                            <div className="Battery188">
                                {BatteryList[0].battery_cells[52]} V
                            </div>
                            <div className="Battery189">
                                {BatteryList[0].battery_cells[53]} V
                            </div>
                            <div className="Battery190">
                                {BatteryList[0].battery_cells[54]} V
                            </div>
                            <div className="Battery191">
                                {BatteryList[0].battery_cells[55]} V
                            </div> */}
                            <div className="Battery192">1</div>
                            <div className="Battery193">2</div>
                            <div className="Battery194">3</div>
                            <div className="Battery195">4</div>
                            <div className="Battery196">5</div>
                            <div className="Battery197">6</div>
                            <div className="Battery198">7</div>
                            <div className="Battery199">8</div>
                            <div className="Battery200">9</div>
                            <div className="Battery201">10</div>
                            <div className="Battery202">11</div>
                            <div className="Battery203">22</div>
                            <div className="Battery204">33</div>
                            <div className="Battery205">44</div>
                            <div className="Battery206">55</div>
                            <div className="Battery207">21</div>
                            <div className="Battery208">32</div>
                            <div className="Battery209">43</div>
                            <div className="Battery210">54</div>
                            <div className="Battery211">20</div>
                            <div className="Battery212">31</div>
                            <div className="Battery213">42</div>
                            <div className="Battery214">53</div>
                            <div className="Battery215">19</div>
                            <div className="Battery216">30</div>
                            <div className="Battery217">41</div>
                            <div className="Battery218">52</div>
                            <div className="Battery219">18</div>
                            <div className="Battery220">29</div>
                            <div className="Battery221">17</div>
                            <div className="Battery222">28</div>
                            <div className="Battery223">39</div>
                            <div className="Battery224">40</div>
                            <div className="Battery225">51</div>
                            <div className="Battery226">50</div>
                            <div className="Battery227">16</div>
                            <div className="Battery228">27</div>
                            <div className="Battery229">15</div>
                            <div className="Battery230">26</div>
                            <div className="Battery231">37</div>
                            <div className="Battery232">38</div>
                            <div className="Battery233">49</div>
                            <div className="Battery234">48</div>
                            <div className="Battery235">14</div>
                            <div className="Battery236">25</div>
                            <div className="Battery237">36</div>
                            <div className="Battery238">47</div>
                            <div className="Battery239">13</div>
                            <div className="Battery240">24</div>
                            <div className="Battery241">35</div>
                            <div className="Battery242">46</div>
                            <div className="Battery243">12</div>
                            <div className="Battery244">23</div>
                            <div className="Battery245">45</div>
                            <div className="Battery246">34</div>
                            <div className="Battery247">{BankVoltage} V</div>
                            <div className="Battery248">{ChargingCurrent} A</div>
                            <div className="Battery249">{DischargingCurrent} A</div>
                        </div>
                    ) :
                        BatteryList.length > 0 && SelectedCellValue == 2 ? (
                            <div className="Battery_1">
                                <div className="Battery_2_1"></div>
                                <div className="Battery_3" />
                                <div className="Battery_4" />
                                <div className="Battery_5" />
                                <div className="Battery_6" />
                                <div className="Battery_7" />
                                <div className="Battery_62"></div>
                                <div className="Battery_63"></div>
                                <div className="Battery_64"></div>
                                <div className="Battery_65"></div>
                                <div className="Battery_66" />
                                <div className="Battery_67">Charger</div>
                                <div className="Battery_68">To Load</div>
                                <div className="Battery_69">Cell Voltage</div>
                                <div className="Battery_74">Bank Voltage</div>
                                <div className="Battery_75">Charging Current</div>
                                <div className="Battery_76">Discharging Current</div>
                                <div className="Battery_77">
                                    {BatteryList[0].spare_cells[1]} V
                                </div>
                                <div className="Battery_78">
                                    {BatteryList[0].spare_cells[2]} V
                                </div>
                                <div className="Battery_79">
                                    {BatteryList[0].spare_cells[3]} V
                                </div>
                                <div className="Battery_80">
                                    {BatteryList[0].spare_cells[4]} V
                                </div>
                                <div className="Battery97">
                                    {BatteryList[0].spare_cells[5]} V
                                </div>
                                <div className="Battery132_1"></div>
                                <div className="Battery192">1</div>
                                <div className="Battery193">2</div>
                                <div className="Battery194">3</div>
                                <div className="Battery195">4</div>
                                <div className="Battery196">5</div>
                                <div className="Battery247">{SpareBankVoltage} V</div>
                                <div className="Battery248">{SpareChargingCurrent} A</div>
                                <div className="Battery249">{SpareDischargingCurrent} A</div>
                            </div>
                        )
                            : (
                                <>
                                    {/* for loading  */}
                                    <Modal
                                        className="LoadinModal"
                                        open={Pageload}
                                        style={{ background: "none", textAlign: "center" }}
                                        footer={false}
                                        closable={false}
                                        centered>
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
                                        <Text style={{ color: "white", fontSize: "1.2em" }}>
                                            Loading ...
                                        </Text>
                                    </Modal>{" "}
                                </>
                            )}
                </Row>
            </div>


            <div>
                {OpenModal ?
                    <Modal
                        title={'Battery- ' + BatteryName + ' @' + station_name}
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
                                                        dataSource={RealTimeBatteryData}
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
                                                        dataSource={RealTimeBatteryAlert}

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
                                                                {BatteryData.length > 0 ? <>
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
                                                        dataSource={BatteryData}
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
                                                                {BatteryAlert.length > 0 ? <>
                                                                    <tp title="Dowload Alert Logs">
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
                                                        dataSource={BatteryAlert}
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
    )
}

export default Battery;
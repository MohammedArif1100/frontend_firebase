import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card, Row, Col, Layout, Typography, Divider, message, Empty, Modal, Tabs, ConfigProvider, Table, Tag, Form, DatePicker,
  TimePicker, Button, Tooltip as tp,
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
import { ImArrowRight, ImArrowLeft, ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaCircle } from "react-icons/fa6";
import moment from "moment/moment";
import axiosClient from "../../../../Authentication/ApiCall";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { relay_data } from "../../../../../features/Notification";
import { red } from "@material-ui/core/colors";
import ReactApexChart from 'react-apexcharts';
import ClipLoader from "react-spinners/ClipLoader";
import * as FileSaver from "file-saver";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { Content } = Layout;
const { Link, Title, Text } = Typography;
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;



const Relay = () => {
  const [relayList, setrelayList] = useState([]);
  const [Pageload, setPageload] = useState(false);
  const [Relayid, setRelayid] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [datastartDatepicker, setDatastartDatepicker] = useState();
  const [dataendDatepicker, setDataendDatepicker] = useState();
  const [DataPageTotal, setDataPageTotal] = useState(10);
  const [DataPageNo, setDataPageNo] = useState(1);
  const [datareportloading, setdatareportloading] = useState(false);
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
  const [AssertId, setAssertId] = useState([]);
  const [RelayName, setRelayName] = useState();
  const [RealTimeRelayData, setRealTimeRelayData] = useState([]);
  const [RelayData, setRelayData] = useState([]);
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const { RangePicker } = DatePicker;


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const station_id = queryParams.get('station_id');
  const station_name = queryParams.get('station_name');

  const dispatch = useDispatch();

  const socket_data = useSelector(                                   
    (state) => state?.relay_data?.relaydata
  );

  // socket data functions //
  if (socket_data?.data.length > 0) {
    if (Relayid !== "") {
      if (socket_data.data[0].data_logs.relayid === Relayid) {
        var datalogstable = [];
        datalogstable.push(socket_data.data[0].data_logs);
        RealTimeRelayData.length >= 10 ? RealTimeRelayData.pop() : <></>
        datalogstable = datalogstable.concat(RealTimeRelayData);
        setRealTimeRelayData(datalogstable);
      }
    }    
    var dataLogList = JSON.parse(socket_data.data[0].data_logs);
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
    relayList.sort((a, b) => b.assertsid - a.assetsid).sort((a, b) => b.value - a.value).sort((a, b) => b.relayname - a.relayname)
    //dispatch(relay_data({ data: [] }));
  }

  function onclickCard(values) {
    setRelayid(values.id)
    getrelayvalues(values.id)
    setRelayName(values.relayname)
    setOpenModal(true);
    setActiveTab("1");
  };

  // for initial fetching of relay data
  useEffect(() => {
    getRelayList();
  }, []);

  const getRelayList = async () => {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationrelay?stationid=" + station_id       
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

  const handleTabClick = (key) => {
    setActiveTab(key);
    if (key === "1") {
      getCurrentData("");
    } else if (key === "3") {
      getRelayDataLogs();
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
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "25%",
      render: (_, record) => {      
        return <div>{record.value == 1 ? "ON" : "OFF"}</div>;
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
    setOpenModal(true);
    setActiveTab("1");
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

  const HandleDatePicker = (start, end, page, size, msg) => {
    if (msg === "Data") {
      setloading(true);
      axiosClient
        .get(
          "/relay/getstationrelaydata?start_date=" +
          start +
          "&&end_date=" +
          end +
          "&&page=" +
          page +
          "&&size=" +
          size +
          "&&stationid=" +
          station_id +
          "&&relayid=" +
          Relayid
        )
        .then((response) => {
          if (response.data.issuccess === true) {
            setDataPageTotal(response.data.totaldatacount);
            setDataPageNo(response.data.page);
            setloading(false);
            setRelayData(response.data.data);
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
  };

  const ReportDownloadData = () => {
    var start = datastartDatepicker ? datastartDatepicker : "";
    var end = dataendDatepicker ? dataendDatepicker : "";
    setdatareportloading(true);
    axiosClient
      .get(
        "/relay/downloadrelaydatareport?start_date=" +
        start +
        "&&end_date=" +
        end +
        "&&stationid=" +
        station_id +
        "&&relayid=" +
        Relayid,
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
          FileSaver.saveAs(blob, "RelayDataReport_" + showTime + ".xlsx");
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

  function getCurrentData(value) {
    var val = value !== "" ? value : Relayid;
    axiosClient
      .get(
        "/relay/getstationrelaycurrentdata?page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&relayid=" +
        val
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeDataPageTotal(response.data.totaldatacount);
          setRealTimeDataPageNo(response.data.page);
          setrelayList(response.data.data);
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

  function getRelayDataLogs() {
    setloading(true);
    axiosClient
      .get(
        "/relay/getstationrelaydata?start_date=" +
        "" +
        "&&end_date=" +
        "" +
        "&&page=" +
        "1" +
        "&&size=" +
        "10" +
        "&&stationid=" +
        station_id +
        "&&relayid=" +
        Relayid
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setDataPageTotal(response.data.totaldatacount);
          setDataPageNo(response.data.page);
          setloading(false);
          setRelayData(response.data.data);
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

  function getrelayvalues (relay_id) {
    setloading(true);
    axiosClient
    .get(
      "/relay/getstationrelaycurrentdata?page=" +
      "1" +
      "&&size=" +
      "10" +
      "&&stationid=" +
      station_id +
      "&&relayid=" +
      relay_id
      )
      .then((response) => {
        if (response.data.issuccess === true) {
          setRealTimeRelayData(response.data.data);
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
  }


  const setTabid = (key) => {
    setAssertId(key)
  }

  return (
    <>
      {/* Tab Layout */}

      <Tabs defaultActiveKey="1" style={{ marginLeft: "10px" }} onTabClick={setTabid}>
        <TabPane tab="POINT MACHINE" key="1">
          <div>
            <div className="text-center">
              {/* <div className="h2text relay_pointname">POINT MACHINE</div> */}
              <div className="h2text relay_dateTime">
                {/* <tp title="View Logs"> <span onClick={onClickopenModal} style={{marginRight :"10px"}}> <InfoCircleOutlined /> </span></tp> */}
                Last updated time : {relayList.length > 0 ? moment(relayList.filter((data) => data.assertsid === 1).sort((a, b) => new Date(b.createddate) - new Date(a.createddate))[0]?.createddate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            </div>
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
                        xl={{ span: 1, offset: 1 }}
                        id="relayCol"
                      >
                        <Row justify="center" align="middle">
                          <Card
                            // style={{ 
                            //   // width: "35%",
                            //    boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }} 
                            className="relayCard"
                            id="relayCardList"
                            key={item.id}
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
        </TabPane>
        <TabPane tab="SIGNAL CIRCUIT" key="3">
          <div>
            <div className="text-center">
              {/* <div className="h2text relay_pointname">SIGNAL CIRCUIT</div> */}
              <div className="h2text relay_dateTime">
                {/* <tp title="View Logs"> <span onClick={onClickopenModal} style={{ marginRight: "10px" }}> <InfoCircleOutlined /> </span></tp> */}
                Last updated time : {relayList.length > 0 ? moment(relayList.filter((data) => data.assertsid === 3).sort((a, b) => new Date(b.createddate) - new Date(a.createddate))[0]?.createddate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            </div>
            <Row style={{ margin: "10px", padding: "10px" }}>
              <Col span={24}>
                <Row gutter={[8, 32]} style={{ marginRight: "35px" }}>
                  {relayList.length > 0 ? (
                    relayList.filter((data) => data.assertsid === 3).map((item, id) => (
                      <Col
                        xs={{ span: 22, offset: 2 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 10, offset: 0 }}
                        lg={{ span: 10, offset: 0 }}
                        // xl={{ span: 4, offset: 0 }}
                        // xl={{ span: 1, offset: 0 }}
                        xl={{ span: 1, offset: 1 }}
                        id="relayCol"
                      >
                        <Row justify="center" align="middle">
                          <Card
                            // style={{
                            //   //  width: "45%",  
                            //    border:"1px solid black" }}
                            className="relayCard"
                            id="relayCardList" onClick={() => { onclickCard(item) }}>
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
        </TabPane>
        <TabPane tab="TRACK CIRCUIT" key="2">
          <div>
            <div className="text-center">
              {/* <div className="h2text relay_pointname">TRACK CIRCUIT</div> */}
              <div className="h2text relay_dateTime">
                {/* <tp title="View Logs"> <span onClick={onClickopenModal} style={{ marginRight: "10px" }}> <InfoCircleOutlined /> </span></tp> */}
                Last updated time : {relayList.length > 0 ? moment(relayList.filter((data) => data.assertsid === 2).sort((a, b) => new Date(b.createddate) - new Date(a.createddate))[0]?.createddate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            </div>
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
                        // xl={{ span: 4, offset: 0 }}
                        // xl={{ span: 1, offset: 0 }}
                        xl={{ span: 1, offset: 1 }}
                        id="relayCol"
                      >
                        <Row justify="center" align="middle">
                          <Card
                            // style={{
                            //   //  width: "45%",
                            //   border:"1px solid black" }} 
                            className="relayCard"
                            id="relayCardList" onClick={() => { onclickCard(item) }}>
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
        </TabPane>
        <TabPane tab="AXLE COUNTER" key="4">
          <div>
            <div className="text-center">
              {/* <div className="h2text relay_pointname">AXLE  COUNTER</div> */}
              <div className="h2text relay_dateTime">
                {/* <tp title="View Logs"> <span onClick={onClickopenModal} style={{ marginRight: "10px" }}> <InfoCircleOutlined /> </span></tp> */}
                Last updated time : {relayList.length > 0 ? moment(relayList.filter((data) => data.assertsid === 4).sort((a, b) => new Date(b.createddate) - new Date(a.createddate))[0]?.createddate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            </div>
            <Row style={{ margin: "10px", padding: "10px" }}>
              <Col span={24}>
                <Row gutter={[8, 32]} style={{ marginRight: "35px" }}>
                  {relayList.length > 0 ? (
                    relayList.filter((data) => data.assertsid === 4).map((item, id) => (
                      <Col
                        xs={{ span: 22, offset: 2 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 10, offset: 0 }}
                        lg={{ span: 10, offset: 0 }}
                        // xl={{ span: 4, offset: 0 }}
                        // xl={{ span: 1, offset: 0 }}
                        xl={{ span: 1, offset: 1 }}
                        id="relayCol"
                      >
                        <Row justify="center" align="middle">
                          <Card
                            // style={{
                            //   //  width: "45%",
                            //   border:"1px solid black" }} 
                            className="relayCard"
                            id="relayCardList" onClick={() => { onclickCard(item) }}>
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
        </TabPane>
        <TabPane tab="LC GATE" key="5">
          <div>
            <div className="text-center">
              {/* <div className="h2text relay_pointname">LC GATE</div> */}
              <div className="h2text relay_dateTime">
                {/* <tp title="View Logs"> <span onClick={onClickopenModal} style={{ marginRight: "10px" }}> <InfoCircleOutlined /> </span></tp> */}
                Last updated time : {relayList.length > 0 ? moment(relayList.filter((data) => data.assertsid === 5).sort((a, b) => new Date(b.createddate) - new Date(a.createddate))[0]?.createddate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            </div>
            <Row style={{ margin: "10px", padding: "10px" }}>
              <Col span={24}>
                <Row gutter={[8, 32]} style={{ marginRight: "35px" }}>
                  {relayList.length > 0 ? (
                    relayList.filter((data) => data.assertsid === 5).map((item, id) => (
                      <Col
                        xs={{ span: 22, offset: 2 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 10, offset: 0 }}
                        lg={{ span: 10, offset: 0 }}
                        // xl={{ span: 4, offset: 0 }}
                        // xl={{ span: 1, offset: 0 }}
                        xl={{ span: 1, offset: 1 }}
                        id="relayCol"
                      >
                        <Row justify="center" align="middle">
                          <Card
                            // style={{
                            //   //  width: "45%",
                            //   border:"1px solid black" }} 
                            className="relayCard"
                            id="relayCardList" onClick={() => { onclickCard(item) }}>
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
        </TabPane>
      </Tabs>

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

      <div>
        {OpenModal ?
          <Modal
            title={'Relay - ' + RelayName + ' @' + station_name}
            onOk={handleOk}
            onCancel={handleCancel}
            open={OpenModal}
            width={1400}
            footer={null}
          // closeIcon={false}
          >
            <div>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} onClick={() => handleTabClick("1")} style={{
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
                {/* <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => handleTabClick("2")} style={{
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
                </Col> */}
                <Col xs={6} sm={12} md={12} lg={12} xl={12} onClick={() => handleTabClick("3")} style={{
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
                {/* <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => handleTabClick("4")} style={{
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
                </Col> */}
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
                            dataSource={RealTimeRelayData}
                          />
                        </ConfigProvider>
                      </div>
                    )}
                    {/* {activeTab === "2" && (
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
                            dataSource={relayList}

                          />
                        </ConfigProvider>
                      </div>
                    )} */}
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
                                {relayList.length > 0 ? <>
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
                            dataSource={RelayData}

                          />
                        </ConfigProvider>
                      </div>
                    )}
                    {/* {activeTab === "4" && (
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
                                {relayList.length > 0 ? <>
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
                            columns={alert_table_column}
                            dataSource={relayList}

                          />
                        </ConfigProvider>
                      </div>
                    )} */}

                  </div>
                </Col>
              </Row>
            </div>


          </Modal> : <></>
        }
      </div>
    </>
  )
}

export default Relay;
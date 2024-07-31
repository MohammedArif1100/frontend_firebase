import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from 'antd';
import axiosClient from "../../Authentication/ApiCall";
import authService from "../../Authentication/authService";
import moment from "moment/moment";
import {
  Label,
  Input,
  Select,
  Cascader,
  Form,
  Checkbox,
  message,
  Tooltip,
  Button
} from "antd";
import { Row, Col, Card, Switch, DatePicker, } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import store from "../../..";
import { DashboardOutlined } from '@ant-design/icons';
import ReactDOM from "react-dom";


import { ConfigProvider } from "antd";


const Search = Input.Search;
const { Header, Sider, Content } = Layout;

function Home() {
  document.title = "RDPMS - Home";

  const navigate = useNavigate();
  const location = useLocation();

  const [StationNameList, setStationNameList] = useState([]);
  const [StationNameInitialList, setStationNameInitalList] = useState([]);

  const [StationList, setStationList] = useState([])
  const [DivisionList, setDivisionList] = useState([]);
  const [ZoneList, setZoneList] = useState([]);
  const [loading, setloading] = useState(true);
  const [RegForm] = Form.useForm();
  const [fetch, setFetch] = useState(false);
  const [InitialStationList, setInitialStationList] = useState([]);
  const [submitloading, setsubmitloading] = useState(false);
  const [ZoneNameList, setZoneNameList] = useState([]);
  const [DivisionNameList, setDivisionNameList] = useState([]);
  const [SelectedZoneName, setSelectedZoneName] = useState([]);

  const { Option } = Select;

  const Duplesssta = StationList.filter(
    (ele, ind) =>
      ind ===
      StationList.findIndex(
        (elem) => elem.text === ele.text && elem.value === ele.value
      )
  );

  const Duplessdiv = DivisionList.filter(
    (ele, ind) =>
      ind ===
      DivisionList.findIndex(
        (elem) => elem.text === ele.text && elem.value === ele.value
      )
  );

  const Duplesszon = ZoneList.filter(
    (ele, ind) =>
      ind ===
      ZoneList.findIndex(
        (elem) => elem.text === ele.text && elem.value === ele.value
      )
  );


  const columns = [
    {
      title: 'Station Name',
      dataIndex: 'stationname',
      key: 'stationname',
      sorter: (a, b) => a.stationname.localeCompare(b.stationname),
      filterSearch: true,
      filters: Duplesssta,
      onFilter: (value, record) => record.stationname.indexOf(value) === 0,
      render: (text) => <a>{text}</a>,
      // render:(text)=> <Button type="primary" shape="round">{text}</Button>
    },
    {
      title: 'Code',
      dataIndex: 'stationcode',
      key: 'stationcode',
      sorter: (a, b) => a.stationcode.localeCompare(b.stationcode),
    },
    {
      title: 'Division Name',
      dataIndex: 'divisionname',
      key: 'divisionname',
      sorter: (a, b) => a.divisionname.localeCompare(b.divisionname),
      filterSearch: true,
      filters: Duplessdiv,
      onFilter: (value, record) => record.divisionname.indexOf(value) === 0,
    },
    {
      title: 'Zone Name',
      dataIndex: 'zonename',
      key: 'zonename',
      sorter: (a, b) => a.zonename.localeCompare(b.zonename),
      filterSearch: true,
      filters: Duplesszon,
      onFilter: (value, record) => record.zonename.indexOf(value) === 0,
    },
    {
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      render: (active) => (
        <>
          {active === true ?
            <Tag color={"green"} >
              Active
            </Tag> :

            <Tag color={"red"} >
              Inactive
            </Tag>
          }

        </>
      ),
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => {
        return (
          <Button ghost type="primary" onClick={() => {
            localStorage.setItem("sipstationid", record.id);
            localStorage.setItem("stationName", record.stationname);
            authService.getCurrentUserRole() === "Admin" ? navigate("/Admin/Home/StationDetailsLanding", { state: { id: record.id } })
              : authService.getCurrentUserRole() === "Station Incharge" ? navigate("/StationIncharge/Home/StationDetailsLanding", { state: { id: record.id } })
                : navigate("/Employee/Home/StationDetailsLanding", { state: { id: record.id } })
          }}>
            SIP
          </Button>
        )
      }

    },
    // {
    //   title: 'Dashboard',
    //   key: 'dashboard',
    //   render: (_, record) => {
    //     return(
    //       <Button icon={<DashboardOutlined/>}   ghost type="primary" onClick={()=>{
    //         localStorage.setItem("sipstationid", record.id);
    //         localStorage.setItem("stationName", record.stationname);
    //         authService.getCurrentUserRole() === "Admin" ? navigate("/Admin/Home/StationDashboard", { state: { id: record.id} })
    //         : authService.getCurrentUserRole() === "Station Incharge" ? navigate("/StationIncharge/Home/StationDashboard", { state: { id: record.id} })
    //         :  navigate("/Employee/Home/StationDashboard", { state: { id: record.id} }) 
    //       }}>
    //         View 
    //           </Button>
    //     )
    //   }
    // },
  ];

  useEffect(() => {
    // setloading(true);
    // axiosClient
    //   .get("/railwaystation/getregisteredstation")
    //   .then((response) => {
    //     if (response.data.issuccess === true) {
    //       setloading(false);
    //       ////console.log('stations',response.data.data )    
    //       setStationNameList(response.data.data)
    //       setStationNameInitalList(response.data.data)
    //       response.data.data.map((item, index) => {

    //         let stationdata = {
    //           text: item.stationname,
    //           value: item.stationname,
    //         };

    //         let divisiondata = {
    //           text: item.divisionname,
    //           value: item.divisionname,
    //         };

    //         let zonedata = {
    //           text: item.zonename,
    //           value: item.zonename,
    //         };

    //         setStationList((cam) => [...cam, stationdata]);
    //         setDivisionList((cam) => [...cam, divisiondata]);
    //         setZoneList((cam) => [...cam, zonedata]);
    //       });
    //     } else {
    //       //console.log("Something went wrong");
    //     }
    //   })
    //   .catch((err) => {
    //     //console.log("errr", err);
    //     if (err.status === 0) {
    //       message.error("Server error");
    //     } else {
    //       message.error(err.msg);
    //     }
    //   });
    localStorage.setItem("sipstationid", "");
    localStorage.setItem("stationName", "");
    getRegiterZoneNames();
  }, []);

  function getRegiterZoneNames() {
    setloading(true);
    axiosClient
      .get("/railwaystation/getregiteredzones")
      .then((response) => {
        if (response.data.issuccess === true) {
          setloading(false);
          ////console.log('stations',response.data.data )    
          // setStationNameList(response.data.data)
          // setStationNameInitalList(response.data.data)
          // response.data.data.map((item, index) => {
          //   setZoneNameList(item);
          // });
          setZoneNameList(response.data.data);
        } else {
          //console.log("Something went wrong");
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

  function getDivisionByZone(zoneName) {
    setloading(true);
    axiosClient
      .get("/railwaystation/getregitereddivisionbyzones?zonename=" + zoneName)
      .then((response) => {
        if (response.data.issuccess === true) {
          setloading(false);
          setDivisionNameList(response.data.data)
        } else {
          //console.log("Something went wrong");
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

  function getStationByZoneDivision(divisionName) {
    setloading(true);
    axiosClient
      .get("/railwaystation/getregiteredstationbyzonesdivision?zonename=" + SelectedZoneName + "&divisionname=" + divisionName)
      .then((response) => {
        if (response.data.issuccess === true) {
          setloading(false);
          setStationNameList(response.data.data);
        } else {
          //console.log("Something went wrong");
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


  const onSearch = e => {
    const value = e.target.value;
    const filterTable = StationNameInitialList.filter((o) => {
      if (value == '') {
        return StationNameInitialList;
      }
      else {
        const filteredValue = Object.keys(o).some(k =>
          String(o[k])
            .toLowerCase()
            .includes(value.toLowerCase())
        )
        return filteredValue;
      }
    }
    );
    setStationNameList(filterTable)
  };

  const onFinish = (values) => {
    RegForm.setFieldsValue({ "divisionname": undefined });
    RegForm.setFieldsValue({ "zonename": undefined });
    RegForm.setFieldsValue({ "divisionname": undefined });
    return (
      authService.getCurrentUserRole() === "Admin" ? navigate("/Admin/Home/StationDetailsLanding?stationid=" + localStorage.getItem("sipstationid") + '&stationname=' + localStorage.getItem("stationName"))
        : authService.getCurrentUserRole() === "Station Incharge" ? navigate("/StationIncharge/Home/StationDetailsLanding?stationid=" + localStorage.getItem("sipstationid") + '&stationname=' + localStorage.getItem("stationName"))
          : navigate("/Employee/Home/StationDetailsLanding?stationid=" + localStorage.getItem("sipstationid") + '&stationname=' + localStorage.getItem("stationName"))
    )
  }

  const onFinishFailed = () => {
    //console.log("Login Failed");
  };

  // set station data correspoding values 
  const setstationvalues = (val) => {
    if (val !== undefined) {
      localStorage.setItem("sipstationid", val);
      localStorage.setItem("stationName", StationNameList.filter(data => data.id === val)[0].stationname);
    } else {
      //message.warning("Please select station");
    }
  };

  // select search, if the length is >3 then it will  start search
  function selectSearch(value) {

    if (value != null && value.length >= 3) {
      setFetch(true);
      axiosClient
        .get("/railwaystation/getstationnameByKeyword?name=" + value)
        .then((response) => {
          if (response.data.issuccess === true && response.data.data.length > 0) {
            setStationList(response.data.data);
          } else {
            setStationList(StationNameList)
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
      setFetch(false);
    } else {
      setStationList(InitialStationList)
    }

  };

  const setzonevalues = (val) => {
    if (val != undefined) {
      // let found = ZoneNameList.filter(r => val.includes(r.zonename));
      // RegForm.setFieldsValue({ "divisionname": "" })
      // // RegForm.setFieldsValue({"zoneabbr":found[0].zoneabbr}) 
      // let division_array = found[0].divisionnames.split(",")
      // setDivisionNameList(division_array)
      RegForm.setFieldsValue({ "divisionname": undefined });
      RegForm.setFieldsValue({ "stationname": undefined });
      getDivisionByZone(val);
      setSelectedZoneName(val);
    } else {
      setDivisionNameList([]);
      setStationNameList([]);
      RegForm.setFieldsValue({ "divisionname": undefined })
      RegForm.setFieldsValue({ "stationname": undefined });
    }
  };
  const setDivisionValue = (val) => {
    if (val !== undefined) {
      RegForm.setFieldsValue({ "stationname": undefined });
      getStationByZoneDivision(val);
    } else {
      RegForm.setFieldsValue({ "divisionname": undefined })
      RegForm.setFieldsValue({ "stationname": undefined });
    }
  }
  return (

    <ConfigProvider>
      <Content style={{ minHeight: "88vh", overflowY: "auto", backgroundColor: "#f2f2f2" }}>
        <Row justify="center" align="middle" style={{marginTop:"6%"}}>
          <Col xs={24} sm={20} md={16} lg={12} xl={10} >
            <Card style={{ fontWeight: "bold", fontSize: "18px", justifyContent: "center", textAlign: "center", color: "white", backgroundColor: "white", paddingInline: "7%",boxShadow: "rgb(191, 189, 206) 0px 0px 5px 5px" }} >


              <Form
                form={RegForm}
                style={{ width: "100%" }}
                name="stationDashboard"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                validateTrigger={["onBlur"]}
              >
                {/* Your form items here */}
                <Form.Item
                  className="top-space"
                  label="Zone"
                  name="zonename"
                  rules={[
                    {
                      type: "string",
                      required: true,
                      message: "Please Select The Zone",
                    },
                  ]}>
                  <Select
                    showSearch
                    allowClear
                    style={{
                      width: "100%",
                      height: "50px",
                      fontSize: "17px",
                      textAlign: "start"
                    }}
                    placeholder="Select Zone"
                    onChange={(e) => setzonevalues(e)}>
                    {ZoneNameList.map((option, index) => {
                      return (
                        <Option key={index} value={option}>
                          {option}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  className="top-space"
                  label="Division"
                  name="divisionname"
                  rules={[
                    {
                      type: "string",
                      required: true,
                      message: "Please Select The Division!",
                    },
                  ]}>
                  <Select
                    showSearch
                    onChange={(e) => { setDivisionValue(e) }}
                    allowClear
                    style={{
                      width: "100%",
                      height: "50px",
                      fontSize: "17px",
                      textAlign: "start"
                    }}
                    placeholder="Select Division">
                    {DivisionNameList.map((option, index) => {
                      return (
                        <Option key={index} value={option}>
                          {option}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Station"
                  name="stationname"
                  rules={[
                    {
                      type: "integer",
                      required: true,
                      message: "Please Select The Station!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    style={{
                      width: "100%",
                      height: "50px",
                      fontSize: "17px",
                      textAlign: "start"
                    }}
                    placeholder="Select Station"
                    onChange={(e) => { setstationvalues(e) }}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    {StationNameList.map((option, index) => {
                      return (
                        <Option key={index} value={option.id}>
                          {option.stationname}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item>
              {authService.getCurrentUserReadOnly() ? (
                <Tooltip title="you are not an authorized person">
                  <Button type="primary" block disabled   style={{ border: "none", height:"40px" }}>
                    Submit
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  loading={submitloading}
                  style={{ border: "none", height:"40px" }}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Submit
                </Button>
              )}
            </Form.Item>
              </Form>
            </Card>

          </Col>
        </Row>
        <Row justify="center" style={{marginTop:"2%"}}>
          <Col xs={6} sm={5} md={4} lg={3} xl={2}>
           
          </Col>
        </Row>
      </Content>
    </ConfigProvider>

  )

}

export default Home




import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import authService from "../../Authentication/authService";
import moment from "moment/moment";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {
  Label,
  Input,
  Select,
  Cascader,
  Form,
  Checkbox,
  message,
  Tooltip,
  Button,
  Tabs,
  Typography,
  Image,
} from "antd";
import { Row, Col, Card, Switch, DatePicker } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import PointMachineTab from "./Outdoor/PointMachine/PointMachineTab";
import Dashboard from "../Sites/StationDashboard";
import TrackCircuitTab from "./Outdoor/TrackCircuit/TrackCircuitTab";
import SignalCircuitTab from "./Outdoor/SignalCircuit/SignalCircuitTab";
import Yard from "../Sites/Yard/Yard";
import Indoor from "./Indoor/Indoor";
import Outdoor from "../Sites/Outdoor/Outdoor";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

import {
  BarChartOutlined,
  UserOutlined,
  MailOutlined,
  UserAddOutlined,
  LogoutOutlined,
  DashboardOutlined,
  PushpinOutlined,
  HomeOutlined,
  AreaChartOutlined,
  CalendarOutlined,
  SecurityScanOutlined,
  CommentOutlined,
  ToolOutlined,
  LeftOutlined,
  SafetyOutlined,
  HddOutlined,
  LineChartOutlined,
  FileExcelOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  ColumnWidthOutlined,
  UngroupOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const { Option } = Select;
const { Text } = Typography;
const { Content } = Layout;

function StationDetailsLanding() {
  document.title = "RDPMS - StationDetails";

  const { xs, sm, md, lg, xl, xxl } = useBreakpoint();
  const [Tab, setTab] = useState("1");
  const [isFullScreen, setIsFullScreen] = useState(false);
  // for full screen mode
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, []);
  // for full screen mode
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  const items1 = [
    {
      key: "1",
      label: "Yard",
      children: <Yard />,
      // children: <Dashboard />,
    },
    {
      key: "2",
      // label: "Indoor",
      label: "Indoor",
      children: <Indoor />,
    },
    {
      key: "3",
      // label: "Outdoor",
      label: "Outdoor",
      children: <Outdoor />,
    },
  ];
  // for getting station name
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stationName = searchParams.get("stationname");
  // console.log("Station Name=============", stationName);

  //with full screen
  const items = [
    {
      key: "1",
      label: "Yard",
      children: (
        <div style={{ position: "relative" }}>
          <Yard />

          <div
            className="fullScreen"
            style={{ position: "absolute", top: 0, right: 0 }}>
            {isFullScreen ? (
              <Tooltip title="Click to Exit From  Full Screen ">
                {" "}
                <FullscreenExitOutlined
                  onClick={toggleFullScreen}
                  style={{ fontSize: "35px", color: "#08c" }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Click To  View In   Full Screen">
                {" "}
                <FullscreenOutlined
                  onClick={toggleFullScreen}
                  style={{ fontSize: "35px", color: "#08c" }}
                />
              </Tooltip>
            )}
          </div>
        </div>
      ),
    },
    !isFullScreen && {
      key: "2",
      // label: "Indoor",
      label: "Indoor",
      children: <Indoor />,
    },
    !isFullScreen && {
      key: "3",
      // label: "Outdoor",
      label: "Outdoor",
      children: <Outdoor />,
    },
    // {
    //   key: "4",
    //   label: (
    //     <div>
    //       <span
    //         style={{
    //           marginLeft: "600px",
    //           fontSize: "30px",
    //           fontWeight: "bolder",
    //           color: "black",
    //           // pointerEvents: "none",
    //         }}>
    //         {stationName}
    //       </span>
    //     </div>
    //   ),
    //   disabled: true, 
    //   style: { color: 'white',dispplay:'none' }
    // },
  ];

  const tabList = [
    {
      key: "1",
      icon: <DoubleRightOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <PushpinOutlined />,
      label: "Point Machine",
    },
    {
      key: "3",
      icon: <ToolOutlined />,
      label: "Track Circuit",
    },
    {
      key: "4",
      icon: <MenuUnfoldOutlined />,
      label: "Signal Circuit",
    },
    {
      key: "5",
      icon: <SafetyOutlined />,
      label: "IPS",
    },
    {
      key: "6",
      icon: <CalendarOutlined />,
      label: "Relay",
    },
    {
      key: "7",
      icon: <HddOutlined />,
      label: "Battery",
    },
    {
      key: "8",
      icon: <UngroupOutlined />,
      label: "Axle Counter",
    },
    {
      key: "9",
      icon: <ColumnWidthOutlined />,
      label: "LC Gate",
    },
  ];

  return (
    <>
      {/* <Row gutter={[30, 20]} style={{ marginInline: "1%" }}>
      
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}>
          <div className="card-container">
          
            <Tabs defaultActiveKey="1" items={items}></Tabs>
          </div>
        </Col>
        <Col>     <h1>Station Name :{localStorage.getItem("stationName")}</h1>  </Col>
      </Row> */}

      <Row
        gutter={[30, 20]}
        style={{ marginInline: "1%", margin: "0px" }}
        justify="space-between">
        {/* <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} style={{textAlign:"center"}}>
        <h1> {stationName}</h1>
      </Col> */}
      <div className="stationName">
        <div>
            <Typography className="stationNameLable">{stationName}</Typography>
          </div>
      </div>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}>
          <div className="card-container">
           <Tabs defaultActiveKey="1" items={items}></Tabs>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default StationDetailsLanding;


import React from "react";
import { Layout, Typography, Tabs, Row, Col, Button } from "antd";
import PointMachineTab from "../PointMachine/PointMachineTab";
import TrackCircuitTab from "../TrackCircuit/TrackCircuitTab";
import SignalCircuitTab from "./SignalCircuitTab";
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from "@ant-design/icons";
import StationDetailsLanding from "../../StationDetailsLanding";
import Outdoor from "../Outdoor";
import { useNavigate, useLocation } from "react-router-dom";
import LCGate from "../../Outdoor/LCGate/LCGate";
import AxleCounter from "../../Outdoor/AxleCounter/AxleCounter";

const PointMachine = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const station_id = queryParams.get('station_id');
  const station_name = queryParams.get('station_name');
  const { TabPane } = Tabs;
  const handleClick = () => {
    // console.log("  window.history", window.history)
    window.history.back();
  };
  const onChange = (key) => {
    // console.log(key);
  };
  const values = {
    station_id: station_id,
    station_name: station_name
  }
  const items = [
    {
      key: "1",
      label: "",
      icon: (
        <Button onClick={handleClick} icon={<ArrowLeftOutlined />} style={{ border: 'none' }}>
          <Link to={"StationDetailsLanding"}></Link>
        </Button>
      ),
    },
    {
      key: "2",
      label: "POINT MACHINE",
      children: <PointMachineTab values={values} />,
    },
    {
      key: "3",
      label: "SIGNAL",
      children: <SignalCircuitTab values={values} />,
    },
    {
      key: "4",
      label: "TRACK",
      children: <TrackCircuitTab values={values} />,
    },
    {
      key: "5",
      label: "AXLE COUNTER",
      children: <AxleCounter values={values} />,
    },
    {
      key: "6",
      label: "LC GATE",
      children: <LCGate values={values} />,
    },

  ];

  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
    <Typography style={{ fontSize: "30px",fontWeight:"bolder" }}>{station_name}</Typography>
</div> */}
      <Row style={{ marginTop: "10px" }}>
        {/* <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          style={{ textAlign: "center" }}>
          <h1> {station_name}</h1>
        </Col> */}

        <div className="stationNameHeader">
          <div>
            <Typography className="stationNameLableHeader">{station_name}</Typography>
          </div>
        </div>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >

          <div className="card-container">
            <Tabs defaultActiveKey="3" items={items} onChange={onChange} />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default PointMachine;

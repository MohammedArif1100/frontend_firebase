import React from "react";
import { Layout, Typography, Tabs, Row, Col, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import IPS from "./IPS";
import Relay from "../Relay/Relay";
import Battery from "../Battery/Battery";

const Header = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const station_id = queryParams.get("station_id");
  const station_name = queryParams.get("station_name");
  const values = {
    station_id: station_id,
    station_name: station_name,
  };
  const handleClick = () => {
    // console.log("  window.history", window.history);
    window.history.back();
  };
  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "",
      icon: (
        <Button
          onClick={handleClick}
          icon={<ArrowLeftOutlined />}
          style={{ border: "none" }}>
          <Link to={"StationDetailsLanding"}></Link>
        </Button>
      ),
    },
    {
      key: "2",
      label: "IPS",
      children: <IPS values={values} />,
    },
    {
      key: "3",
      label: "Relay",
      children: <Relay values={values} />,
    },
    {
      key: "4",
      label: "Battery",
      children: <Battery values={values} />,
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
        {/* <Col style={{marginLeft:"80px"}} span={24}>
                <Typography style={{ fontSize: "20px" }}>Indoor</Typography>
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
          xl={{ span: 24 }}>
          <div className="card-container">
            <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Header;


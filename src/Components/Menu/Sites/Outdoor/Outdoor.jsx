import React, { useState } from "react";
import { Layout, Row, Col, Typography, Card, Button } from "antd";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import HeaderP from "./PointMachine/Header";

const { Meta } = Card;

const { Content } = Layout;
const Outdoor = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  var station_id = queryParams.get("stationid");
  var station_name = queryParams.get("stationname");

  return (
    <>
      <Layout style={{ height: "80vh" }}>
        <Content style={{ padding: "2%" }}>
          {/* <Row>
            <Col span={24}>
              <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                {station_name}
              </Typography>
            </Col>
          </Row>
          
          <Divider
            style={{
              backgroundColor: "grey",
              height: "5px",
            }}
          /> */}
          {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Typography style={{ fontSize: "30px", fontWeight: "bolder" }}>{station_name}</Typography>
          </div> */}
          <Row>
            <Row>
              <Col span={24} style={{ padding: "15px" }}>
                <Typography style={{ fontSize: "20px", fontWeight: "700" }}>Outdoor</Typography>
              </Col>
            </Row>
            {/* <Col span={22} offset={0}> */}
            <Row gutter={[8, 16]}>
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 3, offset: 1 }}
              // style={{ padding: "5%" }}
              >
                {/* <Link to="PointMachine"> */}
                <Link
                  to={{
                    pathname: "PointMachine",
                    search: `?station_id=${station_id}&station_name=${station_name}`
                  }}
                >
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={
                      <img
                        alt="Point Machine"
                        src="/PointMachine.jpg"
                      />
                    }
                  >
                    <Meta
                      title={
                        <Button style={{ border: "none" }}>
                          Point Machine
                        </Button>
                      }
                    />
                  </Card>
                </Link>
              </Col>
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 3, offset: 1 }}
              // style={{ padding: "5%" }}
              >
                <Link to={{
                  pathname: "Signal",
                  search: `?station_id=${station_id}&station_name=${station_name}`
                }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={
                      <img
                        alt="Signal"
                        src="/SignalCircuit.jpg"
                      />
                    }
                  >
                    <Meta
                      title={
                        <div>
                          <Button style={{ border: "none" }}>Signal</Button>
                        </div>
                      }
                    />
                  </Card>
                </Link>
              </Col>
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 3, offset: 1 }}
              // style={{ padding: "5%" }}
              >
                <Link to={{
                  pathname: "Track",
                  search: `?station_id=${station_id}&station_name=${station_name}`
                }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={
                      <img
                        alt="Track Circuit"
                        src="/TrackCircuit.jpg"
                      />
                    }
                  >
                    <Meta
                      title={
                        <Button style={{ border: "none" }}>
                          Track Circuit
                        </Button>
                      }
                    />
                  </Card>
                </Link>
              </Col>
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 3, offset: 1 }}
              // style={{ padding: "5%" }}
              >
                <Link
                  to={{
                    pathname: "AxleCounter",
                    search: `?station_id=${station_id}&station_name=${station_name}`,
                  }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={
                      <img alt="Axle Counter"
                        src="/AxleCounter.jpg" />}>
                    <Meta
                      title={
                        <Button style={{ border: "none" }}>
                          Axle Counter
                        </Button>
                      }
                    />
                  </Card>
                </Link>
              </Col>
              <Col
                xs={{ span: 22, offset: 2 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 10, offset: 0 }}
                xl={{ span: 3, offset: 1 }}
              // style={{ padding: "5%" }}
              >
                <Link
                  to={{
                    pathname: "LCGate",
                    search: `?station_id=${station_id}&station_name=${station_name}`,
                  }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={<img alt="LC Gate"
                      src="/LCGate.jpg" />}>
                    <Meta
                      title={
                        <Button style={{ border: "none" }}>LC Gate</Button>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            </Row>
            {/* </Col> */}
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Outdoor;


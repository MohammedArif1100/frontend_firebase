import React, { useState } from "react";
import { Layout, Row, Col, Card, Typography, Divider, Modal } from "antd";
import { WarningOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Title from "antd/es/skeleton/Title";
import { useNavigate } from "react-router-dom";
// import AlertTab from "./Alert/Alert";

const { Content } = Layout;
const { Meta } = Card;

function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}
function NormalLight({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="normaltraffic-light"
      style={{ backgroundColor }}
    />
  );
}

function DistantLight({ backgroundColor }) {
  return (
    <div className="distant">
      <span className="circle1" style={{ backgroundColor }}></span>
      <span className="circle2">
        <span
          style={{
            fontSize: "13px",
            position: "absolute",
            bottom: "1px",
            left: "2px",
          }}>
          C
        </span>
      </span>
    </div>
  );
}
function NormalDistantLight({ backgroundColor }) {
  return (
    <div className="distant">
      <span className="circleP">
        <span
          style={{
            fontSize: "13px",
            position: "absolute",
            bottom: "1px",
            left: "2px",
            fontWeight: "bold",
          }}>
          P
        </span>
      </span>
    </div>
  );
}
function ShuntLight({ backgroundColor }) {
  return (
    <div className="distant">
      <div className="shuntlight">
        <div className="dot1 top-left1"></div>
        <div className="dot1 bottom-right1"></div>
        <div className="dot1 bottom-left1"></div>
      </div>
    </div>
  );
}
const PlatformLight = ({ backgroundColor }) => {
  return (
    <div
      aria-hidden={true}
      className="traffic-light-platform"
      style={{ backgroundColor }}
    />
  );
};
const Octagon = ({ backgroundColor }) => {
  return (
    <>
      <div className="octagon">
        <div className="distantO"></div>
      </div>
      <div className="circle" style={{ backgroundColor }}></div>
    </>
  );
};
const Octagon1 = ({ backgroundColor }) => {
  return (
    <>
      <div className="octagon1">
        <div className="distantO"></div>
      </div>
      <div className="circle11" style={{ backgroundColor }}></div>
    </>
  );
};
const Octagon13 = ({ backgroundColor }) => {
  return (
    <>
      <div className="octagon13">
        <div className="distantO"></div>
      </div>
      <div className="circle13" style={{ backgroundColor }}></div>
    </>
  );
};
function DistantLightO() {
  return <div className="distantL"></div>;
}

const SignalTab = ({ layout = "vertical" }) => {
  const navigate = useNavigate();
  const [Greencolor, setGreencolor] = useState("green");
  const [RedColor, setRedcolor] = useState("red");
  const [YellowColor, setYellowcolor] = useState("yellow");
  const [LightYellowColor, setLightYellowcolor] = useState("lightyellow");
  const [isAlertRealDataModalOpen, setisAlertRealDataModalOpen] =
    useState(false);

  const handleAlertRealData = () => {
    setisAlertRealDataModalOpen(true);
  };
  const handleOk2 = () => {
    setisAlertRealDataModalOpen(false);
  };
  const handleCancel2 = () => {
    setisAlertRealDataModalOpen(false);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Content style={{ padding: "2%" }}>
        <Row>
          <Col span={24}>
            <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>
              Signal
            </Typography>
          </Col>
        </Row>

        <Divider
          style={{
            backgroundColor: "grey",
            height: "4px",
            marginTop: "3px",
          }}
        />
        <Row>
          <Col span={24}>
            <Row gutter={16} style={{ marginTop: "1%" }}>
              {/*1. 4 aspect */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  onClick={handleAlertRealData}
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                            // onClick={handleAlertRealData}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined
                            style={{ fontSize: "15px" }}
                            // onClick={handleAlertRealData}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={YellowColor} />
                      <Light backgroundColor={RedColor} />
                      <Light backgroundColor={LightYellowColor} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
                <Modal
                  open={isAlertRealDataModalOpen}
                  onOk={handleOk2}
                  onCancel={handleCancel2}
                  width={"100%"}
                  footer={null}
                  style={{ paddingTop: "3%" }}>
                  {/* <AlertTab /> */}
                </Modal>
              </Col>

              {/* 2. 3 aspect */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={YellowColor} />
                      <Light backgroundColor={RedColor} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*3. 2 aspect */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={YellowColor} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*4. Color light distant signal */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{
                  marginBottom: "2%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={YellowColor} />
                      <Light backgroundColor={RedColor} />
                      <DistantLight backgroundColor={RedColor} />
                    </div>
                  </div>

                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*5. Color light distant signal */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={YellowColor} />
                      <Light backgroundColor={RedColor} />
                      <DistantLight backgroundColor={YellowColor} />
                    </div>
                  </div>
                  <div>
                    <Row style={{ position: "absolute", bottom: 0 }}>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*6. Shunt */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div className="shunt">
                      <span
                        className="dot top-left"
                        style={{ backgroundColor: "red" }}></span>
                      <span
                        className="dot bottom-right"
                        style={{ backgroundColor: "yellow" }}></span>
                      <span
                        className="dot bottom-left"
                        style={{ backgroundColor: "green" }}></span>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*7. Starter signal */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      {/* <Light backgroundColor={YellowColor} /> */}
                      <ShuntLight />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*8. Normal aspect */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div>
                      <NormalLight backgroundColor={Greencolor} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*9. Normal aspect of rajdhani route*/}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      <Light backgroundColor={Greencolor} />
                      <NormalDistantLight backgroundColor={RedColor} />
                      {/* <Light backgroundColor={YellowColor} /> */}
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*10. Junction Route Indicator */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      className={[
                        "traffic-light-container-platform1",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical1",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={YellowColor} />
                    </div>
                    <div
                      className={[
                        "traffic-light-container-platform2",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical2",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={YellowColor} />
                    </div>
                    <div
                      className={[
                        "traffic-light-container-platform3",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical3",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={YellowColor} />
                      <PlatformLight backgroundColor={RedColor} />
                    </div>
                    <Octagon backgroundColor={RedColor} />

                    <div
                      style={{ top: "-245px" }}
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      <DistantLightO />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*11. Junction Route Indicator right */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      className={[
                        "traffic-light-container-platform11",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical11",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={YellowColor} />
                    </div>
                    <Octagon1 backgroundColor={RedColor} />
                    <div
                      style={{ top: "-95px" }}
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      <DistantLightO />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*12.  Junction Route Indicator left */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      className={[
                        "traffic-light-container-platform12",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical11",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={YellowColor} />
                    </div>
                    <Octagon1 backgroundColor={RedColor} />
                    <div
                      style={{ top: "-95px" }}
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      <DistantLightO />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*13.Junction Route Indicator left and right*/}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am1
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div
                      className={[
                        "traffic-light-container-platform13R",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical11",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={YellowColor} />
                    </div>
                    <div
                      className={[
                        "traffic-light-container-platform13L",
                        layout === "vertical" &&
                          "traffic-light-container-platform--vertical11",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={RedColor} />
                      <PlatformLight backgroundColor={Greencolor} />
                      <PlatformLight backgroundColor={YellowColor} />
                    </div>

                    <Octagon13 backgroundColor={RedColor} />
                    <div
                      style={{ top: "-172px" }}
                      aria-live="polite"
                      className={[
                        "traffic-light-container",
                        layout === "vertical" &&
                          "traffic-light-container--vertical",
                      ]
                        .filter((cls) => !!cls)
                        .join(" ")}>
                      <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      <DistantLightO />
                    </div>
                  </div>

                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*14. Starter signal1 */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div className={"shunt14"}>
                      <span
                        className="dot14"
                        style={{
                          backgroundColor: "yellow",
                          marginTop: "-50px",
                          marginLeft: "20px",
                        }}></span>
                      <span
                        className="dot14"
                        style={{
                          backgroundColor: "red",
                          marginTop: "-5px",
                          marginLeft: "5px",
                        }}></span>
                      <span
                        className="dot14"
                        style={{
                          backgroundColor: "green",
                          marginTop: "-5px",
                          marginLeft: "80px",
                        }}></span>
                      {/* <Light backgroundColor={Greencolor} />
                      <Light backgroundColor={RedColor} />
                      <Light backgroundColor={Greencolor} /> */}
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              {/*15. Starter signal2 */}
              <Col
                xs={{ span: 12, offset: 0 }}
                sm={{ span: 6, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                xxl={{ span: 4, offset: 0 }}
                style={{ marginBottom: "2%" }}>
                <Card
                  headStyle={{ padding: "5%", border: 0 }}
                  bordered={false}
                  bodyStyle={{ padding: "0px" }}
                  style={{ height: "260px" }}
                  title={
                    <>
                      <Row>
                        <Col
                          span={16}
                          style={{ textAlign: "left", fontSize: "15px" }}>
                          S20
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <WarningOutlined
                            style={{
                              fontSize: "1em",
                            }}
                          />
                        </Col>
                        <Col
                          span={4}
                          style={{ textAlign: "right", fontSize: "15px" }}>
                          {" "}
                          <InfoCircleOutlined style={{ fontSize: "15px" }} />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            textAlign: "right",
                            padding: "2%",
                            paddingBottom: "5%",
                            fontSize: "12px",
                            color: "grey",
                          }}>
                          {" "}
                          17/01/2024 12:30 Am
                        </Col>
                      </Row>
                    </>
                  }>
                  <div className="wrapper">
                    <div>
                    <div id="outer">
                      <div id="inner">&nbsp;</div>
                    </div>
                    <div id="lower"></div>
                    </div>
                    <span
                      className="dot14"
                      style={{
                        backgroundColor: "yellow",
                        marginTop: "-180px",
                        marginLeft: "-30px",
                      }}></span>
                    <span
                      className="dot14"
                      style={{
                        backgroundColor: "red",
                        marginTop: "-80px",
                        marginLeft: "-70px",
                      }}></span>
                    <span
                      className="dot14"
                      style={{
                        backgroundColor: "green",
                        marginTop: "-80px",
                        marginLeft: "70px",
                      }}></span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <Row>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        {" "}
                        C: 107.9 mA
                      </Col>
                      <Col
                        span={11}
                        style={{
                          textAlign: "center",
                          // padding: "5%",
                          fontSize: "12px",
                          color: "grey",
                        }}>
                        V: 118.3 V
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

// route signal with responssive component //
// /item.id == 5 ?     
// <>
// {/* Junction Route Indicator right */}
//  <div className="callOnRouteSignal">
// <div className="wrapper">
//   <div
//     className={[
//       "traffic-light-container-platform11",
//       layout === "vertical" &&
//       "traffic-light-container-platform--vertical11",
//     ]
//       .filter((cls) => !!cls)
//       .join(" ")}>
//     <PlatformLight backgroundColor={WhiteColor} />
//     <PlatformLight backgroundColor={WhiteColor} />
//     <PlatformLight backgroundColor={WhiteColor} />
//     <PlatformLight backgroundColor={WhiteColor} />
//   </div>
//   <Octagon1 backgroundColor={RedColor} />
//   <div
//     style={{ top: "-95px" }}
//     aria-live="polite"
//     className={[
//       "traffic-light-container",
//       layout === "vertical" &&
//       "traffic-light-container--vertical",
//     ]
//       .filter((cls) => !!cls)
//       .join(" ")}>
//     <Light backgroundColor={GreenColor} />
//     <Light backgroundColor={YellowColor} />
//     <Light backgroundColor={RedColor} />
//     <DistantLightO />
//   </div>
// </div>
// </div> 
// </>
//  : item.id == 6 ?     
//     <>
// {/* Junction Route Indicator Left */}
// <div className="callOnRouteSignal">
// <div className="wrapper">
//   <div
//     className={[
//       "traffic-light-container-platform12",
//       layout === "vertical" &&
//       "traffic-light-container-platform--vertical11",
//     ]
//       .filter((cls) => !!cls)
//       .join(" ")}>
//     <PlatformLight backgroundColor={WhiteColor} />
//     <PlatformLight backgroundColor={WhiteColor} />
//     <PlatformLight backgroundColor={WhiteColor} />
//     <PlatformLight backgroundColor={WhiteColor} />
//   </div>
//   <Octagon1 backgroundColor={RedColor} />
//   <div
//     style={{ top: "-95px" }}
//     aria-live="polite"
//     className={[
//       "traffic-light-container",
//       layout === "vertical" &&
//       "traffic-light-container--vertical",
//     ]
//       .filter((cls) => !!cls)
//       .join(" ")}>
//     <Light backgroundColor={GreenColor} />
//     <Light backgroundColor={YellowColor} />
//     <Light backgroundColor={RedColor} />
//     <DistantLightO />
//   </div>
// </div>
// </div>
// </>


// route signal with responssive css //
// .callOnRouteSignal{
//   /* margin: 3% 0% -13%; */
//   margin: 3% 0% -21%;
// }
// .distantL::before {
// content: "";
// position: absolute;
// left: 10px;
// top: 80px;
// height: 40px;
// width: 8px;
// box-shadow: 0 0 8px;
// box-sizing: unset !important;
// }
export default SignalTab;

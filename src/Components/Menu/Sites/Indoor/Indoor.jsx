import React from "react";
import { Layout, Row, Col, Card, Typography, Button } from "antd";
import { Divider } from "antd";
import { Link, useLocation } from "react-router-dom";
const { Meta } = Card;
const { Content } = Layout;
const Indoor = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var station_id = queryParams.get("stationid");
  var station_name = queryParams.get("stationname");
  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Content style={{ padding: "2%" }}>
          {/* <Row>
            <Col span={24}>
              <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                {localStorage.getItem("stationName")}
              </Typography>
            </Col>
          </Row> */}
          {/* <Divider
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
                <Typography style={{ fontSize: "20px", fontWeight: "700" }}>Indoor</Typography>
              </Col>
            </Row>

            {/* <Col 
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 10, offset: 0 }}
            lg={{ span: 10, offset: 0 }}
            xl={{ span: 16, offset: 2 }}
            > */}
            <Row gutter={[8, 16]}>
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
                    pathname: "IPS",
                    search: `?station_id=${station_id}&station_name=${station_name}`,
                  }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={
                      <>
                        <img
                          alt="IPS"
                          src="/IPS.jpg"
                        />
                      </>
                    }>
                    <Meta
                      title={<Button style={{ border: "none" }}>IPS</Button>}
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
                    pathname: "Relay",
                    search: `?station_id=${station_id}&station_name=${station_name}`,
                  }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={<img alt="Relay"
                      src="/Relay.jpg" />}>
                    <Meta
                      title={
                        <Button style={{ border: "none" }}>Relay</Button>
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
                    pathname: "Battery",
                    search: `?station_id=${station_id}&station_name=${station_name}`,
                  }}>
                  <Card
                    className="cardView"
                    style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}
                    cover={<img alt="Battery"
                      src="/Battery.jpg" />}>
                    <Meta
                      title={
                        <Button style={{ border: "none" }}>Battery</Button>
                      }
                    />
                  </Card>
                </Link>
              </Col>
              
              {/* not needed in indoor */}
              {/* <Col
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
              </Col> */}
              {/* not needed in indoor */}



              {/* flip card */}
              {/* <Col
               xs={{ span: 22, offset: 2 }}
               sm={{ span: 24, offset: 0 }}
               md={{ span: 10, offset: 0 }}
               lg={{ span: 10, offset: 0 }}
               xl={{ span: 3, offset: 1 }}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <Card title="Front Content"  style={{ textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 1)" }}>
                        This is the front of the card.
                      </Card>
                    </div>
                    <div className="flip-card-back">
                      <Card title="Back Content">
                        This is the back of the card.
                      </Card>
                    </div>
                  </div>
              </div>
              </Col> */}
              {/* flip card */}
            </Row>
            {/* </Col> */}
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Indoor;


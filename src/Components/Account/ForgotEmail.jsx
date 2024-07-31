import React, { useState } from "react";

import { Label, Input, Select, Space, Cascader, Form, Checkbox, Typography } from "antd";

import { Button, Card } from "antd";
import { Row, Col } from "antd";
import { createFromIconfontCN, LockOutlined, UserOutlined} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import { PageHeader } from "antd";
import { Image, message } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import authService from "../Authentication/authService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Authentication/ApiCall";
import axios from "axios";

const { Header, Footer, Sider, Content } = Layout;
const URL = process.env.REACT_APP_API_KEY;

function ForgotEmail() {
  document.title = "RDPMS - Email";

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  //console.log("email login");

  const onFinish = (event) => {
    // event.preventDefault();
    axios
      .get(URL + "/password/forgotpassword_linksend?mail=" + event.email)
      .then((response) => {
        if (response.data.issuccess === true) {
          message.success(response.data.msg);
          form.resetFields();
           navigate("/");
          //  navigate("/ForgotPasswordMsg");
        } else if (response.data.issuccess === false) {
          //console.log("log");
          if (response.status === 0) {
            alert("Could not connect with server. Try after sometime");
            message.warning(
              "Could not connect with server. Try after sometime"
            );
          } else {
            message.warning(response.data.msg);
          }
        }
      })
      .catch((err) => {
        //console.log("err", err.response.data.msg);
        message.warning(err.response.data.msg);
      });
  };
  const onFinishFailed = () => {
    //console.log("Login Failed");
  };


  return (

    <Layout style={{ backgroundColor: "white", height: "100vh" }}>
    <Header className="loginHeader">
      <div className="logo" />
      <Typography style={{ paddingTop: "10px", fontWeight: "bold", fontSize: "15px", justifyContent: "center", textAlign: "center", color: "white" }}>
        REMOTE DIAGNOSTIC AND PREDICTIVE  MAINTENANCE SYSTEM
        </Typography>
      {/* <div style={{ textAlign: "center", color: "white" }}>
        REMOTE DIAGNOSTIC AND PREDICTIVE  MAINTENANCE SYSTEM
      </div> */}
    </Header>
    <Content>

      <Row style={{ height: "90vh", justifyContent: "center" }}>
      <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
        <Card className="dashboardCard" hoverable bordered={true} title="Forgot Password" style={{ fontWeight: "bold", fontSize: "15px", justifyContent: "center", textAlign: "center", color: "white", backgroundColor:"whitesmoke", boxShadow: "rgb(191, 189, 206) 0px 0px 5px 5px" }}>
            <Form
              form={form}
              style={{ width: "100%" }}
              name="basic"
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
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col className="gutter-row " span={4}>
                  <Image
                    preview={false}
                    className="gutter-row bottom-space"
                    src="caliber_logo_no_background.png"
                    style={{ backgroundColor: "white" }}
                  ></Image>
                </Col>
              </Row>
              <Form.Item
                className="top-space"
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please Enter your Email!" },
                  { type: "email", warningOnly: true },
                  { type: "string", min: 6 },
                ]}
              >
                <Input
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  style={{
                    backgroundColor: "#3e3a75",
                    border: "none",
                    width: "100%",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Continue
                </Button>
              </Form.Item>
              <Form.Item
                // wrapperCol={{
                //   xs: { span: 24, offset: 0 },
                //   sm: { span: 12, offset: 8 },
                //   md: { span: 12, offset: 8 },
                //   lg: { span: 8, offset: 8 },
                //   xl: { span: 16, offset: 8 },
                // }}
                style={{ marginBlock: '5px'}}
              >
                <Link
                  to={"/Login"}
                  className="login-form-forgot"
                >
                 Back to Sign in
                </Link>
              </Form.Item>
            </Form>
       </Card>
       </Col>
       </Row>
    </Content>
    <Footer className="custom-Footer">
      <div className="logo" />
      <div style={{ textAlign: "center", color: "black" }}>
        Railways | all right reserved
      </div>
    </Footer>
  </Layout>
  );
}

export default ForgotEmail;

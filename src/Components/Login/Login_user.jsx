import React, { useState } from "react";
import { Component } from "react";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { PlusOutlined, LockOutlined } from "@ant-design/icons";
import { MinusOutlined } from "@ant-design/icons";
import { Label, Input, Select, Space, Cascader, Form, Checkbox, Typography, Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import { Button } from "antd";
import { Row, Col } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import { PageHeader } from "antd";
import { Image, message } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import authService from "../Authentication/authService";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/skeleton/Title";

const { Header, Footer, Sider, Content } = Layout;

function Login_user() {
  document.title = "RDPMS - Login";
  const [form] = Form.useForm();


  const navigate = useNavigate();

  const onFinish = (event) => {
    // event.preventDefault();
    authService
      .login(event.Email, event.password, event.remember)
      .then((response) => {
        if (response.status === 200) {
          // navigate("/");
          //console.log("roles", jwtDecode(response.data.jwt_token).Roles);

          if (jwtDecode(response.data.jwt_token).Roles === "Admin") {
            return navigate("/Admin");
          }
          if (jwtDecode(response.data.jwt_token).Roles === "Station Incharge") {
            return navigate("/StationIncharge");
          }
          if (jwtDecode(response.data.jwt_token).Roles === "Employee") {
            return navigate("/Employee");
          }
          else {
            //console.log("else", jwtDecode(response.data.jwt_token).Roles);
            // message.warning("response.data");
            // navigate("/");
          }
        } else {
          // if (response.status === 401) {
          //   // alert("User Not Found");
          //   return message.warning("User Not Found");
          // }
          if (response.status === 0) {
            alert("Could not connect with server. Try after sometime");
            message.warning(
              "Could not connect with server. Try after sometime"
            );
          } else {
            message.error(response.data);
          }
        }
      })
      .catch((err) => {
        message.warning(err);
        //console.log("errr", err);
        if (err.status === 0) {
          message.error("Server error");
        } else {
          message.error(err.msg);
        }
      });
  };
  const onFinishFailed = () => {
    //console.log("Login Failed");
    // message.error("Login Failed");
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
      <Content >
        <Row style={{ height: "90vh", justifyContent: "center" }}>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card className="dashboardCard" bordered={true} style={{ fontWeight: "bold", fontSize: "15px", justifyContent: "center", textAlign: "center", color: "white", backgroundColor:"whitesmoke", boxShadow: "rgb(191, 189, 206) 0px 0px 5px 5px" }} title="SIGN IN">
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
                      src="caliber_logo_no background.png"
                      style={{ backgroundColor: "white" }}
                    ></Image>
                    {/* <Typography style={{ fontWeight: "bold",display: "flex", justifyContent: "center"  }}>
                    Sign In
                  </Typography> */}
                  </Col>
                </Row>
                <Form.Item
                  className="top-space"
                  label="Email"
                  name="Email"
                  rules={[
                    { required: true, message: "Please Enter your Email!" },
                    { type: "email", warningOnly: true },
                    { type: "string", min: 6 },
                  ]}
                  style={{ marginBlock: '8px' }}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  tooltip="Account will be locked after 5 failed attempts"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter your password!",
                    },
                    { type: "password", warningOnly: true },
                    { type: "string", min: 8 },
                  ]}
                  style={{ marginBlock: '8px' }}
                >
                  <Input.Password
                    type="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 12, offset: 8 },
                    md: { span: 12, offset: 8 },
                    lg: { span: 8, offset: 8 },
                    xl: { span: 16, offset: 8 },
                  }}
                  style={{ marginBlock: '5px' }}
                >
                  <Link
                    to={"/Forgotpassword"}
                    className="login-form-forgot"
                  >
                    Forgot Password?
                  </Link>
                </Form.Item>

                <Form.Item style={{ textAlign: "center", marginBlock: '5px' }}>
                  <Button
                    style={{
                      backgroundColor: "#3e3a75",
                      border: "none",
                      width: "80%",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Continue
                  </Button>
                </Form.Item>
                {/* currently sigup not needed */}
                {/* <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 12, offset: 8 },
                  md: { span: 12, offset: 8 },
                  lg: { span: 12, offset: 8 },
                  xl: { span: 16, offset: 8 },
                }}
                style={{ display: "center" }}
              >
                <Typography style={{ display: "inline" }}>Don't have an account? </Typography>
                <Link
                  to={"/SignUp"}
                  className="login-form-forgot"
                  href=""
                  target="_blank"
                  style={{ display: "inline" }}
                >
                  Sign Up
                </Link>
              </Form.Item> */}
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

export default Login_user;

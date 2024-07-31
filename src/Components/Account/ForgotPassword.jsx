import React, { useState, useEffect } from "react";

import { Input, Form } from "antd";

import { Button } from "antd";

import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { Image, message } from "antd";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import authService from "../Authentication/authService";
import jwtDecode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { Empty, Row, Col } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";


import axios from "axios";
import moment from "moment/moment";

const { Header, Footer, Sider, Content } = Layout;
const URL = process.env.REACT_APP_API_KEY;

function ForgotPassword() {

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  document.title = "RDPMS - ForgotPassword";
  const location = useLocation();
  const [email, setemail] = useState();

  const navigate = useNavigate();
  // const [issuccess, setIssuccess] = useState(true);
  const [issuccess, setissuccess] = useState(true);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    // setcurrentPath(location.pathname);
    // usesearchParams.get("email");
   
   
    setemail(query.get("email"));

    axios
      .get(
        URL +
          "/password/resetPassword_linkexpiryCheck?email=" +
          query.get("email") +
          "&&enc1=" +
          query.get("enc1") +
          "&&enc2=" +
          query.get("enc2") +
          "&&enc3=" +
          query.get("enc3")
      )
      .then((response) => {
      
        if (response.data.issuccess === true) {
        
          // setTimeout(() => {
          //   setissuccess(false);
          // }, 2000);
          setissuccess(false);
          ////console.log("qq", response.data);
          // message.success(response.data.msg);
        }
      });
  }, [location]);

  const onFinish = (event) => {
    // event.preventDefault();
    axios
      .put(URL + "/password/resetpasswordUpdate", {
        email: email,
        Password: event.confirm,
      })
      .then((response) => {
        if (response.data.issuccess === true) {
          message.success(response.data.msg);
          // navigate("/");
          navigate("/Login");
        } else {
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
        message.warning(err);
      });

  };
  const onFinishFailed = () => {
    //console.log("Login Failed");
  };

  return (
    <>
    <Layout style={{ backgroundColor: "white", height: "100vh" }}>
        <Header className="custom-header">
          <div className="logo" />
          <Typography style={{ paddingTop: "10px", fontWeight: "bold", fontSize: "15px", justifyContent: "center", textAlign: "center", color: "white" }}>
        REMOTE DIAGNOSTIC AND PREDICTIVE  MAINTENANCE SYSTEM
        </Typography>
          {/* <div style={{ textAlign: "center", color: "white" }}>
          REMOTE DIAGNOSTIC AND PREDICTIVE  MAINTENANCE SYSTEM
          </div> */}
        </Header>
        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "12em",
              fontSize:"16px"
            }}
          >
            <p>Change Your password</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // marginTop: "3em",
            }}
          >
            <Form
              form={form}
              layout={formLayout}
              style={{ width: "30%" }}
              name="basic"
              // onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="password"
                label=" New Password"
                rules={[
                  {
                    required: true,
  
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be more than 6 Character",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
  
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ border: "none" }}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link 
             to={"/Login"}
             className="login-form-forgot"
            >Back to Sign in</Link>
          </div>
        </Content>
        <Footer className="custom-Footer">
          <div className="logo" />
          <div style={{ textAlign: "center", color: "white" }}>
            Railways | all right reserved
          </div>
        </Footer>
      </Layout>
    </>
  );
}

export default ForgotPassword;

import React from "react";
import { Input, Form, Typography } from "antd";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import { Row, Col } from "antd";
import { Layout } from "antd";
import { Image, message } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Content } = Layout;
const URL = process.env.REACT_APP_API_KEY;
const { Header, Footer } = Layout;
const ForgotEmailMsg=()=>{
    return (
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
          marginTop: "15em",
        }}
      >
        <div
          style={{
            borderLeft: "5px solid #73e689", 
            marginLeft: "15px",
            padding: "0 15px", 
          }}
        >
          <p style={{fontSize:"18px"}}>Password Change Email Sent On Your Given Email</p>
          <p style={{fontSize:"18px"}}>Address Continue From Email to Change password</p>
        </div>
      </div>
    </Content>
          <Footer className="custom-Footer">
            <div className="logo" />
            <div style={{ textAlign: "center", color: "white" }}>
              Railways | all right reserved
            </div>
          </Footer>
        </Layout>
      );
}
export default ForgotEmailMsg;
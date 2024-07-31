import React, { useState, useEffect } from "react";
import { Empty, Row, Col, message } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import axiosClient from "../Authentication/ApiCall";
const URL = process.env.REACT_APP_API_KEY;

function AccountActivation() {
  const location = useLocation();
  const navigate = useNavigate();
  const usesearchParams = useSearchParams();
  const [isSuccess, setisSuccess] = useState(false);
  const [currentPath, setcurrentPath] = useState(location.pathname);
  const [searchParams, setSearchParams] = useSearchParams();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    setcurrentPath(location.pathname);
    setisSuccess(true);

    // usesearchParams.get("email");

    axios
      .put(URL + "/registration/verifyUserAccount", {
        email: query.get("email"),
        enc1: query.get("enc1"),
      })
      .then((response) => {
        if (response.data.issuccess === true) {
          //console.log("login success");
          setTimeout(() => {
            message.success(response.data.msg);
            setisSuccess(false);
            // Navigate("/Login");
            navigate("../../Login");
          }, 2000);

          //console.log(response);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((response) => {
        message.warning(response.data.msg);
      });
  }, [location]);

  return (
    <Row
      align="middle"
      justify="center"
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      {isSuccess ? (
        <Col span={32}>
          <Empty description="Activating Your Account">
            <LoadingOutlined />
          </Empty>
        </Col>
      ) : (
        <Col span={32}>
          <Empty description="Account has been Activated">
            <CheckCircleOutlined />
          </Empty>
        </Col>
      )}
    </Row>
  );
}

export default AccountActivation;

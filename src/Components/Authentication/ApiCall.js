import React from "react";
import axios from "axios";
import authService from "./authService";
import { json, Navigate, Redirect, useHistory } from "react-router-dom";
////http://ebc0238be013.ngrok.io
const axiosClient = axios.create({
  baseURL: https://firebase-be-theta.vercel.app,
});

axiosClient.interceptors.request.use(
  (config) => {
    ////console.log("auth",authService.getCurrentUser());
    // config..auth = authService.getCurrentUser();

    config.headers["authorization"] = authService.getCurrentUser();
    config.headers.refreshToken = authService.getCurrentRefreshToken();
    if (authService.isAuthenticateduser()) {
      return config;
    } else {
      return <Navigate to="/Login" replace />;
    }
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response) {
      // Request made and server responded
     //console.log("errt", error);
      ////console.log(error.response.data);

      if (error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      //console.log(error.request);
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      //console.log("Error ff", error);

      return Promise.reject(error);
    }
  }
);

export default axiosClient;

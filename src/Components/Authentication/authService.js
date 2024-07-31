import axios from "axios";
import jwtDecode from "jwt-decode";
import axiosClient from "./ApiCall";
import moment, { utc } from "moment";
import { message } from "antd/lib";
import { Navigate } from "react-router-dom";

// http://192.168.10.222:4001/api/userlogin/login
const API_URL = process.env.REACT_APP_API_KEY;
class AuthService {
  login(Email, Password, Remember) {
    return axios
      .post(API_URL + "/userlogin/login", {
        username: Email,
        pass: Password,
        rem: Remember,
        from: false,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.jwt_token));
          return response;
        }
      })
      .catch((err) => {
        if (!err.response) {
          return "Network Error";
        } else {
          return err.response;
        }
      });
  }


  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userRfTkn");
    localStorage.removeItem("LinkToken");
    // this.redirectToLogin();
  }

  forgotPassword(email) {
    return axios
      .get(API_URL + "api/userlogin/forgetpassword", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (!error.response) {
          return "network Error";
        } else {
          return error.response;
        }
      });
  }

  checkPasswordLink(email, enc1, enc2, enc3) {
    return axios
      .get(API_URL + "api/userlogin/resetPassword_linkexpirycheck", {
        params: {
          email: email,
          enc1: enc1,
          enc2: enc2,
          enc3: enc3,
        },
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (!error.response) {
          return "network Error";
        } else {
          return error.response;
        }
      });
  }

  ResetPassword(email, password) {
    return axios
      .put(API_URL + "api/userlogin/resetpasswordUpdate", {
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (!error.response) {
          return "network Error";
        } else {
          return error.response;
        }
      });
  }

  isAuthenticateduser() {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === "undefined"
    ) {
      return false;
    }
    const jwtTkn = localStorage.getItem("user");

    const user = jwtDecode(jwtTkn);

    var utcSeconds = user.exp;

    var now = moment().unix();

    if (utcSeconds === null) {
      localStorage.removeItem("user");
      return false;
    }

    if (utcSeconds >= now) {
      return true;
    } else {
      // this.logout();
      // Navigate("/Login");
      //console.log("rr");
      return false;
      // return true;
    }
  }

  getUserName() {
    const user = jwtDecode(localStorage.getItem("user"));
    return user.Username;
  }

  getUserID() {
    const user = jwtDecode(localStorage.getItem("user"));
    return user.Userid;
  }
  
  getCurrentUserRole() {
    const userdata = jwtDecode(localStorage.getItem("user"));
    return userdata.Roles;
  }

  getCurrentUserReadOnly() {
    const userdata = jwtDecode(localStorage.getItem("user"));
    return userdata.Isreadonly;
  }

  getUserUploadImageLimit() {
    const userdata = jwtDecode(localStorage.getItem("user"));
    return userdata.Img;
  }

  getTrailPeriodStart() {
    const userdata = jwtDecode(localStorage.getItem("user"));
    return userdata.TrailFrom;
  }

  getTrailPeriodEnd() {
    const userdata = jwtDecode(localStorage.getItem("user"));
    return userdata.Trail_To;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getCurrentRefreshToken() {
    return JSON.parse(localStorage.getItem("userRfTkn"));
  }
  getUserprofileData() {
    const user = jwtDecode(localStorage.getItem("user"));
    return user.Userprofile;
  }

  getLinkToken() {
    return localStorage.getItem("LinkToken");
  }

  GetmoneyFormat(money) {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    return formatter.format(money);
  }

  GetmoneyFormatInternational(money, code) {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 2,
    });

    return formatter.format(money);
  }


  removeuser() {
    // Retrieve the username from local storage
    const username = this.getUserName();
  
    
    localStorage.removeItem("user");
    localStorage.clear();
  
   
    if (username) {
      message.warning(`${username} logged out successfully`);
    } else {
      message.warning("Logged out successfully");
    }
  }
    
}

export default new AuthService();

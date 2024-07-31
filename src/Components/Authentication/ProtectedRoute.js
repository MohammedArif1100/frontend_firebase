import React, { useEffect } from "react";
import { Route, Navigate, useRoutes } from "react-router-dom";
import authService from "../Authentication/authService";


function ProtectedRoute({ children, roles, ...rest }) {
  
  if (authService.isAuthenticateduser()) {
    const userRoles = authService.getCurrentUserRole();
    
    if(
      (roles !== undefined || roles !== null || roles !== "") &&
      userRoles !== null
    ) {
      if (roles.includes(userRoles) && authService.isAuthenticateduser()) {
        return children;
      } else {
        return <Navigate to="/Login" replace />;
      }
    } else {
      return <Navigate to="/Login" replace />;
    }
  } else {
    return <Navigate to="/Login" replace />;
  }
}

export default ProtectedRoute;

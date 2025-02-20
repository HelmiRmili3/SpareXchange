// ProtectedComponent.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UnauthorizedAccess from "./UnauthorizedAcess";
const ProtectedComponent = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <UnauthorizedAccess />;
  }
  return children;
};
export default ProtectedComponent;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Admincomponent() {
  const Adminauth = localStorage.getItem("admin");
  return Adminauth ? <Outlet /> : <Navigate to="/admin" />;
}

export default Admincomponent;

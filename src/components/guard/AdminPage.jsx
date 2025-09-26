// import { jwtDecode } from "jwt-decode";
// import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const AdminPage = (props) => {
  const userSelector = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userSelector.role !== "admin") {
    return <Navigate to="/" />;
  }

  if (token) {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  }

  return props.children;
};

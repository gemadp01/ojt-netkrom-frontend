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
    // exp merupakan waktu kedaluwarsa token dalam bentuk UNIX timestamp (detik, bukan milidetik)
    const { exp } = jwtDecode(token);

    // Date.now() menghasilkan timestamp saat ini dalam bentuk jumlah milidetik (ms) sejak 1 Januari 1970 UTC
    // exp * 1000 mengkonversi detik → milidetik.
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  }

  return props.children;
};

// import { jwtDecode } from "jwt-decode";
// import { Navigate } from "react-router-dom";

export const AdminPage = (props) => {
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  // if (token) {
  //   const { exp } = jwtDecode(token);
  //   if (Date.now() >= exp * 1000) {
  //     localStorage.removeItem("token");
  //     return <Navigate to="/login" />;
  //   }
  // }
  return props.children;
};

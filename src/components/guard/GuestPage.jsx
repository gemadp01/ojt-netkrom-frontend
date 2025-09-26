import { Navigate } from "react-router";

export const GuestPage = (props) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return props.children;
};

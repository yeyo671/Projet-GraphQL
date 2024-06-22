import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token || !username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

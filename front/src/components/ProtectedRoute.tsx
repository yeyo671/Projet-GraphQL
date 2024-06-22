import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Check if token and username exist
  if (!token || !username) {
    // Redirect to login if either token or username are missing
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

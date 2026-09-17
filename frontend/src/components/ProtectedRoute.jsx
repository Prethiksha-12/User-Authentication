import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

export default function ProtectedRoute({ allowedRoles }) {
  const user = authService.getUser();

  if (!authService.isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
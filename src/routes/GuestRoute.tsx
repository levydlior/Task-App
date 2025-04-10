import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function GuestRoute() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
}

export default GuestRoute;

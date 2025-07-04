import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const AdminRoute = () => {
  const { user } = useAuth();

  

  if (!user) {

    console.log("isnt admin component AdminRoute")
    return <Navigate to="/" />;
  }

  if (!user.admin) return <Navigate to="/dashboard" />;

  return <Outlet />;
};

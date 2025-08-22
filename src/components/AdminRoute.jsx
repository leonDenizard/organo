import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "./Loader";

export const AdminRoute = () => {
  const { backendUser, isLoading } = useAuth();

  if(isLoading) return <Loader/>

  if(backendUser.data.admin != true){
    return <Navigate to={"/admin"}/>
  }
  return <Outlet />;
};
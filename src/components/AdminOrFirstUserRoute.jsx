import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "./Loader";

export default function AdminOrFirstUserRoute (){
  const { backendUser, isFirstUser, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  const isAdmin = backendUser.data?.admin === true;

  console.log("IsAdmin?", isAdmin)
  console.log("IsFisrtsUser", isFirstUser)
  if (!isAdmin || !isFirstUser) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}

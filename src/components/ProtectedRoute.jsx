import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import Loader from "./Loader"

export const ProtectedRoute = () => {
    const { googleUser, backendUser, isLoading } = useAuth()

    

    if (isLoading){
        return <Loader/>
    }

    if(!googleUser){
        console.log("Não achei nada de google user", googleUser, backendUser)
        return <Navigate to="/"/>
    }
    

    return <Outlet />;
}
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import Loader from "./Loader"

export const ProtectedRoute = () => {
    const { user, isLoading } = useAuth()

    console.log("Protected", user)

    const outlet = (

        <Outlet />
    )

    if(isLoading){
        return <Loader/>
    }
    return user ?  outlet : <Navigate to="/" />
}
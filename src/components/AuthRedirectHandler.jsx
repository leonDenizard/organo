import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useEffect } from "react"
import Loader from "./Loader"
import Register from "../pages/Register";

const AuthRedirectHandler = () => {
  const { isLoading, isFirstUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isFirstUser === true) {
      navigate("/parameterization");
    }

  }, [isLoading, isFirstUser]);

  if (isLoading) return <Loader />;

  console.log("Estado do primeiro user vindo do Auth", isFirstUser)
  return <Register />;
};

export default AuthRedirectHandler
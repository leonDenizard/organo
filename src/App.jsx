import Signin from "./pages/Sigin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { checkUserExists } from "./services/firebase";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Schedule from "./pages/Schedule";

function App() {
  const { user } = useAuth()
  const [userExists, setUserExists] = useState(null)

  useEffect(() => {
    const verifyUser = async () => {
      if (user && user.uid) {
        const exists = await checkUserExists(user.uid)
        setUserExists(exists);
      }
    };
    verifyUser();
  }, [user]);
  
  console.log(user)

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/schedule" element={<Schedule />}/>
        </Route>
      </Routes>
    </Router>
  );
}


export default App;


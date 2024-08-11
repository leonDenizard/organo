import Signin from "./pages/Sigin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { checkUserExists } from "./services/firebase";

function App() {
  const { user } = useAuth()
  const [userExists, setUserExists] = useState(null)

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (user && user.uid) {
  //       const exists = await checkUserExists(user.uid)
  //       setUserExists(exists);
  //     }
  //   };
  //   verifyUser();
  // }, [user]);
  
  //console.log(user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/register"
          element={userExists ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route path="/dashboard" element={user ? (userExists ? <Dashboard /> : <Navigate to="/register" />) : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}


export default App;

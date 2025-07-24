import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signin from "./pages/Sigin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import UserDetail from "./pages/UserDetail";
import Parameterization from "./pages/Parameterization"

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import AuthRedirectHandler from "./components/AuthRedirectHandler";

function App() {

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<AuthRedirectHandler />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/user/:uid" element={<UserDetail />} />
          <Route path="/parameterization" element={<Parameterization/>} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<UserDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

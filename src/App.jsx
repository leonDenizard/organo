import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signin from "./pages/Sigin";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import UserDetail from "./pages/UserDetail";
import Parameterization from "./pages/Parameterization";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import AuthRedirectHandler from "./components/AuthRedirectHandler";
import AdminOrFirstUserRoute from "./components/AdminOrFirstUserRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>

    <Toaster/>

      <Routes>
        <Route path={"/"} element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<AuthRedirectHandler />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/user/:uid" element={<UserDetail />} />
          <Route element={<AdminOrFirstUserRoute />}>
            <Route path="/parameterization" element={<Parameterization />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Parameterization />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Signin from "./pages/Sigin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import UserDetail from "./pages/UserDetail";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { AdminRoute } from "./components/AdminRoute";

function App() {
  const { googleUser, backendUser, isLoading } = useAuth();

  console.log("Dados do Google:", googleUser);
  console.log("Dados do back:", backendUser);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/user/:uid" element={<UserDetail />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<UserDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

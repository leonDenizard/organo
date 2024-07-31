import Signin from "./pages/Sigin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { user } = useAuth()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/register"
          element={user ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

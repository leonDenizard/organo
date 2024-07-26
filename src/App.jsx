import { useEffect, useState } from "react";
import Signin from "./pages/Sigin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/register"
          element={user ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

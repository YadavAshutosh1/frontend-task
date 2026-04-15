import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route 
          path="/login" 
          element={token ? <Navigate to="/dashboard" /> : <Login />} 
        />

        <Route 
          path="/register" 
          element={token ? <Navigate to="/dashboard" /> : <Register />} 
        />

        {/* 🔒 Protected Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* 🔁 Default Redirect */}
        <Route 
          path="*" 
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // ❌ Agar token ya user nahi hai → cleanup + login
  if (!token || !user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  try {
    // 🔥 optional: user parse check (data corrupt na ho)
    JSON.parse(user);
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
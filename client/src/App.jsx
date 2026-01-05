import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllExpenses from "./pages/AllExpenses";
import { useAuth } from "./context/AuthContext";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

// Protected Route
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" replace/>;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <AllExpenses />
          </PrivateRoute>
        }
      />

      <Route
        path="/add-expense"
        element={
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        }
      />

      <Route
        path="expenses/edit/:id"
        element={
          <PrivateRoute>
            <EditExpense />
          </PrivateRoute>
        }
      />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={
        <PublicRoute>
        <Login />
        </PublicRoute>
        } />
    </Routes>
  );
}

export default App;

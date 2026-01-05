import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { setUser, setUserToken, navigate } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "block bg-purple-900 p-2 rounded"
      : "block hover:bg-purple-800 p-2 rounded";

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setUserToken(null);
    navigate("/login");
  };

  return (
    <div className="-ml-64 md:ml-0 w-64 bg-purple-700 text-white min-h-screen p-5 space-y-6">
      <h1 className="text-2xl font-bold">ExpensePro</h1>

      <nav className="space-y-2 text-sm">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/expenses" className={linkClass}>
          Expenses
        </NavLink>

         <NavLink to="/add-expense" className={linkClass}>
          Add New Expense
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full text-left hover:bg-purple-800 p-2 rounded text-red-200"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

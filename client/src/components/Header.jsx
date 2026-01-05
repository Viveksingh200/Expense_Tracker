import { useAuth } from "../context/AuthContext";
import { CircleUserRound } from "lucide-react";

const Header = ({ search, setSearch }) => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow">
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-purple-600 rounded-full w-8 h-8">
            <CircleUserRound strokeWidth={1.5} size={40} color="white" />
          </div>

          <p className="text-sm font-medium">
            {user?.name || "User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

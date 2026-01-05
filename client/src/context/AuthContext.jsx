import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    null
  );

  const [userToken, setUserToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && storedToken) {
      setUser(JSON.parse(storedUser));
      setUserToken(storedToken);
    } else {
      setUser(null);
      setUserToken(null);
    }
  } catch (error) {
    console.error("Invalid user in localStorage", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } finally {
    setLoading(false);
  }
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userToken,
        setUserToken,
        navigate,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

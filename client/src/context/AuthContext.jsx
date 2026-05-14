import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authCookie = Cookies.get("auth");

    if (authCookie === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    if (email === "admin@example.com" && password === "admin123") {
      Cookies.set("auth", "true", {
        expires: 1,
      });

      setIsAuthenticated(true);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: "Invalid credentials",
    };
  };

  const logout = () => {
    Cookies.remove("auth");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

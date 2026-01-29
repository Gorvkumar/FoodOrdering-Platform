import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);






  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      { email, password },
      { withCredentials: true }
    );

    if (res.data.user) {
      setUser(res.data.user);
      setIsLoggedIn(true);
    }

    return res.data;
  };

  const register = async (fullName, email, password) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      { fullName, email, password },
      { withCredentials: true }
    );

    if (res.data.user) {
      setUser(res.data.user);
      setIsLoggedIn(true);
    }

    return res.data;
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/user/logout",
      {},
      { withCredentials: true }
    );

    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    register,
    logout,

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
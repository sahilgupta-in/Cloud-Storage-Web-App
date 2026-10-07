import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "cloudbox_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    // Temporary frontend authentication.
    // This will be replaced by the backend API.

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const loggedInUser = {
      id: "demo-user-1",
      name: email.split("@")[0],
      email,
      avatar: null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));

    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    if (password.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    setUser(newUser);

    return newUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

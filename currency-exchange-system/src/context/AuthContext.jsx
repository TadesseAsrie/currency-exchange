// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { localStorageService } from "../services/localStorageService";
import { mockUser } from "../services/mockData";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const storedUser = localStorageService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    // Mock authentication
    if (email === "admin@example.com" && password === "password") {
      const userData = { ...mockUser, email };
      if (!rememberMe) {
        sessionStorage.setItem("tempUser", JSON.stringify(userData));
      }
      setUser(userData);
      localStorageService.setUser(userData);
      toast.success("Login successful!");
      return true;
    }
    toast.error("Invalid credentials");
    return false;
  };

  const register = async (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      profileImage: null,
      role: "user",
    };
    setUser(newUser);
    localStorageService.setUser(newUser);
    toast.success("Registration successful!");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorageService.removeItem("user");
    sessionStorage.removeItem("tempUser");
    toast.success("Logged out successfully");
  };

  const updateProfile = async (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorageService.setUser(updatedUser);
    toast.success("Profile updated successfully");
    return true;
  };

  const changePassword = async (oldPassword, newPassword) => {
    // Mock password change
    toast.success("Password changed successfully");
    return true;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

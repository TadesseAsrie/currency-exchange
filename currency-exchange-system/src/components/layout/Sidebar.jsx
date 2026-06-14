// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiRepeat,
  FiUsers,
  FiTrendingUp,
  FiFileText,
  FiBell,
  FiSettings,
  FiUser,
  FiLogOut,
  FiDollarSign,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiHome },
  { path: "/currencies", label: "Currency Management", icon: FiGrid },
  { path: "/exchange-rates", label: "Exchange Rates", icon: FiTrendingUp },
  { path: "/converter", label: "Currency Converter", icon: FiRepeat },
  { path: "/transactions", label: "Exchange Transactions", icon: FiDollarSign },
  { path: "/customers", label: "Customers", icon: FiUsers },
  { path: "/reports", label: "Reports", icon: FiFileText },
  { path: "/notifications", label: "Notifications", icon: FiBell },
  { path: "/settings", label: "Settings", icon: FiSettings },
  { path: "/profile", label: "Profile", icon: FiUser },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="w-64 bg-white dark:bg-dark-200 h-screen fixed left-0 top-0 shadow-xl flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-dark-100">
        <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
          Currency Exchange
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Management System
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-6 py-3 mx-2 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "sidebar-link-active bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                  : "sidebar-link-inactive text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-100"
              }
            `}
          >
            <item.icon className="text-xl" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-dark-100">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100 transition-all mb-2"
        >
          {darkMode ? (
            <FiSun className="text-xl" />
          ) : (
            <FiMoon className="text-xl" />
          )}
          <span className="text-sm font-medium">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <FiLogOut className="text-xl" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

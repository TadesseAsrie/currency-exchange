// src/components/layout/MobileMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiX,
  FiHome,
  FiGrid,
  FiRepeat,
  FiUsers,
  FiTrendingUp,
  FiFileText,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiHome },
  { path: "/currencies", label: "Currency Management", icon: FiGrid },
  { path: "/exchange-rates", label: "Exchange Rates", icon: FiTrendingUp },
  { path: "/converter", label: "Currency Converter", icon: FiRepeat },
  { path: "/transactions", label: "Exchange Transactions", icon: FiTrendingUp },
  { path: "/customers", label: "Customers", icon: FiUsers },
  { path: "/reports", label: "Reports", icon: FiFileText },
  { path: "/notifications", label: "Notifications", icon: FiBell },
  { path: "/settings", label: "Settings", icon: FiSettings },
  { path: "/profile", label: "Profile", icon: FiUser },
];

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-200 shadow-xl transform transition-transform animate-slide-in">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2">
            <FiX className="text-xl" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-6 py-3 mx-2 rounded-lg
                ${
                  isActive
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-100"
                }
              `}
            >
              <item.icon className="text-xl" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;

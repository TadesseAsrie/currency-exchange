// src/components/layout/Header.jsx
import React from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { notifications } = useData();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="bg-white dark:bg-dark-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100"
        >
          <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <Link
            to="/notifications"
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100"
          >
            <FiBell className="text-xl text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </Link>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
              {user?.fullName?.charAt(0) || "A"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

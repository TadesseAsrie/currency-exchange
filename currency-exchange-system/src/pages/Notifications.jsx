// src/pages/Notifications.jsx
import React from "react";
import { useData } from "../context/DataContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { FiCheck, FiTrash2, FiBell } from "react-icons/fi";
import { formatDate } from "../utils/formatters";
import { NOTIFICATION_TYPE_ICONS } from "../utils/constants";

const Notifications = () => {
  const {
    notifications,
    markNotificationAsRead,
    deleteNotification,
    markAllAsRead,
  } = useData();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {unreadCount} unread notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="secondary" icon={FiCheck}>
            Mark All as Read
          </Button>
        )}
      </div>

      <Card>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <FiBell className="text-4xl text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg transition-all ${
                  notification.isRead
                    ? "bg-gray-50 dark:bg-dark-100"
                    : "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {NOTIFICATION_TYPE_ICONS[notification.type]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(notification.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                        title="Mark as read"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Notifications;

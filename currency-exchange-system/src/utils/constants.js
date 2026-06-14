// src/utils/constants.js
export const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "ETB",
  "AED",
  "SAR",
  "JPY",
  "CAD",
  "CHF",
  "CNY",
  "INR",
  "AUD",
];

export const TRANSACTION_STATUS = {
  COMPLETED: "Completed",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
};

export const TRANSACTION_STATUS_COLORS = {
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export const NOTIFICATION_TYPES = {
  TRANSACTION: "transaction",
  RATE_UPDATE: "rate_update",
  CUSTOMER: "customer",
  SYSTEM: "system",
};

export const NOTIFICATION_TYPE_ICONS = {
  transaction: "💰",
  rate_update: "📊",
  customer: "👤",
  system: "⚙️",
};

export const SETTINGS_OPTIONS = {
  language: ["English", "Spanish", "French", "Arabic"],
  currency: ["USD", "EUR", "GBP"],
  timezone: ["UTC-5", "UTC-4", "UTC+0", "UTC+1", "UTC+8"],
};

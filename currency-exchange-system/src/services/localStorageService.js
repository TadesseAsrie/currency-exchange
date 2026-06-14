// src/services/localStorageService.js
const STORAGE_KEYS = {
  CURRENCIES: "currencies",
  CUSTOMERS: "customers",
  TRANSACTIONS: "transactions",
  NOTIFICATIONS: "notifications",
  USER: "user",
  SETTINGS: "settings",
};

export const localStorageService = {
  // Generic get/set
  getItem: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
  },

  // Currencies
  getCurrencies: () => {
    return localStorageService.getItem(STORAGE_KEYS.CURRENCIES) || [];
  },

  setCurrencies: (currencies) => {
    localStorageService.setItem(STORAGE_KEYS.CURRENCIES, currencies);
  },

  // Customers
  getCustomers: () => {
    return localStorageService.getItem(STORAGE_KEYS.CUSTOMERS) || [];
  },

  setCustomers: (customers) => {
    localStorageService.setItem(STORAGE_KEYS.CUSTOMERS, customers);
  },

  // Transactions
  getTransactions: () => {
    return localStorageService.getItem(STORAGE_KEYS.TRANSACTIONS) || [];
  },

  setTransactions: (transactions) => {
    localStorageService.setItem(STORAGE_KEYS.TRANSACTIONS, transactions);
  },

  // Notifications
  getNotifications: () => {
    return localStorageService.getItem(STORAGE_KEYS.NOTIFICATIONS) || [];
  },

  setNotifications: (notifications) => {
    localStorageService.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },

  // User
  getUser: () => {
    return localStorageService.getItem(STORAGE_KEYS.USER);
  },

  setUser: (user) => {
    localStorageService.setItem(STORAGE_KEYS.USER, user);
  },

  // Settings
  getSettings: () => {
    return (
      localStorageService.getItem(STORAGE_KEYS.SETTINGS) || {
        language: "English",
        currency: "USD",
        timezone: "UTC+0",
        notificationsEnabled: true,
        emailAlerts: true,
      }
    );
  },

  setSettings: (settings) => {
    localStorageService.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  // Clear all
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};

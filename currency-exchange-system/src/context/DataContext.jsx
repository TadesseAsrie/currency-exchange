// src/context/DataContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { localStorageService } from "../services/localStorageService";
import {
  mockCurrencies,
  mockCustomers,
  mockTransactions,
  mockNotifications,
} from "../services/mockData";
import toast from "react-hot-toast";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    let storedCurrencies = localStorageService.getCurrencies();
    let storedCustomers = localStorageService.getCustomers();
    let storedTransactions = localStorageService.getTransactions();
    let storedNotifications = localStorageService.getNotifications();

    if (storedCurrencies.length === 0) {
      localStorageService.setCurrencies(mockCurrencies);
      storedCurrencies = mockCurrencies;
    }
    if (storedCustomers.length === 0) {
      localStorageService.setCustomers(mockCustomers);
      storedCustomers = mockCustomers;
    }
    if (storedTransactions.length === 0) {
      localStorageService.setTransactions(mockTransactions);
      storedTransactions = mockTransactions;
    }
    if (storedNotifications.length === 0) {
      localStorageService.setNotifications(mockNotifications);
      storedNotifications = mockNotifications;
    }

    setCurrencies(storedCurrencies);
    setCustomers(storedCustomers);
    setTransactions(storedTransactions);
    setNotifications(storedNotifications);
    setLoading(false);
  };

  // Currency CRUD
  const addCurrency = (currency) => {
    const newCurrency = {
      ...currency,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newCurrency, ...currencies];
    setCurrencies(updated);
    localStorageService.setCurrencies(updated);
    toast.success("Currency added successfully");
  };

  const updateCurrency = (id, updatedData) => {
    const updated = currencies.map((curr) =>
      curr.id === id ? { ...curr, ...updatedData } : curr,
    );
    setCurrencies(updated);
    localStorageService.setCurrencies(updated);
    toast.success("Currency updated successfully");
  };

  const deleteCurrency = (id) => {
    const updated = currencies.filter((curr) => curr.id !== id);
    setCurrencies(updated);
    localStorageService.setCurrencies(updated);
    toast.success("Currency deleted successfully");
  };

  // Customer CRUD
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
    };
    const updated = [newCustomer, ...customers];
    setCustomers(updated);
    localStorageService.setCustomers(updated);
    addNotification(
      "customer",
      "New Customer",
      `${customer.fullName} registered as new customer`,
    );
    toast.success("Customer added successfully");
  };

  const updateCustomer = (id, updatedData) => {
    const updated = customers.map((cust) =>
      cust.id === id ? { ...cust, ...updatedData } : cust,
    );
    setCustomers(updated);
    localStorageService.setCustomers(updated);
    toast.success("Customer updated successfully");
  };

  const deleteCustomer = (id) => {
    const updated = customers.filter((cust) => cust.id !== id);
    setCustomers(updated);
    localStorageService.setCustomers(updated);
    toast.success("Customer deleted successfully");
  };

  // Transaction CRUD
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `TRX${Date.now()}`,
      date: new Date().toISOString(),
    };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    localStorageService.setTransactions(updated);
    addNotification(
      "transaction",
      "New Transaction",
      `Transaction ${newTransaction.id} completed`,
    );
    toast.success("Transaction created successfully");
  };

  const updateTransaction = (id, updatedData) => {
    const updated = transactions.map((trans) =>
      trans.id === id ? { ...trans, ...updatedData } : trans,
    );
    setTransactions(updated);
    localStorageService.setTransactions(updated);
    toast.success("Transaction updated successfully");
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((trans) => trans.id !== id);
    setTransactions(updated);
    localStorageService.setTransactions(updated);
    toast.success("Transaction deleted successfully");
  };

  // Notifications
  const addNotification = (type, title, message) => {
    const newNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      isRead: false,
      date: new Date().toISOString(),
    };
    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    localStorageService.setNotifications(updated);
  };

  const markNotificationAsRead = (id) => {
    const updated = notifications.map((notif) =>
      notif.id === id ? { ...notif, isRead: true } : notif,
    );
    setNotifications(updated);
    localStorageService.setNotifications(updated);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter((notif) => notif.id !== id);
    setNotifications(updated);
    localStorageService.setNotifications(updated);
    toast.success("Notification deleted");
  };

  const markAllAsRead = () => {
    const updated = notifications.map((notif) => ({ ...notif, isRead: true }));
    setNotifications(updated);
    localStorageService.setNotifications(updated);
    toast.success("All notifications marked as read");
  };

  // Exchange Rate Management
  const updateExchangeRate = (currencyId, buyRate, sellRate) => {
    updateCurrency(currencyId, { buyRate, sellRate });
    const currency = currencies.find((c) => c.id === currencyId);
    addNotification(
      "rate_update",
      "Rate Updated",
      `${currency?.code} exchange rate has been updated`,
    );
  };

  const value = {
    currencies,
    customers,
    transactions,
    notifications,
    loading,
    addCurrency,
    updateCurrency,
    deleteCurrency,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    markNotificationAsRead,
    deleteNotification,
    markAllAsRead,
    updateExchangeRate,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

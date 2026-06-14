// src/pages/ExchangeTransactions.jsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import DataTable from "../components/common/DataTable";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { FiPlus, FiFilter } from "react-icons/fi";
import { formatCurrency, formatDate } from "../utils/formatters";

const ExchangeTransactions = () => {
  const { transactions, customers, currencies, addTransaction } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    fromCurrency: "",
    toCurrency: "",
    amount: "",
    status: "Pending",
  });
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const columns = [
    { key: "id", label: "Transaction ID", sortable: true },
    { key: "customerName", label: "Customer Name", sortable: true },
    { key: "fromCurrency", label: "From", sortable: true },
    { key: "toCurrency", label: "To", sortable: true },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value, row) => formatCurrency(value, row.fromCurrency),
    },
    { key: "exchangeRate", label: "Exchange Rate", sortable: true },
    {
      key: "convertedAmount",
      label: "Converted",
      sortable: true,
      render: (value, row) => formatCurrency(value, row.toCurrency),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value) => formatDate(value),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Completed"
              ? "bg-green-100 text-green-800"
              : value === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleCurrencyChange = () => {
    if (formData.fromCurrency && formData.toCurrency && formData.amount) {
      const from = currencies.find((c) => c.code === formData.fromCurrency);
      const to = currencies.find((c) => c.code === formData.toCurrency);
      if (from && to) {
        const rate = to.buyRate / from.sellRate;
        setExchangeRate(rate);
        const converted = parseFloat(formData.amount) * rate;
        setConvertedAmount(converted);
      }
    }
  };

  const handleSubmit = () => {
    const customer = customers.find((c) => c.id === formData.customerId);
    const fee = convertedAmount * 0.01;
    const transaction = {
      customerId: formData.customerId,
      customerName: customer?.fullName || "",
      fromCurrency: formData.fromCurrency,
      toCurrency: formData.toCurrency,
      amount: parseFloat(formData.amount),
      exchangeRate: exchangeRate,
      convertedAmount: convertedAmount,
      fee: fee,
      totalAmount: convertedAmount - fee,
      status: formData.status,
    };
    addTransaction(transaction);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      customerId: "",
      fromCurrency: "",
      toCurrency: "",
      amount: "",
      status: "Pending",
    });
    setExchangeRate(0);
    setConvertedAmount(0);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Exchange Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all currency exchange transactions
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={FiPlus}>
          New Exchange
        </Button>
      </div>

      <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6">
        <DataTable columns={columns} data={transactions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="New Exchange Transaction"
        size="lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <Select
            label="Customer"
            value={formData.customerId}
            onChange={(e) =>
              setFormData({ ...formData, customerId: e.target.value })
            }
            options={customers.map((c) => ({ value: c.id, label: c.fullName }))}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="From Currency"
              value={formData.fromCurrency}
              onChange={(e) => {
                setFormData({ ...formData, fromCurrency: e.target.value });
                setTimeout(handleCurrencyChange, 100);
              }}
              options={currencies
                .filter((c) => c.status === "active")
                .map((c) => ({ value: c.code, label: c.code }))}
              required
            />

            <Select
              label="To Currency"
              value={formData.toCurrency}
              onChange={(e) => {
                setFormData({ ...formData, toCurrency: e.target.value });
                setTimeout(handleCurrencyChange, 100);
              }}
              options={currencies
                .filter((c) => c.status === "active")
                .map((c) => ({ value: c.code, label: c.code }))}
              required
            />
          </div>

          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => {
              setFormData({ ...formData, amount: e.target.value });
              setTimeout(handleCurrencyChange, 100);
            }}
            required
          />

          {exchangeRate > 0 && (
            <div className="bg-gray-50 dark:bg-dark-100 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Exchange Rate:</span>
                <span className="font-semibold">
                  1 {formData.fromCurrency} = {exchangeRate.toFixed(4)}{" "}
                  {formData.toCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Converted Amount:</span>
                <span className="font-semibold">
                  {convertedAmount.toFixed(2)} {formData.toCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fee (1%):</span>
                <span className="font-semibold text-red-600">
                  {(convertedAmount * 0.01).toFixed(2)} {formData.toCurrency}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-bold text-green-600">
                    {(convertedAmount * 0.99).toFixed(2)} {formData.toCurrency}
                  </span>
                </div>
              </div>
            </div>
          )}

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            options={[
              { value: "Completed", label: "Completed" },
              { value: "Pending", label: "Pending" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />

          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Transaction
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExchangeTransactions;

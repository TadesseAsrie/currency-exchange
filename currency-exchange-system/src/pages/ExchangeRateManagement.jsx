// src/pages/ExchangeRateManagement.jsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import DataTable from "../components/common/DataTable";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { FiRefreshCw } from "react-icons/fi";

const ExchangeRateManagement = () => {
  const { currencies, updateExchangeRate } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [formData, setFormData] = useState({
    currencyId: "",
    buyRate: "",
    sellRate: "",
  });

  const columns = [
    { key: "code", label: "Currency Code", sortable: true },
    { key: "name", label: "Currency Name", sortable: true },
    {
      key: "buyRate",
      label: "Current Buy Rate",
      sortable: true,
      render: (value) => (
        <span className="text-green-600 font-semibold">{value}</span>
      ),
    },
    {
      key: "sellRate",
      label: "Current Sell Rate",
      sortable: true,
      render: (value) => (
        <span className="text-red-600 font-semibold">{value}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleEdit = (currency) => {
    setSelectedCurrency(currency);
    setFormData({
      currencyId: currency.id,
      buyRate: currency.buyRate,
      sellRate: currency.sellRate,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    updateExchangeRate(
      formData.currencyId,
      parseFloat(formData.buyRate),
      parseFloat(formData.sellRate),
    );
    setIsModalOpen(false);
    setSelectedCurrency(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Exchange Rate Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update and manage currency exchange rates
        </p>
      </div>

      <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6">
        <DataTable columns={columns} data={currencies} onEdit={handleEdit} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Exchange Rate"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-4"
        >
          <Select
            label="Currency"
            value={formData.currencyId}
            onChange={(e) =>
              setFormData({ ...formData, currencyId: e.target.value })
            }
            options={currencies.map((c) => ({
              value: c.id,
              label: `${c.code} - ${c.name}`,
            }))}
            required
          />
          <Input
            label="Buy Rate"
            type="number"
            step="0.0001"
            value={formData.buyRate}
            onChange={(e) =>
              setFormData({ ...formData, buyRate: e.target.value })
            }
            required
          />
          <Input
            label="Sell Rate"
            type="number"
            step="0.0001"
            value={formData.sellRate}
            onChange={(e) =>
              setFormData({ ...formData, sellRate: e.target.value })
            }
            required
          />
          <div className="flex gap-3 justify-end mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={FiRefreshCw}>
              Update Rate
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExchangeRateManagement;

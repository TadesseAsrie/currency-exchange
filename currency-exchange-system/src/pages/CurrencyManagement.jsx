// src/pages/CurrencyManagement.jsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import DataTable from "../components/common/DataTable";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { FiPlus } from "react-icons/fi";

const CurrencyManagement = () => {
  const { currencies, addCurrency, updateCurrency, deleteCurrency } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    symbol: "",
    buyRate: "",
    sellRate: "",
    status: "active",
  });

  const columns = [
    { key: "code", label: "Code", sortable: true },
    { key: "name", label: "Currency Name", sortable: true },
    { key: "symbol", label: "Symbol", sortable: true },
    {
      key: "buyRate",
      label: "Buy Rate",
      sortable: true,
      render: (value) => <span className="text-green-600">${value}</span>,
    },
    {
      key: "sellRate",
      label: "Sell Rate",
      sortable: true,
      render: (value) => <span className="text-red-600">${value}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleSubmit = () => {
    if (editingCurrency) {
      updateCurrency(editingCurrency.id, formData);
    } else {
      addCurrency(formData);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (currency) => {
    setEditingCurrency(currency);
    setFormData(currency);
    setIsModalOpen(true);
  };

  const handleDelete = (currency) => {
    setEditingCurrency(currency);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteCurrency(editingCurrency.id);
    setIsDeleteDialogOpen(false);
    setEditingCurrency(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      symbol: "",
      buyRate: "",
      sellRate: "",
      status: "active",
    });
    setEditingCurrency(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Currency Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your supported currencies and their exchange rates
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={FiPlus}>
          Add Currency
        </Button>
      </div>

      <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6">
        <DataTable
          columns={columns}
          data={currencies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingCurrency ? "Edit Currency" : "Add New Currency"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <Input
            label="Currency Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Currency Code"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value.toUpperCase() })
            }
            required
          />
          <Input
            label="Currency Symbol"
            value={formData.symbol}
            onChange={(e) =>
              setFormData({ ...formData, symbol: e.target.value })
            }
            required
          />
          <Input
            label="Buy Rate"
            type="number"
            step="0.0001"
            value={formData.buyRate}
            onChange={(e) =>
              setFormData({ ...formData, buyRate: parseFloat(e.target.value) })
            }
            required
          />
          <Input
            label="Sell Rate"
            type="number"
            step="0.0001"
            value={formData.sellRate}
            onChange={(e) =>
              setFormData({ ...formData, sellRate: parseFloat(e.target.value) })
            }
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
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
              {editingCurrency ? "Update" : "Add"} Currency
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Currency"
        message={`Are you sure you want to delete ${editingCurrency?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default CurrencyManagement;

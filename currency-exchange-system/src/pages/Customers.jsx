// src/pages/Customers.jsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";
import DataTable from "../components/common/DataTable";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { FiPlus } from "react-icons/fi";
import { formatDate } from "../utils/formatters";

const Customers = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    address: "",
  });

  const columns = [
    { key: "fullName", label: "Full Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "country", label: "Country", sortable: true },
    { key: "address", label: "Address" },
    {
      key: "registrationDate",
      label: "Registration Date",
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const handleSubmit = () => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (customer) => {
    setEditingCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteCustomer(editingCustomer.id);
    setIsDeleteDialogOpen(false);
    setEditingCustomer(null);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      country: "",
      address: "",
    });
    setEditingCustomer(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your customer information
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={FiPlus}>
          Add Customer
        </Button>
      </div>

      <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6">
        <DataTable
          columns={columns}
          data={customers}
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
        title={editingCustomer ? "Edit Customer" : "Add New Customer"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <Input
            label="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
          />
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
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
              {editingCustomer ? "Update" : "Add"} Customer
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${editingCustomer?.fullName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Customers;

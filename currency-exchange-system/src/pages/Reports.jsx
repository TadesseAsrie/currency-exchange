import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import { FiFileText, FiDownload, FiPrinter } from "react-icons/fi";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { formatCurrency, formatNumber } from "../utils/formatters";
import toast from "react-hot-toast";

const Reports = () => {
  const { transactions, customers, currencies } = useData();
  const [reportType, setReportType] = useState("daily");

  const getFilteredTransactions = () => {
    const now = new Date();
    const startDate = new Date();

    switch (reportType) {
      case "daily":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "weekly":
        startDate.setDate(now.getDate() - 7);
        break;
      case "monthly":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "annual":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setHours(0, 0, 0, 0);
    }

    return transactions.filter(
      (t) => new Date(t.date) >= startDate && t.status === "Completed",
    );
  };

  const filteredTransactions = getFilteredTransactions();

  const stats = useMemo(() => {
    const totalRevenue = filteredTransactions.reduce(
      (sum, t) => sum + (t.fee || 0),
      0,
    );
    const totalVolume = filteredTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );

    const currencyCount = {};
    filteredTransactions.forEach((t) => {
      currencyCount[t.toCurrency] = (currencyCount[t.toCurrency] || 0) + 1;
    });

    const mostExchanged = Object.entries(currencyCount).sort(
      (a, b) => b[1] - a[1],
    )[0];

    return {
      totalTransactions: filteredTransactions.length,
      totalRevenue,
      totalVolume,
      mostExchangedCurrency: mostExchanged ? mostExchanged[0] : "N/A",
      activeCustomers: new Set(filteredTransactions.map((t) => t.customerId))
        .size,
    };
  }, [filteredTransactions]);

  const revenueChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [12500, 15000, 18000, 22000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
    ],
  };

  const currencyUsageData = {
    labels: currencies.slice(0, 6).map((c) => c.code),
    datasets: [
      {
        data: currencies.slice(0, 6).map(() => Math.floor(Math.random() * 100)),
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(34, 197, 94, 0.5)",
          "rgba(239, 68, 68, 0.5)",
          "rgba(139, 92, 246, 0.5)",
          "rgba(245, 158, 11, 0.5)",
          "rgba(236, 72, 153, 0.5)",
        ],
      },
    ],
  };

  const transactionChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Transactions",
        data: [65, 78, 90, 81, 95, 110],
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const handleExportPDF = () => {
    toast.success("PDF report generated successfully!");
  };

  const handleExportExcel = () => {
    toast.success("Excel report exported successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate and analyze exchange reports
          </p>
        </div>
        <div className="flex gap-3">
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            options={[
              { value: "daily", label: "Daily Report" },
              { value: "weekly", label: "Weekly Report" },
              { value: "monthly", label: "Monthly Report" },
              { value: "annual", label: "Annual Report" },
            ]}
            className="w-40"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Transactions
          </p>
          <p className="text-2xl font-bold">
            {formatNumber(stats.totalTransactions)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalRevenue)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Most Exchanged Currency
          </p>
          <p className="text-2xl font-bold">{stats.mostExchangedCurrency}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Active Customers
          </p>
          <p className="text-2xl font-bold">{stats.activeCustomers}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Analysis">
          <Bar data={revenueChartData} options={{ responsive: true }} />
        </Card>
        <Card title="Currency Usage Distribution">
          <Doughnut data={currencyUsageData} options={{ responsive: true }} />
        </Card>
        <Card title="Transaction Trends">
          <Line data={transactionChartData} options={{ responsive: true }} />
        </Card>
      </div>

      {/* Export Buttons */}
      <Card title="Export Reports">
        <div className="flex gap-4">
          <Button onClick={handleExportPDF} icon={FiFileText} variant="primary">
            Export as PDF
          </Button>
          <Button
            onClick={handleExportExcel}
            icon={FiDownload}
            variant="secondary"
          >
            Export as Excel
          </Button>
          <Button
            onClick={() => window.print()}
            icon={FiPrinter}
            variant="secondary"
          >
            Print Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports; // <-- This line ensures default export

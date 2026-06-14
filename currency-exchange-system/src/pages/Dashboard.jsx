// src/pages/Dashboard.jsx
import React, { useMemo } from "react";
import {
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiGrid,
  FiRepeat,
  FiActivity,
} from "react-icons/fi";
import { useData } from "../context/DataContext";
import Card from "../components/common/Card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  formatCurrency,
  formatNumber,
  formatShortDate,
} from "../utils/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Dashboard = () => {
  const { currencies, transactions, customers } = useData();

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayTransactions = transactions.filter(
      (t) => new Date(t.date).toDateString() === today,
    );
    const totalRevenue = transactions
      .filter((t) => t.status === "Completed")
      .reduce((sum, t) => sum + (t.fee || 0), 0);
    const totalVolume = transactions
      .filter((t) => t.status === "Completed")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalTransactions: transactions.length,
      todayTransactions: todayTransactions.length,
      totalCustomers: customers.length,
      availableCurrencies: currencies.filter((c) => c.status === "active")
        .length,
      exchangeVolume: totalVolume,
      revenue: totalRevenue,
    };
  }, [transactions, customers, currencies]);

  const latestTransactions = transactions.slice(0, 5);

  const transactionChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Transactions",
        data: [65, 78, 90, 81, 95, 110],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12500, 15000, 18000, 17000, 21000, 25000],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
      },
    ],
  };

  const currencyTrendData = {
    labels: currencies.slice(0, 6).map((c) => c.code),
    datasets: [
      {
        label: "Buy Rate",
        data: currencies.slice(0, 6).map((c) => c.buyRate),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
      {
        label: "Sell Rate",
        data: currencies.slice(0, 6).map((c) => c.sellRate),
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 2,
      },
    ],
  };

  const dailyExchangeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Exchange Volume",
        data: [12500, 15000, 18000, 22000, 28000, 20000, 15000],
        backgroundColor: "rgba(139, 92, 246, 0.5)",
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your exchange overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Transactions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(stats.totalTransactions)}
              </p>
            </div>
            <FiRepeat className="text-3xl text-primary-500" />
          </div>
        </Card>

        <Card className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Today's Transactions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.todayTransactions}
              </p>
            </div>
            <FiActivity className="text-3xl text-green-500" />
          </div>
        </Card>

        <Card className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(stats.totalCustomers)}
              </p>
            </div>
            <FiUsers className="text-3xl text-purple-500" />
          </div>
        </Card>

        <Card className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Available Currencies
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.availableCurrencies}
              </p>
            </div>
            <FiGrid className="text-3xl text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Exchange Volume
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.exchangeVolume)}
              </p>
            </div>
            <FiTrendingUp className="text-3xl text-blue-500" />
          </div>
        </Card>

        <Card className="p-4" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
            <FiDollarSign className="text-3xl text-green-500" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Transaction Trends">
          <Line data={transactionChartData} options={{ responsive: true }} />
        </Card>

        <Card title="Revenue Overview">
          <Bar data={revenueChartData} options={{ responsive: true }} />
        </Card>

        <Card title="Currency Rates Trend">
          <Bar data={currencyTrendData} options={{ responsive: true }} />
        </Card>

        <Card title="Daily Exchange Volume">
          <Bar data={dailyExchangeData} options={{ responsive: true }} />
        </Card>
      </div>

      {/* Latest Transactions & Currency Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Latest Transactions">
          <div className="space-y-3">
            {latestTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatShortDate(transaction.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {transaction.fromCurrency} → {transaction.toCurrency}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(
                      transaction.amount,
                      transaction.fromCurrency,
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Currency Exchange Rates">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-100">
                  <th className="text-left py-2">Currency</th>
                  <th className="text-right py-2">Buy Rate</th>
                  <th className="text-right py-2">Sell Rate</th>
                </tr>
              </thead>
              <tbody>
                {currencies.slice(0, 5).map((currency) => (
                  <tr
                    key={currency.id}
                    className="border-b border-gray-100 dark:border-dark-100"
                  >
                    <td className="py-2 font-medium">{currency.code}</td>
                    <td className="text-right text-green-600">
                      {currency.buyRate}
                    </td>
                    <td className="text-right text-red-600">
                      {currency.sellRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

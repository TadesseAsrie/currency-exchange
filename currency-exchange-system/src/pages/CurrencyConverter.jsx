// src/pages/CurrencyConverter.jsx
import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { FiRefreshCw, FiInfo } from "react-icons/fi";
import { formatCurrency } from "../utils/formatters";

const CurrencyConverter = () => {
  const { currencies } = useData();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [fees, setFees] = useState(0);

  const activeCurrencies = currencies.filter((c) => c.status === "active");

  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      const from = currencies.find((c) => c.code === fromCurrency);
      const to = currencies.find((c) => c.code === toCurrency);
      if (from && to) {
        const rate = to.buyRate / from.sellRate;
        setExchangeRate(rate);
        const converted = amount * rate;
        setConvertedAmount(converted);
        const fee = converted * 0.01;
        setFees(fee);
      }
    }
  }, [fromCurrency, toCurrency, amount, currencies]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Currency Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert between different currencies instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Currency Converter">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="0"
                step="any"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <Select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  options={activeCurrencies.map((c) => ({
                    value: c.code,
                    label: `${c.code} - ${c.name}`,
                  }))}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSwap}
                  variant="secondary"
                  icon={FiRefreshCw}
                  className="rounded-full p-2"
                >
                  Swap
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <Select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  options={activeCurrencies.map((c) => ({
                    value: c.code,
                    label: `${c.code} - ${c.name}`,
                  }))}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card title="Exchange Result">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-dark-100 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exchange Rate
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="font-semibold">
                  {formatCurrency(amount, fromCurrency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Exchange Rate
                </span>
                <span className="font-semibold">{exchangeRate.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Fees (1%)
                </span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(fees, toCurrency)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-dark-100 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {formatCurrency(convertedAmount - fees, toCurrency)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-start gap-2">
              <FiInfo className="text-blue-500 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Exchange rates are updated in real-time. Fees are calculated at
                1% of the converted amount.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Popular Currency Pairs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
            <p className="font-semibold">USD → EUR</p>
            <p className="text-sm text-gray-500">1 USD = 0.92 EUR</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
            <p className="font-semibold">EUR → GBP</p>
            <p className="text-sm text-gray-500">1 EUR = 0.85 GBP</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-dark-100 rounded-lg">
            <p className="font-semibold">USD → ETB</p>
            <p className="text-sm text-gray-500">1 USD = 55.00 ETB</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CurrencyConverter;

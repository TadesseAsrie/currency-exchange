// src/components/common/Select.jsx
import React from "react";

const Select = ({
  label,
  value,
  onChange,
  options,
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

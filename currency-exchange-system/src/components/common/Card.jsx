// src/components/common/Card.jsx
import React from "react";

const Card = ({
  children,
  title,
  icon: Icon,
  className = "",
  hover = false,
}) => {
  return (
    <div
      className={`
      bg-white dark:bg-dark-200 rounded-xl shadow-lg overflow-hidden
      ${hover ? "card-hover" : ""}
      ${className}
    `}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-100">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary-600 text-xl" />}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;

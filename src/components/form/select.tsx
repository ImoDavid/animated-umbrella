import React from "react";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | boolean;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          className={`w-full px-4 py-2 border rounded-md outline-none appearance-none bg-white dark:bg-[#2b2b2b] transition-all
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-2 border-gray-300 focus:border-[#00A057]"
          }
          text-black dark:text-white
          ${className}
        `}
          {...rest}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="text-black dark:text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Dropdown arrow */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-300">
          ▼
        </span>
      </div>

      {typeof error === "string" && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;

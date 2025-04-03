import React from "react";

/**
 * Toggle component for switching between multiple options
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of options to toggle between
 * @param {any} props.value - Currently selected value
 * @param {function} props.onChange - Function to call when selection changes
 * @param {boolean} props.disabled - Whether the toggle is disabled
 * @param {string} props.size - Size of the toggle ('sm', 'md', 'lg')
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
const Toggle = ({
  options = [],
  value,
  onChange,
  disabled = false,
  size = "md",
  className = "",
}) => {
  // Size classes
  const getSizeClasses = () => {
    const sizes = {
      sm: "text-xs py-1 px-2",
      md: "text-sm py-1.5 px-3",
      lg: "text-base py-2 px-4",
    };
    return sizes[size] || sizes.md;
  };

  const sizeClass = getSizeClasses();

  return (
    <div
      className={`inline-flex rounded-md border border-gray-300 bg-white ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => !disabled && onChange && onChange(option.value)}
          disabled={disabled}
          className={`
            ${sizeClass}
            os-regular
            transition-colors
            focus:outline-none
            ${
              value === option.value
                ? "bg-brand-green text-white"
                : "text-brand-blackLight hover:bg-gray-50"
            }
            ${
              options.indexOf(option) === 0
                ? "rounded-l-md"
                : options.indexOf(option) === options.length - 1
                ? "rounded-r-md"
                : ""
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Toggle;

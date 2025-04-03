import React from "react";

/**
 * Checkbox component
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the checkbox
 * @param {string} props.label - Label text for the checkbox
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {function} props.onChange - Function to call when checkbox state changes
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.size - Size of the checkbox ('sm', 'md', 'lg')
 * @param {string} props.className - Additional classes for the container
 * @param {string} props.labelClassName - Additional classes for the label
 * @returns {JSX.Element}
 */
const Checkbox = ({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  className = "",
  labelClassName = "",
}) => {
  // Generate a random ID if none is provided
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  // Size classes
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Label size classes
  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            ${sizeClasses[size] || sizeClasses.md}
            rounded
            border-2
            border-gray-300
            text-brand-green
            focus:ring-brand-green
            focus:ring-offset-0
            focus:ring-2
            transition-colors
            duration-200
            ease-in-out
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={`ml-2 ${
              labelSizeClasses[size] || labelSizeClasses.md
            } os-regular text-brand-blackLight ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${labelClassName}`}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

/**
 * Checkbox Group component for managing multiple related checkboxes
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of checkbox options
 * @param {Array} props.value - Array of selected values
 * @param {function} props.onChange - Function to call when selection changes
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
export const CheckboxGroup = ({
  options = [],
  value = [],
  onChange,
  className = "",
}) => {
  const handleCheckboxChange = (option) => {
    const newValue = value.includes(option.value)
      ? value.filter((val) => val !== option.value)
      : [...value, option.value];
    
    if (onChange) onChange(newValue);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          id={`checkbox-group-${option.value}`}
          label={option.label}
          checked={value.includes(option.value)}
          onChange={() => handleCheckboxChange(option)}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

export default Checkbox;

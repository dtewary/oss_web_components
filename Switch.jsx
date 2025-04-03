import React from "react";

/**
 * Switch component for toggling between two states
 * @param {Object} props - Component props
 * @param {boolean} props.checked - Whether the switch is checked
 * @param {function} props.onChange - Function to call when switch state changes
 * @param {string} props.label - Label text for the switch
 * @param {boolean} props.disabled - Whether the switch is disabled
 * @param {string} props.size - Size of the switch ('sm', 'md', 'lg')
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
const Switch = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  className = "",
}) => {
  // Size classes
  const getSizeClasses = () => {
    const sizes = {
      sm: {
        switch: "w-8 h-4",
        thumb: "w-3 h-3",
        translate: "translate-x-4",
      },
      md: {
        switch: "w-10 h-5",
        thumb: "w-4 h-4",
        translate: "translate-x-5",
      },
      lg: {
        switch: "w-12 h-6",
        thumb: "w-5 h-5",
        translate: "translate-x-6",
      },
    };
    return sizes[size] || sizes.md;
  };

  const { switch: switchClass, thumb: thumbClass, translate } = getSizeClasses();

  return (
    <label className={`flex items-center cursor-pointer ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`${switchClass} bg-gray-300 rounded-full ${checked ? "bg-brand-green" : ""}`}
        />
        <div
          className={`absolute left-0.5 top-0.5 ${thumbClass} bg-white rounded-full shadow transform transition-transform ${
            checked ? translate : "translate-x-0"
          }`}
        />
      </div>
      {label && (
        <span className="ml-2 text-brand-blackLight os-regular">
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;

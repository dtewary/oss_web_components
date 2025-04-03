import React, { useState, useRef, useEffect } from "react";

/**
 * Select component for dropdown selection
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of options to select from
 * @param {any} props.value - Currently selected value
 * @param {function} props.onChange - Function to call when selection changes
 * @param {string} props.placeholder - Placeholder text when no option is selected
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  // Find selected option based on value
  useEffect(() => {
    if (value !== undefined) {
      const option = options.find((opt) => opt.value === value);
      setSelectedOption(option || null);
    }
  }, [value, options]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    if (onChange) onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative ${className}`}
      ref={selectRef}
    >
      <div
        className={`
          flex justify-between items-center
          h-[36px]
          px-3
          border
          rounded
          os-regular
          cursor-pointer
          ${isOpen ? "border-brand-green" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"}
        `}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        role="combobox"
      >
        <span className={`block truncate ${!selectedOption ? "text-gray-500" : "text-brand-blackLight"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </div>
      
      {isOpen && (
        <div
          className="
            absolute z-10
            w-full
            mt-1
            bg-white
            border border-gray-200
            rounded-md
            shadow-mild
            max-h-60
            overflow-auto
          "
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                px-3
                py-2
                cursor-pointer
                os-regular
                ${
                  selectedOption && selectedOption.value === option.value
                    ? "bg-brand-green/10 text-brand-green"
                    : "text-brand-blackLight hover:bg-gray-50"
                }
              `}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selectedOption && selectedOption.value === option.value}
            >
              {option.label}
            </div>
          ))}
          
          {options.length === 0 && (
            <div className="px-3 py-2 text-gray-500 os-regular">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Chevron icon component
const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default Select;

import React, { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar";

/**
 * DatePicker component for selecting dates
 * @param {Object} props - Component props
 * @param {Date} props.value - Selected date
 * @param {function} props.onChange - Function to call when date is changed
 * @param {string} props.placeholder - Placeholder text
 * @param {Date} props.minDate - Minimum selectable date
 * @param {Date} props.maxDate - Maximum selectable date
 * @param {string} props.format - Date format (default: 'MM/DD/YYYY')
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  maxDate,
  format = "MM/DD/YYYY",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);
  const containerRef = useRef(null);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    return format
      .replace("MM", month.toString().padStart(2, "0"))
      .replace("DD", day.toString().padStart(2, "0"))
      .replace("YYYY", year);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
    setIsOpen(false);
  };

  // Toggle calendar
  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className={`flex transition-colors duration-150 ease-in-out items-center rounded os-regular h-[36px] border ${
          isOpen ? "border-brand-green" : "border-gray-300"
        } bg-white cursor-pointer`}
        onClick={toggleCalendar}
      >
        <div className="flex items-center justify-center h-[36px] min-w-[36px] p-2 rounded-l text-gray-500">
          <CalendarIcon />
        </div>
        <div className="w-full px-3 py-1 text-brand-blackLight">
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </div>
        <div className="flex items-center justify-center h-[36px] min-w-[36px] p-2 text-gray-500">
          <ChevronIcon isOpen={isOpen} />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full">
          <Calendar
            value={selectedDate || new Date()}
            onChange={handleDateSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};

// Icon components
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

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

export default DatePicker;

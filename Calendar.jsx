import React, { useState } from "react";

/**
 * Calendar component for date selection
 * @param {Object} props - Component props
 * @param {Date} props.value - Selected date
 * @param {function} props.onChange - Function to call when date is changed
 * @param {Date} props.minDate - Minimum selectable date
 * @param {Date} props.maxDate - Maximum selectable date
 * @param {string} props.className - Additional classes for the calendar
 * @returns {JSX.Element}
 */
const Calendar = ({
  value = new Date(),
  onChange,
  minDate,
  maxDate,
  className = "",
}) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState(value);

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Check if date is in range
  const isInRange = (date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return false;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
      return false;
    return true;
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    if (!isInRange(newDate)) return;
    
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      const isToday =
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();
      const isDisabled = !isInRange(date);

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm focus:outline-none transition-colors
            ${isSelected ? "bg-brand-green text-white" : ""}
            ${
              isToday && !isSelected
                ? "border border-brand-green text-brand-green"
                : ""
            }
            ${
              !isSelected && !isToday && !isDisabled
                ? "hover:bg-gray-100"
                : ""
            }
            ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div
      className={`bg-white rounded-md shadow-mild p-4 os-regular ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>
        <div className="os-medium text-brand-blackLight">
          {monthNames[currentMonth]} {currentYear}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs text-brand-blackLighter font-semibold"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{generateCalendarGrid()}</div>
    </div>
  );
};

// Icon components
const ChevronLeftIcon = () => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default Calendar;

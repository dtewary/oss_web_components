import React, { useState } from "react";

/**
 * Accordion component for expandable content sections
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the accordion section
 * @param {React.ReactNode} props.children - Content to be displayed when expanded
 * @param {boolean} props.defaultOpen - Whether the accordion is open by default
 * @param {string} props.className - Additional classes for the accordion container
 * @param {string} props.titleClassName - Additional classes for the title
 * @param {string} props.contentClassName - Additional classes for the content
 * @returns {JSX.Element}
 */
const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className = "",
  titleClassName = "",
  contentClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border border-gray-200 rounded-md mb-2 ${className}`}>
      <button
        type="button"
        className={`w-full flex justify-between items-center p-4 text-left os-medium text-brand-blackLight hover:bg-gray-50 focus:outline-none transition-colors ${
          isOpen ? "border-b border-gray-200" : ""
        } ${titleClassName}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div
          className={`p-4 os-regular text-brand-blackLighter ${contentClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// Accordion Group component for managing multiple accordions
export const AccordionGroup = ({
  children,
  allowMultiple = false,
  className = "",
}) => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isOpen: openIndices.includes(index),
        onToggle: () => toggleAccordion(index),
      });
    }
    return child;
  });

  return <div className={className}>{enhancedChildren}</div>;
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

export default Accordion;

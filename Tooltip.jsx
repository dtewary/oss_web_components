import React, { useState, useRef, useEffect } from "react";

/**
 * Tooltip component for displaying additional information on hover
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The element that triggers the tooltip
 * @param {string} props.content - Content to display in the tooltip
 * @param {string} props.position - Position of the tooltip ('top', 'right', 'bottom', 'left')
 * @param {string} props.className - Additional classes for the tooltip
 * @returns {JSX.Element}
 */
const Tooltip = ({
  children,
  content,
  position = "top",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  // Position classes
  const getPositionClasses = () => {
    const positions = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1",
      right: "left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-1",
      bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1",
      left: "right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-1",
    };
    return positions[position] || positions.top;
  };

  // Arrow position classes
  const getArrowPositionClasses = () => {
    const arrowPositions = {
      top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-brand-green border-l-transparent border-r-transparent border-b-transparent",
      right: "left-0 top-1/2 transform -translate-y-1/2 -translate-x-full border-r-brand-green border-t-transparent border-b-transparent border-l-transparent",
      bottom: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-brand-green border-l-transparent border-r-transparent border-t-transparent",
      left: "right-0 top-1/2 transform -translate-y-1/2 translate-x-full border-l-brand-green border-t-transparent border-b-transparent border-r-transparent",
    };
    return arrowPositions[position] || arrowPositions.top;
  };

  // Show tooltip
  const showTooltip = () => {
    setIsVisible(true);
  };

  // Hide tooltip
  const hideTooltip = () => {
    setIsVisible(false);
  };

  // Handle click outside to hide tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute
            z-50
            px-2
            py-1
            text-sm
            text-white
            bg-brand-green
            rounded
            shadow-md
            whitespace-nowrap
            os-regular
            ${getPositionClasses()}
            ${className}
          `}
          role="tooltip"
        >
          {content}
          <div
            className={`
              absolute
              w-0
              h-0
              border-4
              ${getArrowPositionClasses()}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

import React, { useEffect, useRef } from "react";

/**
 * Drawer component for slide-in panels
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the drawer is open
 * @param {function} props.onClose - Function to call when drawer is closed
 * @param {string} props.position - Position of the drawer ('left', 'right', 'top', 'bottom')
 * @param {string} props.size - Size of the drawer ('sm', 'md', 'lg', 'xl', 'full')
 * @param {React.ReactNode} props.children - Content of the drawer
 * @param {string} props.className - Additional classes for the drawer
 * @returns {JSX.Element}
 */
const Drawer = ({
  open,
  onClose,
  position = "right",
  size = "md",
  children,
  className = "",
}) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        open
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Lock body scroll when drawer is open
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  // Define size classes based on position
  const getSizeClass = () => {
    const sizes = {
      sm: { left: "w-64", right: "w-64", top: "h-1/4", bottom: "h-1/4" },
      md: { left: "w-80", right: "w-80", top: "h-1/3", bottom: "h-1/3" },
      lg: { left: "w-96", right: "w-96", top: "h-1/2", bottom: "h-1/2" },
      xl: { left: "w-[32rem]", right: "w-[32rem]", top: "h-2/3", bottom: "h-2/3" },
      full: { left: "w-full", right: "w-full", top: "h-full", bottom: "h-full" },
    };
    return sizes[size]?.[position] || sizes.md[position];
  };

  // Define position classes
  const getPositionClass = () => {
    const positions = {
      left: "left-0 top-0 bottom-0",
      right: "right-0 top-0 bottom-0",
      top: "top-0 left-0 right-0",
      bottom: "bottom-0 left-0 right-0",
    };
    return positions[position] || positions.right;
  };

  // Define transform classes for animations
  const getTransformClass = () => {
    const transforms = {
      left: "translate-x-0",
      right: "translate-x-0",
      top: "translate-y-0",
      bottom: "translate-y-0",
    };
    return transforms[position] || transforms.right;
  };

  // Define initial transform classes for animations
  const getInitialTransformClass = () => {
    const initialTransforms = {
      left: "-translate-x-full",
      right: "translate-x-full",
      top: "-translate-y-full",
      bottom: "translate-y-full",
    };
    return initialTransforms[position] || initialTransforms.right;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={drawerRef}
        className={`fixed ${getPositionClass()} ${getSizeClass()} bg-white shadow-medium transform transition-transform duration-300 ease-in-out ${getTransformClass()} ${className}`}
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Close icon component
const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default Drawer;

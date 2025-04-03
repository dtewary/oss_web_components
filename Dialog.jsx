import React, { useEffect, useRef } from "react";

/**
 * Dialog component for modal dialogs
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {function} props.onClose - Function to call when dialog is closed
 * @param {string} props.title - Title of the dialog
 * @param {React.ReactNode} props.children - Content of the dialog
 * @param {React.ReactNode} props.footer - Footer content of the dialog
 * @param {string} props.size - Size of the dialog ('sm', 'md', 'lg', 'xl')
 * @param {string} props.className - Additional classes for the dialog
 * @returns {JSX.Element}
 */
const Dialog = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = "",
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target) &&
        open
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Lock body scroll when dialog is open
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

  // Define size classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <dialog
        ref={dialogRef}
        className={`bg-white rounded-lg shadow-medium w-full ${
          sizeClasses[size] || sizeClasses.md
        } ${className}`}
        aria-labelledby="dialog-title"
        open
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3
            id="dialog-title"
            className="text-lg os-medium text-brand-blackLight"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-4 os-regular text-brand-blackLight">{children}</div>
        {footer && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </dialog>
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

export default Dialog;

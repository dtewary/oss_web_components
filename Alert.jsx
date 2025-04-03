import React from "react";

/**
 * Alert component for displaying important messages
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the alert
 * @param {React.ReactNode} props.children - Content of the alert
 * @param {string} props.variant - Alert variant ('info', 'success', 'warning', 'error')
 * @param {boolean} props.dismissible - Whether the alert can be dismissed
 * @param {function} props.onDismiss - Function to call when alert is dismissed
 * @param {string} props.className - Additional classes for the alert
 * @returns {JSX.Element}
 */
const Alert = ({
  title,
  children,
  variant = "info",
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  // Define styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          container: "bg-green-50 border-brand-green text-brand-green",
          icon: <SuccessIcon />,
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-600 text-yellow-700",
          icon: <WarningIcon />,
        };
      case "error":
        return {
          container: "bg-red-50 border-red-600 text-red-700",
          icon: <ErrorIcon />,
        };
      default:
        return {
          container:
            "bg-panel-blue-light border-panel-blue-normal text-panel-blue-dark",
          icon: <InfoIcon />,
        };
    }
  };

  const { container, icon } = getVariantStyles();

  return (
    <div
      className={`border-l-4 p-4 rounded-r-md os-regular ${container} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5 mr-3">{icon}</div>
        <div className="flex-1">
          {title && <p className="os-medium mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

// Icon components
const SuccessIcon = () => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WarningIcon = () => (
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
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ErrorIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CloseIcon = () => (
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
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default Alert;

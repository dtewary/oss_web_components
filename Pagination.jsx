import React from "react";

/**
 * Pagination component for navigating through pages
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Function to call when page changes
 * @param {number} props.siblingCount - Number of siblings to show on each side of current page
 * @param {string} props.className - Additional classes for the container
 * @returns {JSX.Element}
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  className = "",
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range of pages to show around current page
    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
    
    // Add ellipsis if needed
    if (leftSibling > 2) {
      pageNumbers.push("...");
    }
    
    // Add pages between left and right siblings
    for (let i = leftSibling; i <= rightSibling; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis if needed
    if (rightSibling < totalPages - 1) {
      pageNumbers.push("...");
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <nav className={`flex justify-center items-center ${className}`}>
      <ul className="flex items-center space-x-1">
        {/* Previous button */}
        <li>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              flex items-center justify-center
              w-8 h-8
              rounded
              os-regular
              focus:outline-none
              ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-brand-blackLight hover:bg-gray-100"
              }
            `}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
          </button>
        </li>
        
        {/* Page numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="w-8 h-8 flex items-center justify-center text-brand-blackLight">
                ...
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handlePageChange(page)}
                className={`
                  w-8 h-8
                  rounded
                  os-regular
                  focus:outline-none
                  ${
                    currentPage === page
                      ? "bg-brand-green text-white"
                      : "text-brand-blackLight hover:bg-gray-100"
                  }
                `}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              flex items-center justify-center
              w-8 h-8
              rounded
              os-regular
              focus:outline-none
              ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-brand-blackLight hover:bg-gray-100"
              }
            `}
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};

// Icon components
const ChevronLeftIcon = () => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default Pagination;

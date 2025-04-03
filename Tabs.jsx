import React, { useState, useRef, useEffect, memo, useMemo } from "react";

// Memoized Tab Item Component
const TabItem = memo(
  ({
    label,
    isActive,
    hasDropdown = false,
    Prefix,
    dropdownItems = [],
    onClick,
  }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      <div
        onClick={() => {
          if (hasDropdown) {
            setIsDropdownOpen(!isDropdownOpen);
          } else {
            onClick();
          }
        }}
        ref={dropdownRef}
        className={`border-b-2 w-fit py-2 cursor-pointer flex-shrink-0 ${
          isActive ? "border-brand-green" : "border-transparent"
        }`}
      >
        <div className="relative flex items-center">
          {/* Ensure the Icon is rendered properly */}
          <p
            className={`${
              isActive
                ? "text-brand-green"
                : "text-brand-blackLight hover:text-brand-green"
            } 
              px-3 text-[14px] flex justify-center items-center gap-1 font-normal ${
                hasDropdown
                  ? "cursor-pointer"
                  : isActive
                  ? "cursor-auto"
                  : "cursor-pointer"
              }`}
          >
            {Prefix &&
              (typeof Prefix === "string" ? (
                <img src={Prefix} alt={label} />
              ) : (
                // create icon component
                <Prefix className="w-5 h-5" />
              ))}
            {label}
          </p>
          {hasDropdown && (
            <div className="ml-1">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          )}
        </div>
        {hasDropdown && isDropdownOpen && (
          <div className="absolute mt-2 bg-white sd-2 z-50 min-w-[180px] py-1">
            {dropdownItems.map((item, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="flex justify-start items-center gap-1 px-4 py-2 hover:bg-gray-100 text-brand-blackLight text-[14px] cursor-pointer"
                onClick={() => {
                  item.onClick();
                  setIsDropdownOpen(false);
                }}
              >
                {item.Prefix &&
                  (typeof item.Prefix === "string" ? (
                    <img src={item.Prefix} alt={label} />
                  ) : (
                    // create icon component
                    <item.Prefix className="w-5 h-5" />
                  ))}
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

// Add display name for debugging purposes
TabItem.displayName = "TabItem";

// Memoized Tabs Component
const Tabs = memo(({ tabs = [], activeTab, onChange }) => {
  const [currentTab, setCurrentTab] = useState(activeTab || 0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (activeTab !== undefined && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleTabChange = useMemo(
    () => (index) => {
      setCurrentTab(index);
      if (onChange) {
        onChange(index);
      }
    },
    [tabs, onChange]
  );

  return (
    <div className="px-3 flex justify-start items-center gap-2 os-medium pb-[1px]">
      {tabs.map((tab, index) => (
        <TabItem
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          label={tab.label}
          Prefix={tab.Prefix}
          isActive={currentTab === index}
          hasDropdown={!!tab.dropdownItems && tab.dropdownItems.length > 0}
          dropdownItems={tab.dropdownItems}
          onClick={() => handleTabChange(index)}
        />
      ))}
    </div>
  );
});

// Add display name for debugging purposes
Tabs.displayName = "Tabs";

export default Tabs;

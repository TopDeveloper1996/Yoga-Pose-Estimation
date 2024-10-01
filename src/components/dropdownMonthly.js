// src/components/Dropdown.js
import React, { useState, useRef, useEffect } from "react";

const DropdownMonthly = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("August");
  const dropdownRef = useRef(null);

  const options = [
    "January",
    "February",
    "March",
    "April",
    "March",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block ml-4 w-28" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="flex ml-1 h-8 font-medium text-[#004392] focus:bg-[#004392] focus:text-white justify-between w-full rounded-md border-2 border-[#004392] shadow-sm px-1 bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="w-2"></span>
          <span className="">{selected}</span>
          <svg
            className="ml-1 h-5 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.434l3.71-3.224a.75.75 0 111.04 1.08l-4.25 3.5a.75.75 0 01-1.04 0l-4.25-3.5a.75.75 0 010-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="h-48 overflow-y-auto left-1 mt-1 px-1 flex justify-center absolute z-10 w-28 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-[#004392] border-x-2 border-y-2">
          <div
            className="w-fit flex-wrap"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={options[options.length - index - 1]}
                onClick={() =>
                  handleSelect(options[options.length - index - 1])
                }
                className="flex w-full font-medium py-1 text-[#004392] hover:bg-gray-100 focus:outline-none justify-between"
                role="menuitem"
              >
                {options[options.length - index - 1]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMonthly;

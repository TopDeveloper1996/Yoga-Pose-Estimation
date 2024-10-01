// src/components/Dropdown.js
import React, { useState, useRef, useEffect } from "react";

const DropdownYearly = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("2024");
  const buttonsRefs = useRef([]);
  const dropdownRef = useRef(null);

  const options = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
    "2036",
    "2037",
    "2038",
    "2039",
    "2040",
    "2041",
    "2042",
    "2043",
    "2044",
    "2045",
    "2046",
    "2047",
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
    // const ref = buttonsRefs.current[options.indexOf(selected)];
    // ref.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-20" ref={dropdownRef}>
      <div className="">
        <button
          onClick={() => toggleDropdown()}
          className="flex ml-1 h-8 font-medium focus:bg-[#004392] focus:text-white justify-between w-full rounded-md border-2 border-[#004392] shadow-sm px-1 bg-white text-[#004392] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 items-center"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="w-2"></span>
          <span className="">{selected}</span>
          <svg
            className="h-5 w-4"
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
        <div className="mt-1 overflow-y-auto h-48 left-1 px-1 absolute z-10 rounded-md flex justify-center w-20 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-[#004392] border-x-2 border-y-2">
          <div
            className="w-fit flex-wrap"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            id="dropdown-menu"
          >
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                ref={(el) => (buttonsRefs.current[index] = el)}
                className="flex w-full font-medium text-center text-[#004392] hover:bg-gray-100 focus:outline-none"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownYearly;

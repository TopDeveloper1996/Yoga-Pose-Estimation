// src/components/Dropdown.js
import React, { useState, useRef, useEffect } from "react";

const DropdownTime = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("00:55");
  const dropdownRef = useRef(null);

  const options = ["00:55", "02:00", "03:30"];
  const optionStr = ["Basic", "Intermediate", "Advance"];
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
  };

  return (
    <div className="relative inline-block text-right ml-2" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="ml-1 mt-1 inline-flex justify-between w-full rounded-md border border-[#004392] shadow-sm px-1 bg-white text-[12px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 text-[#004392]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="inline-flex float-right ml-1 text-[#004392]">
            {selected}
          </span>
          <svg
            className="-mr-1 ml-1 h-5 w-4"
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
        <div className="left-0 px-1 absolute z-10 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-[#004392] border-x-2 border-y-2">
          <div
            className="py-1 w-fit flex-wrap"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="flex w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none justify-between"
                role="menuitem"
              >
                <span className="text-[#004392]">{optionStr[index]}</span>
                <div className="border-gray-400 border-x border-y rounded w-10 text-center ml-2">
                  {option}
                </div>
              </button>
            ))}
            <button
              className="bg-[#004392] text-center w-full rounded text-white"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownTime;

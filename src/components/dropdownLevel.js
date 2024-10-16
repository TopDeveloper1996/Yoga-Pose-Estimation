import { produce } from "immer";
import React, { useState, useRef, useEffect } from "react";

const DropdownLevel = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Basic");
  const [levelData, setLevelData] = useState({
    Basic: 1,
    Intermediate: 5,
    Advance: 8,
  });

  const dropdownRef = useRef(null);

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
    setIsOpen(false);
    setSelected(option);  
  };

  const handleLevelDataChange = (level, value) => {
    console.log(value);
    setLevelData((prev) =>
      produce(prev, (draft) => {
        draft[level] = value;
      })
    );
  };

  const handleSave = () => {
    onSave(levelData);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center text-right" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" inline-flex justify-between w-full rounded-md border border-primary shadow-sm  px-1 bg-white text-[12px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
          />
        </svg>
        <span className="inline-flex float-right ml-1 w-2 text-primary">
          {levelData[selected]}
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

      {isOpen && (
        <div className="absolute right-0 z-10 w-fit translate-y-[80px] rounded-md border-x-2 border-y-2 border-primary bg-white px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 w-fit flex-wrap"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.keys(levelData).map((level) => (
              <div
                key={level}
          
                className="flex w-full text-left py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none justify-between"
                role="menuitem"
              >
                <span className="text-primary" onClick={() => handleSelect(level)}>{level}</span>
                <input
                  className="border-gray-400 border-x border-y rounded w-6 text-center ml-2"
                  value={levelData[level]}
                  onChange={(event) =>
                    handleLevelDataChange(level, event.target.value)
                  }
                />
              </div>
            ))}
            <button
              className="bg-primary text-center w-full rounded text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownLevel;

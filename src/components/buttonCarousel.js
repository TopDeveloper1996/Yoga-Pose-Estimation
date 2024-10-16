import React, { useState } from "react";

const ButtonCarousel = ({ ids = [], onClick = (index) => {} }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 8; // Number of buttons to display at once

  // Function to go to the previous set of buttons
  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Function to go to the next set of buttons
  const handleRightClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, ids.length - itemsToShow)
    );
  };

  return (
    <div className="w-full h-10 bg-primary rounded content-center shadow-md shadow-gray-500">
      <div className="flex justify-between w-full h-9">
        <button
          onClick={handleLeftClick}
          disabled={startIndex === 0} // Disable if at start
          className={`ml-3 text-white font-bold arrow-button ${
            startIndex === 0 ? "disabled" : ""
          }`}
        >
          &lt;
        </button>

        <div
          id="buttonGroup"
          className="mx-2 w-full grid grid-cols-8 text-primary items-center content-center "
        >
          {ids
            .slice(startIndex, startIndex + itemsToShow)
            .map((label, index) => (
              <button
                key={index}
                className="bg-white sm-pose-button-font-size-small sm-pose-button-font-size focus:bg-primary hover:bg-primary focus:text-white hover:text-white h-7 px-1 button border-x border-y rounded mx-1 font-medium text-nowrap"
                onClick={() => onClick(label)}
              >
                Pose{index + startIndex}
              </button>
            ))}
        </div>

        <button
          onClick={handleRightClick}
          disabled={startIndex + itemsToShow >= ids.length} // Disable if at end
          className={`mr-3 text-white font-bold arrow-button ${
            startIndex + itemsToShow >= ids.length ? "disabled" : ""
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ButtonCarousel;

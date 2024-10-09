import React, { useState } from "react";

const ButtonCarousel = ({ ids = [], onClickPose }) => {
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
    <div className="flex justify-between w-full h-9">
      {/* Left Arrow */}
      <button
        onClick={handleLeftClick}
        disabled={startIndex === 0} // Disable if at start
        className={`ml-3 text-white font-bold arrow-button ${
          startIndex === 0 ? "disabled" : ""
        }`}
      >
        &lt; {/* Left arrow */}
      </button>

      {/* Button Group */}
      <div
        id="buttonGroup"
        className="mx-2 w-full grid grid-cols-8 text-[#004392] items-center content-center "
      >
        {ids.slice(startIndex, startIndex + itemsToShow).map((label, index) => (
          <button
            key={index}
            className="bg-white sm-pose-button-font-size-small sm-pose-button-font-size focus:bg-[#004392] hover:bg-[#004392] focus:text-white hover:text-white h-7 px-1 button border-x border-y rounded mx-1 font-medium text-nowrap"
            onClick={() => onClickPose(label)}
          >
            Pose{index + startIndex}
            {/* {label} */}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleRightClick}
        disabled={startIndex + itemsToShow >= ids.length} // Disable if at end
        className={`mr-3 text-white font-bold arrow-button ${
          startIndex + itemsToShow >= ids.length ? "disabled" : ""
        }`}
      >
        &gt; {/* Right arrow */}
      </button>
    </div>
  );
};

export default ButtonCarousel;

import { useRef, useState } from "react";
import DropdownLevel from "./dropdownLevel";
import DropdownTime from "./dropdownTime";

const cardData = {
  poseId: 1,
  poseImage: "",
  poseMovie: "",
  description: "",
};

const LearnerCard = ({ id, card }) => {
  const ref = useRef(null);

  const [cardInfo, setCardInfo] = useState();

  return (
    <div className="flex flex-col w-full h-full" ref={ref}>
      <div className="w-full  rounded-t-md rounded-tr-md h-8  bg-[#004392] items-center flex justify-between">
        <div className="content-center items-center flex">
          <button
            id="picture-button"
            className="ml-6 inline-flex rounded w-6 h-2/3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
          <button
            id="play-button"
            className="ml-2 inline-flex rounded w-6 h-2/3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6  text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </button>
          <button
            id="preview-button"
            className="ml-2 inline-flex rounded w-6 h-2/3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </button>
        </div>
        <div className="inline-flex content-center items-center mx-4">
          <span className="text-white font-medium text-sm mx-2">
            {"Intermediate"}
          </span>
          <div
            id="level-label"
            className="ml-1 flex w-full rounded-md shadow-sm px-1 text-[12px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
              />
            </svg>
            <span className="flex float-right ml-1 w-2 text-white">{"1"}</span>
          </div>
          <div
            id="time-label"
            className="ml-1 flex justify-between w-full rounded-md shadow-sm px-1 text-[12px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-right items-center"
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span className="inline-flex float-right ml-1 text-white mx-2">
              {"02:00"}
            </span>
          </div>{" "}
        </div>
      </div>
      <div
        id="studyView"
        className="w-full h-64 md:h-full shadow-gray-500  shadow-md border-x border-y rounded-b"
      ></div>
    </div>
  );
};
export default LearnerCard;

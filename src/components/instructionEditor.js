import { useState } from "react";

const InstructionEditor = () => {
  const [speechMute, setSpeechMute] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const handleClickMute = () => {
    setSpeechMute(!speechMute);
  };

  return (
    <div id="instructionView" className="w-full flex grow-0">
      <div className="flex-col w-full shadow-gray-500 border-x border-y shadow-md rounded mx-1 mb-2">
        <div className="inline-flex w-full h-10 justify-between items-center">
          <span className="text-[#004392] font-semibold text-[16px] mx-3">
            Instruction
          </span>
          <div className="w-23 h-8 flex mx-2">
            <button className="" onClick={handleClickMute}>
              {speechMute ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-[#004392]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-[#004392]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              )}
            </button>
            <div className="w-2 h-8 flex"></div>
            <button className="">
              {collapse ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-[#004392]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-[#004392]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="inline-flex w-full h-32 text-gray-800 px-3 py-2 overflow-y-auto">
          <textarea className="w-full h-full focus:outline-none resize-none"></textarea>
        </div>
        <div className="w-full text-gray-800  overflow-y-auto flex justify-end">
          <button className="m-1 w-[30%] md:h-10 bg-[#004392]   shadow-gray-500  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded text-center text-white text-lg content-center">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionEditor;

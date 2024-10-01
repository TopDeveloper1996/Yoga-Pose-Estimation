import React, { useEffect, useState } from "react";
import PoseCard from "../components/poseCard";
import LearnerState from "../components/learner-state";
import ButtonCarousel from "../components/buttonCarousel";
import LearnerCard from "../components/learnerCard";

const cardData = [
  {
    poseId: 1,
    isOpen: 1,
    poseImage: "1",
    poseMovie: "2",
    description: "3",
  },
];

function LearnerPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow flex-wrap">
        <div id="leftView" className="w-full md:w-1/2">
          <div className="flex flex-col mx-1 h-full">
            <div className="w-full h-10 bg-[#004392] shadow-md shadow-gray-500 rounded my-2 content-center">
              <span className="text-white font-semibold mx-4">Kapotasana</span>

              <button
                id="setting"
                className="text-white font-semibold mx-4 float-right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className=" hover:fill-blue-700 size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
              <a href="/statistic">
                <button
                  id="chart"
                  className="text-white font-semibold mx-4 float-end"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                </button>
              </a>
            </div>
            <div
              id="webcamView"
              className="relative h-64 md:h-full w-full bg-white rounded shadow-gray-500  shadow-md border-x border-y"
            >
              <LearnerState level="1" time="02:00" percent="100" />
              <div id="webcamImg" className="w-10 h-64 bg-white rounded"></div>
            </div>
          </div>
        </div>
        <div id="rightView" className="w-full md:w-1/2">
          <div className="flex flex-col mx-1 h-full">
            <div
              id="poseMenu"
              className="w-full h-10 bg-[#004392] rounded my-2 content-center shadow-md shadow-gray-500"
            >
              <ButtonCarousel />
            </div>

            <div id="poseView" className="h-full w-full bg-white">
              <LearnerCard />
            </div>
          </div>
        </div>
      </div>
      <div className="h-3 w-full flex"></div>
      <div id="instructionView" className="w-full flex grow-0">
        <div className="h-36 flex-col w-full shadow-gray-500 border-x border-y shadow-md rounded mx-1 mb-2">
          <div className="inline-flex w-full h-10 justify-between items-center">
            <span className="text-[#004392] font-semibold text-[16px] mx-3">
              Instruction
            </span>
            <div className="w-23 h-8 flex mx-2">
              <button className="">
                {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5 text-[#004392]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              </button>
              <div className="w-2 h-8 flex"></div>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5 text-[#004392]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="inline-flex w-full h-20 text-gray-800 px-3 py-2 overflow-y-auto">
            Start in a tabletop position, with your hands and knees on the mat.
            Bring your right knee forward, placing the outer edge of the right
            shinbone and right buttock on the mat. Extend your left leg straight
            out behind you, with the top of the left knee, thigh, and ankle
            resting on the floor.Start in a tabletop position, with your hands
            and knees on the mat. Bring your right knee forward, placing the
            outer edge of the right shinbone and right buttock on the mat.
            Extend your left leg straight out behind you, with the top of the
            left knee, thigh, and ankle resting on the floor.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnerPage;

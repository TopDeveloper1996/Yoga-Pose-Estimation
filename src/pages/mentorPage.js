import React, { useContext, useState, useRef } from "react";
import { produce } from "immer";

import PoseCard from "../components/poseCard";

import WebcamComponent from "../components/webCamera";

import { PoseContext } from "../contexts/poseContext";

const DEFAULT_POSE = {
  poses: {
    id: "",
    pose_name: "",
    priority: 1,
    instructions: "",
    keypoints: [],
    level_time: {
      Basic: {
        time: 120,
        no_of_times: 5,
      },
      Intermediate: {
        time: 180,
        no_of_times: 3,
      },
      Expert: {
        time: 240,
        no_of_times: 2,
      },
    },
  },
  images: [],
  video: null,
};

function MentorPage() {
  const [cardInfo, setCards] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { addPose, deletePose } = useContext(PoseContext);

  const addCard = () => {
    console.log(cardInfo[cardInfo.length - 1]);
    // addPose(cardInfo[cardInfo.length - 1]).then((result) => setCards);

    let newCard = JSON.parse(JSON.stringify(DEFAULT_POSE));
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleSaveYoga = () => {};

  const handleClickTakePicture = (index, picture) => {
    if (picture) {
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].images.unshift(picture); // Add the picture to the beginning of the images array
        })
      );
    }
  };

  const handleClickTakeVideo = (index, video) => {
    if (!video) return;

    setCards((prevCards) =>
      produce(prevCards, (draft) => {
        draft[index].video = video; // Directly update the video field in the draft
      })
    );
  };

  const handleClickInstruction = (index, instruction) => {
    if (!instruction) return;

    setCards((prevCards) =>
      produce(prevCards, (draft) => {
        draft[index].poses.instructions = instruction; // Directly modify the draft
      })
    );
  };

  const handleClickReTakeVideo = (index) => {};

  const handleChangeRepeartCount = (index, level, count) => {
    setCards((prevCards) =>
      produce(prevCards, (draft) => {
        draft[index].poses[level].no_of_times = count;
      })
    );
  };

  const handleChangeNeedTimer = (index, level, time) => {
    setCards((prevCards) =>
      produce(prevCards, (draft) => {
        draft[index].poses[level].time = time;
      })
    );
  };

  const handleClickClose = (id) => {
    deletePose({ pose_id: cardInfo[id]?.poses?.id });

    const updatedCard = (cardInfo) =>
      cardInfo.filter((_, index) => index !== id);
    setCards(updatedCard);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          <div className="flex flex-wrap justify-center md:h-full">
            <div className="w-full h-10 shadow-gray-500  shadow-md bg-[#004392] rounded mx-1 my-2 content-center">
              <span className="text-white font-semibold mx-4">Kapotasana</span>
              <span className="text-white font-semibold mx-4 float-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className=" hover:fill-blue-700 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
            </div>
            <div
              id="webcamView"
              className="md:h-full w-full bg-white shadow-gray-500  rounded mx-1 shadow-md border-x border-y md-view-height"
            >
              <div id="webcamImg" className="w-full h-full bg-white rounded ">
                <WebcamComponent videoRef={videoRef} canvasRef={canvasRef} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <div className="flex flex-wrap justify-center md:h-full">
            <div className="bg-[#004392] w-full h-10 rounded mx-1 my-2 content-center flex items-center">
              <input
                type="text"
                className="mx-2 w-2/3 h-4/5 px-2 py-2 bg-white border text-[#004392] border-slate-300 rounded-md shadow-sm placeholder-slate-400
          focus:outline-none font-medium text-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-[#004392] placeholder:font-medium placeholder:text-lg"
                placeholder="P3 Take Picture"
              />
              <button className="flex flex-col w-1/6 h-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white rounded-sm mr-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 mt-1 text-[#004392]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                  />
                </svg>
              </button>
              <button
                className="flex flex-col w-1/6 h-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white rounded-sm mr-3 items-center"
                onClick={() => addCard()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-[#004392]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
                  />
                </svg>
              </button>
            </div>

            <div
              id="scrollView"
              className="md-scroll-height w-full bg-white  rounded mx-1 md-view-height overflow-y-auto "
            >
              {cardInfo.map((card, index) => (
                <PoseCard
                  key={index}
                  id={index}
                  card={card}
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                  onClickTakePicture={handleClickTakePicture}
                  onClickTakeVideo={handleClickTakeVideo}
                  onClickReTakeVideo={handleClickReTakeVideo}
                  onClickInstruction={handleClickInstruction}
                  onChangeRepeartCount={handleChangeRepeartCount}
                  onChangeNeedTimer={handleChangeNeedTimer}
                  onClickClose={handleClickClose}
                />
              ))}
            </div>
            <button
              className="mx-1 w-full md:h-10 bg-[#004392]   shadow-gray-500  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded text-center text-white text-lg content-center"
              onClick={handleSaveYoga}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorPage;

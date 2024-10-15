import PoseCard from "../components/poseCard";
import WebcamComponent from "../components/webCamera";
import {
  SettingButton,
  AmplifyButton,
  ConfirmButton,
} from "../components/Buttons";

import useMentor from "../hooks/pages/useMentor";

const MentorPage = () => {
  const {
    cardInfo,
    videoRef,
    canvasRef,
    nameRef,
    handleAddCard,
    handleUpdateCard,
    handleAmplifyClick,
    handleSettingClick,
    handleTakePictureClick,
    handleTakeVideoClick,
    handleReTakeVideoClick,
    handleSaveYogaClick,
    handleInstructionClick,
    handleRepeartCountChange,
    handleNeedTimerChange,
    handleCloseClick,
  } = useMentor();

  return (
    <div className="flex flex-col h-screen md:flex-row p-2">
      <div className="w-full md:flex-[3]">
        <div className="flex flex-wrap justify-center md:h-full">
          <div className="w-full h-10 shadow-gray-500  shadow-md bg-primary rounded mx-1 my-2 content-center">
            <span className="text-white font-semibold mx-4">Kapotasana</span>
            <SettingButton onClick={handleSettingClick} />
          </div>
          <WebcamComponent videoRef={videoRef} canvasRef={canvasRef} />
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap justify-between md:h-full md:flex-1">
        
          <div className="bg-primary w-full h-10 shadow-gray-500  shadow-md  rounded mx-1 my-2 content-center flex items-center">
            <input
              ref={nameRef}
              type="text"
              className="mx-2 px-2 bg-white border text-primary border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none font-medium text-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-500 placeholder:font-medium placeholder:text-lg"
              placeholder="P3 Take Picture"
            />

            <AmplifyButton onClick={handleAmplifyClick} />
            <ConfirmButton onClick={handleAddCard} />
          </div>

          <div className="md-scroll-height m`d-view-height mx-1 w-full overflow-y-auto rounded bg-white">
            {cardInfo.map((card, index) => (
              <PoseCard
                key={`${card.poses.pose_name}-${index}`}
                id={index}
                card={card}
                videoRef={videoRef}
                canvasRef={canvasRef}
                onClickTakePicture={handleTakePictureClick}
                onClickTakeVideo={handleTakeVideoClick}
                onClickReTakeVideo={handleReTakeVideoClick}
                onClickInstruction={handleInstructionClick}
                onChangeRepeartCount={handleRepeartCountChange}
                onChangeNeedTimer={handleNeedTimerChange}
                onClickClose={handleCloseClick}
              />
            ))}
          </div>
          <button
            className="mx-1 w-full md:h-10 bg-primary   shadow-gray-500  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded text-center text-white text-lg content-center"
            onClick={handleSaveYogaClick}
          >
            Save
          </button>
      </div>
    </div>
  );
};

export default MentorPage;

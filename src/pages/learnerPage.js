import LearnerState from "../components/learner-state";
import ButtonCarousel from "../components/buttonCarousel";
import LearnerCard from "../components/learnerCard";
import InstrcutionViewer from "../components/InstructionViewer";
import WebcamComponent from "../components/webCamera";
import { SettingIconButton, StatisticIconButton } from "../components/Buttons";

import useLearner from "../hooks/pages/useLearner";

function LearnerPage() {
  const {
    videoRef,
    canvasRef,
    fetchedPoses,
    activePose,
    cameraState,
    handleClickPose,
  } = useLearner();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex grow flex-wrap">
        <div id="leftView" className="w-full md:w-2/3 h-full">
          <div className="mx-1 my-2 flex h-full flex-col gap-1">
            <div className="w-full h-10 bg-primary shadow-md shadow-gray-500 rounded content-center">
              <span className="text-white font-semibold mx-4">Kapotasana</span>
              <SettingIconButton />
              <StatisticIconButton />
            </div>
            <div className=" flex-1 relative w-full rounded border-x border-y bg-white shadow-md shadow-gray-500">
              <LearnerState level="1" time="02:00" percent="100" />
              <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-1">
                <div className="border col-2 flex justify-center items-center">
                  {cameraState ? (
                    <WebcamComponent
                      videoRef={videoRef}
                      canvasRef={canvasRef}
                    />
                  ) : (
                    <span className="text-primary">INVAILD CAMERA</span>
                  )}
                </div>
                <div className="border col-2 flex justify-center items-center">
                  {activePose?.video_url ? (
                    <video className="w-full h-full" controls autoPlay>
                      <source src={activePose?.video_url} />
                    </video>
                  ) : (
                    <span className="text-primary">INVALID URL</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 my-2 w-full md:w-1/3 h-full">
          <ButtonCarousel
            ids={fetchedPoses.map((pose) => pose.pose_id)}
            onClick={handleClickPose}
          />
          <LearnerCard card={activePose} />
          <InstrcutionViewer instruction={activePose?.instructions || ""} />
        </div>
      </div>
    </div>
  );
}

export default LearnerPage;

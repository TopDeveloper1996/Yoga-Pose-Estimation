import { useEffect, useState } from "react";
import DropdownLevel from "./dropdownLevel";
import DropdownTime from "./dropdownTime";
import InstructionEditor from "./instructionEditor";
import useVideoRecorder from "../hooks/useVideoRecorder";
import {
  CloseButton,
  PictureButton,
  CameraButton,
  ExclamationButton,
  RefreshButton,
} from "./Buttons";

const PoseCard = ({
  id,
  card,
  videoRef,
  canvasRef,
  onClickTakePicture,
  onClickTakeVideo,
  onClickReTakeVideo,
  onClickInstruction,
  onChangeRepeartCount,
  onChangeNeedTimer,
  onClickClose,
}) => {
  const [instrcutionVisible, setInstructionVisible] = useState(false);

  const { videoUrl, recording, startRecording, stopRecording, saveRecording } =
    useVideoRecorder(videoRef);

  useEffect(() => {
    if (videoUrl && !recording) {
      onClickTakeVideo(id, videoUrl);
    }
  }, [videoUrl, recording, id, onClickTakeVideo]);

  const handleTakeVideo = () => {
    if (!recording) startRecording();
    else {
      stopRecording();
      saveRecording();
    }
  };

  const handleTakePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return onClickTakePicture(id, canvas.toDataURL());
    }
  };

  const handleReTakeVideo = () => {
    onClickReTakeVideo(id);
  };

  const handleShowInstruction = () => {
    setInstructionVisible((prev) => !prev);
  };

  const handleSaveInstruction = (instruction) => {
    onClickInstruction(id, instruction);
    setInstructionVisible(false);
  };

  const handleChangeRepeartCount = (data) => {
    onChangeRepeartCount(id, data);
  };

  const handleChangeNeedTimer = (data) => {
    onChangeNeedTimer(id, data);
  };

  const handleClose = () => {
    onClickClose(id);
  }


  return (
    <div className="flex flex-col w-full h-96 rounded mb-2">
      <div className="flex w-full items-center justify-between rounded-tl-md rounded-tr-md bg-primary p-2">
        <div className="flex w-11/12 flex-row flex-wrap items-center gap-1">
          <span className="flex w-6 text-sm font-medium text-white">P{id}</span>

          <PictureButton onClick={handleTakePicture} />
          <CameraButton onClick={handleTakeVideo} />
          <ExclamationButton onClick={handleShowInstruction} />
          <RefreshButton onClick={handleReTakeVideo} />
          <DropdownLevel onSave={handleChangeRepeartCount} />
          <DropdownTime onSave={handleChangeNeedTimer} />
        </div>
        <CloseButton onClick={handleClose} />
      </div>
      <div className="w-full h-full rounded-bl-md rounded-br-md shadow-gray-500 border-t-0  shadow-md border-primary hover:border-[#F5982E] hover:border-x-2 hover:border-t-0 hover:border-b-2 border-2">
        {!instrcutionVisible ? (
          card.images.length > 0 && (
            <img
              src={card.images[0]}
              className="w-full h-full object-cover"
              alt={card.poses.pose_name}
            />
          )
        ) : (
          <InstructionEditor
            value={card.poses.instructions}
            onSave={handleSaveInstruction}
          />
        )}
      </div>
    </div>
  );
};

export default PoseCard;

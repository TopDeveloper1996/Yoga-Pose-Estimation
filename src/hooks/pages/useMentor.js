import { useContext, useEffect, useRef, useState } from "react";
import { PoseContext } from "../../contexts/poseContext";
import useCamera from "../useCamera";
import { produce } from "immer";

const DEFAULT_POSE = {
    poses: {
      id: "",
      pose_name: "",
      priority: 1,
      instructions: "",
      keypoints: [],
      level_time: {
        Basic: {
          time: "00:00",
          no_of_times: 0,
        },
        Intermediate: {
          time: "00:00",
          no_of_times: 0,
        },
        Expert: {
          time: "00:00",
          no_of_times: 0,
        },
      },
    },
    images: [],
    video: null,
};

const useMentor = () => {
    const [cardInfo, setCards] = useState([]);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const nameRef = useRef(null);
  
    const { loadingPose, errorPose, addPose, updatePose, deletePose } =
      useContext(PoseContext);
  
    const { cameraState } = useCamera();
  
    const handleAddCard = () => {
      if (!nameRef.current?.value) {
        console.error("Enter any name");
        return;
      }
  
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          let newCard = JSON.parse(JSON.stringify(DEFAULT_POSE));
          newCard.poses.pose_name = nameRef.current.value;
          draft.push(newCard);
        })
      );
  
      nameRef.current.value = "";
      const index = Math.max(cardInfo.length - 1, -1);
      if (index === -1) return;
      addPose({
        data: {
          campus_group_id: "65b5117ea39425fcf1fceb74",
          campus_id: "65b5117ea39425fcf1fceb74",
          c_subject_id: "65b5117ea39425fcf1fceb74",
          subject_id: "65b5117ea39425fcf1fceb74",
          chapter_id: "65b5117ea39425fcf1fceb74",
          topic_id: "65b5117ea39425fcf1fceb74",
          poses: cardInfo[index].poses,
        },
        images: cardInfo[index].images,
        video: cardInfo[index].video,
      }).then((result) => {
      });
    };
  
    const handleUpdateCard = (index) => {
      updatePose({
        data: {
          pose_detection_id: "66b354cb3a2675306637f854",
          campus_group_id: "65b5117ea39425fcf1fceb74",
          campus_id: "65b5117ea39425fcf1fceb74",
          c_subject_id: "65b5117ea39425fcf1fceb74",
          subject_id: "65b5117ea39425fcf1fceb74",
          chapter_id: "65b5117ea39425fcf1fceb74",
          topic_id: "65b5117ea39425fcf1fceb74",
          poses: cardInfo[index].poses,
        },
        images: cardInfo[index].images,
        video: cardInfo[index].video,
      });
    };
    
    const handleSettingClick = () => {
    }

    const handleAmplifyClick = () => {
    
    }

    const handleSaveYogaClick = () => {
      
      
      setCards([]);
    };
  
    const handleTakePictureClick = (index, picture) => {
      if (!picture) return;
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].images.unshift(picture); 
        })
      );
    };
  
    const handleTakeVideoClick = (index, video) => {
      if (!video) return;
  
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].video = video;
        })
      );
    };
  
    const handleInstructionClick = (index, instruction) => {
      if (!instruction) return;
  
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].poses.instructions = instruction;
        })
      );
    };
  
    const handleReTakeVideoClick = (index) => {
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].video = null;
        })
      );
    };
  
    const handleRepeartCountChange = (index, data) => {
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].poses.level_time.Basic.time = data.Basic;
          draft[index].poses.level_time.Intermediate.time = data.Intermediate;
          draft[index].poses.level_time.Expert.time = data.Advance;
        })
      );
    };
  
    const handleNeedTimerChange = (index, data) => {
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft[index].poses.level_time.Basic.no_of_times = data.Basic;
          draft[index].poses.level_time.Intermediate.no_of_times = data.Intermediate;
          draft[index].poses.level_time.Expert.no_of_times = data.Advance;
        })
      );
    };
  
    const handleCloseClick = (id) => {
      const pose_id = cardInfo[id]?.poses?.id;
      
      setCards((prevCards) =>
        produce(prevCards, (draft) => {
          draft.splice(id, 1);
        })
      );
  
      if (pose_id) deletePose({ pose_id });
    };
  
    useEffect(() => {
      if (!loadingPose && errorPose) console.error(errorPose);
    }, [loadingPose, errorPose]);

    return {
        cardInfo,
        videoRef,
        canvasRef,
        nameRef,
        cameraState,
        handleAddCard,
        handleUpdateCard,
        handleCloseClick,
        handleAmplifyClick, 
        handleSettingClick,
        handleSaveYogaClick,
        handleTakeVideoClick,
        handleInstructionClick,
        handleTakePictureClick,
        handleReTakeVideoClick,
        handleNeedTimerChange,
        handleRepeartCountChange,
    }
}

export default useMentor;
import { useContext, useEffect, useRef, useState } from "react";
import { PoseContext } from "../../contexts/poseContext";
import useCamera from "../useCamera";

const useLearner = () => {
    const { cameraState } = useCamera();
    const { fetchedPoses, getPose } = useContext(PoseContext);
    const [activePose, setActivePose] = useState({});
  
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
      (async () => {
        const result = await getPose({
          pose_id: "65bb838ca5977c7b8cbbaf24", //optional
          pose_detection_id: "65bb838ca5977c7b8cbbaf24", //optional
          campus_group_id: "65bb838ca5977c7b8cbbaf24", //optional
          campus_id: "65bb838ca5977c7b8cbbaf24", //optional
          c_subject_id: "65bb838ca5977c7b8cbbaf24", //optional
          subject_id: "65bb838ca5977c7b8cbbaf24", //optional
          chapter_id: "65bbc13bcd5fd6f7ab67f6f1", //optional
          topic_id: "65bbc13bcd5fd6f7ab67f6f4", //optional
          pose_name: "string", //optional
          sts: 1,
        });
      })();
    }, []);
  
    const handleClickPose = (id) => {
      const newActivePose = fetchedPoses.find((pose) => pose.pose_id === id);
  
      if (!newActivePose) return;
  
      setActivePose(newActivePose);
    };

    return {
        videoRef,
        canvasRef,
        activePose,
        fetchedPoses,
        cameraState,
        handleClickPose,
    }
}

export default useLearner;
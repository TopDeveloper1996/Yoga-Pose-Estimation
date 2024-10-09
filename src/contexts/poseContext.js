import { createContext, useState } from "react";
import axios from "../utils/axios";

const PoseContext = createContext({
  poses: [],
  loadingPose: false,
  errorPose: null,
  addPose: ({ data, images = [], video = null }) => {},
  deletePose: ({ pose_detection_id, pose_id }) => {},
  getPose: ({
    pose_id,
    pose_detection_id,
    campus_group_id,
    c_subject_id,
    chapter_id,
    topic_id,
    pose_name,
    sts,
  }) => {},
  updatePose: ({ data, images = [], video = null }) => {},
});

const PoseProvider = ({ children }) => {
  const [loadingPose, setLoadingPose] = useState(false);
  const [errorPose, setErrorPose] = useState(null);

  const AsyncCatchError =
    (fn) =>
    async (...args) => {
      setLoadingPose(true);
      setErrorPose(null);
      try {
        await fn(...args);
      } catch (err) {
        setErrorPose(err.message || "An error occurred");
      } finally {
        setLoadingPose(false);
      }
    };

  const addPose = AsyncCatchError(
    async ({ data, images = [], video = null }) => {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));

      if (images && images.length > 0) {
        images.forEach((image, index) => {
          formData.append(`pose_images`, image);
        });
      }

      if (video) {
        formData.append("pose_video", video);
      }

      const response = await axios.post(
        "api/campus_dashboard_module_ms/yogaPoses/addPoseDetections",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === "201") {
      } else {
        throw new Error(response.data.message || "Failed to add pose");
      }
    }
  );

  const [fetchedPoses, setFetchedPoses] = useState([]);
  const getPose = AsyncCatchError(
    async ({
      pose_id,
      pose_detection_id,
      campus_group_id,
      c_subject_id,
      chapter_id,
      topic_id,
      pose_name,
      sts,
    }) => {
      const response = await axios.post(
        "api/campus_dashboard_module_ms/yogaPoses/getPoseDetections",
        {
          pose_id,
          pose_detection_id,
          campus_group_id,
          c_subject_id,
          chapter_id,
          topic_id,
          pose_name,
          sts,
        }
      );

      if (response.status === 200) {
        setFetchedPoses(response.data.data.posed);
      } else {
        throw new Error(response.data.message || "Failed to get pose");
      }
    }
  );

  const updatePose = AsyncCatchError(
    async ({ data, images = [], video = null }) => {
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));

      if (images && images.length > 0) {
        images.forEach((image, index) => {
          formData.append(`pose_images`, image);
        });
      }

      if (video) {
        formData.append("pose_video", video);
      }

      const response = await axios.post(
        "api/campus_dashboard_module_ms/yogaPoses/addPoseDetections",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === "200") {
      } else {
        throw new Error(response.data.message || "Failed to add pose");
      }
    }
  );

  const deletePose = AsyncCatchError(async ({ pose_detection_id, pose_id }) => {
    const response = await axios.delete(
      "api/campus_dashboard_module_ms/yogaPoses/deletePoseDetections",
      {
        params: {
          pose_detection_id,
          pose_id,
        },
      }
    );

    if (response.status === "204") {
    } else {
      throw new Error(response.data.message || "Failed to add pose");
    }
  });

  return (
    <PoseContext.Provider
      value={{
        fetchedPoses,
        loadingPose,
        errorPose,
        addPose,
        getPose,
        deletePose,
        updatePose,
      }}
    >
      {children}
    </PoseContext.Provider>
  );
};

export { PoseContext, PoseProvider };

import { useEffect, useState } from "react";

const useCamera = () => {
  const [cameraState, setCameraState] = useState(false);

  const isCameraAccessible = async () => {
    try {
      // Attempt to get user media with video enabled
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // If successful, stop the stream immediately to release the camera
      stream.getTracks().forEach((track) => track.stop());

      setCameraState(true);
      return true; // Camera is valid
    } catch (error) {
      console.error("Camera access denied or not available:", error);
      setCameraState(false);
      return false; // Camera is not valid
    }
  };

  useEffect(() => {
    (async () => setCameraState(await isCameraAccessible()))();
  }, []);

  return {
    cameraState,
  };
};

export default useCamera;

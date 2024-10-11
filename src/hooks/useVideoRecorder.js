import { useState } from "react";

const useVideoRecorder = (videoRef) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]);

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const saveRecording = () => {
    if (recordedBlobs.length) {
      const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
      const downloadUrl = URL.createObjectURL(superBuffer);
      setVideoUrl(downloadUrl);
    }
  };

  const downloadRecording = () => {
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "recorded-video.webm";
    a.click();
  };

  return {
    videoUrl,
    recording,
    startRecording,
    stopRecording,
    saveRecording,
    downloadRecording,
    recordedBlobs,
  };
};

export default useVideoRecorder;

import React, { useRef, useEffect } from "react";

const WebcamComponent = () => {
  const videoRef = useRef(null); // Ref to access the video element

  useEffect(() => {
    const startWebcam = async () => {
      try {
        // Request video stream from the webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        // Set the video element's source to the stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam(); // Start the webcam when component mounts

    // Cleanup function to stop the stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
    };
  }, []); // Empty dependency array to run only once (componentDidMount)

  return (
    <div class="w-full h-full p-1">
      <video ref={videoRef} autoPlay playsInline class="w-full h-full" />
    </div>
  );
};

export default WebcamComponent;

import React, { useEffect } from "react";

const WebcamComponent = ({ videoRef, canvasRef }) => {
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

    startWebcam(); // Start the webcam when the component mounts

    // Cleanup function to stop the stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
    };
  }, [videoRef]);

  return (
    <div className="w-full h-full p-1">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
    </div>
  );
};

export default WebcamComponent;

import React, { useEffect } from "react";
import useCamera from "../hooks/useCamera";

const WebcamComponent = ({ videoRef, canvasRef }) => {
  const { cameraState } = useCamera();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas reference is missing.");
      return;
    }

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [videoRef, canvasRef]);

  return (
    <div className="md:h-full w-full bg-white shadow-gray-500  rounded mx-1 shadow-md border-x border-y md-view-height">
      {cameraState ? (
        <div className="w-full h-full p-1">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-10 text-center">
          <span className="text-primary">
            Camera access is denied or not available. Please check your camera
            settings and permissions.
          </span>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;

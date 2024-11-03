import React, { useEffect } from "react";
import useCamera from "../hooks/useCamera";
import { Pose } from "@mediapipe/pose"

const WebcamComponent = ({ videoRef, canvasRef }) => {
  const { cameraState } = useCamera();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas reference is missing.");
      return;
    }

    // Initialize MediaPipe Pose
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // Set up canvas context for drawing
    const ctx = canvasRef.current.getContext("2d");

    // Landmark connections to draw
    const connections = [
      [11, 13], [13, 15], // Left arm
      [12, 14], [14, 16], // Right arm
      [11, 12],           // Shoulders
      [11, 23], [12, 24], // Body sides
      [23, 24],           // Hips
      [23, 25], [25, 27], // Left leg
      [24, 26], [26, 28], // Right leg
      [27, 31], [28, 32]  // Ankles
    ];

    // Draw landmark connections on the canvas
    function drawConnectors(landmarks) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;

      connections.forEach(([start, end]) => {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];
        ctx.beginPath();
        ctx.moveTo(startPoint.x * canvasRef.current.width, startPoint.y * canvasRef.current.height);
        ctx.lineTo(endPoint.x * canvasRef.current.width, endPoint.y * canvasRef.current.height);
        ctx.stroke();
      });
    }

    // Process pose results
    function onResults(results) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (results.poseLandmarks) {
        drawConnectors(results.poseLandmarks);

        results.poseLandmarks.forEach((landmark) => {
          ctx.beginPath();
          ctx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
        });
      }
    }

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };

        // Start pose detection
        const detectPose = async () => {
          if (!videoRef.current) return;
          await pose.send({ image: videoRef.current });
          requestAnimationFrame(detectPose);
        };

        pose.onResults(onResults);
        detectPose();

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
  }, [videoRef, canvasRef, cameraState]);

  return (
    <div className="md:h-full w-full bg-white shadow-gray-500  rounded mx-1 shadow-md border-x border-y md-view-height">
      {cameraState ? (
        <div className="w-full h-full p-1 flex">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full absolute top-0 left-0"
          />
        </div>
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

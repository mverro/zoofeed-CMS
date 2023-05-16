import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import {
    updateUserTicket,
  } from "../../../axios/userTicket";
import jsQR from "jsqr";

const QRScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [update, setUpdate] = useState({
    id: 0,
  });
  const [changeData, setChangeData] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const video = webcamRef.current.video;

    const handleLoadedMetadata = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      canvas.width = videoWidth;
      canvas.height = videoHeight;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const drawGuideBox = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const guideBoxWidth = videoWidth * 0.5;
      const guideBoxHeight = videoHeight * 0.5;
      const guideBoxX = (videoWidth - guideBoxWidth) / 2;
      const guideBoxY = (videoHeight - guideBoxHeight) / 2;

      context.clearRect(0, 0, videoWidth, videoHeight);
      context.strokeStyle = "white";
      context.lineWidth = 2;
      context.strokeRect(guideBoxX, guideBoxY, guideBoxWidth, guideBoxHeight);
    };

    const drawDetectedBox = (x, y, width, height) => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      context.clearRect(0, 0, videoWidth, videoHeight);
      context.strokeStyle = "lime";
      context.lineWidth = 2;
      context.strokeRect(x, y, width, height);
    };

    const handleScan = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      context.drawImage(video, 0, 0, videoWidth, videoHeight);

      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      const qrCode = jsQR(imageData.data, videoWidth, videoHeight);

      if (qrCode) {
        const { x, y, width, height } = qrCode.location;
        drawDetectedBox(x, y, width, height);
        const result = JSON.parse(qrCode.data);
        const id = result.id;
        setUpdate({ ...update, id : id});

      } else {
        drawGuideBox();
      }
    };

    const interval = setInterval(() => {
      handleScan();
    }, 1000);

    return () => {
      clearInterval(interval);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (update.id !== 0) {
      updateUserTicket(update, () => setChangeData(!changeData));
    }
  }, [update]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
        }}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 30,
          left: -30,
        }}
      />
    </div>
  );
};

export default QRScanner;

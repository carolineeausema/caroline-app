// pages/facerecognition.js
import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
  useEffect(() => {
    // Load face-api.js models and perform face detection
    const setupFaceDetection = async () => {
      // Load face-api.js models
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

      // Set up the webcam video stream
      const video = document.getElementById('video');
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      }

      // Perform face detection on each frame
      video.addEventListener('play', async () => {
        const canvas = document.getElementById('canvas');
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        const interval = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }, 100);

        // Stop the interval when the video is paused
        video.addEventListener('pause', () => {
          clearInterval(interval);
        });
      });
    };

    setupFaceDetection();
  }, []);

  return (
    <div>
      <h1>Face Recognition</h1>
      <video id="video" width="640" height="480" autoPlay playsInline muted></video>
      <canvas id="canvas" width="640" height="480"></canvas>
    </div>
  );
};

export default FaceRecognition;

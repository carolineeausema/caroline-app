// pages/facerecognition.js
import styles from '../components/layout.module.css';
import { useEffect } from 'react';
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

      // Create a separate canvas for face detection
      const canvas = document.getElementById('canvas');
      const displaySize = { width: window.innerWidth, height: window.innerHeight };
      faceapi.matchDimensions(canvas, displaySize);

      // Perform face detection on each frame
      video.addEventListener('play', async () => {
        const context = canvas.getContext('2d');
        const interval = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw rgb(232, 227, 219) color for face detection boxes
          context.strokeStyle = 'black';
          resizedDetections.forEach(face => {
            const box = face.detection.box;
            context.lineWidth = 2;
            context.strokeRect(box.x, box.y, box.width, box.height);

            // Draw different color dots for face detection
            context.fillStyle = 'grey'; // Change this color for the dots
            if (face.landmarks) {
              const leftEye = face.landmarks.getLeftEye();
              const rightEye = face.landmarks.getRightEye();
              const mouth = face.landmarks.getMouth();
              const jaw = face.landmarks.getJawOutline();
              const leftBrow = face.landmarks.getLeftEyeBrow();
              const rightBrow = face.landmarks.getRightEyeBrow();
              const nose = face.landmarks.getNose();

              // Draw dots and lines connecting the dots
              [leftEye, rightEye, mouth, jaw, leftBrow, rightBrow, nose].forEach(feature => {
                context.fillStyle = 'grey';
                feature.forEach(point => {
                  //context.fillRect(point.x, point.y, 5, 3);
                });

                context.beginPath();
                context.moveTo(feature[0].x, feature[0].y);
                for (let i = 1; i < feature.length; i++) {
                  context.lineTo(feature[i].x, feature[i].y);
                }
                context.closePath();
                context.stroke();
              });
            }
          });
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
    <div className={styles.container}>
      {/* Hide the video element with CSS */}
      <video id="video" autoPlay playsInline style={{ display: 'none' }}></video>
      {/* Use a separate canvas for face detection */}
      <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}></canvas>
      
      <p style={{ fontSize: '9px' }}>** hi, i know it's suspect for me to be asking to access your camera. i'm not recording & your image isn't being saved anywhere. trust ★</p>
    </div>
  );
};

export default FaceRecognition;

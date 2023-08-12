import styles from '../components/layout.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const P5Wrapper = ({ sketch }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p5 = require('p5');
      const canvasParentRef = wrapperRef.current;

      const pixelSize = 10;

      const sketchFunction = (p) => {
        let video;

        p.setup = () => {
          p.createCanvas(640, 480).parent(canvasParentRef);
          // Access the user's webcam
          video = p.createCapture(p.VIDEO);
          video.size(640, 480);
          video.hide();
        };

        p.draw = () => {
          p.background(0);
          video.loadPixels();

          for (let y = 0; y < p.height; y += pixelSize) {
            for (let x = 0; x < p.width; x += pixelSize) {
              const videoX = p.int(p.map(x, 0, p.width, 0, video.width));
              const videoY = p.int(p.map(y, 0, p.height, 0, video.height));
              const index = (videoX + videoY * video.width) * 4;
              const r = video.pixels[index];
              const g = video.pixels[index + 1];
              const b = video.pixels[index + 2];

              for (let i = 0; i < pixelSize; i++) {
                for (let j = 0; j < pixelSize; j++) {
                  const pixelX = x + i;
                  const pixelY = y + j;
                  const pixelIndex = (pixelX + pixelY * p.width) * 4;
                  p.set(pixelX, pixelY, p.color(r, g, b));
                }
              }
            }
          }

          p.updatePixels();
        };
      };

      new p5(sketchFunction);
    }
  }, []);

  return <div className={styles.container} ref={wrapperRef}></div>;
};

export default P5Wrapper;


import React, { useRef, useEffect, useState } from 'react';
import styles from '../components/layout.module.css';

const Sketch = () => {
  const wrapperRef = useRef();
  var [scrollFactor, setScrollFactor] = useState(0);

  useEffect(() => {
    // Import p5 on the client side
    import('p5').then((p5) => {
      const canvasParentRef = wrapperRef.current;
      var factor;

      const handleScroll = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        factor = scrollPosition / (windowHeight * 0.5);
        setScrollFactor(factor);
      };

      window.addEventListener('scroll', handleScroll);

      const sketchFunction = (p) => {
        p.setup = () => {
          // Set canvas dimensions to match the window width
          p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
          p.angleMode(p.DEGREES);
          p.rectMode(p.CENTER);
          scrollFactor = 0;
        };

        p.draw = () => {
          // Adjust the clear function to create a trail effect
          p.background(255, 20); // Lower alpha value to create a trail effect
          p.noFill();

          // Set the stroke color to light gray with transparency
          p.stroke(255 * (factor), 20);
          // Calculate coordinates based on cursor position and dimensions
          let quadWidth = p.map(p.mouseX, 0, p.width, 50, 200);
          let quadHeight = p.map(p.mouseY, 0, p.height, 50, 200);

          p.quad(
            p.mouseX, p.mouseY,
            p.mouseX * quadWidth / 100, p.mouseY * quadHeight / 100,
            p.mouseX + quadWidth / 4, p.mouseY + quadHeight / 2,
            p.mouseX - quadWidth / 4, p.mouseY + quadHeight / 2
          );
        };
      };

      new p5.default(sketchFunction);
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        className={styles.container}
        ref={wrapperRef}
        style={{ position: 'absolute', zIndex: 0 }}
      ></div>
    </div>
  );
};

export default Sketch;

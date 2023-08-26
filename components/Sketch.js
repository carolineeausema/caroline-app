import React, { useRef, useEffect } from 'react';
import styles from '../components/layout.module.css';

const Sketch = () => {
  const wrapperRef = useRef();

  useEffect(() => {
    // Import p5 on the client side
    import('p5').then((p5) => {
      const canvasParentRef = wrapperRef.current;
      const sketchFunction = (p) => {
        p.setup = () => {
          // Set canvas dimensions to match the window width
          p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
          p.angleMode(p.DEGREES);
          p.rectMode(p.CENTER);
        };
        p.draw = () => {
          p.clear(); // Clear the canvas
          p.noFill();

          // Center the drawing
          const xOffset = p.width / 2;
          const yOffset = p.height / 2;
          p.translate(xOffset, yOffset);

          // Calculate rotation angle based on mouse position
          const x = p.map(p.mouseX, 0, p.width, 0, 360);
          const y = p.map(p.mouseY, 0, p.width, 0, 360);

          // Set the stroke color to light gray with transparency
          p.stroke(200, 100); // Light gray with an alpha value of 100 (transparency)

          // Draw your shapes or patterns here
          for (let i = 0; i < 100; i++) {
                        p.push();

                        // Reduced the size of the rectangles
                        p.rect(x, y, x, y, 100 - i);

                        p.pop();
                    }
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
        style={{ position: 'absolute', top: -50, left: -50, zIndex: 1 }}
      ></div>
    </div>
  );
};

export default Sketch;

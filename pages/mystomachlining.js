import styles from '../components/layout.module.css';
import { useEffect, useRef } from 'react';

const Sketch = () => {
    const wrapperRef = useRef();

    useEffect(() => {
        // Import p5 on the client side
        import('p5').then((p5) => {
            const canvasParentRef = wrapperRef.current;
            const sketchFunction = (p) => {
                p.setup = () => {
                    p.createCanvas(window.innerWidth + 50, window.innerHeight + 50).parent(
                        canvasParentRef
                    );
                    p.angleMode(p.DEGREES);
                    p.rectMode(p.CENTER);
                };
                p.draw = () => {
                    p.background(232, 227, 219);
                    p.noFill();
                    p.stroke(0);

                    // Center the drawing
                    const xOffset = p.width / 2;
                    const yOffset = p.height / 2;
                    p.translate(xOffset, yOffset);

                    // Calculate rotation angle based on mouse position
                    const x = p.map(p.mouseX, 0, p.width, 0, 360);
                    const y = p.map(p.mouseY, 0, p.width, 0, 360);

                    for (let i = 0; i < 100; i++) {
                        p.push();

                        // Rotate based on mouse position
                        p.rotate(x + p.sin(p.frameCount + i) * 100);

                        // Reduced the size of the rectangles
                        p.rect(x, y, 300 - i * 3, 300 - i * 3, 100 - i);

                        p.pop();
                    }
                };
            };
            new p5.default(sketchFunction);
        });
    }, []);

    return (
        
        <div style={{ position: 'relative' }}>
            <p
                style={{
                    fontSize: '9px',
                    position: 'absolute',
                    zIndex: 2,
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                }}
            >
                ** hi, this one will work best if you have a mouse. try wigglin around a little ☀︎
                if ur on ur phone or something, just tap n do ur best.
            </p>
            <div
                className={styles.container}
                ref={wrapperRef}
                style={{ position: 'absolute', top: -50, left: -50, zIndex: 1 }}
            ></div>
        </div>
    );
};

export default Sketch;

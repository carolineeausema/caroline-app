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

                    p.rotate(45); // Rotate by 45 degrees
                };
                p.draw = () => {
                    p.background(255);

                    p.stroke(150);
                    p.line(0, p.height, p.width, 0); // Bottom left to top right
                };
            };
            new p5.default(sketchFunction);
        });
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div
                className={styles.container}
                ref={wrapperRef}
                style={{ position: 'absolute', top: -50, left: -50, zIndex: 1 }}
            ></div>
        </div>
    );
};

export default Sketch;

import { useEffect, useRef } from 'react';

const P5Sketch = () => {
    const wrapperRef = useRef();

    useEffect(() => {
        import('p5').then((p5) => {
            const canvasParentRef = wrapperRef.current;
            const sketchFunction = (p) => {
                let capture;
                let canvasWidth, canvasHeight;
                const Scale = 25;
                const rectSize = Scale * 0.2;

                p.setup = () => {
                    // Set canvas dimensions based on the screen size
                    canvasWidth = p.windowWidth < 800 ? p.windowWidth : 800;
                    canvasHeight = (canvasWidth / 4) * 3; // Maintain 4:3 aspect ratio

                    p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
                    capture = p.createCapture(p.VIDEO);
                    capture.size(canvasWidth / Scale, canvasHeight / Scale);
                    capture.hide();
                    p.pixelDensity(1);
                };

                p.draw = () => {
                    p.background(255);

                    capture.loadPixels();

                    for (let Y = 0; Y < capture.height; Y++) {
                        for (let X = 0; X < capture.width; X++) {
                            const X1 = p.mouseX / 20 * p.random(-1, 1);
                            const Y1 = p.mouseY / 20 * p.random(-1, 1);
                            const pixels = (X + Y * capture.width) * 4;

                            let r = capture.pixels[pixels];
                            if (r < 10) r = 255;

                            let g = capture.pixels[pixels + 1];
                            if (g < 10) g = 255;

                            let b = capture.pixels[pixels + 2];
                            if (b < 10) b = 255;

                            p.fill(r, g, b);

                            const posX = X * Scale;
                            const posY = Y * Scale;

                            p.rect(posX + rectSize + X1, posY + Y1, posX + rectSize + X1, posY + Y1);
                        }
                    }
                };

                p.windowResized = () => {
                    // Adjust the canvas size when the window is resized
                    canvasWidth = p.windowWidth < 800 ? p.windowWidth : 800;
                    canvasHeight = (canvasWidth / 4) * 3;
                    p.resizeCanvas(canvasWidth, canvasHeight);
                    capture.size(canvasWidth / Scale, canvasHeight / Scale);
                };
            };

            new p5.default(sketchFunction);
        });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: '4rem', overflow: 'hidden' }}>
            <div ref={wrapperRef}></div>
        </div>
    );
};

export default P5Sketch;

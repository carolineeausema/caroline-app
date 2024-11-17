import { useEffect, useRef } from 'react';

const P5Sketch = () => {
    const wrapperRef = useRef();
    let capture;

    useEffect(() => {
        import('p5').then((p5) => {
            const canvasParentRef = wrapperRef.current;
            const sketchFunction = (p) => {
                const Scale = 15;
                const radius = 70; // Radius around the cursor for color change
                const minScale = 1; // Minimum pixel scale when close to the cursor
                const maxScale = 20;


                p.setup = () => {
                    p.createCanvas(800, 600).parent(canvasParentRef);

                    // Initialize the webcam capture only once
                    if (!capture) {
                        capture = p.createCapture(p.VIDEO);
                        capture.size(800 / Scale, 600 / Scale);
                        capture.hide();
                    }

                    p.pixelDensity(1);
                };

                p.draw = () => {
                    p.background(255);

                    capture.loadPixels();

                    // Loop through each pixel and adjust the colors based on proximity to the cursor
                    for (let Y = 0; Y < capture.height; Y++) {
                        for (let X = 0; X < capture.width; X++) {
                            const pixels = (X + Y * capture.width) * 4;

                            // Get the pixel color values (RGB)
                            let r = capture.pixels[pixels];
                            if (r < 10) r = 255;

                            let g = capture.pixels[pixels + 1];
                            if (g < 10) g = 255;

                            let b = capture.pixels[pixels + 2];
                            if (b < 10) b = 255;

                            // Check if the pixel is within the radius around the cursor
                            const distToCursor = p.dist(X * Scale, Y * Scale, p.mouseX, p.mouseY);
                            const pixelScale = p.map(distToCursor, 0, radius, minScale, maxScale, true);

                            if (distToCursor < radius) {
                                // Modify the color based on mouse position if inside the radius
                                r = (r + p.mouseX / 10) % 255;
                                g = (g + p.mouseY / 10) % 255;
                                b = (b + (p.mouseX + p.mouseY) / 20) % 255;
                            }

                            // Fill the rectangles with the new color
                            p.fill(r, g, b);

                            // Draw a larger rectangle at (posX, posY) to make the cursor area more noticeable
                            const posX = X * Scale;
                            const posY = Y * Scale;

                            
                            p.rect(posX, posY, pixelScale, pixelScale);
                        }
                    }
                };
            };

            new p5.default(sketchFunction);
        });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
            <div ref={wrapperRef}></div>
        </div>
    );
};

export default P5Sketch;

import { useEffect, useRef } from 'react';

const SketchPage = () => {
    const wrapperRef = useRef();

    useEffect(() => {
        // Import p5 on the client side
        import('p5').then((p5) => {
            const canvasParentRef = wrapperRef.current;
            const sketchFunction = (p) => {
                p.setup = () => {
                    p.createCanvas(window.innerWidth + 50, window.innerHeight + 50, p.WEBGL).parent(
                        canvasParentRef
                    );
                    p.background(255, 20);
                };
                p.draw = () => {
                    p.normalMaterial();
                    p.orbitControl(5);

                    p.push();
                    p.translate(20, 20, 0);
                    p.rotateZ(p.frameCount * 0.002);
                    p.rotateX(p.frameCount * 0.002);
                    p.rotateY(p.frameCount * 0.002);
                    p.sphere(p.mouseX / 2, 16, 0);
                    p.pop();
                };
                p.mousePressed = () => {
                    p.background(255);
                };
            };
            new p5.default(sketchFunction);
        });
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div
                ref={wrapperRef}
                style={{ position: 'absolute', top: -50, left: -50, zIndex: 1 }}
            ></div>
        </div>
    );
};

export default SketchPage;

import { useEffect, useRef } from 'react';

const P5Wrapper = ({ sketch }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p5 = require('p5');
      const canvasParentRef = wrapperRef.current;
      new p5(sketch, canvasParentRef);
    }
  }, []);

  return <div ref={wrapperRef}></div>;
};

export default P5Wrapper;
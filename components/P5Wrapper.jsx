// components/p5Wrapper.js
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Wrapper = ({ sketch }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    const canvasParentRef = wrapperRef.current;

    new p5(sketch, canvasParentRef);
  }, [sketch]);

  return <div ref={wrapperRef}></div>;
};

export default P5Wrapper;

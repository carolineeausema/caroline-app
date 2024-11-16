// components/P5Wrapper.js
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Wrapper = ({ sketch }) => {
  const wrapperRef = useRef();
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    // Ensure p5 instance is only created once per mount
    if (wrapperRef.current) {
      p5InstanceRef.current = new p5(sketch, wrapperRef.current);
    }

    // Cleanup the p5 instance on component unmount
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [sketch]);

  return <div ref={wrapperRef} style={{ position: 'relative' }}></div>;
};

export default P5Wrapper;

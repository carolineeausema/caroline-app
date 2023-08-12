import styles from '../components/layout.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for the p5.js component
const P5Wrapper = dynamic(
  () => import('../components/P5Wrapper'), // Path to your P5Wrapper component
  { ssr: false } // Disable server-side rendering for this component
);

export default function Face() {
  // Function to handle the p5.js setup
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);
    // Access the user's webcam
    p5.createCapture(p5.VIDEO).parent(canvasParentRef);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Include the p5.js sketch using the P5Wrapper component */}
        <P5Wrapper sketch={setup} />
      </div>
    </>
  );
}

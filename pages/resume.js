import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import dynamic from "next/dynamic";

export default function Resume() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Function to adjust the container width to match the PDF's width
    const adjustContainerWidth = () => {
      if (iframeRef.current) {
        const pdfWidth = iframeRef.current.contentWindow.document.body.scrollWidth;
        iframeRef.current.style.width = pdfWidth + 'px';
      }
    };

    // Attach the adjustContainerWidth function to window resize event
    window.addEventListener('resize', adjustContainerWidth);

    // Call the adjustContainerWidth function initially
    adjustContainerWidth();

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', adjustContainerWidth);
    };
  }, []);

  return (
    <div className={styles.container} style={{ padding: '10 100rem' }}>
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center the content vertically
        overflow: 'hidden', // Hide overflow to prevent horizontal scroll
      }}>
        <iframe
          ref={iframeRef}
          src="Ausema_Resume.pdf"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            maxHeight: 'calc(100vh - 40px)', // Adjust to account for padding
          }}
        ></iframe>
      </div>

      <div className={styles.gridItem}>
        <div className={styles.gridText}>
          <h3 className={utilStyles.headingMd}><a href='Ausema_Resume.pdf' download>Download</a></h3>
        </div>
      </div>
    </div>
  );
}

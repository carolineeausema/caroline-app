import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import dynamic from "next/dynamic";

export default function Resume() {
  return (
    <div className={styles.container} style={{ padding: '10 100rem' }}>
      <div style={{
        width: '100%',
        height: '100vh'
      }}>
        <iframe src="Ausema_Resume.pdf" style={{width: '100%', height: '100%', border: 'none'}}></iframe>
      </div>

      <div className={styles.gridItem}>
        <div className={styles.gridText}>
          <h3 className={utilStyles.headingMd}><a href='Ausema_Resume.pdf' download>Download</a></h3>
        </div>
      </div>
    </div>
  );
}

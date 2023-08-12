import styles from '../components/layout.module.css';
import Link from 'next/link';
 
export default function Custom404() {
  return (
    <>
    <div className={styles.container}>
      
      <h3>sorry man this is so embarrassing for me</h3>
      <h1>404 - Page Not Found (;-;)</h1>

      <div className={styles.backToHome}>
          <Link href="/">⏎ click here to start over</Link>
      </div>
    </div>
    </>
  );
}
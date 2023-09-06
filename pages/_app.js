import '../styles/globals.css';
import React, { useRef, useEffect, useState } from 'react';
import styles from '../components/layout.module.css';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  const p5Canvas = useRef(null);
  
  const [scrollFactor, setScrollFactor] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoMaxWidth = 100; // Maximum width you want the logo to stretch

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const factor = scrollPosition / (windowHeight * 0.5);
      setScrollFactor(factor);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoOpacity = 1 - scrollFactor;
  const textColor = `rgba(0,0,0, ${1 - scrollFactor})`;
  const logoWidth = Math.max(50, logoMaxWidth - logoMaxWidth * scrollFactor);

  return (
    <div>
    <div className={styles.menuIcon} style={{ opacity: logoOpacity }} onClick={toggleMenu}>
        <div className={styles.menuOverlay} style={{ display: isMenuOpen ? 'block' : 'none' }}>
        {
          <div className={styles.menuItems}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/course_history">Coursework</Link>
              </li>
              <li>
                <Link href="/resume">Resume</Link>
              </li>
              <li>
                <Link href="">LinkedIn</Link>
              </li>
              <li>
                <Link href="/resume">GitHub</Link>
              </li>
            </ul>
          </div>
        }
        </div>
        menu
       </div>
  <Component {...pageProps} /></div>
  );
}
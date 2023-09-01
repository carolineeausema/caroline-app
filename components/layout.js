import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import dynamic from 'next/dynamic';
const DynamicSketch = dynamic(() => import('./Sketch'), { ssr: false });
const name = 'Caroline Ausema';
export const siteTitle = 'Ausema';

const Layout = ({ children, home }) => {
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

      <div className={styles.sketchContainer} style={{ zIndex: -1 }}>
          <DynamicSketch />
        </div>
      <div className={styles.container}>
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
      <div ref={p5Canvas} style={{ position: 'fixed', top: 0, height: '100vh' }} />
        <h1 className={`${utilStyles.titleFont}`}>
        
        <div
          className={utilStyles.colorInherit}
          style={{
            opacity: logoOpacity,
            position: 'fixed',
            center: `50%`,
            transform: `translateX(-${50 * scrollFactor}%)`, // Move left as the user scrolls
            transition: 'right 0.1s ease-in-out', // Add smooth transition
          }}
        >
            Hi, there.
        </div>
        </h1>
      <div className={styles.header} style={{ color: textColor }}>
        {home ? (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.png"
                className={utilStyles}
                alt=""
                layout="responsive"
                width={414}
                height={317}
              />
            </Link>
            <p className={`${utilStyles.nameFont}`}>
              <Link href="/" className={utilStyles.colorInherit}>
                I'm {name}.
              </Link>
            </p>

            <p className={`${utilStyles.paragraphFont}`}>
                I am a Senior Honors student at Purdue University, studying Computer Science with a focus in Security and Software Engineering. I'm also minoring in Sociology, focusing on the theoretical perspectives of Media and Technology. Some topics that interest me are Creative Coding, AI ethics, sociology (specifically crime & infrastructure), and limitless clean energy.
            </p>


            <p className={`${utilStyles.paragraphFont}`}>
                Outside of school, I like drinking coffee, weightlifting, sailing, flying, hearing live music, watching documentaries, and antique shopping (or any shopping actually whoops!).
            </p>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.png"
                className={utilStyles.borderCircle}
                alt=""
                width={108}
                height={108}
              />
            </Link>
            <p className={`${utilStyles.nameFont}`}>
              <Link href="/" className={utilStyles.colorInherit}>
                My name is {name}.
              </Link>
            </p>
            <p className={`${utilStyles.paragraphFont}`}>
                I am a Senior Honors student at Purdue University, studying Computer Science with a focus in Security and Software Engineering. I'm also minoring in Sociology, focusing on the theoretical perspectives of Media and Technology.
            </p>

            <p className={`${utilStyles.paragraphFont}`}>
                Outside of school, I like drinking coffee, weightlifting, sailing, flying, hearing live music, watching documentaries, and antique shopping (or any shopping actually whoops!).</p>

            
          </>
        )}
      </div>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default Layout;

import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

const name = 'Caroline Ausema';
export const siteTitle = 'Ausema';

const Layout = ({ children, home }) => {
  const p5Canvas = useRef(null);
  const [scrollFactor, setScrollFactor] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Initialize p5.js sketch when the component mounts on the client side
    const p5 = require('p5'); // Load p5.js dynamically
    const sketch = (p) => {

      p.setup = () => {
      };

      p.draw = () => {
      };
    };

    // Create p5.js instance
    new p5(sketch, p5Canvas.current);
  }, []); // Only run this effect once, on mount

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const factor = scrollPosition / (windowHeight * 0.1); // Adjust this value to control the speed of fading
      setScrollFactor(factor);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoOpacity = 1 - scrollFactor; // Fades the logo away as the user scrolls down
  const textColor = `rgba(0,0,0, ${1 - scrollFactor})`; // Fades from black to transparent

  return (
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
                <Link href="/link1">Link 1</Link>
              </li>
              <li>
                <Link href="/link2">Link 2</Link>
              </li>
              <li>
                <Link href="/link3">Link 3</Link>
              </li>
            </ul>
          </div>
        }
        </div>
        menu
       </div>
      {/* p5.js canvas for the horizontal line waves */}
      <div ref={p5Canvas} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100vh' }} />

      <div className={styles.iconlink} style={{ opacity: logoOpacity, position: 'fixed' }}>
        <Link href='/'>
          <Image
          style={utilStyles.logo}
            src="/images/icon.JPG"
            alt=""
            width={50}
            height={50}
            objectFit="contain"
          />
        </Link>
      </div>
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
            <h2 className={`${utilStyles.nameFont}`}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
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
            <h2 className={`${utilStyles.nameFont}`}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
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
  );
};

export default Layout;

import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
//import { Oxanium } from 'next/font/google'


const name = 'Caroline Ausema';
export const siteTitle = 'Ausema';
let width = 144;
let height = 144;
//const inter = Oxanium({ subsets: ['latin'] })


export default function Layout({ children, home }) {
  return (

    <><div className={styles.iconlink}>
          <Link href='/'>
                  <Image
                      src="/images/icon.jpg"
                      height={50}
                      width={50}
                      alt=""
                      object-fit="contain"
                      url='./' />
          </Link>


      </div>
      <div className={styles.container}>

              <Head>
                  <link rel="icon" href="/favicon.ico" />
                  <meta
                      property="og:image"
                      content={"images/icon.png"} />
                  <meta name="og:title" content={siteTitle} />
              </Head>
              <header className={styles.header}>
                  {home ? (
                      <>
                          <Link href="/">
                              <Image
                                  priority
                                  src="/images/profile.jpg"
                                  className={utilStyles.borderCircle}
                                  height={108}
                                  width={108}
                                  alt="" />
                          </Link>
                          <h2 className={utilStyles.headingLg}>
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
                                  src="/images/profile.jpg"
                                  className={utilStyles.borderCircle}
                                  height={108}
                                  width={108}
                                  alt="" />
                          </Link>
                          <h2 className={utilStyles.headingLg}>
                              <Link href="/" className={utilStyles.colorInherit}>
                                  {name}
                              </Link>
                          </h2>
                      </>
                  )}
              </header>
              <main>{children}</main>
              {!home && (
                  <div className={styles.backToHome}>
                      <Link href="/">← Back to home</Link>
                  </div>
              )}
          </div>

        <div className={styles.socialLinks}>
            <div>
                <Link href="https://www.linkedin.com/in/caroline-ausema/">↖︎ Connect with me on LinkedIn</Link>
            </div>

            <div>
                <Link href="https://www.instagram.com/carolineausema/">↖︎ Follow me on Instagram</Link>
            </div>

        </div></>
  );
}
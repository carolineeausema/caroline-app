// pages/index.js

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import SpotifyPlayer from '../components/spotify';

const Home = ({ allPostsData }) => {

  const do_not_show = [
    {
      text: 'Music Roadmap',
      href: '/music_map',
    },
    {
      text: 'Collage',
      href: '/resume',
    },
  ]

  const pages = [
    {
      text: 'Coursework',
      href: '/course_history',
    },
  ]

  const prof = [
    {
      text: 'Resume',
      href: '/resume',
    },
    {
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/caroline-ausema/',
    },
    {
      text: 'Github',
      href: 'https://github.com/carolineeausema',
    },
  ];

  const art = [
    {
      text: 'My Stomach Lining',
      href: '/mystomachlining',
    },
    {
      text: 'Mask',
      href: '/mask',
    },
    {
      text: 'Normal Mat Box',
      href: '/box',
    },
  ];

  const linkSections = [
    { title: 'Content', links: pages },
    { title: 'More Lil Art Sketches', links: art }, // Use the 'links' array for the second link section
    { title: 'Links', links: prof }, // Use the 'prof' array for the first link section
  ];

  return (
    <Layout home>
      <div className={styles.sectionSeparator}></div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      {linkSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.gridContainer}>
          <h5 className={styles.sectionTitleRow}>{section.title}</h5>
          {section.links.map((link, index) => (
            <Link href={link.href} key={index}>
              <div className={styles.gridItem}>
                <div className={styles.gridText}>
                  <h3 className={utilStyles.headingMd}>{link.text}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
        <div className={styles.sectionSeparator}></div>
        <h5 className={styles.sectionTitleRow}>Blog</h5>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      <div>
        <SpotifyPlayer />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default Home;

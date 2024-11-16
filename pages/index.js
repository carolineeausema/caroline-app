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
    {
      text: 'WA/VASH',
      href: '/wavash',
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
      text: 'Normal Mat Box',
      href: '/box',
    },
    {
      text: 'Stretch Webcam Pixels',
      href: '/stretch_pixels',
    },
    {
      text: 'Color Webcam Pixels',
      href: '/color_pixels',
    },
  ];

  // Content sections (excluding the Links section)
  const contentSections = [
    { title: 'Content', links: pages },
    { title: 'More Lil Art Sketches', links: art }, // Art section
  ];

  // Links section
  const linkSections = [
    { title: 'Links', links: prof }, // Links section (moved to bottom)
  ];

  return (
    <Layout home>
      <div className={styles.sectionSeparator}></div>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {/* Map through content sections (excluding Links) */}
      {contentSections.map((section, sectionIndex) => (
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

      {/* Adding a GIF after the Content section */}
      <div className={styles.gifContainer}>
        <img src="/images/ascii_web_gif.gif" alt="Creative coding showcase" className={styles.gif} />
      </div>

{/* Map through linkSections (Links section) */}
{linkSections.map((section, sectionIndex) => (
  <div key={sectionIndex} className={styles.gridContainer}>
    <h5 className={styles.sectionTitleRow}>{section.title}</h5>
    {section.links.map((link, index) => (
      <Link href={link.href} key={index}>
        <div className={styles.gridItem} style={{ backgroundColor: '#f5f5f5' }}> {/* Match the background color */}
          <div className={styles.gridText}>
            <h3 className={utilStyles.headingMd}>{link.text}</h3>
          </div>
        </div>
      </Link>
    ))}
  </div>
))}

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

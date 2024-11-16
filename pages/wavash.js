import styles from '../components/layout.module.css';
import Link from 'next/link';

export default function Wavash() {
  return (
    <>
      <div className={styles.container} style={{ fontSize: '12px' }}>
        
        <h3>WA/VASH Audiovisual Festival</h3>

        <p>As part of the Honors College, one of my graduation requirements is that I complete a scholarly project.</p>


        <img src="/images/WA_VASH0.jpg" alt="Festival setup" className={styles.media} />


        <p>My scholarly project, embodied in the experimental WA/VASH festival, is a captivating exploration of generative art's impact on community engagement. 
          Collaborating with Dr. Esteban Garcia-Bravo, we created an audio-visual experience in Tapawingo Park, West Lafayette, on <b>December 2, 2023.</b>. 
          We constructed a cubic sculpture as a canvas for artists to project coded visuals alongside experimental music, creating an immersive multi-sensory exhibit for around 120 attendees. 
          We showcased 14 diverse artists contributing to 8 distinct sets, transcending Purdue's borders by including artists from Indianapolis. 
          The festival emphasized the tangible impact of generative art within a communal setting, emphasizing the connection between technology, artistic expression, and social connection. </p>
          <img src="/images/WA_VASH1.jpg" alt="Festival setup" className={styles.media} />
          <p> My  set focused on facial recognition and distortion visuals, projected onto the cube, accompanied by a track by Lee Llyod. M project epitomizes the convergence of technical skill and artistic expression, demonstrating the potential of generative art to extend beyond the digital realm and establish a tangible presence within community. WA/VASH's success stands as a testament to the transformative power of creative coding, serving not only as a personal outlet but also as a dynamic catalyst for fostering community cohesion and engagement.</p>


          <div className={styles.gifContainer}>
            <img src="/images/wavash.gif" alt="Creative coding showcase" className={styles.gif} />
          </div>
      </div>
    </>
  );
}

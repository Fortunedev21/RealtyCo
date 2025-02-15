import React from 'react';
import styles from './Hero.module.css'; // Lien vers le fichier CSS module
import { absoluteUrl } from 'lib/utils';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <video
        className={styles.heroVideo}
        src={absoluteUrl('/sites/default/files/2024-10/nature.mp4')}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Find Your Dream Home</h1>
        <p className={styles.heroSubtitle}>Explore the best properties available</p>
        <div className={styles.heroButtons}>
          <button className={`${styles.btnPrimary} bg-slate-500 hover:bg-slate-800`}>Learn More</button>
          <button className={styles.btnSecondary}>Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

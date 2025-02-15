import React from 'react'
import styles from './Banner.module.css'

function Banner({title, subtitle}: {title: string, subtitle: string}) {
  return (
    <section className={`${styles.hero}`}>
      <div className={styles.main}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle} dangerouslySetInnerHTML={{ __html: subtitle }} ></p>
        </div>
      </div>
    </section>
  );
}


export default Banner;

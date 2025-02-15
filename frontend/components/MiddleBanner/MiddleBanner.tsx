import React from 'react'
import styles from './MiddleBanner.module.css'

interface BannerProps {
  title: string;
  subtitle: string;
}

function MiddleBanner({ title, subtitle }: BannerProps) {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.bannerOverlay}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default MiddleBanner

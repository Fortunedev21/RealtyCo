import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { absoluteUrl } from 'lib/utils';
import Image from 'next/image';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolledHeader + 'bg-slate-700' : ''} `}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/" >
            <Image
              src={absoluteUrl('/sites/default/files/2024-10/logo_text.png')}
              alt='Logo Realty'
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <Link href="/" className={`${styles.navLink} hover:text-slate-950 hover:border-b-2 hover:border-slate-950`}>Home</Link>
          <Link href="/about" className={`${styles.navLink} hover:text-slate-950 hover:border-b-2 hover:border-slate-950`}>About</Link>
          <Link href="/vacations-rentals" className={`${styles.navLink} hover:text-slate-950 hover:border-b-2 hover:border-slate-950`}>Vacation Rentals</Link>
          <Link href="/properties" className={`${styles.navLink} hover:text-slate-950 hover:border-b-2 hover:border-slate-950`}>Real Estate</Link>
          <Link href="/properties" className={`${styles.navLink} hover:text-slate-950 hover:border-b-2 hover:border-slate-950`}>My Favorites</Link>
          <Link href="/contact" className={`${styles.navLink} hover:text-slate-950 hover:border-b-2 hover:border-slate-950`}>Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import styles from "./Footer.module.css";
import Image from "next/image";
import { absoluteUrl } from "lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={`${styles.footer} bg-slate-800 text-slate-200 px-6 py-2 md:py-6`}>
      <div className={`${styles.containerTop} flex justify-between m-2 capitalize flex-wrap`}>
        <div className={`${styles.logo + ' ' + styles.group}`}>
          <Image
            src={absoluteUrl('/sites/default/files/2024-10/logo_text.png')}
            alt='Realty Co'
            width={200}
            height={200}
            className={`${styles.imageLogo} text-center`}
          />
          <p className={`${styles.tagline} text-center text-xl text-wrap uppercase`} >Far far away, <br /> behind the word mountains, <br /> far from the countries.</p>
        </div>
          <div className={styles.group}>
            <h6 className={`${styles.title} font-bold text-xl capitalize`}>community</h6>
            <p className={`${styles.text} font-serif text-lg`}>search properties</p>
            <p className={`${styles.text} font-serif text-lg`}>for agents</p>
            <p className={`${styles.text} font-serif text-lg`}>reviews</p>
            <p className={`${styles.text} font-serif text-lg`}>FAQs</p>
          </div>
          <div className={styles.group}>
            <h6 className={`${styles.title} font-bold text-xl capitalize`}>about us</h6>
            <p className={`${styles.text} font-serif text-lg`}>our story</p>
            <p className={`${styles.text} font-serif text-lg`}>meet the team</p>
            <p className={`${styles.text} font-serif text-lg`}>careers</p>
          </div>
          <div className={styles.group}>
            <h6 className={`${styles.title} font-bold text-xl capitalize`}>company</h6>
            <p className={`${styles.text} font-serif text-lg`}>about us</p>
            <p className={`${styles.text} font-serif text-lg`}>press</p>
            <p className={`${styles.text} font-serif text-lg`}>contact</p>
            <p className={`${styles.text} font-serif text-lg`}>careers</p>
          </div>
          <div className={styles.group}>
            <h6 className={`${styles.title} font-bold text-xl capitalize`}>Have a question</h6>
            <p className={`${styles.text} font-serif text-lg`}>	203 Fake St. Mountain View, San Francisco, California, USA</p>
            <p className={`${styles.text} font-serif text-lg`}>	+229 01 958 111 79</p>
            <p className={`${styles.text} font-serif text-lg`}>	info@mydomain.com</p>
          </div>

          <h6 className={`${styles.title} font-bold text-2xl capitalize`}></h6>
        </div>

      <div className={`${styles.containerBottom} text-center`}>
        <p className={styles.copyright}>
          © 2024 Real Estate Platform. All rights reserved.
        </p>

        <nav className={`${styles.nav}`}>
          <ul className={`${styles.navList} flex justify-center gap-5`}>
            <li className={styles.navItem}>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li className={styles.navItem}>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
            <li className={styles.navItem}>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

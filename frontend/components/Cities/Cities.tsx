import React from 'react';
import styles from './Cities.module.css'; // Importation des styles CSS
import Link from 'next/link';
import { DrupalTaxonomyTerm } from 'next-drupal';
import { absoluteUrl } from 'lib/utils';

interface Cities{
  terms: DrupalTaxonomyTerm,
}

const Cities = ({terms, ...props}: Cities) => {

  return (
    <div className={styles.colMd4} {...props}>
      <div
        className={`${styles.listingWrap}`}
        style={{ backgroundImage: `url(${absoluteUrl(terms.field_taxo_image.uri.url)})`}}
      >
        <div className={`${styles.overlay} bg-slate-600 opacity-40`}></div>
        <div className={styles.location}>
          <span className={styles.rounded}>{terms.name}</span>
        </div>
        <div className={styles.text}>
          <h3 className={styles.h3}>
            <Link href={terms.path.alias}>100 Property Listings</Link>
          </h3>
          <Link href={terms.path.alias} className={styles.btnLink}>
            See All Listings <span className=""></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cities;

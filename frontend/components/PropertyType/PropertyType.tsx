import React from 'react';
import Image from 'next/image';
import styles from './PropertyType.module.css'; // Importation des styles
import Link from 'next/link';

const PropertyType = () => {

  const PropertyTypes = [
    { id: 1, link: "/", src: "/images/listing-6.jpg", alt: "Vacation Rental", title: "Vacation Rentals", description: "Explore beautiful vacation rentals for your dream holidays." },
    { id: 1, link: "/", src: "/images/listing-1.jpg", alt: "Vacation Rental", title: "Real Estate Sales", description: "Find and buy your perfect home in top real estate markets." },
    { id: 1, link: "/", src: "/images/listing-4.jpg", alt: "Vacation Rental",  title: "LifeStyle Concierge", description: "Luxury concierge services for exclusive lifestyles."},
  ]

  return (
    <section className={styles.propertyTypesSection}>
      <div className={styles.propertyTypesContainer}>

        {PropertyTypes.map((PropertyType) => (
          <Link key={PropertyType.id} href={PropertyType.link} className={`${styles.propertyType} text-slate-500 text-center font-serif`}>
            <div className={`${styles.propertyTypeInfos}`}>
              <h3 className={`${styles.propertyTypeTitle} font-bold`}>{PropertyType.title}</h3>
              <p className={`${styles.propertyTypeDescription}`}>
                {PropertyType.description}
              </p>
            </div>
            <div className={styles.propertyTypeImage}>
              <Image
                src={PropertyType.src}
                alt={PropertyType.alt}
                width={500}
                height={200}
                className={styles.propertyTypeImage}
              />
            </div>
            <p className={styles.PropertyTypeText}>From dramatic lakefront estates to elegant ski cabins, our Lake Tahoe luxury vacation rentals will create memories for a lifetime.</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PropertyType;

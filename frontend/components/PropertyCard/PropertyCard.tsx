import Image from 'next/image';
import Link from 'next/link';
import styles from './PropertyCard.module.css';
import { DrupalNode } from 'next-drupal';
import { absoluteUrl, formatPrice } from 'lib/utils';

import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faDoorOpen, faHeart, faMap, faMapPin, faRulerCombined } from '@fortawesome/free-solid-svg-icons';

interface PropertyCardProps {
  node: DrupalNode,
}

function PropertyCard({node, ...props}: PropertyCardProps) {
  return (
    <div className={`${styles.card}  bg-slate-100 shadow-2xl m-2`} {...props}>
      {/* Image Section */}
      <div className={`${styles.topCard}`}>
        <div className={`${styles.propertyBadge} flex space-x-5 font-bold justify-center mb-2 select-none`}>
          <span className={`${styles.propertyType} bg-slate-800 text-white p-2 rounded-xl shadow-xl`}>{node.field_property_type.name}</span>
          <span className={`${styles.propertyStatus + ' ' + node.field_status.toLowerCase() == 'active' ? 'active' : 'pending'} bg-green-600 p-2 rounded-xl text-white shadow-xl`}>{node.field_status}</span>
        </div>
        <p className={`basis-1/5 text-slate-200 text-3xl hover:text-red-700 absolute z-50 right-4 bottom-4`} ><FontAwesomeIcon icon={faHeart}/></p>
        <div className={`${styles.propertyCardImage}`}>
          <Swiper navigation={true} modules={[Navigation]} loop className={`property-swiper`}>
            {node.field_images && node.field_images.length > 0 ? (
              node.field_images.map((imageData: any) => (
                <SwiperSlide key={imageData.id}>
                  <Image
                    src={absoluteUrl(imageData.uri.url)}
                    alt={imageData.resourceIdObjMeta.alt}
                    width={imageData.resourceIdObjMeta.width}
                    height={imageData.resourceIdObjMeta.height}
                    loading="lazy"
                    quality={80}
                    className={`${styles.propertyImage} select-none`}
                  />
                </SwiperSlide>
              ))
            ) : (
                <p className='font-bold text-center w-96 h-60'>No images available</p>
            )
            }
          </Swiper>
        </div>
      </div>

        {/* Info Section */}
        <div className={`${styles.propertyCardInfo} p-2 text-blue-950 select-none`}>
          <div className={`flex`}>
            <h2 className={`${styles.propertyTitle} basis-4/5 text-lg font-bold my-2 mx-3`}>
              <Link href={node.path.alias}>
                {node.title}
              </Link>
            </h2>

          </div>
          <div className={`${styles.propertyRow2} flex text-md my-2 justify-between mx-3 mb-4`}>
            <Link href={node.field_city.path.alias} className={`${styles.propertyLocation} border-slate-600 border-b-2 border-t-2 p-1`}><FontAwesomeIcon icon={faMap}/> {node.field_city.name}</Link>
            <p className={`${styles.propertyPrice} text-green-700 font-bold p-1`}>{formatPrice(node.field_price)}</p>
          </div>
          <ul className={`${styles.features} flex text-md text-center`}>
            <li className={`basis-1/5`} >{node.field_beds} <FontAwesomeIcon icon={faBed}/></li>
            <li className={`basis-1/5`} >{node.field_baths} <FontAwesomeIcon icon={faBath} /></li>
            <li className={`basis-1/5`} >{node.field_rooms} <FontAwesomeIcon icon={faDoorOpen} /></li>
            <li className={`basis-2/5`} >{node.field_surface} sqft <FontAwesomeIcon icon={faRulerCombined} /></li>
          </ul>
        </div>
    </div>
  );
};

export default PropertyCard;

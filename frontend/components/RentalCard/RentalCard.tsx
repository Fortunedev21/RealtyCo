import Image from 'next/image';
import Link from 'next/link';
import styles from './RentalCard.module.css'; // Import des styles
import { DrupalNode, DrupalTaxonomyTerm } from 'next-drupal';
import { absoluteUrl, formatPrice } from 'lib/utils';

import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faDoorClosed, faDoorOpen, faHeart, faMap, faMapPin, faPeopleGroup, faRulerCombined } from '@fortawesome/free-solid-svg-icons';

interface PropertyCardProps {
  node: DrupalNode,
}

function RentalCard({node, ...props}: PropertyCardProps) {
  return (
    <div className={`${styles.card}  bg-slate-100 shadow-2xl m-2`} {...props}>
      {/* Image Section */}
      <div className={`${styles.topCard} relative`}>
        <div className={`${styles.propertyBadge} flex space-x-5 font-bold justify-center mb-2 select-none absolute z-50 top-5 left-5`}>
          <span className={`${styles.propertyType} bg-slate-800 text-white p-2 rounded-xl shadow-xl`}>{node.field_rental_type.name}</span>
          {/* <span className={`${styles.propertyStatus + ' ' + node.field_status.toLowerCase() == 'active' ? 'active' : 'pending'} bg-green-600 p-2 rounded-xl text-white shadow-xl`}>{node.field_status}</span> */}
        </div>
        <p className={`basis-1/5 text-slate-200 text-3xl hover:text-red-700 absolute z-50 right-4 bottom-4`} ><FontAwesomeIcon icon={faHeart}/></p>
        <div className={`${styles.propertyCardImage}`}>
          <Swiper navigation={true} modules={[Navigation]} loop className={`property-swiper`}>
            {node.field_img && node.field_img.length > 0 ? (
              node.field_img.map((imageData: any) => (
                <SwiperSlide key={imageData.id}>
                  <Image
                    src={absoluteUrl(imageData.uri.url)}
                    alt={imageData.resourceIdObjMeta.alt}
                    width={imageData.resourceIdObjMeta.width}
                    height={imageData.resourceIdObjMeta.height}
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
            <Link href={node.field_state.path.alias} className={`${styles.propertyLocation} border-slate-600 border-b-2 border-t-2 p-1`}><FontAwesomeIcon icon={faMap}/> {node.field_state.name}</Link>
          <p className={`${styles.propertyPrice} text-green-700 font-bold p-1`}> From {formatPrice(node.field_price_min)} to {formatPrice(node.field_price_max)} </p>
          </div>
          <ul className={`${styles.features} flex text-md text-center`}>
            <li className={`basis-1/5`} >{node.field_bed} <FontAwesomeIcon icon={faBed}/></li>
            <li className={`basis-1/5`} >{node.field_bath} <FontAwesomeIcon icon={faBath} /></li>
            <li className={`basis-1/5`} >{node.field_guests} <FontAwesomeIcon icon={faPeopleGroup} /></li>
            <li className={`basis-2/5`} >{node.field_surface} sqft <FontAwesomeIcon icon={faRulerCombined} /></li>
          </ul>
        </div>
    </div>
  );
};


export default RentalCard;

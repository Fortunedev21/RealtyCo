import Image from "next/image"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { absoluteUrl} from "lib/utils"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

interface TermCityProps {
  term: DrupalTaxonomyTerm,
}

export function CityTerm({ term, ...props }: TermCityProps) {
  return (
    <article className="py-5 my-5 text-center" {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{term.name}</h1>
      <Swiper navigation={true} modules={[Navigation]} loop className="property-swiper">
          {term.field_images &&

            term.field_images?.map((image: any) => (
              <SwiperSlide key={image.id}>
                <figure>
                  <Image
                    src={absoluteUrl(image.uri.url)}
                    width={image.resourceIdObjMeta.width}
                    height={image.resourceIdObjMeta.height}
                    alt={image.resourceIdObjMeta.alt}
                    priority
                  />
                  {image.resourceIdObjMeta.title && (
                    <figcaption className="py-2 text-sm text-center text-gray-600">
                      {image.resourceIdObjMeta.title}
                    </figcaption>
                  )}
                </figure>
              </SwiperSlide>
            ))
          }
      </Swiper>
      {term.description && (
        <div
          dangerouslySetInnerHTML={{ __html: term.description.processed }}
          className="mt-6 font-serif text-lg leading-loose prose"
        />
      )}
    </article>
  )
}

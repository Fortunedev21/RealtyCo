import Image from "next/image"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

interface TermPropertyProps {
  term: DrupalTaxonomyTerm,
}

export function PropertyType({ term, ...props }: TermPropertyProps) {
  return (
    <article className="py-5 my-5 text-center" {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{term.title}</h1>
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
      {term.body && (
        <div
          dangerouslySetInnerHTML={{ __html: term.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}

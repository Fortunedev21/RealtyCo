import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

interface NodePropertyProps {
  node: DrupalNode,
}

export function NodeVacationRentals({ node, ...props }: NodePropertyProps) {
  return (
    <article className="py-5 my-5 text-center" {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <Swiper navigation={true} modules={[Navigation]} loop className="property-swiper">
          {node.field_img &&

            node.field_img?.map((image: any) => (
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
      {node.body && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}

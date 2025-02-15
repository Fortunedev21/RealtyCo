import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl } from "lib/utils"

interface NodePropertyTeaserProps {
  node: DrupalNode,
}

export function NodePropertyTeaser({ node, ...props }: NodePropertyTeaserProps) {

    return (
    <article {...props}>
      <Link href={node.path.alias} className="no-underline hover:text-blue-600">
        <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
      </Link>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            <span className="font-semibold">{node.field_city?.name}</span>
          </span>
        ) : null}
        <span> - {node.field_postal_code}</span>
      </div>

      {node.field_images.length > 0 ? (
        node.field_images.map((imageData: any) => (
          <figure key={imageData.id}>
            <Image
              src={absoluteUrl(imageData.uri.url)}
              alt={imageData.resourceIdObjMeta.alt}
              width={200}
              height={200}
            />
          </figure>
        ))
      ) : (
        <p>No images available</p>
      )}

      <Link
        href={node.path.alias}
        className="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
      >
        See More
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}

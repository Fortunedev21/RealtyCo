import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode, DrupalTaxonomyTerm} from "next-drupal"

import { drupal } from "lib/drupal"
import { NodeArticle } from "components/node--article"
import { NodeProperty } from "components/node--property"
import { Layout } from "components/layout"
import { NodeVacationRentals } from "components/node--vacation_rentals"
import Banner from "components/Banner/Banner"
import { CityTerm } from "components/taxonomy_term--cities"
import { PropertyType } from "components/taxonomy_term--property_type"

const RESOURCE_TYPES = ["node--page", "node--article", "node--property", "node--vacation_rentals"]

interface NodePageProps {
  resource: DrupalNode,
  term: DrupalTaxonomyTerm,
}

export default function NodePage({ resource, term }: NodePageProps) {
  if (!resource) return null
  if (!term) return null

  let title: string
  let subtitle: string

  if (resource.type === "node--article" || resource.type === "node--property" || resource.type === "node--vacation_rentals") {
    title = resource.title
    subtitle = resource.body?.processed
  }else if (resource.type === "taxonomy_term--cities" || resource.type === "taxonomy_term--property_type"){
    title = resource.name
    subtitle = resource.description?.processed
  }

  return (
    <Layout>
      <Head>
        <title>{title} | Realty Co</title>
        {/* {resource.type === "node--article" && <title>{resource.name} | Realty Co</title>} */}
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      <Banner title={title} subtitle={subtitle} />
      {/* {resource.type === "node--page" && <NodeBasicPage node={resource} />} */}
      {resource.type === "node--article" && <NodeArticle node={resource} />}
      {resource.type === "node--property" && <NodeProperty node={resource} />}
      {resource.type === "node--vacation_rentals" && <NodeVacationRentals node={resource} />}
      {resource.type === "taxonomy_term--cities" && <CityTerm term={term} /> }
      {resource.type === "taxonomy_term--property_type" && <PropertyType term={term} /> }
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  const paths = await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context);

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName

  let params = {}
  if (type === "node--article") {
    params = {
      include: "field_image,uid",
    }
  }

  if (type === "node--property") {
    params = {
      "fields[node--property]": "body,field_images,field_city,path,field_rooms,field_baths,field_beds,field_surface,field_price,field_city,title,field_postal_code,field_property_type,field_status",
      include: "field_images,field_city,field_property_type",
    }
  }

  if (type === "node--vacation_rentals") {
    params = {
      include: "field_img,field_state,field_rental_type",
    }
  }

  if (type === "taxonomy_term--cities") {
    params = {
      include: "field_taxo_image"
    }
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  const term = await drupal.getResourceFromContext<DrupalTaxonomyTerm>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }else if (!term) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }else if (!context.preview && term?.status === false) {
    return {
      notFound: true,
    }
  }


  return {
    props: {
      resource,
      term,
    },
  }
}

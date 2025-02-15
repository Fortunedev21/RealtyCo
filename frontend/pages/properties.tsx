import Head from "next/head"
import { GetServerSideProps, GetServerSidePropsResult, GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import Banner from "components/Banner/Banner"
import SearchBar from "components/SearchBar/SearchBar"
import { useState } from "react"
import PropertyCard from "components/PropertyCard/PropertyCard"
import Pagination from "components/pagination"
import { nodeServerPages } from "next/dist/build/webpack/plugins/pages-manifest-plugin"


interface PropertiesPageProps {
  nodes: DrupalNode[],
  terms: DrupalTaxonomyTerm[],
  types: DrupalTaxonomyTerm[],
  currentPage: number,
  totalPages: number,
}

export default function PropertiesPage({ nodes, terms, types, currentPage, totalPages, ...props }: PropertiesPageProps) {

  const [filteredProperties, setFilteredProperties] = useState(nodes);

  const handleSearch = (filters: { term: string; type: string; priceMin: number | null; priceMax: number | null; beds: number | null; baths: number | null }) => {
    const { term, type, priceMin, priceMax, beds, baths } = filters;

    const newFilteredProperties = nodes.filter((property) => {
      const isCityMatch = term === "" || term === property.field_city.name;
      const isTypeMatch = type === "" || type === property.field_property_type.name;
      const isPriceMinMatch = priceMin === null || priceMin <= property.field_price;
      const isPriceMaxMatch = priceMax === null || priceMax >= property.field_price;
      const isBedsMatch = beds === null || beds <= property.field_beds;
      const isBathsMatch = baths === null || baths <= property.field_baths;

      return isCityMatch && isTypeMatch && isPriceMinMatch && isPriceMaxMatch && isBedsMatch && isBathsMatch;
    });

    setFilteredProperties(newFilteredProperties);
  };

  return (
    <Layout>
      <Head>
        <title>Real Estate App</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <Banner title="Find Your Dream Home" subtitle="Explore the best properties available" />

      <div {...props}>
        <SearchBar onSearch={handleSearch} terms={terms} types={types} />
      </div>

      <div className="flex flex-wrap p-6 mx-6">
        {filteredProperties?.length ? (
          filteredProperties.map((node) => (
              <PropertyCard
                key={node.id}
                node={node}
              />
          ))
        ) : (
          <p className="w-full py-4 text-2xl font-bold text-center">Sorry, we have not found the properties you&apos;re searching for.</p>
        )}
        {/* Composant de pagination */}
        <div className="flex items-center justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

    </Layout>
  )
}

export async function getServerSideProps(
  context
): Promise<GetServerSidePropsResult<PropertiesPageProps>> {
  const page = context.query.page ? Number(context.query.page) : 1
  const limit = 15  
  const offset = (page - 1) * limit

  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--property",
    context,
    {

      params: {
        "filter[status]": 1,
        "fields[node--property]": "field_images,field_city,path,field_rooms,field_baths,field_beds,field_surface,field_price,field_city,title,field_postal_code,field_property_type,field_status,field_garage",
        include: "field_images,field_city,field_property_type,uid",
        sort: "-created",
        "page[offset]": offset,
        "page[limit]": limit,
      },
    }
  )

  const terms = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>(
    "taxonomy_term--cities",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[taxonomy_term--cities]": "name,path",
      },
    }
  )

  const types = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>(
    "taxonomy_term--property_type",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[taxonomy_term--property_type]": "title,path",
      },
    }

  )

  const totalNodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--property",
    {
      params: {
        "filter[status]": 1,
        "fields[node--property]": "id",
      },
    }
  )

    const totalCount = totalNodes.length || 0
    const totalPages = Math.ceil(totalCount / limit)

  return {
    props: {
      nodes,
      terms,
      types,
      currentPage: page,
      totalPages,
    },
  }
}

import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import Banner from "components/Banner/Banner"
import Searchbar from "components/SearchBar/SearchBar"
import { useState } from "react"
import RentalCard from "components/RentalCard/RentalCard"


interface PropertiesPageProps {
  nodes: DrupalNode[],
  terms: DrupalTaxonomyTerm[],
  types: DrupalTaxonomyTerm[],
}

export default function RentalsPage({ nodes, terms, types, ...props }: PropertiesPageProps) {

  const [filteredProperties, setFilteredProperties] = useState(nodes);

  const handleSearch = (filters: { term: string; type: string; priceMin: number | null; priceMax: number | null; beds: number | null; baths: number | null }) => {
    const { term, type, priceMin, priceMax, beds, baths } = filters;

    const newFilteredProperties = nodes.filter((rental) => {
      const isCityMatch = term === "" || term === rental.field_state.name;
      const isTypeMatch = type === "" || type === rental.field_rental_type.name;
      const isPriceMinMatch = priceMin === null || priceMin <= rental.field_price_min;
      const isPriceMaxMatch = priceMax === null || priceMax >= rental.field_price_max;
      const isBedsMatch = beds === null || beds <= rental.field_bed;
      const isBathsMatch = baths === null || baths <= rental.field_bath;

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

      <Banner />

      <div {...props}>
        <Searchbar onSearch={handleSearch} terms={terms} types={types}/>
      </div>

      <div className="p-5 mx-6 flex flex-wrap">
        {filteredProperties?.length ? (
          filteredProperties.map((node) => (
              <RentalCard key={node.id} node={node} />
          ))
        ) : (
          <p className="py-4 text-center w-full font-bold text-2xl">Sorry, we have not found the vacation rentals you&apos;re searching for.</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<PropertiesPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--vacation_rentals",
    context,
    {
      params: {
        "filter[status]": 1,
        //"fields[node--vacation_rentals]": "field_img,path,field_bath,field_bed,field_price_min,field_price_max,field_state,title,field_rental_type",
        include: "field_img,field_state,field_rental_type",
        sort: "-created",
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
        "fields[taxonomy_term--cities]": "name,path",
      },
    }
  )

  return {
    props: {
      nodes,
      terms,
      types,
    },
  }
}

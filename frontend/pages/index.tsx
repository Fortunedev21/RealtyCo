import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import Hero from "components/Hero/Hero"
import PropertyType from "components/PropertyType/PropertyType"
import Cities from "components/Cities/Cities"
import PropertyCard from "components/PropertyCard/PropertyCard"
import MiddleBanner from "components/MiddleBanner/MiddleBanner"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


interface IndexPageProps {
  nodes: DrupalNode[],
  terms: DrupalTaxonomyTerm[],
}

export default function IndexPage({ nodes, terms }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Realty Co</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <Hero />
      <PropertyType />

      <section className="ftcoSection" >
      <div className="container">
        <div className="headingSection">
          <span className="subheading text-slate-700">Find Properties</span>
          <h2 className="title text-slate-600">Find Properties In Your City</h2>
        </div>
          <div className="row">
            <Swiper slidesPerView={4} spaceBetween={10} navigation={true} modules={[Navigation]} loop className={`property-swiper`}>
              {terms.map((term) => (
                <SwiperSlide key={term.id} className="bg-transparent">
                    <Cities terms={term} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>

      <MiddleBanner
        title="Découvrez nos articles"
        subtitle="Inspirez-vous de nos conseils et guides pour vos projets immobiliers."
      />


    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--property",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--property]": "title,path,field_images,field_city,field_property_type,field_status,field_price,field_baths,field_beds,field_rooms,field_surface,field_postal_code",
        include: "field_images,field_city,field_property_type",
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
        "fields[taxonomy_term--cities]": "name,path,field_taxo_image",
        include: "field_taxo_image",
        sort: "name",
      },
    }
  )

  return {
    props: {
      nodes,
      terms,
    },
  }
}


// import { drupal } from "lib/drupal";

// export default async function handler(req, res) {
//   const { city, status, priceMin, priceMax, beds, baths } = req.query;

//   try {
//     const params = {
//       "filter[status]": status || undefined,
//       "filter[field_city]": city || undefined,
//       "filter[field_price_min][condition][value]": priceMin || undefined,
//       "filter[field_price_min][condition][operator]": ">=",
//       "filter[field_price_max][condition][value]": priceMax || undefined,
//       "filter[field_price_max][condition][operator]": "<=",
//       "filter[field_beds][condition][value]": beds || undefined,
//       "filter[field_baths][condition][value]": baths || undefined,
//       sort: "-created",
//     };

//     const properties = await drupal.getResourceCollection("node--property", {
//       params,
//     });

//     res.status(200).json(properties);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching properties." });
//   }
// }

import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "vcwzie3y", // replace with your Sanity projectId
  dataset: "production",
  apiVersion: "2025-11-15", // use current date
  useCdn: true, // `false` if you want fresh data on every request
});

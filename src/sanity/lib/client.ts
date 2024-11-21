import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true, // Disable CDN to always fetch fresh data
});

const builder = imageUrlBuilder(client);
// eslint-disable-next-line
export function urlFor(source: any) {
  return builder.image(source);
}
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'zdekbwim', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2023-05-03',
});

//convertir las fotos de Sanity en links normales
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
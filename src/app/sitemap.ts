import { MetadataRoute } from 'next';
import { config } from './core/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.website,
      lastModified: new Date(),
    },
  ];
}

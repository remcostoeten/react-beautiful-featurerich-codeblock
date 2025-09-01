import { MetadataRoute } from "next";
import { appConfig } from "../core/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: appConfig.website,
      lastModified: new Date(),
    },
  ];
}

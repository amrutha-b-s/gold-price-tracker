import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gold-price-tracker-mu.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://gold-price-tracker-mu.vercel.app/comparison",
      lastModified: new Date(),
    },
    {
      url: "https://gold-price-tracker-mu.vercel.app/ranking",
      lastModified: new Date(),
    },
    {
      url: "https://gold-price-tracker-mu.vercel.app/prediction",
      lastModified: new Date(),
    },
  ];
}
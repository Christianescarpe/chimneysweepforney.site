import type { MetadataRoute } from "next";
import { SERVICE_PAGES, LOCATION_PAGES, BLOG_PAGES } from "@/data/siteData";

const BASE_URL = "https://www.chimneysweepforney.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...SERVICE_PAGES.map((page) => ({
      url: `${BASE_URL}${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...LOCATION_PAGES.map((page) => ({
      url: `${BASE_URL}${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    {
      url: `${BASE_URL}/blog/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...BLOG_PAGES.map((post) => ({
      url: `${BASE_URL}${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${BASE_URL}/contact/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

import type { MetadataRoute } from "next";
import { allMembers } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nerds-portal.vercel.app";
  const staticRoutes = ["/research", "/publications", "/code", "/members"];
  const memberRoutes = allMembers.map((member) => `/members/${member.slug}`);

  return [...staticRoutes, ...memberRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "/research" ? 1 : 0.7,
    lastModified: new Date(),
  }));
}

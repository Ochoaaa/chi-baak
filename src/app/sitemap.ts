import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["", "/servicios", "/antes-y-despues", "/cotizar", "/contacto"].map((p) => ({ url: b + p }));
}

import { createClient } from "@/lib/supabase/server";
export type Service = { id: string; name: string; slug: string; category: string; short_description: string | null; description: string | null; price: number; price_type: "fixed" | "from" | "quote"; includes: string[]; image_url: string | null; active: boolean; sort_order: number };
export type Gallery = { id: string; title: string; category: string; before_image_url: string | null; after_image_url: string | null; description: string | null; active: boolean };
export type Settings = { business_name: string; tagline: string; description: string; whatsapp: string; location: string; hero_title: string; hero_subtitle: string; default_whatsapp_message: string };
const DEFAULTS: Settings = { business_name: "CHꙨꙨ BA'AK", tagline: "SOLUCIONES ANCESTRALES DE LIMPIEZA", description: "Lavado profesional de colchones, salas, sofás y tapicería de vehículos a domicilio en Tapachula y alrededores.", whatsapp: "529623257800", location: "Tapachula, Chiapas", hero_title: "LIMPIEZA PROFUNDA\nA DOMICILIO", hero_subtitle: "El cambio se nota al lavarlo.", default_whatsapp_message: "Hola, CHꙨꙨ BA'AK. Quiero información sobre sus servicios de limpieza." };
export async function getSettings(): Promise<Settings> {
  const { data } = await (await createClient()).from("business_settings").select("*").limit(1).maybeSingle();
  return { ...DEFAULTS, ...(data ?? {}) };
}
export async function getServices(): Promise<Service[]> {
  const { data } = await (await createClient()).from("services").select("*").eq("active", true).order("sort_order");
  return data ?? [];
}
export async function getService(slug: string): Promise<Service | null> {
  const { data } = await (await createClient()).from("services").select("*").eq("slug", slug).eq("active", true).maybeSingle();
  return data;
}
export async function getGallery(): Promise<Gallery[]> {
  const { data } = await (await createClient()).from("gallery_items").select("*").eq("active", true).order("sort_order");
  return data ?? [];
}
export const formatPrice = (s: Pick<Service, "price" | "price_type">) =>
  s.price_type === "quote" ? "Precio bajo cotización" : `${s.price_type === "from" ? "Desde " : ""}$${s.price.toLocaleString("es-MX")} MXN`;

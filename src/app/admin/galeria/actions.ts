"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
const schema = z.object({ title: z.string().min(2, "Escribe un título."), category: z.enum(["colchones", "salas", "sofas", "vehiculos", "otro"]), description: z.string().max(500), sort_order: z.coerce.number().int() });
const TYPES = ["image/jpeg", "image/png", "image/webp"];
type SB = Awaited<ReturnType<typeof createClient>>;
async function authed() { const sb = await createClient(); const { data: { user } } = await sb.auth.getUser(); if (!user) throw new Error("No autorizado"); return sb; }
async function upload(sb: SB, f: FormDataEntryValue | null, tag: string) {
  if (!(f instanceof File) || f.size === 0) return null;
  if (!TYPES.includes(f.type) || f.size > 5_000_000) throw new Error("La imagen debe ser JPG, PNG o WebP de máximo 5 MB.");
  const path = `${tag}-${crypto.randomUUID()}`;
  const { error } = await sb.storage.from("gallery").upload(path, f, { contentType: f.type });
  if (error) throw error;
  return sb.storage.from("gallery").getPublicUrl(path).data.publicUrl;
}
const pathOf = (url?: string | null) => url?.split("/gallery/")[1];
export async function saveGalleryItem(fd: FormData) {
  const sb = await authed(); const p = schema.parse(Object.fromEntries(fd)); const id = String(fd.get("id") || "");
  const before = await upload(sb, fd.get("before"), "antes"); const after = await upload(sb, fd.get("after"), "despues");
  if (!id && (!before || !after)) throw new Error("Sube la imagen de antes y la de después.");
  const row: Record<string, unknown> = { ...p, active: fd.get("active") === "on", updated_at: new Date().toISOString() };
  if (id) {
    const { data: old } = await sb.from("gallery_items").select("before_image_url,after_image_url").eq("id", id).single();
    if (before) { row.before_image_url = before; const o = pathOf(old?.before_image_url); if (o) await sb.storage.from("gallery").remove([o]); }
    if (after) { row.after_image_url = after; const o = pathOf(old?.after_image_url); if (o) await sb.storage.from("gallery").remove([o]); }
  } else { row.before_image_url = before; row.after_image_url = after; }
  const { error } = id ? await sb.from("gallery_items").update(row).eq("id", id) : await sb.from("gallery_items").insert(row);
  if (error) throw error; revalidatePath("/", "layout");
}
export async function toggleGalleryItem(fd: FormData) {
  const sb = await authed(); await sb.from("gallery_items").update({ active: fd.get("active") !== "true" }).eq("id", String(fd.get("id"))); revalidatePath("/", "layout");
}
export async function deleteGalleryItem(fd: FormData) {
  const sb = await authed(); const id = String(fd.get("id"));
  const { data: old } = await sb.from("gallery_items").select("before_image_url,after_image_url").eq("id", id).single();
  const paths = [pathOf(old?.before_image_url), pathOf(old?.after_image_url)].filter(Boolean) as string[];
  if (paths.length) await sb.storage.from("gallery").remove(paths);
  await sb.from("gallery_items").delete().eq("id", id); revalidatePath("/", "layout");
}

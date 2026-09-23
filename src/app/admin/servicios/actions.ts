"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum([
    "colchones",
    "salas",
    "sofas",
    "vehiculos",
    "otro",
  ]),
  short_description: z.string().max(200),
  description: z.string().max(2000),
  price: z.coerce.number().int().min(0),
  price_type: z.enum(["fixed", "from", "quote"]),
  sort_order: z.coerce.number().int(),
});

async function authed() {
  const sb = await createClient();

  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  return sb;
}

export async function saveService(fd: FormData) {
  const sb = await authed();

  const data = {
    name: fd.get("name"),
    slug: fd.get("slug"),
    category: fd.get("category"),
    short_description: fd.get("short_description"),
    description: fd.get("description"),
    price: fd.get("price"),
    price_type: fd.get("price_type"),
    sort_order: fd.get("sort_order"),
  };

  const p = schema.parse(data);

  const id = String(fd.get("id") || "");

  const includes = String(fd.get("includes") || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

  const row: Record<string, unknown> = {
    ...p,
    includes,
    active: fd.get("active") === "on",
    updated_at: new Date().toISOString(),
  };

  const img = fd.get("image");

  if (img instanceof File && img.size > 0) {
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(img.type) ||
      img.size > 5_000_000
    ) {
      throw new Error("Imagen inválida");
    }

    const path = `${p.slug}-${Date.now()}`;

    const { error } = await sb.storage
      .from("services")
      .upload(path, img, {
        contentType: img.type,
      });

    if (error) {
      throw error;
    }

    row.image_url = sb.storage
      .from("services")
      .getPublicUrl(path)
      .data.publicUrl;
  }

  const { error } = id
    ? await sb
        .from("services")
        .update(row)
        .eq("id", id)
    : await sb
        .from("services")
        .insert(row);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
}

export async function toggleService(fd: FormData) {
  const sb = await authed();

  await sb
    .from("services")
    .update({
      active: fd.get("active") !== "true",
    })
    .eq("id", String(fd.get("id")));

  revalidatePath("/", "layout");
}

export async function deleteService(fd: FormData) {
  const sb = await authed();

  await sb
    .from("services")
    .delete()
    .eq("id", String(fd.get("id")));

  revalidatePath("/", "layout");
}
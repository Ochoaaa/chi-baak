"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
const schema = z.object({
  business_name: z.string().min(2, "Escribe el nombre del negocio.").max(80), tagline: z.string().max(120), description: z.string().max(500),
  whatsapp: z.string().transform((v) => v.replace(/\D/g, "")).pipe(z.string().regex(/^\d{10,15}$/, "El WhatsApp debe tener lada y número, por ejemplo 529623257800.")),
  location: z.string().max(120), hero_title: z.string().min(2).max(80), hero_subtitle: z.string().max(120), default_whatsapp_message: z.string().min(2).max(300),
});
export type State = { ok: boolean; msg: string } | null;
export async function saveSettings(_: State, fd: FormData): Promise<State> {
  const sb = await createClient(); const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, msg: "Tu sesión expiró. Inicia sesión de nuevo." };
  const r = schema.safeParse(Object.fromEntries(fd)); if (!r.success) return { ok: false, msg: r.error.issues[0].message };
  const { data: cur } = await sb.from("business_settings").select("id").limit(1).maybeSingle();
  const row = { ...r.data, updated_at: new Date().toISOString() };
  const { error } = cur ? await sb.from("business_settings").update(row).eq("id", cur.id) : await sb.from("business_settings").insert(row);
  if (error) return { ok: false, msg: "Hubo un problema. Intenta nuevamente." };
  revalidatePath("/", "layout"); return { ok: true, msg: "Configuración actualizada correctamente." };
}

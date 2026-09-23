"use client";
import { useActionState } from "react";
import { saveSettings } from "./actions";
import type { Settings } from "@/lib/data";
const f = "mt-1 w-full rounded-xl border border-primary/20 px-3 py-2";
export default function ConfigForm({ s }: { s: Settings }) {
  const [state, action, pending] = useActionState(saveSettings, null);
  const T = ({ n, l, v, rows }: { n: keyof Settings; l: string; v: string; rows?: number }) => <label className="block text-sm font-semibold">{l}{rows ? <textarea name={n} rows={rows} defaultValue={v} className={f} /> : <input name={n} defaultValue={v} className={f} />}</label>;
  return (<form action={action} className="grid gap-4">
    <T n="business_name" l="Nombre del negocio" v={s.business_name} /><T n="tagline" l="Lema" v={s.tagline} />
    <T n="description" l="Descripción" v={s.description} rows={3} /><T n="whatsapp" l="WhatsApp (con lada, ej. 529623257800)" v={s.whatsapp} />
    <T n="location" l="Ubicación" v={s.location} /><T n="hero_title" l="Texto principal (una línea por renglón)" v={s.hero_title} rows={2} />
    <T n="hero_subtitle" l="Texto secundario" v={s.hero_subtitle} /><T n="default_whatsapp_message" l="Mensaje predeterminado de WhatsApp" v={s.default_whatsapp_message} rows={2} />
    {state && <p role="status" className={`rounded-xl p-3 text-sm font-semibold ${state.ok ? "bg-primary-light text-primary" : "bg-red-50 text-red-700"}`}>{state.msg}</p>}
    <button disabled={pending} className="rounded-full bg-primary py-3 font-bold text-white disabled:opacity-60">{pending ? "Guardando…" : "Guardar configuración"}</button></form>);
}

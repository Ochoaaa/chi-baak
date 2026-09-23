import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
export default async function Page() {
  const sb = await createClient();
  const [a, b, c] = await Promise.all([sb.from("services").select("*", { count: "exact", head: true }), sb.from("services").select("*", { count: "exact", head: true }).eq("active", true), sb.from("gallery_items").select("*", { count: "exact", head: true })]);
  const cards = [["Servicios", a.count ?? 0], ["Servicios activos", b.count ?? 0], ["Trabajos en galería", c.count ?? 0]];
  return (<><AdminNav /><main className="mx-auto max-w-4xl p-4"><h1 className="mb-4 text-2xl font-black text-primary">Dashboard</h1>
    <div className="grid gap-4 sm:grid-cols-3">{cards.map(([t, n]) => <div key={t} className="rounded-2xl border border-primary-light p-4"><p className="text-3xl font-black text-primary">{n}</p><p className="text-sm text-muted">{t}</p></div>)}</div>
    <div className="mt-6 flex flex-wrap gap-3"><Link href="/admin/servicios" className="rounded-full bg-primary px-5 py-2 font-bold text-white">Editar precios</Link><Link href="/admin/galeria" className="rounded-full border border-primary px-5 py-2 font-bold text-primary">Subir a galería</Link></div></main></>);
}

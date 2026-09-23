import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, type Service } from "@/lib/data";
import { saveService, toggleService, deleteService } from "./actions";
const f = "mt-1 w-full rounded-xl border border-primary/20 px-3 py-2";
function Form({ s }: { s?: Service }) {
  return (<form action={saveService} className="grid gap-3 sm:grid-cols-2">
    <input type="hidden" name="id" defaultValue={s?.id} />
    <label className="text-sm font-semibold">Nombre<input name="name" required defaultValue={s?.name} className={f} /></label>
    <label className="text-sm font-semibold">Slug<input name="slug" required pattern="[a-z0-9-]+" defaultValue={s?.slug} className={f} /></label>
    <label className="text-sm font-semibold">Categoría<select name="category" defaultValue={s?.category} className={f}>{["colchones", "salas", "sofas", "vehiculos", "otro"].map((c) => <option key={c}>{c}</option>)}</select></label>
    <label className="text-sm font-semibold">Precio (MXN)<input name="price" type="number" min={0} step={1} required defaultValue={s?.price ?? 0} className={f} /></label>
    <label className="text-sm font-semibold">Tipo de precio<select name="price_type" defaultValue={s?.price_type ?? "fixed"} className={f}><option value="fixed">Fijo</option><option value="from">Desde</option><option value="quote">Bajo cotización</option></select></label>
    <label className="text-sm font-semibold">Orden<input name="sort_order" type="number" defaultValue={s?.sort_order ?? 0} className={f} /></label>
    <label className="text-sm font-semibold sm:col-span-2">Descripción corta<input name="short_description" defaultValue={s?.short_description ?? ""} className={f} /></label>
    <label className="text-sm font-semibold sm:col-span-2">Descripción detallada<textarea name="description" rows={2} defaultValue={s?.description ?? ""} className={f} /></label>
    <label className="text-sm font-semibold sm:col-span-2">Qué incluye (uno por línea)<textarea name="includes" rows={3} defaultValue={s?.includes?.join("\n")} className={f} /></label>
    <label className="text-sm font-semibold">Imagen (JPG, PNG o WebP, máx. 5 MB)<input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="mt-1 text-sm" /></label>
    <label className="flex items-center gap-2 text-sm font-semibold"><input name="active" type="checkbox" defaultChecked={s?.active ?? true} />Activo</label>
    <button className="rounded-full bg-primary py-2 font-bold text-white sm:col-span-2">Guardar servicio</button></form>);
}
export default async function Page() {
  const { data } = await (await createClient()).from("services").select("*").order("sort_order");
  const list = (data ?? []) as Service[];
  return (<><AdminNav /><main className="mx-auto max-w-4xl space-y-4 p-4"><h1 className="text-2xl font-black text-primary">Servicios</h1>
    {list.map((s) => (<details key={s.id} className="rounded-2xl border border-primary-light p-4"><summary className="flex cursor-pointer flex-wrap items-center gap-3"><b className="text-primary">{s.name}</b><span className="text-sm text-muted">{s.category} · {formatPrice(s)} · orden {s.sort_order} · {s.active ? "activo" : "inactivo"}</span></summary>
      <div className="mt-4"><Form s={s} /><div className="mt-3 flex gap-2">
        <form action={toggleService}><input type="hidden" name="id" value={s.id} /><input type="hidden" name="active" value={String(s.active)} /><button className="rounded-full border border-primary px-4 py-1 text-sm font-bold text-primary">{s.active ? "Desactivar" : "Activar"}</button></form>
        <form action={deleteService}><input type="hidden" name="id" value={s.id} /><button className="rounded-full border border-red-600 px-4 py-1 text-sm font-bold text-red-600">Eliminar</button></form></div></div></details>))}
    <details className="rounded-2xl border-2 border-dashed border-primary/30 p-4"><summary className="cursor-pointer font-bold text-primary">Nuevo servicio</summary><div className="mt-4"><Form /></div></details></main></>);
}

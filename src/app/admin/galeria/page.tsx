import AdminNav from "@/components/AdminNav";
import { createClient } from "@/lib/supabase/server";
import type { Gallery } from "@/lib/data";
import { saveGalleryItem, toggleGalleryItem, deleteGalleryItem } from "./actions";
type Item = Gallery & { sort_order: number };
const f = "mt-1 w-full rounded-xl border border-primary/20 px-3 py-2";
const accept = "image/jpeg,image/png,image/webp";
function Form({ g }: { g?: Item }) {
  return (<form action={saveGalleryItem} className="grid gap-3 sm:grid-cols-2">
    <input type="hidden" name="id" defaultValue={g?.id} />
    <label className="text-sm font-semibold">Título<input name="title" required defaultValue={g?.title} className={f} /></label>
    <label className="text-sm font-semibold">Categoría<select name="category" defaultValue={g?.category} className={f}>{["colchones", "salas", "sofas", "vehiculos", "otro"].map((c) => <option key={c}>{c}</option>)}</select></label>
    <label className="text-sm font-semibold">Imagen antes{g && " (déjala vacía para conservarla)"}<input name="before" type="file" accept={accept} required={!g} className="mt-1 block text-sm" />{g?.before_image_url && <img src={g.before_image_url} alt="Antes" className="mt-2 h-20 rounded-lg object-cover" />}</label>
    <label className="text-sm font-semibold">Imagen después{g && " (déjala vacía para conservarla)"}<input name="after" type="file" accept={accept} required={!g} className="mt-1 block text-sm" />{g?.after_image_url && <img src={g.after_image_url} alt="Después" className="mt-2 h-20 rounded-lg object-cover" />}</label>
    <label className="text-sm font-semibold sm:col-span-2">Descripción (opcional)<textarea name="description" rows={2} defaultValue={g?.description ?? ""} className={f} /></label>
    <label className="text-sm font-semibold">Orden<input name="sort_order" type="number" defaultValue={g?.sort_order ?? 0} className={f} /></label>
    <label className="flex items-center gap-2 text-sm font-semibold"><input name="active" type="checkbox" defaultChecked={g?.active ?? true} />Activo</label>
    <p className="text-xs text-muted sm:col-span-2">JPG, PNG o WebP, máximo 5 MB por imagen.</p>
    <button className="rounded-full bg-primary py-2 font-bold text-white sm:col-span-2">{g ? "Guardar cambios" : "Publicar trabajo"}</button></form>);
}
export default async function Page() {
  const { data } = await (await createClient()).from("gallery_items").select("*").order("sort_order");
  const list = (data ?? []) as Item[];
  return (<><AdminNav /><main className="mx-auto max-w-4xl space-y-4 p-4"><h1 className="text-2xl font-black text-primary">Galería antes y después</h1>
    <details open={list.length === 0} className="rounded-2xl border-2 border-dashed border-primary/30 p-4"><summary className="cursor-pointer font-bold text-primary">Nuevo trabajo</summary><div className="mt-4"><Form /></div></details>
    {list.length === 0 && <p className="text-muted">No hay trabajos todavía. Sube el primero con el formulario de arriba.</p>}
    {list.map((g) => (<details key={g.id} className="rounded-2xl border border-primary-light p-4"><summary className="flex cursor-pointer flex-wrap items-center gap-3"><b className="text-primary">{g.title}</b><span className="text-sm text-muted">{g.category} · orden {g.sort_order} · {g.active ? "activo" : "inactivo"}</span></summary>
      <div className="mt-4"><Form g={g} /><div className="mt-3 flex gap-2">
        <form action={toggleGalleryItem}><input type="hidden" name="id" value={g.id} /><input type="hidden" name="active" value={String(g.active)} /><button className="rounded-full border border-primary px-4 py-1 text-sm font-bold text-primary">{g.active ? "Desactivar" : "Activar"}</button></form>
        <form action={deleteGalleryItem}><input type="hidden" name="id" value={g.id} /><button className="rounded-full border border-red-600 px-4 py-1 text-sm font-bold text-red-600">Eliminar</button></form></div></div></details>))}</main></>);
}

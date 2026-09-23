import PublicShell from "@/components/PublicShell";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/data";
export const revalidate = 60;
export const metadata = { title: "Antes y después | CHꙨꙨ BA'AK" };
export default async function Page() {
  const items = await getGallery();
  return <PublicShell>{() => (<section className="mx-auto max-w-6xl px-4 py-14"><h1 className="text-4xl font-black text-primary">Antes y después</h1><p className="mt-2 text-muted">Desliza para comparar.</p>
    {items.length === 0 ? <p className="mt-8 text-muted">No hay trabajos disponibles todavía.</p> :
    <div className="mt-8 grid gap-8 md:grid-cols-2">{items.map((g) => <figure key={g.id}><BeforeAfterSlider before={g.before_image_url} after={g.after_image_url} title={g.title} /><figcaption className="mt-2"><b className="text-primary">{g.title}</b> <span className="text-sm text-muted">{g.category}</span>{g.description && <p className="text-sm text-muted">{g.description}</p>}</figcaption></figure>)}</div>}
    <h2 className="mb-4 mt-16 text-3xl font-black text-primary">Galería</h2><GalleryGrid items={items} /></section>)}</PublicShell>;
}

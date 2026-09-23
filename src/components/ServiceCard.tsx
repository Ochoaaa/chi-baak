import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Service } from "@/lib/data";
export function Placeholder({ label }: { label: string }) {
  return <div className="relative flex h-full w-full items-center justify-center bg-primary-light text-sm font-semibold text-primary/60"><div className="pattern absolute inset-0 opacity-10" />{label}</div>;
}
export default function ServiceCard({ s, waUrl }: { s: Service; waUrl: string }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-primary-light bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        {s.image_url ? <Image src={s.image_url} alt={s.name} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /> : <Placeholder label="Foto próximamente" />}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-extrabold text-primary">{s.name}</h3>
        <p className="text-sm text-muted">{s.short_description}</p>
        <p className="font-bold text-primary-dark">{formatPrice(s)}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Link href={`/servicios/${s.slug}`} className="flex-1 rounded-full border border-primary py-2 text-center text-sm font-bold text-primary hover:bg-primary-light">Ver servicio</Link>
          <a href={waUrl} target="_blank" rel="noopener" className="flex-1 rounded-full bg-sky py-2 text-center text-sm font-bold text-white hover:bg-primary">Cotizar</a>
        </div>
      </div>
    </article>
  );
}

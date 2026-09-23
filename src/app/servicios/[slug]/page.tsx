import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PublicShell from "@/components/PublicShell";
import { Placeholder } from "@/components/ServiceCard";
import { getService, formatPrice } from "@/lib/data";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
export const revalidate = 60;
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const svc = await getService((await params).slug);
  if (!svc) notFound();
  return <PublicShell>{(s) => (<section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">{svc.image_url ? <Image src={svc.image_url} alt={svc.name} fill priority sizes="50vw" className="object-cover" /> : <Placeholder label="Foto próximamente" />}</div>
    <div><h1 className="text-4xl font-black text-primary">{svc.name}</h1><p className="mt-2 text-2xl font-bold text-sky">{formatPrice(svc)}</p>
      <p className="mt-4 text-muted">{svc.description || svc.short_description}</p>
      <h2 className="mt-6 font-bold">Incluye</h2>
      <ul className="mt-2 grid gap-2">{svc.includes.map((i) => <li key={i} className="flex gap-2"><Check className="text-sky" size={20} />{i}</li>)}</ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={generateWhatsAppUrl(`Hola, ${s.business_name}. Quiero cotizar: ${svc.name}.`, s.whatsapp)} target="_blank" rel="noopener" className="rounded-full bg-sky px-6 py-3 font-bold text-white hover:bg-primary">WhatsApp</a>
        <Link href="/cotizar" className="rounded-full border border-primary px-6 py-3 font-bold text-primary hover:bg-primary-light">Solicitar cotización</Link></div></div></section>)}</PublicShell>;
}

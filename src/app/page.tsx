import Link from "next/link";
import { Droplets, Home, BadgeCheck, Eye, MessageCircle, CalendarCheck, Sparkles, ListChecks } from "lucide-react";
import PublicShell from "@/components/PublicShell";
import ServiceCard from "@/components/ServiceCard";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Reveal from "@/components/Reveal";
import { getServices, getGallery } from "@/lib/data";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
export const revalidate = 60;
export default async function Home_() {
  const [services, gallery] = await Promise.all([getServices(), getGallery()]);
  const featured = gallery[0];
  return (
    <PublicShell>{(s, wa) => (<>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="pattern absolute -right-10 top-0 h-40 w-40 opacity-20" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="whitespace-pre-line text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl">{s.hero_title}</h1>
            <p className="mt-4 text-xl font-bold text-primary-light">{s.hero_subtitle}</p>
            <p className="mt-3 max-w-md text-white/80">{s.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener" className="rounded-full bg-sky px-6 py-3 font-bold hover:bg-white hover:text-primary">💬 Cotizar por WhatsApp</a>
              <Link href="/servicios" className="rounded-full border border-white/60 px-6 py-3 font-bold hover:bg-white/10">Ver servicios</Link>
            </div>
          </div>
          {featured ? <BeforeAfterSlider before={featured.before_image_url} after={featured.after_image_url} title={featured.title} /> :
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/20 bg-primary-dark text-sm text-white/60">Aquí irá tu primer antes y después</div>}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal><h2 className="text-3xl font-black text-primary">Nuestros servicios</h2><p className="mt-1 text-muted">Limpieza profesional para lo que más usas.</p></Reveal>
        {services.length === 0 ? <p className="mt-8 text-muted">No hay servicios disponibles todavía.</p> :
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map((x) => <ServiceCard key={x.id} s={x} waUrl={generateWhatsAppUrl(`Hola, ${s.business_name}. Quiero cotizar: ${x.name}.`, s.whatsapp)} />)}</div>}
      </section>
      <section className="bg-primary-light py-16"><div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-black text-primary">Cómo funciona</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[[ListChecks, "Elige tu servicio"], [MessageCircle, "Escríbenos por WhatsApp"], [CalendarCheck, "Agenda tu visita"], [Sparkles, "Disfruta el resultado"]].map(([I, t], i) => { const Icon = I as typeof Home; return (
            <Reveal key={i}><li className="rounded-2xl bg-white p-5"><Icon className="text-sky" /><p className="mt-3 font-bold text-primary">{i + 1}. {t as string}</p></li></Reveal>); })}
        </ol></div></section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-black text-primary">El cambio se nota al lavarlo.</h2>
        <p className="mt-2 max-w-xl text-muted">Antes de reemplazar tus muebles o colchón, descubre lo que una limpieza profesional puede hacer.</p>
        <div className="mt-6 max-w-3xl">{featured ? <BeforeAfterSlider before={featured.before_image_url} after={featured.after_image_url} title={featured.title} /> : <p className="text-muted">No hay trabajos disponibles todavía.</p>}</div>
        <Link href="/cotizar" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-sky">Quiero cotizar</Link>
      </section>
      <section className="bg-primary-dark py-14 text-white"><div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[[Droplets, "Limpieza profunda"], [Home, "Servicio a domicilio"], [BadgeCheck, "Atención profesional"], [Eye, "Resultados visibles"]].map(([I, t], i) => { const Icon = I as typeof Home; return <div key={i} className="flex items-center gap-3"><Icon className="text-sky" /><span className="font-bold">{t as string}</span></div>; })}
      </div></section>
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-black text-primary">Tapachula y alrededores</h2>
        <p className="mt-2 text-muted">Realizamos nuestros servicios directamente en tu domicilio.</p>
        <a href={generateWhatsAppUrl("Hola, quiero consultar si tienen cobertura en mi zona.", s.whatsapp)} target="_blank" rel="noopener" className="mt-6 inline-block rounded-full bg-sky px-6 py-3 font-bold text-white hover:bg-primary">Consultar cobertura por WhatsApp</a>
      </section>
    </>)}</PublicShell>
  );
}

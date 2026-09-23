import PublicShell from "@/components/PublicShell";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
export const revalidate = 60;
export const metadata = { title: "Servicios | CHꙨꙨ BA'AK" };
export default async function Page() {
  const services = await getServices();
  return <PublicShell>{(s) => (<section className="mx-auto max-w-6xl px-4 py-14"><h1 className="text-4xl font-black text-primary">Servicios</h1>
    {services.length === 0 ? <p className="mt-6 text-muted">No hay servicios disponibles todavía.</p> :
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map((x) => <ServiceCard key={x.id} s={x} waUrl={generateWhatsAppUrl(`Hola, ${s.business_name}. Quiero cotizar: ${x.name}.`, s.whatsapp)} />)}</div>}</section>)}</PublicShell>;
}

import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { getSettings } from "@/lib/data";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
export default async function PublicShell({ children }: { children: (s: Awaited<ReturnType<typeof getSettings>>, wa: string) => React.ReactNode }) {
  const s = await getSettings(); const wa = generateWhatsAppUrl(s.default_whatsapp_message, s.whatsapp);
  const ld = { "@context": "https://schema.org", "@type": "LocalBusiness", name: s.business_name, description: s.description, areaServed: "Tapachula, Chiapas", telephone: `+${s.whatsapp}` };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <Header name={s.business_name} waUrl={wa} /><main>{children(s, wa)}</main><Footer s={s} /><WhatsAppButton url={wa} /></>);
}

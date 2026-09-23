import PublicShell from "@/components/PublicShell";
import QuoteForm from "@/components/QuoteForm";
export const metadata = { title: "Cotizar | CHꙨꙨ BA'AK" };
export default function Page() {
  return <PublicShell>{(s) => (<section className="mx-auto max-w-xl px-4 py-14"><h1 className="text-4xl font-black text-primary">Cotizar</h1><p className="mb-6 mt-2 text-muted">Llena los datos y te llevamos a WhatsApp con tu mensaje listo.</p><QuoteForm number={s.whatsapp} /></section>)}</PublicShell>;
}

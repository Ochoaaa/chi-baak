import PublicShell from "@/components/PublicShell";
export const metadata = { title: "Contacto | CHꙨꙨ BA'AK" };
export default function Page() {
  return <PublicShell>{(s, wa) => (<section className="mx-auto max-w-xl px-4 py-14"><h1 className="text-4xl font-black text-primary">Contacto</h1>
    <p className="mt-4">{s.location}</p><p className="text-muted">Realizamos nuestros servicios directamente en tu domicilio.</p>
    <a href={wa} target="_blank" rel="noopener" className="mt-6 inline-block rounded-full bg-sky px-6 py-3 font-bold text-white hover:bg-primary">Escríbenos por WhatsApp</a></section>)}</PublicShell>;
}

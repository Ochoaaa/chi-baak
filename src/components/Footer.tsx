import Link from "next/link";
import Logo from "./Logo";
import type { Settings } from "@/lib/data";
export default function Footer({ s }: { s: Settings }) {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div><Logo name={s.business_name} light /><p className="mt-2 text-sm text-white/70">{s.tagline}</p></div>
        <nav aria-label="Pie de página" className="flex flex-col gap-2 text-sm">
          {[["/", "Inicio"], ["/servicios", "Servicios"], ["/antes-y-despues", "Antes y después"], ["/cotizar", "Cotizar"], ["/contacto", "Contacto"]].map(([h, l]) => <Link key={h} href={h} className="hover:text-sky">{l}</Link>)}
        </nav>
        <div className="text-sm text-white/80"><p>WhatsApp: {s.whatsapp.replace(/^52(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3")}</p><p>{s.location}</p></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/60">© {new Date().getFullYear()} {s.business_name}. Todos los derechos reservados.</p>
    </footer>
  );
}

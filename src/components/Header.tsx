"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
const links = [["/", "Inicio"], ["/servicios", "Servicios"], ["/antes-y-despues", "Antes y después"], ["/cotizar", "Cotizar"], ["/contacto", "Contacto"]];
export default function Header({ name, waUrl }: { name: string; waUrl: string }) {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(scrollY > 8); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled ? "border-b border-primary-light bg-white/85 backdrop-blur" : "bg-white"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="Inicio"><Logo name={name} /></Link>
        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {links.map(([h, l]) => <Link key={h} href={h} className="text-sm font-medium hover:text-sky">{l}</Link>)}
          <a href={waUrl} target="_blank" rel="noopener" className="rounded-full bg-sky px-4 py-2 text-sm font-bold text-white hover:bg-primary">WhatsApp</a>
        </nav>
        <button className="p-2 md:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{open && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col border-t border-primary-light bg-white px-4 pb-4 md:hidden">
          {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-medium">{l}</Link>)}
          <a href={waUrl} className="rounded-full bg-sky py-3 text-center font-bold text-white">WhatsApp</a>
        </motion.nav>)}
      </AnimatePresence>
    </header>
  );
}

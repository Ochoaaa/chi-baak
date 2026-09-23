import Link from "next/link";
export default function AdminNav() {
  return <nav className="flex flex-wrap gap-4 border-b border-primary-light bg-white px-4 py-3 text-sm font-bold text-primary">
    <Link href="/admin/dashboard">Dashboard</Link><Link href="/admin/servicios">Servicios</Link><Link href="/admin/galeria">Galería</Link><Link href="/" className="ml-auto text-muted">Ver sitio</Link></nav>;
}

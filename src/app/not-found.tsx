import Link from "next/link";
export default function NotFound() {
  return <div className="mx-auto max-w-md px-4 py-24 text-center"><h1 className="text-3xl font-black text-primary">No encontramos esta página</h1><Link href="/servicios" className="mt-4 inline-block rounded-full bg-sky px-6 py-2 font-bold text-white">Ver servicios</Link></div>;
}

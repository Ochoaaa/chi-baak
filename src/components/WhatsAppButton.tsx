"use client";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
export default function WhatsAppButton({ url }: { url: string }) {
  const [wide, setWide] = useState(true);
  useEffect(() => { const t = setTimeout(() => setWide(false), 6000); return () => clearTimeout(t); }, []);
  return (
    <a href={url} target="_blank" rel="noopener" aria-label="Cotiza por WhatsApp" className="fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 font-bold text-white shadow-lg transition hover:scale-105">
      <MessageCircle size={26} /><span className={`hidden overflow-hidden whitespace-nowrap transition-all md:inline ${wide ? "max-w-[200px]" : "max-w-0"}`}>Cotiza por WhatsApp</span>
    </a>
  );
}

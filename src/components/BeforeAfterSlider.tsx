"use client";
import Image from "next/image";
import { useRef, useState } from "react";
export default function BeforeAfterSlider({ before, after, title }: { before: string | null; after: string | null; title: string }) {
  const [pos, setPos] = useState(50); const ref = useRef<HTMLDivElement>(null);
  const move = (x: number) => { const r = ref.current!.getBoundingClientRect(); setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))); };
  if (!before || !after) return <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-primary-light text-sm text-primary/60">Imágenes por cargar</div>;
  return (
    <div ref={ref} role="slider" aria-label={`Comparar antes y después: ${title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} tabIndex={0}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }} onPointerMove={(e) => e.buttons && move(e.clientX)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5)); if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5)); }}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl">
      <Image src={after} alt={`${title} después`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><Image src={before} alt={`${title} antes`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" draggable={false} /></div>
      <span className="absolute left-3 top-3 rounded-full bg-primary-dark/80 px-3 py-1 text-xs font-bold text-white">Antes</span>
      <span className="absolute right-3 top-3 rounded-full bg-sky px-3 py-1 text-xs font-bold text-white">Después</span>
      <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}><div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2 py-1 text-xs font-bold text-primary shadow">↔</div></div>
    </div>
  );
}

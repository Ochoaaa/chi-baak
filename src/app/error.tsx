"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <div className="mx-auto max-w-md px-4 py-24 text-center"><p className="font-bold text-primary">Hubo un problema. Intenta nuevamente.</p><button onClick={reset} className="mt-4 rounded-full bg-sky px-6 py-2 font-bold text-white">Reintentar</button></div>;
}

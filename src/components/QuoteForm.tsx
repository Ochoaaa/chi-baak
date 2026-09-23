"use client";

import { useState } from "react";
import { z } from "zod";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

const schema = z.object({
  nombre: z.string().min(2, "Escribe tu nombre."),
  telefono: z.string().min(8, "Escribe un teléfono válido."),
  servicio: z.string().min(1),
  tipo: z.string().max(80),
  tamano: z.string(),
  colonia: z.string().min(2, "Escribe tu colonia."),
  comentarios: z.string().max(500),
});

const field =
  "w-full rounded-xl border border-primary/20 px-3 py-2.5 focus:border-sky";

function L({
  t,
  children,
}: {
  t: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold">
      {t}
      <div className="mt-1">{children}</div>
    </label>
  );
}

export default function QuoteForm({
  number,
}: {
  number: string;
}) {
  const [err, setErr] = useState("");
  const [file, setFile] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const f = new FormData(e.currentTarget);

    const data = {
      nombre: f.get("nombre"),
      telefono: f.get("telefono"),
      servicio: f.get("servicio"),
      tipo: f.get("tipo"),
      tamano: f.get("tamano"),
      colonia: f.get("colonia"),
      comentarios: f.get("comentarios"),
    };

    const r = schema.safeParse(data);

    if (!r.success) {
      return setErr(r.error.issues[0].message);
    }

    setErr("");

    const d = r.data;

    const msg = `Hola, CHꙨꙨ BA'AK. Quiero solicitar una cotización.

Nombre: ${d.nombre}
Servicio: ${d.servicio}
Tipo: ${d.tipo || "-"}
Tamaño: ${d.tamano}
Colonia: ${d.colonia}
Comentarios: ${d.comentarios || "-"}

Me gustaría conocer disponibilidad y precio.`;

    window.open(
      generateWhatsAppUrl(msg, number),
      "_blank"
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-4"
    >
      <L t="Nombre">
        <input
          name="nombre"
          required
          className={field}
        />
      </L>

      <L t="Teléfono">
        <input
          name="telefono"
          type="tel"
          required
          className={field}
        />
      </L>

      <div className="grid gap-4 sm:grid-cols-2">
        <L t="Servicio">
          <select
            name="servicio"
            className={field}
          >
            {[
              "Colchón",
              "Sala",
              "Sofá",
              "Vehículo",
              "Otro",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </L>

        <L t="Tamaño">
          <select
            name="tamano"
            className={field}
          >
            {[
              "Individual",
              "Matrimonial",
              "King Size",
              "No aplica",
              "No estoy seguro",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </L>
      </div>

      <L t="Tipo de pieza">
        <input
          name="tipo"
          placeholder="Ej. sala en L, asientos de camioneta"
          className={field}
        />
      </L>

      <L t="Colonia">
        <input
          name="colonia"
          required
          className={field}
        />
      </L>

      <L t="Comentarios">
        <textarea
          name="comentarios"
          rows={3}
          className={field}
        />
      </L>

      <L t="Fotografía (opcional)">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(!!e.target.files?.length)
          }
          className="text-sm"
        />
      </L>

      {file && (
        <p className="rounded-xl bg-primary-light p-3 text-sm">
          Las fotos no se adjuntan solas: envíala directamente
          en el chat de WhatsApp.
        </p>
      )}

      {err && (
        <p
          role="alert"
          className="text-sm font-semibold text-red-600"
        >
          {err}
        </p>
      )}

      <button className="rounded-full bg-sky py-3 font-bold text-white hover:bg-primary">
        Enviar por WhatsApp
      </button>
    </form>
  );
}
import type { Metadata } from "next";
import "./globals.css";

const site =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const description =
  "Lavado profesional de colchones, salas, sofás y tapicería de vehículos a domicilio en Tapachula y alrededores.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "CHꙨꙨ BA'AK | Lavado de Colchones y Muebles a Domicilio",
  description,
  openGraph: {
    title: "CHꙨꙨ BA'AK",
    description,
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHꙨꙨ BA'AK",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

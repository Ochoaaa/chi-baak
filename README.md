# CHꙨꙨ BA'AK — sitio web

Next.js 15 (App Router) + Supabase + Tailwind + Framer Motion.

## Instalación local
1. `npm install`
2. Copia `.env.example` a `.env.local` y llena `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. `npm run dev` → http://localhost:3000

## Supabase
1. Crea un proyecto en supabase.com.
2. SQL Editor → pega y ejecuta `supabase/schema.sql` (tablas, RLS, buckets `gallery` y `services`, políticas de Storage y datos iniciales).
3. Authentication → Providers → Email: desactiva "Allow new users to sign up".
4. Authentication → Users → Add user: crea el correo y contraseña del administrador (marca "Auto confirm").
5. Entra en `/admin/login`.

## Vercel
1. Sube el proyecto a GitHub e impórtalo en vercel.com.
2. Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` (tu dominio).
3. Deploy. Dominio propio: Settings → Domains → Add, y configura los DNS que Vercel indique.

## Pendiente
Faltan `/admin/galeria`, `/admin/configuracion`, Lightbox y filtros de galería, y el logo real en `/public/images/`.

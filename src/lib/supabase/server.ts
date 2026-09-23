import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const c = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => c.getAll(),

        setAll: (
          l: {
            name: string;
            value: string;
            options?: {
              domain?: string;
              encode?: (value: string) => string;
              expires?: Date;
              httpOnly?: boolean;
              maxAge?: number;
              path?: string;
              sameSite?: "lax" | "strict" | "none";
              secure?: boolean;
            };
          }[]
        ) => {
          try {
            l.forEach(({ name, value, options }) => {
              c.set(name, value, options);
            });
          } catch {
            // El contexto puede ser de solo lectura.
          }
        },
      },
    }
  );
}

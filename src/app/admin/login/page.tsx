"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function Login() {
  const [err, setErr] = useState(""); const router = useRouter();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const { error } = await createClient().auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    if (error) return setErr("Correo o contraseña incorrectos."); router.push("/admin/dashboard"); router.refresh();
  }
  return (<main className="flex min-h-screen items-center justify-center bg-primary-light p-4"><form onSubmit={submit} className="grid w-full max-w-sm gap-4 rounded-2xl bg-white p-6">
    <h1 className="text-2xl font-black text-primary">Panel administrativo</h1>
    <label className="text-sm font-semibold">Correo<input name="email" type="email" required className="mt-1 w-full rounded-xl border border-primary/20 px-3 py-2" /></label>
    <label className="text-sm font-semibold">Contraseña<input name="password" type="password" required className="mt-1 w-full rounded-xl border border-primary/20 px-3 py-2" /></label>
    {err && <p role="alert" className="text-sm text-red-600">{err}</p>}<button className="rounded-full bg-primary py-3 font-bold text-white">Entrar</button></form></main>);
}

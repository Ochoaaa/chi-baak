import AdminNav from "@/components/AdminNav";
import { getSettings } from "@/lib/data";
import ConfigForm from "./ConfigForm";
export default async function Page() {
  return (<><AdminNav /><main className="mx-auto max-w-xl p-4"><h1 className="mb-4 text-2xl font-black text-primary">Configuración</h1><ConfigForm s={await getSettings()} /></main></>);
}

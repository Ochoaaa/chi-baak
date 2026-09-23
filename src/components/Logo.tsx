export default function Logo({ name, light }: { name: string; light?: boolean }) {
  return <span className={`text-xl font-black tracking-tight ${light ? "text-white" : "text-primary"}`}>{name}</span>;
}

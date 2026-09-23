import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: { colors: { primary: "#123F70", "primary-dark": "#082B50", "primary-light": "#E8F3FC", sky: "#1597D4", sand: "#C89B5B", ink: "#1E293B", muted: "#64748B" } } }, plugins: [] } satisfies Config;

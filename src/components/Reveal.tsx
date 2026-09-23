"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const r = useReducedMotion();
  return <motion.div className={className} initial={r ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6 }}>{children}</motion.div>;
}

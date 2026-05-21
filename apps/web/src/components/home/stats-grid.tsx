"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "0.4s", label: "Average Settlement", sublabel: "Celo L1 Finality" },
  { value: "$0.001", label: "Transaction Cost", sublabel: "Near-zero gas" },
  { value: "24/7", label: "Always Online", sublabel: "No bank hours" },
  { value: "150+", label: "Countries Reached", sublabel: "Borderless payments" },
];

export function StatsGrid() {
  return (
    <section className="py-20 relative">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="glass-strong rounded-3xl p-12 glow-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-foreground uppercase tracking-[0.1em]">{stat.label}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

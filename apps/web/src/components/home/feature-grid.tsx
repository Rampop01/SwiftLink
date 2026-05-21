"use client";

import { motion } from "framer-motion";
import { Copy, Smartphone, Sparkles, QrCode, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Human-Readable Links",
    description: "No more error-prone hex addresses. Share swiftlink/pay/yourname and receive payments from anyone, anywhere.",
    icon: Copy,
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/30",
  },
  {
    title: "MiniPay Native",
    description: "Optimized for Opera MiniPay with auto-connect. The 1B+ unbanked can pay you with a phone — no MetaMask needed.",
    icon: Smartphone,
    gradient: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
    borderColor: "group-hover:border-amber-500/30",
  },
  {
    title: "AI Smart Invoicing",
    description: "Describe what you're charging for and our AI generates a professional invoice description in seconds.",
    icon: Sparkles,
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
    borderColor: "group-hover:border-blue-500/30",
  },
  {
    title: "On-Chain QR Codes",
    description: "Generate instant QR payment codes for storefronts, invoices, and real-world commerce. Export as high-res PNG.",
    icon: QrCode,
    gradient: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-400",
    borderColor: "group-hover:border-violet-500/30",
  },
  {
    title: "Real-Time Dashboard",
    description: "Track every payment as it hits your wallet. Volume analytics, unique payer counts, and CSV exports — built-in.",
    icon: Zap,
    gradient: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/30",
  },
  {
    title: "Battle-Tested Security",
    description: "Built on audited OpenZeppelin contracts with ReentrancyGuard, admin safeguards, and emergency withdrawals.",
    icon: ShieldCheck,
    gradient: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-400",
    borderColor: "group-hover:border-rose-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export function FeatureGrid() {
  return (
    <section className="relative pb-16 lg:pb-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group relative p-7 rounded-2xl glass border border-white/[0.04] ${feature.borderColor} hover:bg-white/[0.04] hover-glow hover-shine transition-all duration-500`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center ${feature.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold mb-2.5 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

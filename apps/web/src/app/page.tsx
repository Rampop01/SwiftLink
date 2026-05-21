"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Globe,
  ShieldCheck,
  Sparkles,
  QrCode,
  ArrowRight,
  Zap,
  ChevronRight,
  X,
  AlertTriangle,
  Clock,
  DollarSign,
  Copy,
  Ban,
  Send,
  Smartphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";

// Real pain points that SwiftLink solves
const painPoints = [
  { icon: Ban, text: "0x7a3F...9c2B — Did I copy it right?", color: "text-red-400" },
  { icon: AlertTriangle, text: "Transaction failed. Gas too low.", color: "text-orange-400" },
  { icon: Clock, text: "Wire transfer: 3-5 business days", color: "text-yellow-400" },
  { icon: DollarSign, text: "International fee: $48.50", color: "text-red-400" },
];

const solutions = [
  { icon: Send, text: "swiftlink/pay/alex → Paid ✓", color: "text-emerald-400" },
  { icon: Zap, text: "Confirmed in 0.4 seconds", color: "text-emerald-400" },
  { icon: Globe, text: "Send from anywhere. Zero borders.", color: "text-emerald-400" },
  { icon: DollarSign, text: "Total fees: $0.001", color: "text-emerald-400" },
];

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

const steps = [
  { step: "01", title: "Claim Your Link", desc: "Pick a unique handle. Your wallet is instantly linked to your personal payment URL — forever yours on-chain." },
  { step: "02", title: "Share Everywhere", desc: "Drop it in your bio, DMs, invoices, or print QR codes. Works on every device, every browser, every country." },
  { step: "03", title: "Get Paid Instantly", desc: "Receive cUSD or CELO directly to your wallet. Sub-second finality. No middlemen. No chargebacks." },
];

const stats = [
  { value: "0.4s", label: "Average Settlement", sublabel: "Celo L1 Finality" },
  { value: "$0.001", label: "Transaction Cost", sublabel: "Near-zero gas" },
  { value: "24/7", label: "Always Online", sublabel: "No bank hours" },
  { value: "150+", label: "Countries Reached", sublabel: "Borderless payments" },
];

export default function Home() {
  const [claimName, setClaimName] = React.useState("");
  const [showPain, setShowPain] = React.useState(true);

  // Toggle between pain points and solutions
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowPain((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <main className="flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

          {/* Feature Grid - 6 cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-32"
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

      {/* How It Works */}
      <section className="py-28 relative">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">Three steps. That&apos;s it.</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">No seed phrases to explain. No gas calculators. Just a link that works like Venmo — but on-chain and borderless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="glass rounded-2xl p-8 h-full border border-white/[0.04] group-hover:border-primary/20 transition-all duration-500">
                  <div className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-6">{item.step}</div>
                  <h3 className="text-xl font-black mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-5 w-5 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Enhanced 4-column */}
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

      {/* Use Cases / Who It's For */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">Built for real people</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] mb-4">Not just another<br /><span className="text-gradient">crypto tool.</span></h2>
              <p className="text-muted-foreground max-w-lg">SwiftLink is for anyone who needs to get paid — freelancers, creators, merchants, NGOs, and the 1B+ unbanked people that traditional finance left behind.</p>
            </div>
            <Button variant="ghost" className="text-primary font-bold gap-2 group" asChild>
              <Link href="/register">
                Start receiving payments
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "freelancer_ada", role: "Freelance Designer", emoji: "🎨", tagline: "Invoices clients in Lagos & London", color: "bg-purple-500/10 text-purple-400" },
              { name: "coffee_shop_eth", role: "Café Owner, Nairobi", emoji: "☕", tagline: "QR code at the counter", color: "bg-amber-500/10 text-amber-400" },
              { name: "dev_santiago", role: "Smart Contract Dev", emoji: "💻", tagline: "Gets paid for audits globally", color: "bg-emerald-500/10 text-emerald-400" },
              { name: "ngo_water", role: "Clean Water NGO", emoji: "💧", tagline: "Transparent donation tracking", color: "bg-blue-500/10 text-blue-400" },
              { name: "music_amara", role: "Independent Musician", emoji: "🎵", tagline: "Tips from fans worldwide", color: "bg-rose-500/10 text-rose-400" },
              { name: "tutor_chen", role: "Online Tutor", emoji: "📚", tagline: "Paid per lesson, no PayPal cuts", color: "bg-indigo-500/10 text-indigo-400" },
            ].map((creator, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-2xl ${creator.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {creator.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">@{creator.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{creator.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic">&ldquo;{creator.tagline}&rdquo;</p>
                <div className="mt-4 p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[10px] font-mono text-muted-foreground/60 flex justify-between items-center">
                  <span>swiftlink/pay/{creator.name}</span>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/40" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Join the movement</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] mb-6 leading-tight">
              Your money shouldn&apos;t need<br />
              <span className="text-gradient">a passport.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              SwiftLink is free, open-source, and built for the next billion users. Claim your link in 30 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 group" asChild>
                <Link href="/register">
                  Claim Your Link — Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-10 h-14 text-base font-bold border-white/10 hover:bg-white/5" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

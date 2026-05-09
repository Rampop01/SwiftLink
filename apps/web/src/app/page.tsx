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
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Invoicing",
    description: "Generate professional payment descriptions in seconds with our built-in AI assistant.",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
    borderColor: "group-hover:border-purple-500/30",
  },
  {
    title: "QR Payments",
    description: "Share your payment link via high-res QR codes, perfect for in-person transactions.",
    icon: QrCode,
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
    borderColor: "group-hover:border-blue-500/30",
  },
  {
    title: "Global Reach",
    description: "Accept CELO and cUSD from anywhere in the world with sub-cent gas fees.",
    icon: Globe,
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/30",
  },
  {
    title: "Battle-Tested",
    description: "Built on audited Celo smart contracts with admin safeguards and reentrancy protection.",
    icon: ShieldCheck,
    gradient: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
    borderColor: "group-hover:border-amber-500/30",
  },
];

const steps = [
  { step: "01", title: "Register", desc: "Pick a unique handle. Your wallet is instantly linked to your personal payment URL." },
  { step: "02", title: "Share", desc: "Send your link anywhere — social media, invoices, QR codes, or direct messages." },
  { step: "03", title: "Get Paid", desc: "Receive cUSD or CELO directly to your wallet. Instant, zero-fee settlements." },
];

export default function Home() {
  const [claimName, setClaimName] = React.useState("");

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


      {/* Hero */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase glass rounded-full text-primary">
                <Zap className="h-3.5 w-3.5 fill-primary" />
                Built on Celo
                <ChevronRight className="h-3 w-3 opacity-40" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] mb-8 leading-[1.05]"
            >
              The simplest way{" "}
              <span className="text-gradient">to get paid</span>{" "}
              in crypto.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Generate a personal payment link, share it with anyone, and receive Celo native assets instantly. No complex addresses. No borders.
            </motion.p>

            {/* CTA Input */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-10 mb-24">
              <div className="flex w-full max-w-lg items-center glass-strong rounded-2xl p-1.5 glow-border">
                <div className="flex-1 flex items-center px-5">
                  <span className="text-sm font-bold text-primary/60 whitespace-nowrap">swiftlink.me/</span>
                  <input 
                    type="text" 
                    placeholder="yourname" 
                    value={claimName}
                    onChange={(e) => setClaimName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    className="bg-transparent border-none outline-none text-foreground font-bold text-sm placeholder:text-muted-foreground/30 w-full ml-1"
                  />
                </div>
                <Button size="lg" className="rounded-xl px-8 h-12 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all" asChild>
                  <Link href={`/register?username=${claimName}`}>
                    Claim Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Zero Fees</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Instant Settlement</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> MiniPay Ready</div>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
            >
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className={`group relative p-7 rounded-2xl glass border border-white/[0.04] ${feature.borderColor} hover:bg-white/[0.04] transition-all duration-500`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 flex items-start gap-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-1.5 text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 relative">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">Three steps. That&apos;s it.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="glass rounded-2xl p-8 h-full border border-white/[0.04] group-hover:border-primary/20 transition-all duration-500">
                  <div className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-6">{item.step}</div>
                  <h3 className="text-xl font-black mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="glass-strong rounded-3xl p-12 glow-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-black text-gradient mb-2">0.001s</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">Settlement Time</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-gradient mb-2">$0.00</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">Platform Fees</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-gradient mb-2">24/7</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.03em] mb-6 leading-tight">
            Ready to own your<br />
            <span className="text-gradient">payment identity?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Join creators and freelancers who are simplifying their crypto payments with SwiftLink.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 group" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-10 h-14 text-base font-bold border-white/10 hover:bg-white/5" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

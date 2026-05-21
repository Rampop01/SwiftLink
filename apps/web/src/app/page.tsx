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
import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { FeatureGrid } from "@/components/home/feature-grid";
import { StatsGrid } from "@/components/home/stats-grid";
import { UseCases } from "@/components/home/use-cases";
import { CTABanner } from "@/components/home/cta-banner";



const steps = [
  { step: "01", title: "Claim Your Link", desc: "Pick a unique handle. Your wallet is instantly linked to your personal payment URL — forever yours on-chain." },
  { step: "02", title: "Share Everywhere", desc: "Drop it in your bio, DMs, invoices, or print QR codes. Works on every device, every browser, every country." },
  { step: "03", title: "Get Paid Instantly", desc: "Receive cUSD or CELO directly to your wallet. Sub-second finality. No middlemen. No chargebacks." },
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
      <FeatureGrid />

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
      <StatsGrid />

      {/* Use Cases / Who It's For */}
      <UseCases />

      {/* Final CTA */}
      <CTABanner />
    </main>
  );
}

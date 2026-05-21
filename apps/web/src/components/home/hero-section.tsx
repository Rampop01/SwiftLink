"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X, ArrowRight, Ban, AlertTriangle, Clock, DollarSign, Send, Zap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiveActivity } from "@/components/live-activity";

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

export function HeroSection() {
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
    <section className="relative pt-16 pb-16 lg:pt-28 lg:pb-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Main Heading - Pain-driven */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-black tracking-[-0.04em] mb-6 leading-[1.05]"
            >
              Stop sending money to{" "}
              <br className="hidden sm:block" />
              <span className="line-through text-muted-foreground/40 decoration-red-500/40">0x7a3F...hex addresses.</span>
              <br />
              <span className="text-gradient">Send it to a name.</span>
            </motion.h1>

            {/* Subtitle - Solution-driven */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              SwiftLink turns your wallet into a human-readable payment link.
              Claim <span className="text-primary font-semibold">swiftlink/pay/yourname</span>, share it anywhere, 
              and get paid in cUSD or CELO — instantly, with zero fees.
            </motion.p>

            {/* Animated Pain vs Solution Comparison */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="max-w-xl mx-auto glass-strong rounded-2xl overflow-hidden glow-border">
                <div className="flex items-center justify-center gap-2 py-2.5 border-b border-white/[0.06]">
                  <AnimatePresence mode="wait">
                    {showPain ? (
                      <motion.div
                        key="pain-label"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2"
                      >
                        <X className="h-3.5 w-3.5 text-red-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">The old way</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="solution-label"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">The SwiftLink way</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-5 space-y-3">
                  <AnimatePresence mode="wait">
                    {showPain ? (
                      <motion.div
                        key="pain"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-2.5"
                      >
                        {painPoints.map((point, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-red-500/[0.05] border border-red-500/10"
                          >
                            <point.icon className={`h-4 w-4 ${point.color} shrink-0`} />
                            <span className="text-sm font-mono text-muted-foreground">{point.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="solution"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-2.5"
                      >
                        {solutions.map((point, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10"
                          >
                            <point.icon className={`h-4 w-4 ${point.color} shrink-0`} />
                            <span className="text-sm font-mono text-foreground">{point.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* CTA Input */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-8 mb-16">
              <div className="flex w-full max-w-lg items-center glass-strong rounded-2xl p-1.5 glow-border">
                <div className="flex-1 flex items-center px-5">
                  <span className="text-sm font-bold text-primary/60 whitespace-nowrap">swiftlink/pay/</span>
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

              <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Zero Fees</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Instant Settlement</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> MiniPay Ready</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No KYC Required</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-24">
              <LiveActivity />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

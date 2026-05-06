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
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Invoicing",
    description: "Generate professional payment descriptions in seconds with our built-in AI assistant.",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "QR Code Sharing",
    description: "Instantly share your payment link via high-resolution QR codes, optimized for mobile.",
    icon: QrCode,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Global Settlements",
    description: "Receive CELO, cUSD, or USDC from anywhere in the world with sub-cent gas fees.",
    icon: Globe,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Smart Security",
    description: "Built on battle-tested Celo smart contracts with administrative safeguards.",
    icon: ShieldCheck,
    color: "bg-orange-500/10 text-orange-500",
  },
];

export default function Home() {
  const [claimName, setClaimName] = React.useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="flex-1 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] md:leading-[1]"
            >
              The Simplest Way <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-primary animate-gradient-x">to Get Paid.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Generate a professional payment link and receive Celo native assets instantly. 
              No complex addresses, no borders, just pure speed.
            </motion.p>

            {/* CTA Section */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center gap-8 mb-32"
            >
              <div className="flex w-full max-w-xl items-center space-x-2 bg-background/50 backdrop-blur-xl p-2 rounded-full border-2 border-primary/20 shadow-2xl ring-4 ring-primary/5">
                <div className="flex-1 flex items-center px-6 text-muted-foreground">
                  <span className="text-lg font-bold text-primary/60 truncate">swiftlink.me/</span>
                  <input 
                    type="text" 
                    placeholder="yourname" 
                    value={claimName}
                    onChange={(e) => setClaimName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    className="bg-transparent border-none outline-none text-foreground font-bold text-lg placeholder:text-muted-foreground/30 w-full ml-1"
                  />
                </div>
                <Button size="lg" className="rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-transform" asChild>
                  <Link href={`/register?username=${claimName}`}>Claim Now</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-8 text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
                <div className="flex items-center gap-2 text-primary font-bold"><CheckCircle2 className="h-4 w-4" /> Zero Fees</div>
                <div className="flex items-center gap-2 text-primary font-bold"><CheckCircle2 className="h-4 w-4" /> Instant Settlement</div>
                <div className="flex items-center gap-2 text-primary font-bold"><CheckCircle2 className="h-4 w-4" /> MiniPay Ready</div>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
            >
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-background/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-20 border-y bg-muted/30 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black text-primary">0.001s</div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Avg. Settlement Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-primary">$0.00</div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Platform Fees</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black text-primary">24/7</div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Global Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-32 relative">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="relative p-12 lg:p-20 rounded-[4rem] bg-foreground text-background overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none text-white">
                Ready to own your <br /> payment identity?
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
                Join thousands of creators and freelancers who are simplifying their crypto payments with SwiftLink.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="rounded-full px-10 h-16 text-lg font-bold group" asChild>
                  <Link href="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

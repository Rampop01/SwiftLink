"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const creators = [
  { name: "freelancer_ada", role: "Freelance Designer", emoji: "🎨", tagline: "Invoices clients in Lagos & London", color: "bg-purple-500/10 text-purple-400" },
  { name: "coffee_shop_eth", role: "Café Owner, Nairobi", emoji: "☕", tagline: "QR code at the counter", color: "bg-amber-500/10 text-amber-400" },
  { name: "dev_santiago", role: "Smart Contract Dev", emoji: "💻", tagline: "Gets paid for audits globally", color: "bg-emerald-500/10 text-emerald-400" },
  { name: "ngo_water", role: "Clean Water NGO", emoji: "💧", tagline: "Transparent donation tracking", color: "bg-blue-500/10 text-blue-400" },
  { name: "music_amara", role: "Independent Musician", emoji: "🎵", tagline: "Tips from fans worldwide", color: "bg-rose-500/10 text-rose-400" },
  { name: "tutor_chen", role: "Online Tutor", emoji: "📚", tagline: "Paid per lesson, no PayPal cuts", color: "bg-indigo-500/10 text-indigo-400" },
];

export function UseCases() {
  return (
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
          {creators.map((creator, i) => (
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
  );
}

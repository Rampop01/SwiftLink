"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
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
  );
}

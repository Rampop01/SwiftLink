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
import { StepByStep } from "@/components/home/step-by-step";







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
      <StepByStep />

      {/* Stats - Enhanced 4-column */}
      <StatsGrid />

      {/* Use Cases / Who It's For */}
      <UseCases />

      {/* Final CTA */}
      <CTABanner />
    </main>
  );
}

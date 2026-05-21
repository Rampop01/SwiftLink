import { HeroSection } from "@/components/home/hero-section";
import { FeatureGrid } from "@/components/home/feature-grid";
import { StepByStep } from "@/components/home/step-by-step";
import { StatsGrid } from "@/components/home/stats-grid";
import { UseCases } from "@/components/home/use-cases";
import { CTABanner } from "@/components/home/cta-banner";

export default function Home() {
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

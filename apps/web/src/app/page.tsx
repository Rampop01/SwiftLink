import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserBalance } from "@/components/user-balance";
import { Zap } from "lucide-react";

export default function Home() {
  return (
<main className="flex-1">
  {/* Hero Section */}
  <section className="relative py-20 lg:py-32">
    <div className="container px-4 mx-auto max-w-7xl">
      <div className="text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
        >
          <Zap className="h-4 w-4" />
          Built on Celo
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
        >
          Your Link to <br />
          <span className="text-primary">Global Payments</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Generate a unique payment link and get paid in cUSD/USDC instantly. 
          Perfect for freelancers, creators, and vendors on Celo.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6 mb-20">
          <div className="flex w-full max-w-md items-center space-x-2 bg-muted/50 p-1.5 rounded-full border border-border shadow-sm">
            <div className="flex-1 flex items-center px-4 text-muted-foreground">
              <span className="text-sm font-medium">swiftlink.me/pay/</span>
              <input 
                type="text" 
                placeholder="username" 
                className="bg-transparent border-none outline-none text-foreground font-semibold placeholder:text-muted-foreground/50 w-full"
              />
            </div>
            <Button size="lg" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all active:scale-95">
              Claim Link
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No fees. No borders. Just Celo.
          </p>
        </div>
      </div>
    </div>
  </section>

</main>
  );
}

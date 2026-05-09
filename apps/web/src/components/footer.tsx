"use client"

import Link from "next/link"
import { Link2, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tight">SwiftLink</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              The simplest way to receive crypto payments on Celo. Generate a link, share it, get paid instantly.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Rampop01/SwiftLink"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Product</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Register
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/request" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Request Payment
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Resources</h4>
            <nav className="flex flex-col gap-3">
              <a href="https://docs.celo.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Celo Docs
              </a>
              <a href="https://celoscan.io/address/0xE95C3C6052484C64978D6281bEb62f05d352ed43" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Smart Contract
              </a>
              <a href="https://github.com/Rampop01/SwiftLink" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Source Code
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} SwiftLink. Built for the Celo Proof of Ship contest.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-muted-foreground font-bold">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

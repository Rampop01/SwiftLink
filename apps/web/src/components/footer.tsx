"use client"

import Link from "next/link"
import { Link2, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background/80">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Link2 className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-black tracking-tight">SwiftLink</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The simplest way to receive crypto payments on Celo. Generate a link, share it, get paid instantly.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a href="https://github.com/Rampop01/SwiftLink" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-foreground">Product</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Register", href: "/register" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "Request Payment", href: "/request" },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-foreground">Resources</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Celo Docs", href: "https://docs.celo.org/" },
                { name: "Smart Contract", href: "https://celoscan.io/address/0xE95C3C6052484C64978D6281bEb62f05d352ed43" },
                { name: "Source Code", href: "https://github.com/Rampop01/SwiftLink" },
              ].map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Built on Celo</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SwiftLink. Proof of Ship Contest.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Celo Mainnet Active</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Link2, LayoutDashboard, UserPlus, Sparkles, Search, Layers } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explorer", href: "/explorer", icon: Search },
  { name: "Batch Pay", href: "/batch", icon: Layers },
  { name: "Request", href: "/request", icon: Sparkles },
  { name: "Register", href: "/register", icon: UserPlus },
]

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/60 backdrop-blur-2xl">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-xl hover:bg-white/5">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background border-r border-white/[0.06]">
              <div className="flex items-center gap-2.5 mb-10">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Link2 className="h-4 w-4 text-primary" />
                </div>
                <span className="font-black text-lg tracking-tight">SwiftLink</span>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-4 w-4" aria-hidden="true" />
                    {link.name}
                  </Link>
                ))}
                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      const ready = mounted && authenticationStatus !== 'loading';
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === 'authenticated');

                      return (
                        <div
                          {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <button 
                                  onClick={openConnectModal} 
                                  type="button"
                                  className="w-full relative inline-flex h-12 items-center justify-center px-6 font-black uppercase tracking-[0.2em] text-sm text-primary-foreground transition-all duration-300 bg-primary hover:bg-primary/80 overflow-hidden group [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] active:scale-95"
                                >
                                  <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Connect Wallet</span>
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] transition-transform" />
                                </button>
                              );
                            }

                            if (chain.unsupported) {
                              return (
                                <button 
                                  onClick={openChainModal} 
                                  type="button"
                                  className="w-full relative inline-flex h-12 items-center justify-center px-4 font-black uppercase tracking-[0.2em] text-sm text-white transition-all duration-300 bg-destructive hover:bg-destructive/80 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] active:scale-95"
                                >
                                  Wrong network
                                </button>
                              );
                            }

                            return (
                              <button 
                                onClick={openAccountModal} 
                                type="button"
                                className="w-full relative inline-flex h-12 items-center justify-center px-5 font-black tracking-widest text-base text-primary transition-all duration-300 bg-primary/10 hover:bg-primary/20 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] group active:scale-95"
                              >
                                {account.displayName}
                                <div className="absolute inset-0 bg-primary/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                              </button>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Link2 className="h-4 w-4 text-primary" />
            </div>
            <span className="hidden font-black text-lg tracking-tight sm:inline-block">
              SwiftLink
            </span>
          </Link>
        </div>
        
        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <link.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(7,149,95,0.4)]" />
                )}
              </Link>
            )
          })}
          
          <div className="flex items-center gap-3 ml-3 pl-3 border-l border-white/[0.06]">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button 
                            onClick={openConnectModal} 
                            type="button"
                            className="relative inline-flex h-11 items-center justify-center px-8 font-black uppercase tracking-[0.2em] text-xs text-primary-foreground transition-all duration-300 bg-primary hover:bg-primary/80 overflow-hidden group [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] active:scale-95"
                          >
                            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Connect</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] transition-transform" />
                            <div className="absolute inset-0 border-2 border-white/20 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)]" />
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            type="button"
                            className="relative inline-flex h-11 items-center justify-center px-6 font-black uppercase tracking-[0.2em] text-xs text-white transition-all duration-300 bg-destructive hover:bg-destructive/80 overflow-hidden group [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] active:scale-95"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="flex items-center justify-center h-11 w-11 bg-white/5 hover:bg-white/10 transition-colors [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] font-bold text-sm group"
                          >
                            {chain.hasIcon && (
                              <div className="w-5 h-5 overflow-hidden group-hover:scale-110 transition-transform">
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            )}
                          </button>

                          <button 
                            onClick={openAccountModal} 
                            type="button"
                            className="relative inline-flex h-11 items-center justify-center px-6 font-black tracking-widest text-sm text-primary transition-all duration-300 bg-primary/10 hover:bg-primary/20 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] group active:scale-95"
                          >
                            {account.displayName}
                            <div className="absolute inset-0 bg-primary/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </nav>
      </div>
    </header>
  )
}

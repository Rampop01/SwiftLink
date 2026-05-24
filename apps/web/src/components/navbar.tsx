"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Link2, LayoutDashboard, UserPlus, Sparkles, Search } from "lucide-react"
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
                  <ConnectButton accountStatus="address" showBalance={false} chainStatus="none" />
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
            <ConnectButton accountStatus="address" showBalance={false} chainStatus="icon" />
          </div>
        </nav>
      </div>
    </header>
  )
}

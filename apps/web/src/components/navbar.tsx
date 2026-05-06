"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Link2, LayoutDashboard, UserPlus, Sparkles } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Request", href: "/request", icon: Sparkles },
  { name: "Register", href: "/register", icon: UserPlus },
]

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex items-center gap-2 mb-8 text-primary">
                <Link2 className="h-6 w-6" />
                <span className="font-bold text-lg text-foreground">
                  SwiftLink
                </span>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 text-base font-medium transition-colors hover:text-primary ${
                      pathname === link.href ? "text-foreground" : "text-foreground/70"
                    }`}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.name}
                  </Link>
                ))}
                <div className="mt-6 pt-6 border-t flex justify-center">
                  <ConnectButton 
                    accountStatus="address"
                    showBalance={false}
                    chainStatus="none"
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Link2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold text-xl sm:inline-block">
              SwiftLink
            </span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/70"
              }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-3">
            <ConnectButton 
              accountStatus="address"
              showBalance={false}
              chainStatus="icon"
            />
          </div>
        </nav>
      </div>
    </header>
  )
}

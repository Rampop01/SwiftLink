"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Sparkles, UserPlus, Home, Search, Layers } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explorer", href: "/explorer", icon: Search },
  { name: "Batch Pay", href: "/batch", icon: Layers },
  { name: "Request", href: "/request", icon: Sparkles },
  { name: "Register", href: "/register", icon: UserPlus },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
      <nav className="flex items-center justify-around p-2 glass-strong rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" aria-label="Mobile Navigation Bar">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <link.icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

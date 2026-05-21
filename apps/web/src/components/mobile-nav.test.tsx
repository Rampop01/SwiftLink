import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MobileNav } from './mobile-nav'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock next/link to just render an anchor tag
vi.mock('next/link', () => ({
  default: ({ children, href, className, 'aria-current': ariaCurrent }: any) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  ),
}))

describe('MobileNav Component', () => {
  it('renders all mobile navigation links', () => {
    render(<MobileNav />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Explorer')).toBeInTheDocument()
    expect(screen.getByText('Request')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('marks the current page as active', () => {
    render(<MobileNav />)
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('aria-current', 'page')
    
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).not.toHaveAttribute('aria-current')
  })
})

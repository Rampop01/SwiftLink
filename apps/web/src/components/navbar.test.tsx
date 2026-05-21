import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from './navbar'

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

// Mock RainbowKit ConnectButton
vi.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: () => <button data-testid="connect-button">Connect Wallet</button>,
}))

describe('Navbar Component', () => {
  it('renders the SwiftLink logo', () => {
    render(<Navbar />)
    const logos = screen.getAllByText('SwiftLink')
    expect(logos.length).toBeGreaterThan(0)
  })

  it('renders desktop navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Explorer')).toBeInTheDocument()
    expect(screen.getByText('Request')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('renders the connect wallet button', () => {
    render(<Navbar />)
    const connectButtons = screen.getAllByTestId('connect-button')
    expect(connectButtons.length).toBeGreaterThan(0)
  })
})

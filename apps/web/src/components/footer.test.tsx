import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Footer } from './footer'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

describe('Footer Component', () => {
  it('renders the SwiftLink branding', () => {
    render(<Footer />)
    const brandElements = screen.getAllByText(/SwiftLink/i)
    expect(brandElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/The simplest way to receive crypto payments/i)).toBeInTheDocument()
  })

  it('renders the footer navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
    expect(screen.getByText('Request Payment')).toBeInTheDocument()
    expect(screen.getByText('Smart Contract')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
  })

  it('displays the correct copyright year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })
})

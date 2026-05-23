import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ExplorerHeader } from './explorer-header'

describe('ExplorerHeader Component', () => {
  it('renders the header title correctly', () => {
    render(<ExplorerHeader />)
    expect(screen.getByText('On-Chain Explorer')).toBeInTheDocument()
  })

  it('renders the subtitle correctly', () => {
    render(<ExplorerHeader />)
    expect(
      screen.getByText(/Watch SwiftLink activity happen live on Celo/i)
    ).toBeInTheDocument()
  })
})

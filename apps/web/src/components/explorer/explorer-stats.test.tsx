import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ExplorerStats } from './explorer-stats'

describe('ExplorerStats Component', () => {
  it('renders loading state correctly', () => {
    render(<ExplorerStats isLoading={true} stats={{ txns: 0, volume: 0, users: 0 }} />)
    expect(screen.getByText('Total Transactions')).toBeInTheDocument()
    expect(screen.getByText('Volume (CELO)')).toBeInTheDocument()
    expect(screen.getByText('Registered Users')).toBeInTheDocument()
  })

  it('renders actual stats correctly', () => {
    render(<ExplorerStats isLoading={false} stats={{ txns: 150, volume: 2450.5, users: 42 }} />)
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })
})

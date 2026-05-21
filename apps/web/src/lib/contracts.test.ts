import { describe, it, expect } from 'vitest'
import { 
  SWIFTLINK_ADDRESS, 
  SWIFTLINK_BATCH_ADDRESS, 
  SUPPORTED_TOKENS,
  CELO_ADDRESS,
  CUSD_ADDRESS,
  CUSD_SEPOLIA_ADDRESS
} from './contracts'

describe('contracts config', () => {
  it('exports valid SwiftLink core addresses', () => {
    expect(SWIFTLINK_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/)
    expect(SWIFTLINK_BATCH_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/)
  })

  it('exports valid token addresses', () => {
    expect(CELO_ADDRESS).toBe('0x0000000000000000000000000000000000000000')
    expect(CUSD_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/)
    expect(CUSD_SEPOLIA_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/)
  })

  it('configures supported tokens correctly', () => {
    expect(SUPPORTED_TOKENS.length).toBeGreaterThan(0)
    
    const celoToken = SUPPORTED_TOKENS.find(t => t.symbol === 'CELO')
    expect(celoToken).toBeDefined()
    expect(celoToken?.address).toBe(CELO_ADDRESS)
    expect(celoToken?.decimals).toBe(18)

    const cusdToken = SUPPORTED_TOKENS.find(t => t.symbol === 'cUSD')
    expect(cusdToken).toBeDefined()
    expect(cusdToken?.decimals).toBe(18)
  })
})

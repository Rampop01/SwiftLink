import { describe, it, expect } from 'vitest'
import { shortenAddress, cn } from '@/lib/utils'

describe('utils', () => {
  describe('shortenAddress', () => {
    it('should shorten a standard ethereum address', () => {
      const addr = '0xE95C3C6052484C64978D6281bEb62f05d352ed43'
      expect(shortenAddress(addr)).toBe('0xE95C...ed43')
    })

    it('should return empty string if address is undefined', () => {
      expect(shortenAddress(undefined)).toBe('')
    })

    it('should return empty string if address is null', () => {
      expect(shortenAddress(null)).toBe('')
    })

    it('should return empty string if address is empty', () => {
      expect(shortenAddress('')).toBe('')
    })
  })

  describe('cn', () => {
    it('should merge tailwind classes', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('should resolve tailwind conflicts', () => {
      expect(cn('p-4 p-8')).toBe('p-8')
    })
  })
})

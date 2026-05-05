# 🚀 SwiftLink

**The easiest way to get paid on Celo. Built for MiniPay.**

SwiftLink allows anyone to generate a unique payment link (e.g., `swiftlink.me/pay/john`) and receive cUSD/USDC payments directly to their wallet in seconds. Designed for the Celo ecosystem and optimized for the MiniPay mobile experience.

---

## ✨ Features

- **Personalized Payment Pages**: Create your own permanent link to share on social media.
- **MiniPay Native**: Zero-friction wallet connection for the 14M+ MiniPay users.
- **Stablecoin First**: Focus on real-world utility using cUSD and USDC.
- **AI-Powered Invoicing**: Generate professional descriptions and reminders with a built-in AI assistant.
- **Transaction Dashboard**: Track your earnings with a clean, mobile-first interface.
- **On-Chain Reputation**: Every successful payment builds your verifiable professional history on Celo.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Web3**: Viem, Wagmi, Celo SDK
- **Smart Contracts**: Solidity, Hardhat
- **AI**: OpenAI API for automated invoicing
- **Network**: Celo Mainnet / Sepolia

---

## 📅 Roadmap (Proof of Ship Marathon)

### Week 1: Foundation
- [ ] Core Smart Contract (SwiftLink.sol)
- [ ] User Profile & Username Registration
- [ ] Basic Payment Page (/pay/[username])
- [ ] MiniPay Auto-connect Integration

### Week 2: AI & UX
- [ ] AI Invoice Description Generator
- [ ] Fixed-amount Payment Links
- [ ] QR Code Support for In-person Payments
- [ ] Social Preview Optimization (OG Tags)

### Week 3: Dashboard & Analytics
- [ ] Real-time Transaction History
- [ ] Earnings Analytics Dashboard
- [ ] Mainnet Deployment
- [ ] Payment Notifications (Farcaster/Email)

### Week 4: Polish & Launch
- [ ] Premium UI/UX Polish (Animations & Glassmorphism)
- [ ] Tipping Widgets
- [ ] Final Presentation & Demo Video

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

Built with ❤️ for the Celo Proof of Ship contest.

## Project Structure

- `apps/web` - Next.js application with embedded UI components and utilities
- `apps/hardhat` - Smart contract development environment

## Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages and apps
- `pnpm type-check` - Run TypeScript type checking

### Smart Contract Scripts

- `pnpm contracts:compile` - Compile smart contracts
- `pnpm contracts:test` - Run smart contract tests
- `pnpm contracts:deploy` - Deploy contracts to local network
- `pnpm contracts:deploy:celo-sepolia` - Deploy to Celo Sepolia Testnet
- `pnpm contracts:deploy:celo` - Deploy to Celo Mainnet

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Smart Contracts**: Hardhat with Viem
- **Monorepo**: Turborepo
- **Package Manager**: PNPM

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Celo Documentation](https://docs.celo.org/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

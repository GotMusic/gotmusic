# 🎵 GotMusic

> **Decentralized Music Marketplace** • **ETHOnline 2025** • **Oct 10–31, 2025**

[![CI Status](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml/badge.svg)](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black.svg)](https://nextjs.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2053-blue.svg)](https://expo.dev/)

**GotMusic** is a cutting-edge decentralized music marketplace that revolutionizes how artists monetize their work and fans discover new music. Built for **ETHOnline 2025**, it combines blockchain technology, advanced encryption, and **professional-grade audio processing** to create a secure, scalable platform for the future of music.

## 🎵 **NEW: Professional Audio Player System**

We've implemented a **comprehensive audio player system** with industry-leading features:

- **🌐 Web Audio API** - High-performance audio processing with Canvas waveform visualization
- **📱 Mobile SVG Waveforms** - React Native SVG-based waveform rendering with Expo Audio
- **🎚️ LUFS Normalization** - Professional -14 dB loudness normalization (Spotify standard)
- **⚙️ Quality Management** - Multiple bitrate options (128k/256k/320k) with adaptive streaming
- **🔄 30s Preview Logic** - Consistent preview behavior across all platforms
- **🎨 Professional UI** - Design system integration with smooth animations

---

## 🚀 **Quick Start**

```bash
# Prerequisites
node >= 20.11.0
yarn >= 4.3.1

# Clone and install
git clone https://github.com/GotMusic/gotmusic.git
cd gotmusic
yarn install --immutable

# Build design tokens
yarn tokens:build

# Start development
yarn dev
```

**🌐 Web App:** http://localhost:3000  
**📱 Mobile App:** http://localhost:8081  
**📚 Storybook:** http://localhost:6006  

---

## 🎯 **What is GotMusic?**

GotMusic is a **decentralized music marketplace** that enables:

- **🎵 Artists** to upload, encrypt, and monetize their music with blockchain-based licensing
- **🎧 Fans** to discover, preview, and purchase music with secure digital ownership
- **🏪 Producers** to manage their catalog, track sales, and build their brand
- **🔐 Security** through end-to-end encryption, blockchain attestations, and secure key management

### **Core Features**

| Feature | Status | Description |
|---------|--------|-------------|
| **🎵 Music Upload** | ✅ Complete | Secure file upload with encryption and blockchain attestation |
| **🔐 End-to-End Encryption** | ✅ Complete | AES-GCM encryption with secure key management |
| **📱 Mobile App** | ✅ Complete | React Native app with biometric authentication |
| **🌐 Web Marketplace** | ✅ Complete | Next.js 15 app with modern React patterns |
| **🎵 Professional Audio Player** | ✅ Complete | Web Audio API + Mobile SVG waveforms with LUFS normalization |
| **💳 Payment System** | 🚧 In Progress | PYUSD integration with Avail Nexus bridge |
| **📊 Analytics Dashboard** | ✅ Complete | Real-time sales and performance tracking |
| **🎨 Design System** | ✅ Complete | Comprehensive UI kit with Storybook integration |

---

## 🏗️ **Architecture**

### **Monorepo Structure**

```
gotmusic/
├── apps/
│   ├── web/          # Next.js 15 web application
│   ├── mobile/       # React Native mobile app
│   └── worker/       # Background processing worker
├── packages/
│   ├── ui/           # Shared UI components
│   ├── api/          # API client and types
│   ├── tokens/       # Design system tokens
│   └── fixtures/     # Test data and mocks
└── docs.d/           # Internal documentation
```

### **Technology Stack**

#### **Frontend**
- **Web:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Mobile:** React Native, Expo SDK 53, NativeWind
- **Audio:** Web Audio API, Canvas waveforms, LUFS normalization
- **UI:** Radix UI, Lucide Icons, Storybook v9.1.13
- **State:** TanStack Query, React Hook Form, Zod validation

#### **Backend**
- **Database:** PostgreSQL with Drizzle ORM
- **Storage:** AWS S3/R2 with pre-signed URLs
- **Encryption:** AES-GCM with Lighthouse IPFS
- **Blockchain:** Base Sepolia, EAS Attestations

#### **DevOps & Quality**
- **Monorepo:** Turbo, Yarn 4.3.1
- **CI/CD:** GitHub Actions, Vercel deployment
- **Testing:** Playwright E2E, Jest unit tests
- **Code Quality:** Biome linter, TypeScript strict mode
- **Security:** Gitleaks, secret scanning, rate limiting

---

## 🛠️ **Development**

### **Prerequisites**

```bash
# Node.js and Yarn
node >= 20.11.0
yarn >= 4.3.1

# Database (Docker)
docker run -d --name gotmusic-postgres \
  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gotmusic_dev -p 5433:5432 postgres:17
```

### **Environment Setup**

```bash
# Copy environment template
cp env.template apps/web/.env.local

# Configure database
echo 'DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev' >> apps/web/.env.local

# Initialize database
yarn workspace @gotmusic/web db:push
yarn workspace @gotmusic/web db:seed
```

### **Available Scripts**

```bash
# Development
yarn dev                    # Start all apps
yarn workspace @gotmusic/web dev      # Web only
yarn workspace @gotmusic/mobile dev   # Mobile only

# Building
yarn build                  # Build all packages
yarn tokens:build          # Build design tokens
yarn typecheck             # TypeScript check

# Testing
yarn test                  # Run all tests
yarn workspace @gotmusic/web test:e2e  # E2E tests
yarn ci:local              # Run CI checks locally

# Quality
yarn biome:lint            # Lint code
yarn biome:fix             # Auto-fix code
yarn sec:secrets           # Security scan

# Performance
yarn perf:analyze          # Performance analysis
yarn perf:dashboard        # Performance dashboard
yarn storybook:monitor     # Storybook performance
```

---

## 🎨 **Design System**

### **Storybook Integration**

Our comprehensive design system is built with **Storybook v8.6.14** and includes:

- **50+ Component Stories** with full coverage across all user pathways
- **Accessibility Testing** with A11y addon
- **Performance Monitoring** with e18e compliance
- **Design Tokens Gallery** with 15+ categories
- **Interactive Documentation** for all components

```bash
# Start Storybook
yarn workspace @gotmusic/ui storybook

# Performance monitoring
yarn storybook:monitor
```

### **Design Tokens**

Our design system uses **Style Dictionary** to generate consistent tokens across web and mobile:

- **Colors:** Neutral palette, brand colors, semantic colors
- **Typography:** Inter font family with 8 size scales
- **Spacing:** 4px grid system with 12 spacing values
- **Shadows:** Ambient and glow effects for depth
- **Motion:** Duration and easing curves including springy

---

## 🔐 **Security & Performance**

### **Security Features**

- **🔒 End-to-End Encryption:** AES-GCM encryption for all music files
- **🛡️ Secret Scanning:** Automated detection of hardcoded secrets
- **🔑 Biometric Authentication:** Mobile app security with biometric gates
- **🌐 Rate Limiting:** IP-based rate limiting on all API endpoints
- **📝 Audit Logging:** Comprehensive audit trail for all actions

### **Performance Standards**

We follow **e18e.dev** performance standards with:

- **Bundle Size:** < 100KB per component
- **Build Time:** < 30s for full builds
- **e18e Score:** 86% compliance (target: 90%+)
- **Performance Budgets:** Automated monitoring and alerts

```bash
# Performance analysis
yarn perf:analyze
yarn perf:e18e
yarn perf:dashboard
```

### **Storybook Development**

**Component Development Environment:**
- **Storybook v8.6.14** with full addon compatibility
- **50+ Component Stories** with comprehensive coverage across all user pathways
- **A11y Testing** with automated accessibility audits
- **Performance Monitoring** with e18e compliance dashboard
- **Tailwind v4** with PostCSS configuration

```bash
# Start Storybook
yarn storybook

# Performance monitoring
yarn perf:monitor
```

---

## 📊 **Current Status**

### **✅ Completed Features**

- **47 Issues Complete** with 88 PRs merged
- **23 E2E Tests Passing** (100% success rate)
- **9 CI Checks** all green
- **PostgreSQL Database** with deterministic seeds
- **10 REST API Endpoints** with Zod validation
- **Admin Panel** with asset management
- **Mobile App** with biometric authentication
- **🎵 Professional Audio Player** with Web Audio API + Mobile SVG waveforms
- **🎚️ LUFS Normalization** with -14 dB Spotify standard
- **⚙️ Quality Management** with adaptive streaming (128k/256k/320k)
- **Storybook Epic** with 50+ component stories completed
- **Performance Monitoring** with e18e compliance
- **Security Hardening** with production-safe practices

### **🚧 In Progress**

- **Payment Integration** - PYUSD with Avail Nexus bridge
- **Advanced Audio Features** - Professional mastering tools
- **Mobile Enhancements** - Biometric authentication improvements

## 🚀 **Future Roadmap**

### **🎯 Phase 1: Hackathon Implementation (Current - 3 Weeks)**

**Immediate Implementation Plan**
- **🌐 Web Audio Enhancement** - Web Audio API + Canvas waveform visualization
- **📱 Mobile Waveform Player** - React Native SVG waveforms + Expo Audio
- **🎚️ LUFS Normalization** - Professional -14 dB loudness normalization
- **⚙️ Quality Management** - Adaptive streaming (128k/256k/320k)
- **🔄 30s Preview Logic** - Consistent preview behavior across platforms
- **🎨 Professional UI** - Design system integration with smooth animations

**Week 1: Core Implementation**
- Web Audio API integration with Canvas waveforms
- Mobile SVG waveform rendering with React Native
- 30s preview logic implementation
- Basic UI integration

**Week 2: Quality & Testing**
- LUFS normalization implementation
- Quality settings and adaptive streaming
- E2E testing across platforms
- Performance optimization

**Week 3: Polish & Launch**
- UI polish and animations
- Final testing and bug fixes
- Documentation and demo preparation
- Launch readiness

### **🎵 Phase 2: Advanced Audio Features (Post-Hackathon)**

**Desktop Standalone Player**
- **🖥️ JUCE C++ Application** - Professional desktop standalone player
- **🔌 DAW Integration** - VST3/AU plugin support for music production
- **🎚️ Advanced EQ** - 10-band parametric EQ with professional presets
- **🌐 Spatial Audio** - 3D positioning and movement for immersive experiences
- **🎵 Motion System** - Brauer-style autopan with musical timing
- **⚡ Real-time Processing** - Zero-latency audio processing for live performance

**Professional Mastering Tools**
- **🎛️ Advanced Compression** - Multi-band compression with sidechain
- **🎚️ Professional Limiting** - Mastering-grade limiting with oversampling
- **🌊 Advanced EQ** - Linear phase EQ with surgical precision
- **🎵 Harmonic Enhancement** - Saturation and harmonic excitement
- **📊 Spectrum Analysis** - Real-time frequency analysis and visualization

### **🌐 Phase 3: Streaming Platform (Long-term Vision)**

**Music Streaming Service**
- **🎵 Global CDN** - 200+ edge locations worldwide for instant streaming
- **📊 Adaptive Quality** - Network-based quality adjustment (96k-320k)
- **🔒 DRM Integration** - Blockchain-based license verification
- **📱 Cross-Platform** - Web, mobile, desktop, and smart TV apps
- **🎧 Offline Playback** - Secure offline downloads with license validation

**Social Features**
- **👥 Community** - Artist-fan interaction and community building
- **🎵 Playlists** - Collaborative playlist creation and sharing
- **📊 Analytics** - Detailed listening analytics for artists
- **🎤 Live Streaming** - Real-time audio streaming capabilities
- **🎵 Collaborative Tools** - Multi-user music creation and editing

### **🔗 Phase 4: Blockchain Integration (Advanced)**

**NFT Music Marketplace**
- **🎵 Music NFTs** - Unique digital music collectibles
- **🎨 Visual Art** - Album artwork and music video NFTs
- **🎤 Artist Tokens** - Fan investment in artist success
- **🏆 Achievements** - Gamified music discovery and collection
- **🌐 Cross-Chain** - Multi-blockchain support for global accessibility

**Decentralized Governance**
- **🗳️ DAO Governance** - Community-driven platform decisions
- **💰 Revenue Sharing** - Transparent revenue distribution
- **🎵 Curation** - Community-curated music discovery
- **🏆 Rewards** - Token rewards for platform participation
- **🌐 Interoperability** - Integration with other music platforms

---

## 🌐 **Deployment**

### **Web Application**
- **Production:** Vercel with automatic deployments
- **Preview:** Branch-based preview deployments
- **Environment:** Comprehensive environment variable documentation

### **Mobile Application**
- **Development:** Expo Go for rapid iteration
- **Production:** EAS Build for app store deployment
- **Testing:** Expo Development Build for advanced features

---

## 🤝 **Contributing**

### **Development Workflow**

1. **Create Issue:** Use GitHub issue templates
2. **Branch Naming:** `type/scope/description-ISSUE`
3. **Commit Format:** Conventional commits with `--no-gpg-sign`
4. **PR Requirements:** Include `Closes #X` in PR description
5. **Code Review:** Automated testing and quality checks

### **Code Standards**

- **TypeScript:** Strict mode with comprehensive types
- **Linting:** Biome for consistent code style
- **Testing:** Comprehensive test coverage
- **Accessibility:** WCAG AA compliance
- **Performance:** e18e standards compliance

---

## 🔗 **Brands & APIs**

We're proud to work with industry-leading technologies and partners:

### **⛓️ On-Chain Infrastructure**
- **[Ethereum](https://ethereum.org)** - Smart contract platform
- **[Base](https://base.org)** - Layer 2 scaling solution
- **[Avail Nexus](https://www.availproject.org)** - Data availability layer
- **[EAS](https://attest.sh)** - Ethereum Attestation Service
- **[Blockscout](https://blockscout.com)** - Blockchain explorer

### **💾 Storage & Delivery**
- **[Lighthouse](https://lighthouse.storage)** - Decentralized storage
- **[Lit Protocol](https://litprotocol.com)** - Access control & encryption
- **[IPFS](https://ipfs.tech)** - InterPlanetary File System
- **[Cloudflare R2](https://www.cloudflare.com/products/r2/)** - Object storage
- **[AWS S3](https://aws.amazon.com/s3/)** - Scalable storage

### **💰 Wallets & Payments**
- **[PYUSD](https://www.paypal.com/pyusd)** - PayPal USD stablecoin
- **[MetaMask](https://metamask.io)** - Web3 wallet
- **[WalletConnect](https://walletconnect.com)** - Wallet connection protocol
- **[Coinbase Wallet](https://www.coinbase.com/wallet)** - Multi-chain wallet

### **🛠️ Infrastructure & Development**
- **[Vercel](https://vercel.com)** - Deployment platform
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation
- **[PostgreSQL](https://www.postgresql.org)** - Database
- **[Railway](https://railway.app)** - Cloud infrastructure
- **[Docker](https://www.docker.com)** - Containerization
- **[Turborepo](https://turbo.build/repo)** - Monorepo build system
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **[NativeWind](https://www.nativewind.dev)** - React Native styling
- **[Storybook](https://storybook.js.org)** - Component development
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[e18e](https://e18e.dev)** - Performance standards
- **[Vite](https://vitejs.dev)** - Build tool
- **[tsup](https://tsup.egoist.sh)** - TypeScript bundler
- **[Radix UI](https://www.radix-ui.com)** - Headless UI components
- **[Lucide](https://lucide.dev)** - Icon library
- **[Yarn](https://yarnpkg.com)** - Package manager

### **🧪 Testing & Performance**
- **[Playwright](https://playwright.dev)** - End-to-end testing
- **[Jest](https://jestjs.io)** - Unit testing framework
- **[Biome](https://biomejs.dev)** - Linting and formatting

---

## 📚 **Documentation**

### **Documentation**
- **[API Documentation](apps/web/docs)** - OpenAPI 3.0.3 spec
- **[Design System](packages/ui/.storybook)** - Component documentation
- **[Performance Dashboard](.e18e-dashboard.html)** - Performance metrics

---

## 🏆 **Achievements**

### **Technical Excellence**
- **Modern Stack:** Next.js 15, React 19, TypeScript 5.6.3
- **Monorepo Architecture:** Turbo-powered with Yarn 4.3.1
- **Professional Audio:** Web Audio API + Mobile SVG waveforms with LUFS normalization
- **Design System:** Comprehensive UI kit with Storybook
- **Performance:** e18e compliance with automated monitoring
- **Security:** Production-safe with comprehensive scanning

### **Development Experience**
- **Developer Tools:** Hot reload, TypeScript, ESLint, Prettier
- **Testing:** Playwright E2E, Jest unit tests, Storybook visual testing
- **CI/CD:** Automated testing, deployment, and quality checks
- **Documentation:** Comprehensive guides and API documentation

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

Built for **ETHOnline 2025** with ❤️ by the GotMusic team.

**Special thanks to:**
- **e18e.dev** for performance standards
- **Vercel** for deployment platform
- **Expo** for mobile development
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling
- **Web Audio API** for professional audio processing
- **React Native SVG** for mobile waveform visualization

---

<div align="center">

**🎵 GotMusic** • **Decentralized Music Marketplace** • **ETHOnline 2025**

[🌐 Web App](https://gotmusic.vercel.app) • [📱 Mobile App](https://expo.dev/@gotmusic/mobile) • [📚 Storybook](https://gotmusic-storybook.vercel.app) • [📊 Performance](.e18e-dashboard.html)

</div>
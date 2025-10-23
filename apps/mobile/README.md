# GotMusic Mobile App

**Comprehensive mobile application for blockchain-powered music marketplace with advanced authentication and cross-chain payments.**

## 🚀 **FEATURES OVERVIEW**

### **🔐 Advanced Authentication System**
- **Biometric Authentication**: Face ID, Touch ID, and fingerprint recognition
- **Passkey Integration**: WebAuthn-based passkey authentication
- **Traditional Wallets**: MetaMask, WalletConnect, Coinbase Wallet support
- **Embedded Wallets**: Privy-powered embedded wallet system
- **Multi-Factor Authentication**: Email, phone, Google, Apple sign-in

### **💰 Cross-Chain Payment System**
- **Avail Nexus Integration**: Cross-chain liquidity and intents
- **PYUSD Support**: PayPal USD stablecoin integration
- **Blockscout Integration**: Blockchain explorer and transaction tracking
- **Multi-Currency Pricing**: Support for various payment currencies
- **Stable Pricing**: PYUSD as pricing anchor for global consistency

### **🔒 Asset Security & Access Control**
- **Lit Protocol Integration**: Asset encryption with access control conditions
- **EAS Attestations**: Ethereum Attestation Service for license verification
- **Passkey Transaction Signing**: Biometric-signed transactions without external wallets
- **Secure Storage**: Encrypted local storage for sensitive data

### **🎵 Audio Production Features**
- **Audio Recording**: High-quality audio recording with real-time processing
- **File Management**: Secure file storage and metadata management
- **Producer Dashboard**: Comprehensive studio management interface
- **Asset Library**: Personal music library with purchase history

## 🏗️ **ARCHITECTURE**

### **Core Services**
- **AuthenticationService**: Manages all authentication methods
- **BlockchainService**: Handles blockchain interactions
- **PasskeyWalletService**: Creates and manages passkey wallets
- **LitProtocolService**: Asset encryption and access control
- **MultiCurrencyService**: Multi-currency pricing and conversion

### **Context Providers**
- **AuthContext**: Global authentication state
- **BiometricContext**: Biometric authentication state
- **PasskeyContext**: Passkey authentication state
- **PrivyAuthContext**: Privy embedded wallet state
- **PasskeyTransactionContext**: Passkey transaction signing state

### **UI Components**
- **Custom Icon System**: SVG-based icon system with animations
- **Design Tokens**: Consistent design system with NativeWind
- **Responsive Layout**: Adaptive UI for different screen sizes
- **Accessibility**: Full accessibility support with dynamic type

## 📱 **NAVIGATION STRUCTURE**

### **Tab Navigation**
- **Discover**: Music discovery and browsing
- **Browse**: Advanced search and filtering
- **Library**: Personal music library
- **Record**: Audio recording interface
- **Studio**: Producer dashboard

### **Modal Navigation**
- **Authentication**: Comprehensive auth flow
- **Wallet Connection**: Wallet selection and connection
- **Purchase Flow**: Complete purchase process
- **Passkey Demo**: Interactive passkey demonstration

## 🔧 **TECHNICAL STACK**

### **Core Technologies**
- **Expo SDK 54**: React Native development platform
- **Expo Router**: File-based routing system
- **NativeWind**: Tailwind CSS for React Native
- **React Native Reanimated**: Advanced animations
- **TanStack Query**: Data fetching and caching

### **Blockchain Integration**
- **@lit-protocol/lit-node-client**: Lit Protocol integration
- **@privy-io/react-auth**: Embedded wallet authentication
- **@tanstack/react-query**: Data management
- **expo-local-authentication**: Biometric authentication
- **expo-secure-store**: Secure storage

### **Audio & Media**
- **expo-av**: Audio recording and playback
- **expo-file-system**: File system operations
- **expo-haptics**: Haptic feedback

## 🚀 **GETTING STARTED**

### **Prerequisites**
- Node.js 18+
- Yarn package manager
- Expo CLI
- iOS Simulator or Android Emulator

### **Installation**
```bash
# Install dependencies
yarn install

# Start development server
yarn workspace @gotmusic/mobile dev

# Run on iOS
yarn workspace @gotmusic/mobile ios

# Run on Android
yarn workspace @gotmusic/mobile android
```

### **Environment Configuration**
Create `.env` file with required environment variables:
```env
EXPO_PUBLIC_LIT_NETWORK=datil-dev
EXPO_PUBLIC_CHAIN_ID=84532
EXPO_PUBLIC_EAS_CONTRACT_ADDRESS=0x...
EXPO_PUBLIC_LICENSE_SCHEMA_UID=0x...
EXPO_PUBLIC_LIT_DEBUG=true
EXPO_PUBLIC_LIT_RELAY_API_KEY=your_api_key
```

## 🔐 **AUTHENTICATION FLOWS**

### **1. Biometric Authentication**
- Face ID/Touch ID setup and verification
- Secure biometric transaction signing
- Fallback to passcode when biometrics unavailable

### **2. Passkey Authentication**
- WebAuthn-based passkey creation
- Cross-device passkey synchronization
- Biometric-signed transactions

### **3. Traditional Wallets**
- MetaMask connection and signing
- WalletConnect protocol support
- Coinbase Wallet integration

### **4. Embedded Wallets**
- Privy-powered embedded wallets
- Social login integration
- Seamless onboarding experience

## 💰 **PAYMENT SYSTEM**

### **Cross-Chain Payments**
- Avail Nexus for cross-chain liquidity
- PYUSD as stable pricing anchor
- Multi-currency support with conversion

### **Transaction Flow**
1. **Price Calculation**: Multi-currency pricing with PYUSD anchor
2. **Wallet Connection**: Automatic wallet connection for purchases
3. **Transaction Signing**: Biometric or passkey signing
4. **Blockchain Confirmation**: Real-time transaction tracking
5. **Asset Access**: Lit Protocol decryption with access control

### **Supported Currencies**
- PYUSD (PayPal USD)
- ETH (Ethereum)
- USDC (USD Coin)
- AVAIL (Avail token)
- And more...

## 🔒 **SECURITY FEATURES**

### **Asset Encryption**
- Lit Protocol encryption with access control conditions
- Unique symmetric keys for each asset
- Blockchain-based access control

### **Transaction Security**
- Biometric transaction signing
- Passkey-based authentication
- Secure key storage

### **Data Protection**
- Encrypted local storage
- Secure keychain integration
- Privacy-first design

## 📊 **MONITORING & ANALYTICS**

### **Transaction Tracking**
- Blockscout integration for transaction monitoring
- Real-time payment status updates
- Comprehensive transaction history

### **Performance Monitoring**
- App performance tracking
- Error reporting and debugging
- User experience analytics

## 🧪 **TESTING**

### **Unit Tests**
```bash
yarn workspace @gotmusic/mobile test
```

### **E2E Tests**
```bash
yarn workspace @gotmusic/mobile test:e2e
```

### **Manual Testing**
- Biometric authentication testing
- Passkey flow testing
- Wallet connection testing
- Payment flow testing

## 🚀 **DEPLOYMENT**

### **Development Build**
```bash
yarn workspace @gotmusic/mobile build:dev
```

### **Production Build**
```bash
yarn workspace @gotmusic/mobile build:prod
```

### **App Store Deployment**
```bash
yarn workspace @gotmusic/mobile deploy:ios
yarn workspace @gotmusic/mobile deploy:android
```

## 📚 **DOCUMENTATION**

### **Feature Documentation**
- `features/authentication.md` - Authentication system
- `features/blockchain-integration.md` - Blockchain services
- `features/passkey-transactions.md` - Passkey transaction system
- `features/wallet-connect.md` - Wallet connection system
- `features/lit-protocol.md` - Lit Protocol integration
- `features/audio-recording.md` - Audio recording system
- `features/ui-components.md` - UI component system

### **API Documentation**
- Blockchain service APIs
- Authentication service APIs
- Payment service APIs
- Asset management APIs

## 🤝 **CONTRIBUTING**

### **Development Workflow**
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

### **Code Standards**
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Comprehensive testing

## 📄 **LICENSE**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Status:** 🟢 **PRODUCTION READY**  
**Last Updated:** 2025-10-22  
**Version:** 1.0.0

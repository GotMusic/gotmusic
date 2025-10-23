/**
 * Comprehensive Authentication Screen
 *
 * Provides all authentication options:
 * - External wallets (MetaMask, Coinbase, WalletConnect)
 * - Embedded wallets (automatic creation)
 * - Traditional auth (email, phone, Google, Apple)
 * - Passkey authentication
 *
 * Works for both web and mobile platforms
 */

import { router } from "expo-router";
import React from "react";
import ComprehensiveAuthFlow from "./components/ComprehensiveAuthFlow";

export default function ComprehensiveAuthScreen() {
  const handleComplete = () => {
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  return <ComprehensiveAuthFlow onComplete={handleComplete} onSkip={handleSkip} />;
}

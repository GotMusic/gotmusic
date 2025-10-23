/**
 * Enhanced Authentication Screen
 *
 * Provides the complete authentication flow combining:
 * - Wallet connection (primary identity)
 * - Passkey creation (cryptographic proof)
 * - Biometric setup (convenience layer)
 */

import { router } from "expo-router";
import React from "react";
import EnhancedAuthFlow from "./components/EnhancedAuthFlow";

export default function EnhancedAuthScreen() {
  const handleComplete = () => {
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  return <EnhancedAuthFlow onComplete={handleComplete} onSkip={handleSkip} />;
}

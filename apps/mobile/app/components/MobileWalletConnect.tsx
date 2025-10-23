/**
 * MobileWalletConnect - Native mobile wallet connection options
 *
 * This component provides multiple wallet connection methods for mobile:
 * 1. Traditional wallets (MetaMask, WalletConnect, Coinbase Wallet)
 * 2. Passkey wallet (our custom solution)
 * 3. Embedded wallets (Privy)
 * 4. Social login with embedded wallet creation
 */

import { tokens } from "@gotmusic/tokens/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePasskeyTransaction } from "../../src/contexts/PasskeyTransactionContext";
import { usePrivyAuth } from "../../src/contexts/PrivyAuthContext";
import { useWalletService } from "../../src/services/blockchain/BlockchainServiceProvider";

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "traditional" | "passkey" | "embedded" | "social";
  isAvailable: boolean;
  onPress: () => void;
}

interface MobileWalletConnectProps {
  onWalletConnected?: (walletInfo: { address: string; provider: string; type: string }) => void;
  onConnectionError?: (error: string) => void;
  showPasskeyOption?: boolean;
  showEmbeddedOption?: boolean;
  showSocialOption?: boolean;
}

export function MobileWalletConnect({
  onWalletConnected,
  onConnectionError,
  showPasskeyOption = true,
  showEmbeddedOption = true,
  showSocialOption = true,
}: MobileWalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<
    "traditional" | "passkey" | "embedded" | "social" | null
  >(null);

  const { connectWallet, getProviders } = useWalletService();
  const { wallet: passkeyWallet, createWallet, isWalletLoaded } = usePasskeyTransaction();
  const { loginWithEmail, loginWithGoogle, loginWithApple, createEmbeddedWallet } = usePrivyAuth();

  const handleTraditionalWallet = async (providerId: string) => {
    try {
      setIsConnecting(providerId);
      const account = await connectWallet(providerId);

      onWalletConnected?.({
        address: account.address,
        provider: providerId,
        type: "traditional",
      });
    } catch (error) {
      console.error("Traditional wallet connection failed:", error);
      onConnectionError?.(error instanceof Error ? error.message : "Connection failed");
    } finally {
      setIsConnecting(null);
    }
  };

  const handlePasskeyWallet = async () => {
    try {
      setIsConnecting("passkey");

      if (!isWalletLoaded) {
        const success = await createWallet();
        if (!success) {
          throw new Error("Failed to create passkey wallet");
        }
      }

      onWalletConnected?.({
        address: passkeyWallet?.address || "",
        provider: "passkey",
        type: "passkey",
      });
    } catch (error) {
      console.error("Passkey wallet creation failed:", error);
      onConnectionError?.(
        error instanceof Error ? error.message : "Passkey wallet creation failed",
      );
    } finally {
      setIsConnecting(null);
    }
  };

  const handleEmbeddedWallet = async () => {
    try {
      setIsConnecting("embedded");
      const wallet = await createEmbeddedWallet();

      onWalletConnected?.({
        address: wallet.address,
        provider: "embedded",
        type: "embedded",
      });
    } catch (error) {
      console.error("Embedded wallet creation failed:", error);
      onConnectionError?.(
        error instanceof Error ? error.message : "Embedded wallet creation failed",
      );
    } finally {
      setIsConnecting(null);
    }
  };

  const handleSocialLogin = async (method: "email" | "google" | "apple") => {
    try {
      setIsConnecting(method);
      let result: any;

      switch (method) {
        case "email":
          result = await loginWithEmail();
          break;
        case "google":
          result = await loginWithGoogle();
          break;
        case "apple":
          result = await loginWithApple();
          break;
      }

      onWalletConnected?.({
        address: result.address,
        provider: method,
        type: "social",
      });
    } catch (error) {
      console.error("Social login failed:", error);
      onConnectionError?.(error instanceof Error ? error.message : "Social login failed");
    } finally {
      setIsConnecting(null);
    }
  };

  const handleOpenWalletApp = (walletName: string) => {
    const walletSchemes = {
      MetaMask: "metamask://",
      "Coinbase Wallet": "cbwallet://",
      "Trust Wallet": "trust://",
      Rainbow: "rainbow://",
    };

    const scheme = walletSchemes[walletName as keyof typeof walletSchemes];
    if (scheme) {
      Linking.openURL(scheme).catch(() => {
        Alert.alert(
          "Wallet App Not Found",
          `Please install ${walletName} from the App Store or Google Play Store.`,
        );
      });
    }
  };

  const traditionalWallets = getProviders().map((provider) => ({
    id: provider.id,
    name: provider.name,
    description: `Connect with your existing ${provider.name} wallet`,
    icon: provider.icon,
    type: "traditional" as const,
    isAvailable: true,
    onPress: () => handleTraditionalWallet(provider.id),
  }));

  const walletOptions: WalletOption[] = [
    // Traditional Wallets
    ...traditionalWallets,

    // Passkey Wallet
    ...(showPasskeyOption
      ? [
          {
            id: "passkey",
            name: "Passkey Wallet",
            description: "Create a secure wallet using your device's biometric authentication",
            icon: "🔐",
            type: "passkey" as const,
            isAvailable: true,
            onPress: handlePasskeyWallet,
          },
        ]
      : []),

    // Embedded Wallets
    ...(showEmbeddedOption
      ? [
          {
            id: "embedded",
            name: "Embedded Wallet",
            description: "Create a new wallet managed by GotMusic (no external app needed)",
            icon: "🏦",
            type: "embedded" as const,
            isAvailable: true,
            onPress: handleEmbeddedWallet,
          },
        ]
      : []),

    // Social Login Options
    ...(showSocialOption
      ? [
          {
            id: "email",
            name: "Email & Wallet",
            description: "Sign in with email and get an instant wallet",
            icon: "📧",
            type: "social" as const,
            isAvailable: true,
            onPress: () => handleSocialLogin("email"),
          },
          {
            id: "google",
            name: "Google & Wallet",
            description: "Sign in with Google and get an instant wallet",
            icon: "🔍",
            type: "social" as const,
            isAvailable: true,
            onPress: () => handleSocialLogin("google"),
          },
          {
            id: "apple",
            name: "Apple & Wallet",
            description: "Sign in with Apple and get an instant wallet",
            icon: "🍎",
            type: "social" as const,
            isAvailable: true,
            onPress: () => handleSocialLogin("apple"),
          },
        ]
      : []),
  ];

  const groupedOptions = walletOptions.reduce(
    (acc, option) => {
      if (!acc[option.type]) {
        acc[option.type] = [];
      }
      acc[option.type].push(option);
      return acc;
    },
    {} as Record<string, WalletOption[]>,
  );

  const getSectionTitle = (type: string) => {
    switch (type) {
      case "traditional":
        return "Connect Existing Wallet";
      case "passkey":
        return "Secure Passkey Wallet";
      case "embedded":
        return "Create New Wallet";
      case "social":
        return "Sign In & Get Wallet";
      default:
        return "Wallet Options";
    }
  };

  const getSectionDescription = (type: string) => {
    switch (type) {
      case "traditional":
        return "Use your existing crypto wallet";
      case "passkey":
        return "Most secure option using your device's biometric authentication";
      case "embedded":
        return "Get a new wallet managed by GotMusic";
      case "social":
        return "Sign in with your existing account and get a wallet instantly";
      default:
        return "";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Connect Your Wallet</Text>
        <Text style={styles.subtitle}>Choose how you'd like to connect to GotMusic</Text>
      </View>

      {Object.entries(groupedOptions).map(([type, options]) => (
        <View key={type} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{getSectionTitle(type)}</Text>
            <Text style={styles.sectionDescription}>{getSectionDescription(type)}</Text>
          </View>

          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.walletOption,
                isConnecting === option.id && styles.walletOptionConnecting,
              ]}
              onPress={option.onPress}
              disabled={isConnecting !== null}
            >
              <View style={styles.walletOptionContent}>
                <Text style={styles.walletIcon}>{option.icon}</Text>
                <View style={styles.walletInfo}>
                  <Text style={styles.walletName}>{option.name}</Text>
                  <Text style={styles.walletDescription}>{option.description}</Text>
                </View>
                {isConnecting === option.id ? (
                  <ActivityIndicator size="small" color={tokens.color.brand.primary} />
                ) : (
                  <Text style={styles.walletArrow}>→</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Help Section */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          • Traditional wallets require the app to be installed{"\n"}• Passkey wallets use your
          device's biometric authentication{"\n"}• Embedded wallets are managed by GotMusic{"\n"}•
          Social login creates a wallet automatically
        </Text>
      </View>

      {/* Wallet App Links */}
      <View style={styles.appLinksSection}>
        <Text style={styles.appLinksTitle}>Don't have a wallet?</Text>
        <View style={styles.appLinks}>
          {["MetaMask", "Coinbase Wallet", "Trust Wallet", "Rainbow"].map((wallet) => (
            <TouchableOpacity
              key={wallet}
              style={styles.appLink}
              onPress={() => handleOpenWalletApp(wallet)}
            >
              <Text style={styles.appLinkText}>Get {wallet}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.default,
    padding: tokens.space["4"],
  },
  header: {
    alignItems: "center",
    marginBottom: tokens.space["6"],
  },
  title: {
    fontSize: tokens.text["2xl"].size,
    fontWeight: "bold",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["2"],
    textAlign: "center",
  },
  subtitle: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.fg.muted,
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
    marginBottom: tokens.space["6"],
  },
  sectionHeader: {
    marginBottom: tokens.space["4"],
  },
  sectionTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["1"],
  },
  sectionDescription: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    lineHeight: 18,
  },
  walletOption: {
    backgroundColor: tokens.color.bg.subtle,
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space["3"],
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
  },
  walletOptionConnecting: {
    opacity: 0.6,
  },
  walletOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: tokens.space["4"],
  },
  walletIcon: {
    fontSize: 24,
    marginRight: tokens.space["3"],
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["1"],
  },
  walletDescription: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    lineHeight: 18,
  },
  walletArrow: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.fg.muted,
    fontWeight: "bold",
  },
  helpSection: {
    backgroundColor: tokens.color.bg.subtle,
    padding: tokens.space["4"],
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space["4"],
  },
  helpTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["3"],
  },
  helpText: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    lineHeight: 20,
  },
  appLinksSection: {
    alignItems: "center",
  },
  appLinksTitle: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    marginBottom: tokens.space["3"],
  },
  appLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: tokens.space["2"],
  },
  appLink: {
    backgroundColor: tokens.color.bg.subtle,
    paddingVertical: tokens.space["2"],
    paddingHorizontal: tokens.space["3"],
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
  },
  appLinkText: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.brand.primary,
    fontWeight: "500",
  },
});

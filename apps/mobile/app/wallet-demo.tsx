/**
 * Wallet Demo - Showcase all mobile wallet connection options
 *
 * This screen demonstrates the complete mobile wallet ecosystem:
 * 1. Traditional wallets (MetaMask, WalletConnect, Coinbase Wallet)
 * 2. Passkey wallets (secure biometric option)
 * 3. Embedded wallets (Privy managed)
 * 4. Social login with instant wallet creation
 * 5. Purchase flow integration
 */

import { tokens } from "@gotmusic/tokens/native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePasskeyTransaction } from "../src/contexts/PasskeyTransactionContext";
import { useWalletService } from "../src/services/blockchain/BlockchainServiceProvider";
import { MobileWalletConnect } from "./components/MobileWalletConnect";
import { WalletConnectionModal } from "./components/WalletConnectionModal";

interface ConnectedWallet {
  address: string;
  provider: string;
  type: string;
  connectedAt: Date;
}

export default function WalletDemo() {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState<string | null>(null);

  const { isConnected: isWalletConnected, currentAccount } = useWalletService();
  const { wallet: passkeyWallet, isWalletLoaded: isPasskeyLoaded } = usePasskeyTransaction();

  const handleWalletConnected = (walletInfo: {
    address: string;
    provider: string;
    type: string;
  }) => {
    const newWallet: ConnectedWallet = {
      address: walletInfo.address,
      provider: walletInfo.provider,
      type: walletInfo.type,
      connectedAt: new Date(),
    };

    setConnectedWallets((prev) => [...prev, newWallet]);
    setShowWalletModal(false);

    Alert.alert(
      "Wallet Connected! 🎉",
      `Successfully connected ${walletInfo.provider} wallet\nAddress: ${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}`,
    );
  };

  const handleConnectionError = (error: string) => {
    Alert.alert("Connection Failed", error);
  };

  const handleDisconnectWallet = (address: string) => {
    Alert.alert("Disconnect Wallet", "Are you sure you want to disconnect this wallet?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Disconnect",
        onPress: async () => {
          try {
            // In a real implementation, this would call the disconnect method
            setConnectedWallets((prev) => prev.filter((w) => w.address !== address));
            Alert.alert("Wallet Disconnected", "Wallet has been disconnected successfully");
          } catch (error) {
            Alert.alert("Error", "Failed to disconnect wallet");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const handleTestPurchase = () => {
    if (connectedWallets.length === 0) {
      Alert.alert("No Wallet Connected", "Please connect a wallet first to test purchases");
      return;
    }

    Alert.alert(
      "Test Purchase",
      "This would open the purchase flow with your connected wallet. In a real app, this would navigate to the purchase screen.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => {},
        },
      ],
    );
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case "traditional":
        return "🔗";
      case "passkey":
        return "🔐";
      case "embedded":
        return "🏦";
      case "social":
        return "👤";
      default:
        return "💳";
    }
  };

  const getWalletTypeName = (type: string) => {
    switch (type) {
      case "traditional":
        return "Traditional Wallet";
      case "passkey":
        return "Passkey Wallet";
      case "embedded":
        return "Embedded Wallet";
      case "social":
        return "Social Login";
      default:
        return "Unknown";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔗 Mobile Wallet Demo</Text>
          <Text style={styles.subtitle}>Experience all wallet connection options for mobile</Text>
        </View>

        {/* Connection Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Connection Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Traditional Wallet:</Text>
            <Text
              style={[
                styles.statusValue,
                isWalletConnected ? styles.statusSuccess : styles.statusError,
              ]}
            >
              {isWalletConnected ? "Connected" : "Not Connected"}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Passkey Wallet:</Text>
            <Text
              style={[
                styles.statusValue,
                isPasskeyLoaded ? styles.statusSuccess : styles.statusError,
              ]}
            >
              {isPasskeyLoaded ? "Available" : "Not Set Up"}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Total Connected:</Text>
            <Text style={styles.statusValue}>{connectedWallets.length}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowWalletModal(true)}>
              <Text style={styles.actionButtonText}>Connect Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={handleTestPurchase}
            >
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Test Purchase
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Connected Wallets */}
        {connectedWallets.length > 0 && (
          <View style={styles.walletsCard}>
            <Text style={styles.walletsTitle}>Connected Wallets</Text>
            {connectedWallets.map((wallet, index) => (
              <View
                key={`wallet-${wallet.type}-${wallet.address}-${index}`}
                style={styles.walletItem}
              >
                <View style={styles.walletInfo}>
                  <Text style={styles.walletIcon}>{getWalletIcon(wallet.type)}</Text>
                  <View style={styles.walletDetails}>
                    <Text style={styles.walletName}>{getWalletTypeName(wallet.type)}</Text>
                    <Text style={styles.walletAddress}>
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </Text>
                    <Text style={styles.walletProvider}>{wallet.provider}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.disconnectButton}
                  onPress={() => handleDisconnectWallet(wallet.address)}
                >
                  <Text style={styles.disconnectButtonText}>Disconnect</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Wallet Types Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Wallet Types Available</Text>

          <View style={styles.walletTypeCard}>
            <Text style={styles.walletTypeIcon}>🔗</Text>
            <View style={styles.walletTypeInfo}>
              <Text style={styles.walletTypeName}>Traditional Wallets</Text>
              <Text style={styles.walletTypeDescription}>
                Connect existing wallets like MetaMask, Coinbase Wallet, Trust Wallet
              </Text>
            </View>
          </View>

          <View style={styles.walletTypeCard}>
            <Text style={styles.walletTypeIcon}>🔐</Text>
            <View style={styles.walletTypeInfo}>
              <Text style={styles.walletTypeName}>Passkey Wallets</Text>
              <Text style={styles.walletTypeDescription}>
                Secure wallets using your device's biometric authentication
              </Text>
            </View>
          </View>

          <View style={styles.walletTypeCard}>
            <Text style={styles.walletTypeIcon}>🏦</Text>
            <View style={styles.walletTypeInfo}>
              <Text style={styles.walletTypeName}>Embedded Wallets</Text>
              <Text style={styles.walletTypeDescription}>
                Wallets managed by GotMusic, no external apps needed
              </Text>
            </View>
          </View>

          <View style={styles.walletTypeCard}>
            <Text style={styles.walletTypeIcon}>👤</Text>
            <View style={styles.walletTypeInfo}>
              <Text style={styles.walletTypeName}>Social Login</Text>
              <Text style={styles.walletTypeDescription}>
                Sign in with email/Google/Apple and get an instant wallet
              </Text>
            </View>
          </View>
        </View>

        {/* Integration Examples */}
        <View style={styles.integrationCard}>
          <Text style={styles.integrationTitle}>Integration Examples</Text>
          <Text style={styles.integrationDescription}>
            This demo shows how different wallet types integrate with GotMusic:
          </Text>

          <View style={styles.integrationList}>
            <Text style={styles.integrationItem}>
              • Traditional wallets use WalletConnect for mobile connections
            </Text>
            <Text style={styles.integrationItem}>
              • Passkey wallets enable biometric transaction signing
            </Text>
            <Text style={styles.integrationItem}>
              • Embedded wallets provide seamless onboarding
            </Text>
            <Text style={styles.integrationItem}>• Social login creates wallets automatically</Text>
          </View>
        </View>
      </ScrollView>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        visible={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletConnected={handleWalletConnected}
        title="Connect Your Wallet"
        description="Choose how you'd like to connect to GotMusic"
        showSkipOption={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.default,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: tokens.space["4"],
    marginBottom: tokens.space["4"],
  },
  title: {
    fontSize: tokens.text["3xl"].size,
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
  statusCard: {
    backgroundColor: tokens.color.bg.muted,
    margin: tokens.space["4"],
    padding: tokens.space["4"],
    borderRadius: tokens.radius.lg,
  },
  statusTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["3"],
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.space["2"],
  },
  statusLabel: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
  },
  statusValue: {
    fontSize: tokens.text.md.size,
    fontWeight: "500",
  },
  statusSuccess: {
    color: tokens.color.palette.semantic.success,
  },
  statusError: {
    color: tokens.color.palette.semantic.danger,
  },
  actionsCard: {
    backgroundColor: tokens.color.bg.muted,
    margin: tokens.space["4"],
    padding: tokens.space["4"],
    borderRadius: tokens.radius.lg,
  },
  actionsTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["3"],
  },
  actionButtons: {
    flexDirection: "row",
    gap: tokens.space["3"],
  },
  actionButton: {
    backgroundColor: tokens.color.brand.primary,
    paddingVertical: tokens.space["3"],
    paddingHorizontal: tokens.space["4"],
    borderRadius: tokens.radius.lg,
    flex: 1,
    alignItems: "center",
  },
  actionButtonSecondary: {
    backgroundColor: tokens.color.bg.default,
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
  },
  actionButtonText: {
    color: tokens.color.fg.inverse,
    fontSize: tokens.text.md.size,
    fontWeight: "600",
  },
  actionButtonTextSecondary: {
    color: tokens.color.fg.default,
  },
  walletsCard: {
    backgroundColor: tokens.color.bg.muted,
    margin: tokens.space["4"],
    padding: tokens.space["4"],
    borderRadius: tokens.radius.lg,
  },
  walletsTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["3"],
  },
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: tokens.space["3"],
    borderBottomWidth: 1,
    borderBottomColor: tokens.color.border.subtle,
  },
  walletInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  walletIcon: {
    fontSize: 24,
    marginRight: tokens.space["3"],
  },
  walletDetails: {
    flex: 1,
  },
  walletName: {
    fontSize: tokens.text.md.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["1"],
  },
  walletAddress: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    fontFamily: "monospace",
    marginBottom: tokens.space["1"],
  },
  walletProvider: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
  },
  disconnectButton: {
    paddingVertical: tokens.space["2"],
    paddingHorizontal: tokens.space["3"],
    borderRadius: tokens.radius.md,
    backgroundColor: `${tokens.color.palette.semantic.danger}20`,
  },
  disconnectButtonText: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.palette.semantic.danger,
    fontWeight: "500",
  },
  overviewCard: {
    backgroundColor: tokens.color.bg.muted,
    margin: tokens.space["4"],
    padding: tokens.space["4"],
    borderRadius: tokens.radius.lg,
  },
  overviewTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["4"],
  },
  walletTypeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: tokens.space["4"],
  },
  walletTypeIcon: {
    fontSize: 24,
    marginRight: tokens.space["3"],
    marginTop: tokens.space["1"],
  },
  walletTypeInfo: {
    flex: 1,
  },
  walletTypeName: {
    fontSize: tokens.text.md.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["1"],
  },
  walletTypeDescription: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    lineHeight: 18,
  },
  integrationCard: {
    backgroundColor: tokens.color.bg.muted,
    margin: tokens.space["4"],
    padding: tokens.space["4"],
    borderRadius: tokens.radius.lg,
  },
  integrationTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["2"],
  },
  integrationDescription: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    lineHeight: 20,
    marginBottom: tokens.space["3"],
  },
  integrationList: {
    gap: tokens.space["2"],
  },
  integrationItem: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    lineHeight: 18,
  },
});

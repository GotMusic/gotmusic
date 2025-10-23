/**
 * WalletConnectionModal - Modal for wallet connection options
 *
 * This modal can be used throughout the app when users need to connect a wallet
 * for purchases, but haven't connected one yet.
 */

import { tokens } from "@gotmusic/tokens/native";
import React, { useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MobileWalletConnect } from "./MobileWalletConnect";

interface WalletConnectionModalProps {
  visible: boolean;
  onClose: () => void;
  onWalletConnected?: (walletInfo: { address: string; provider: string; type: string }) => void;
  title?: string;
  description?: string;
  showSkipOption?: boolean;
}

const { height: screenHeight } = Dimensions.get("window");

export function WalletConnectionModal({
  visible,
  onClose,
  onWalletConnected,
  title = "Connect Your Wallet",
  description = "You need a wallet to make purchases on GotMusic",
  showSkipOption = true,
}: WalletConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnected = (walletInfo: {
    address: string;
    provider: string;
    type: string;
  }) => {
    setIsConnecting(false);
    onWalletConnected?.(walletInfo);
    onClose();
  };

  const handleConnectionError = (error: string) => {
    setIsConnecting(false);
    Alert.alert("Connection Failed", error);
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Wallet Connection",
      "You can browse music without a wallet, but you won't be able to make purchases.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Skip",
          onPress: onClose,
          style: "destructive",
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          {showSkipOption && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Wallet Connection Options */}
        <View style={styles.content}>
          <MobileWalletConnect
            onWalletConnected={handleWalletConnected}
            onConnectionError={handleConnectionError}
            showPasskeyOption={true}
            showEmbeddedOption={true}
            showSocialOption={true}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.default,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: tokens.space["4"],
    borderBottomWidth: 1,
    borderBottomColor: tokens.color.border.subtle,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: tokens.color.bg.muted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: tokens.space["3"],
  },
  closeButtonText: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.fg.muted,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: tokens.text.xl.size,
    fontWeight: "600",
    color: tokens.color.fg.default,
    marginBottom: tokens.space["1"],
  },
  description: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    lineHeight: 20,
  },
  skipButton: {
    paddingVertical: tokens.space["2"],
    paddingHorizontal: tokens.space["3"],
  },
  skipButtonText: {
    fontSize: tokens.text.md.size,
    color: tokens.color.brand.primary,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
});

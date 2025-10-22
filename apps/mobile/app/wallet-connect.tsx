/**
 * Wallet Connect Screen - Mobile wallet connection options
 * 
 * This screen provides all wallet connection methods for mobile users:
 * 1. Traditional wallets (MetaMask, WalletConnect, Coinbase Wallet)
 * 2. Passkey wallet (secure biometric option)
 * 3. Embedded wallets (Privy managed)
 * 4. Social login with instant wallet creation
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { tokens } from '@gotmusic/tokens/native';
import { MobileWalletConnect } from './components/MobileWalletConnect';

export default function WalletConnectScreen() {
  const [connectionStep, setConnectionStep] = useState<'select' | 'connecting' | 'complete'>('select');

  const handleWalletConnected = (walletInfo: { address: string; provider: string; type: string }) => {
    console.log('Wallet connected:', walletInfo);
    
    // Show success message
    Alert.alert(
      'Wallet Connected! 🎉',
      `Successfully connected ${walletInfo.provider} wallet\nAddress: ${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}`,
      [
        {
          text: 'Continue',
          onPress: () => {
            // Navigate to main app
            router.replace('/(tabs)');
          }
        }
      ]
    );
  };

  const handleConnectionError = (error: string) => {
    console.error('Wallet connection error:', error);
    Alert.alert('Connection Failed', error);
  };

  const handleSkipConnection = () => {
    Alert.alert(
      'Skip Wallet Connection',
      'You can browse music without a wallet, but you won\'t be able to make purchases. You can connect a wallet later in settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Skip', 
          onPress: () => router.replace('/(tabs)'),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkipConnection}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>

      <MobileWalletConnect
        onWalletConnected={handleWalletConnected}
        onConnectionError={handleConnectionError}
        showPasskeyOption={true}
        showEmbeddedOption={true}
        showSocialOption={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: tokens.space['4'],
  },
  skipButton: {
    paddingVertical: tokens.space['2'],
    paddingHorizontal: tokens.space['4'],
  },
  skipButtonText: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
  },
});

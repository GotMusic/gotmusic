/**
 * Passkey Demo - Showcase passkey transaction signing
 * 
 * This screen demonstrates the seamless purchase flow:
 * 1. User wants to buy music
 * 2. Passkey authentication (quick & secure)
 * 3. Transaction automatically signed with passkey
 * 4. Purchase completes without wallet app
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '@gotmusic/tokens/native';
import { PasskeyPurchaseFlow } from './components/PasskeyPurchaseFlow';
import { usePasskeyTransaction } from '../src/contexts/PasskeyTransactionContext';

interface DemoAsset {
  id: string;
  title: string;
  artist: string;
  price: number;
  currency: string;
  description: string;
}

const DEMO_ASSETS: DemoAsset[] = [
  {
    id: '1',
    title: 'Digital Dreams',
    artist: 'Neon Beats',
    price: 25.00,
    currency: 'PYUSD',
    description: 'An ethereal electronic track perfect for late-night listening'
  },
  {
    id: '2',
    title: 'Crypto Symphony',
    artist: 'Blockchain Orchestra',
    price: 50.00,
    currency: 'PYUSD',
    description: 'A classical piece composed entirely on-chain'
  },
  {
    id: '3',
    title: 'DeFi Dance',
    artist: 'Yield Farmer',
    price: 15.00,
    currency: 'PYUSD',
    description: 'Upbeat track about decentralized finance'
  }
];

export default function PasskeyDemo() {
  const [selectedAsset, setSelectedAsset] = useState<DemoAsset | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<string[]>([]);
  
  const { 
    wallet, 
    isWalletLoaded, 
    isBiometricEnabled, 
    isPasskeyEnabled,
    createWallet,
    enableBiometric,
    enablePasskey,
    getAddress 
  } = usePasskeyTransaction();

  const handleAssetSelect = (asset: DemoAsset) => {
    setSelectedAsset(asset);
  };

  const handlePurchaseComplete = (transactionHash: string) => {
    setPurchaseHistory(prev => [...prev, transactionHash]);
    setSelectedAsset(null);
  };

  const handlePurchaseError = (error: string) => {
    console.error('Purchase error:', error);
  };

  const handleSetupWallet = async () => {
    try {
      const success = await createWallet();
      if (success) {
        Alert.alert('Wallet Created', 'Your passkey wallet has been created successfully!');
      } else {
        Alert.alert('Error', 'Failed to create wallet');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create wallet');
    }
  };

  const handleEnableBiometric = async () => {
    try {
      const success = await enableBiometric();
      if (success) {
        Alert.alert('Biometric Enabled', 'You can now sign transactions with your biometric authentication!');
      } else {
        Alert.alert('Error', 'Failed to enable biometric authentication');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to enable biometric authentication');
    }
  };

  const handleEnablePasskey = async () => {
    try {
      const success = await enablePasskey();
      if (success) {
        Alert.alert('Passkey Enabled', 'You can now sign transactions with your passkey authentication!');
      } else {
        Alert.alert('Error', 'Failed to enable passkey authentication');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to enable passkey authentication');
    }
  };

  if (selectedAsset) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedAsset(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Purchase</Text>
        </View>
        
        <PasskeyPurchaseFlow
          asset={selectedAsset}
          onPurchaseComplete={handlePurchaseComplete}
          onPurchaseError={handlePurchaseError}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔐 Passkey Transaction Demo</Text>
          <Text style={styles.subtitle}>
            Experience seamless purchases with passkey authentication
          </Text>
        </View>

        {/* Wallet Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Wallet Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Wallet:</Text>
            <Text style={[styles.statusValue, isWalletLoaded ? styles.statusSuccess : styles.statusError]}>
              {isWalletLoaded ? 'Connected' : 'Not Connected'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Address:</Text>
            <Text style={styles.statusValue}>
              {getAddress() ? `${getAddress()?.slice(0, 6)}...${getAddress()?.slice(-4)}` : 'None'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Biometric:</Text>
            <Text style={[styles.statusValue, isBiometricEnabled ? styles.statusSuccess : styles.statusError]}>
              {isBiometricEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Passkey:</Text>
            <Text style={[styles.statusValue, isPasskeyEnabled ? styles.statusSuccess : styles.statusError]}>
              {isPasskeyEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        </View>

        {/* Setup Actions */}
        {!isWalletLoaded && (
          <View style={styles.setupCard}>
            <Text style={styles.setupTitle}>Setup Required</Text>
            <Text style={styles.setupDescription}>
              Create a passkey wallet to start making secure purchases
            </Text>
            <TouchableOpacity style={styles.setupButton} onPress={handleSetupWallet}>
              <Text style={styles.setupButtonText}>Create Passkey Wallet</Text>
            </TouchableOpacity>
          </View>
        )}

        {isWalletLoaded && !isBiometricEnabled && !isPasskeyEnabled && (
          <View style={styles.setupCard}>
            <Text style={styles.setupTitle}>Enable Authentication</Text>
            <Text style={styles.setupDescription}>
              Enable biometric or passkey authentication for secure transactions
            </Text>
            <View style={styles.authButtons}>
              <TouchableOpacity style={styles.authButton} onPress={handleEnableBiometric}>
                <Text style={styles.authButtonText}>Enable Biometric</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.authButton} onPress={handleEnablePasskey}>
                <Text style={styles.authButtonText}>Enable Passkey</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Demo Assets */}
        <View style={styles.assetsCard}>
          <Text style={styles.assetsTitle}>Available Music</Text>
          <Text style={styles.assetsDescription}>
            Tap any track to experience passkey-powered purchasing
          </Text>
          
          {DEMO_ASSETS.map((asset) => (
            <TouchableOpacity
              key={asset.id}
              style={styles.assetCard}
              onPress={() => handleAssetSelect(asset)}
            >
              <View style={styles.assetInfo}>
                <Text style={styles.assetTitle}>{asset.title}</Text>
                <Text style={styles.assetArtist}>by {asset.artist}</Text>
                <Text style={styles.assetDescription}>{asset.description}</Text>
              </View>
              <View style={styles.assetPrice}>
                <Text style={styles.assetPriceAmount}>${asset.price}</Text>
                <Text style={styles.assetPriceCurrency}>{asset.currency}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Purchase History */}
        {purchaseHistory.length > 0 && (
          <View style={styles.historyCard}>
            <Text style={styles.historyTitle}>Recent Purchases</Text>
            {purchaseHistory.map((hash, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyHash}>
                  {hash.slice(0, 10)}...{hash.slice(-6)}
                </Text>
                <Text style={styles.historyStatus}>✅ Completed</Text>
              </View>
            ))}
          </View>
        )}

        {/* How It Works */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How It Works</Text>
          <View style={styles.infoSteps}>
            <View style={styles.infoStep}>
              <Text style={styles.infoStepNumber}>1</Text>
              <Text style={styles.infoStepText}>Connect your wallet once (gets your address)</Text>
            </View>
            <View style={styles.infoStep}>
              <Text style={styles.infoStepNumber}>2</Text>
              <Text style={styles.infoStepText}>Enable biometric/passkey authentication</Text>
            </View>
            <View style={styles.infoStep}>
              <Text style={styles.infoStepNumber}>3</Text>
              <Text style={styles.infoStepText}>All transactions signed with passkey (no wallet popups!)</Text>
            </View>
            <View style={styles.infoStep}>
              <Text style={styles.infoStepNumber}>4</Text>
              <Text style={styles.infoStepText}>Purchase completes seamlessly</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    padding: tokens.space['4'],
    alignItems: 'center',
  },
  title: {
    fontSize: tokens.text['3xl'].size,
    fontWeight: 'bold',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['2'],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.fg.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  statusCard: {
    backgroundColor: tokens.color.bg.subtle,
    margin: tokens.space['4'],
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
  },
  statusTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['3'],
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.space['2'],
  },
  statusLabel: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
  },
  statusValue: {
    fontSize: tokens.text.md.size,
    fontWeight: '500',
  },
  statusSuccess: {
    color: tokens.color.semantic.success,
  },
  statusError: {
    color: tokens.color.semantic.error,
  },
  setupCard: {
    backgroundColor: tokens.color.bg.subtle,
    margin: tokens.space['4'],
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
  },
  setupTitle: {
    fontSize: tokens.text.xl.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['2'],
  },
  setupDescription: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: tokens.space['4'],
  },
  setupButton: {
    backgroundColor: tokens.color.brand.primary,
    paddingVertical: tokens.space['3'],
    paddingHorizontal: tokens.space['6'],
    borderRadius: tokens.radius.lg,
  },
  setupButtonText: {
    color: tokens.color.fg.inverse,
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
  },
  authButtons: {
    flexDirection: 'row',
    gap: tokens.space['3'],
  },
  authButton: {
    backgroundColor: tokens.color.brand.primary,
    paddingVertical: tokens.space['3'],
    paddingHorizontal: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    flex: 1,
  },
  authButtonText: {
    color: tokens.color.fg.inverse,
    fontSize: tokens.text.md.size,
    fontWeight: '600',
    textAlign: 'center',
  },
  assetsCard: {
    backgroundColor: tokens.color.bg.subtle,
    margin: tokens.space['4'],
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
  },
  assetsTitle: {
    fontSize: tokens.text.xl.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['2'],
  },
  assetsDescription: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    marginBottom: tokens.space['4'],
  },
  assetCard: {
    backgroundColor: tokens.color.bg.default,
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
    marginBottom: tokens.space['3'],
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.color.border.subtle,
  },
  assetInfo: {
    flex: 1,
  },
  assetTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['1'],
  },
  assetArtist: {
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    marginBottom: tokens.space['2'],
  },
  assetDescription: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    lineHeight: 18,
  },
  assetPrice: {
    alignItems: 'flex-end',
  },
  assetPriceAmount: {
    fontSize: tokens.text.xl.size,
    fontWeight: 'bold',
    color: tokens.color.brand.primary,
  },
  assetPriceCurrency: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
  },
  historyCard: {
    backgroundColor: tokens.color.bg.subtle,
    margin: tokens.space['4'],
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
  },
  historyTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['3'],
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: tokens.space['2'],
    borderBottomWidth: 1,
    borderBottomColor: tokens.color.border.subtle,
  },
  historyHash: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.fg.muted,
    fontFamily: 'monospace',
  },
  historyStatus: {
    fontSize: tokens.text.sm.size,
    color: tokens.color.semantic.success,
  },
  infoCard: {
    backgroundColor: tokens.color.bg.subtle,
    margin: tokens.space['4'],
    padding: tokens.space['4'],
    borderRadius: tokens.radius.lg,
  },
  infoTitle: {
    fontSize: tokens.text.lg.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
    marginBottom: tokens.space['4'],
  },
  infoSteps: {
    gap: tokens.space['3'],
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.space['3'],
  },
  infoStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: tokens.color.brand.primary,
    color: tokens.color.fg.inverse,
    fontSize: tokens.text.sm.size,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoStepText: {
    flex: 1,
    fontSize: tokens.text.md.size,
    color: tokens.color.fg.muted,
    lineHeight: 20,
  },
  backButton: {
    padding: tokens.space['2'],
  },
  backButtonText: {
    fontSize: tokens.text.lg.size,
    color: tokens.color.brand.primary,
  },
  headerTitle: {
    fontSize: tokens.text.xl.size,
    fontWeight: '600',
    color: tokens.color.fg.default,
  },
});
